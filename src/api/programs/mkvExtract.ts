// Adapted from https://github.com/qgustavor/mkv-extract/ licensed under MIT

import { Decoder, tools } from 'ebml';
import fs from 'fs';

// Helpers
import logger from '../helpers/logger';

function mkvExtract(fileName, filePath, callback): any {
  const startTime = new Date().getTime();
  logger.log(`[MKVEXTRACT_START] 📂 ${fileName} -- ${startTime} 🧬`, null, true);

  const fileStream = fs.createReadStream(filePath);
  const decoder = new Decoder();
  const tracks = [];
  const trackData = [];
  const files = [];
  const subtitleFileSize = [];
  let currentFile = 0;
  let currentTimecode = 0;
  let trackIndexTemp = 0;
  let trackTypeTemp = 0;
  let trackDataTemp = '';
  let trackIndex = 0;

  decoder.on('error', error => {
    callback(error, null);
    fileStream.destroy();
  });

  decoder.on('data', chunk => {
    logger.log(`[MKVEXTRACT_CHUNK] ⌛ ${chunk[0]} -- ${chunk[1].name} -- ${chunk[1].dataSize} 🧬`);
    switch (chunk[0]) {
      case 'end':
        // if (chunk[1].name === 'Info') {
        //   fileStream.destroy();
        // }
        if (chunk[1].name === 'TrackEntry') {
          if (trackTypeTemp === 0x11) {
            tracks.push(trackIndexTemp);
            trackData.push([trackDataTemp]);
            subtitleFileSize.push(0);
          }
        }
        break;
      case 'tag':
        if (chunk[1].name === 'FileName') {
          if (!files[currentFile]) {
            files[currentFile] = {};
          }
          files[currentFile].name = chunk[1].data.toString();
        }
        if (chunk[1].name === 'FileData') {
          if (!files[currentFile]) {
            files[currentFile] = {};
          }
          files[currentFile].data = chunk[1].data;
          files[currentFile].size = chunk[1].dataSize;
        }
        if (chunk[1].name === 'TrackNumber') {
          trackIndexTemp = chunk[1].data[0];
        }
        if (chunk[1].name === 'TrackType') {
          trackTypeTemp = chunk[1].data[0];
        }
        if (chunk[1].name === 'CodecPrivate') {
          trackDataTemp = chunk[1].data.toString();
        }
        if (chunk[1].name === 'SimpleBlock' || chunk[1].name === 'Block') {
          const trackLength = tools.readVint(chunk[1].data);
          trackIndex = tracks.indexOf(trackLength.value);
          if (trackIndex !== -1) {
            const timestampArray = new Uint8Array(chunk[1].data).slice(trackLength.length, trackLength.length + 2);
            const timestamp = new DataView(timestampArray.buffer).getInt16(0);
            const lineData = chunk[1].data.slice(trackLength.length + 3);
            trackData[trackIndex].push(lineData.toString(), timestamp, currentTimecode);
            subtitleFileSize[trackIndex] += chunk[1].dataSize;
          }
        }
        if (chunk[1].name === 'Timecode') {
          const timecode = readUnsignedInteger(padZeroes(chunk[1].data));
          currentTimecode = timecode;
        }
        if (chunk[1].name === 'BlockDuration' && trackIndex !== -1) {
          // the duration is in milliseconds
          const duration = readUnsignedInteger(padZeroes(chunk[1].data));
          trackData[trackIndex].push(duration);
        }
        break;
    }
    if (files[currentFile] && files[currentFile].name && files[currentFile].data && files[currentFile].size) {
      currentFile++;
    }
  });

  fileStream.on('end', () => {
    const endTime = new Date().getTime();
    logger.log(`[MKVEXTRACT_END] 🎬 ${fileName} -- ${endTime} -- ${(endTime - startTime) / 1000} seconds 🧬`, null, true);
    trackData.forEach((entries, index) => {
      const heading = entries[0];
      const isASS = heading.includes('Format:');
      const formatFn = isASS ? formatTimestamp : formatTimestampSRT;
      const eventMatches = isASS ? heading.match(/\[Events\]\s+Format:([^\r\n]*)/) : [''];
      const headingParts = isASS ? heading.split(eventMatches[0]) : ['', ''];
      const fixedLines: any = [];
      for (let i = 1; i < entries.length; i += 4) {
        const line = entries[i];
        const lineTimestamp = entries[i + 1];
        const chunkTimestamp = entries[i + 2];
        const duration = entries[i + 3];
        const lineParts = isASS && line.split(',');
        const lineIndex = isASS ? lineParts[0] : (i - 1) / 4;
        const startTimestamp = formatFn(chunkTimestamp + lineTimestamp);
        const endTimestamp = formatFn(chunkTimestamp + lineTimestamp + duration);
        let fixedLine: any;
        if (isASS) {
          fixedLine = 'Dialogue: ' + [lineParts[1], startTimestamp, endTimestamp].concat(lineParts.slice(2)).join(',');
        } else {
          fixedLine = lineIndex + 1 + '\r\n' + startTimestamp.replace('.', ',') + ' --> ' + endTimestamp.replace('.', ',') + '\r\n' + line + '\r\n';
        }
        if (fixedLines[lineIndex]) {
          fixedLines[lineIndex] += '\r\n' + fixedLine;
        } else {
          fixedLines[lineIndex] = fixedLine;
        }
      }
      files.push({
        name: fileName + '_' + (index + 1) + (isASS ? '.ass' : '.srt'),
        data: (isASS ? headingParts[0] + eventMatches[0] + '\r\n' : '') + fixedLines.join('\r\n') + headingParts[1] + '\r\n',
        size: subtitleFileSize[index]
      });
    });
    if (files.length === 0) {
      callback(Error('No data found'), null);
    } else {
      callback(null, files);
    }
  });

  fileStream.pipe(decoder as any);
}

function padZeroes(arr): any {
  const len = Math.ceil(arr.length / 2) * 2;
  const output = new Uint8Array(len);
  output.set(arr, len - arr.length);
  return output.buffer;
}

function readUnsignedInteger(data): any {
  const view = new DataView(data);
  return data.byteLength === 2 ? view.getUint16(0) : view.getUint32(0);
}

function formatTimestamp(timestamp): any {
  const seconds = timestamp / 1000;
  const hh = Math.floor(seconds / 3600);
  let mm: any = Math.floor((seconds - hh * 3600) / 60);
  let ss: any = (seconds - hh * 3600 - mm * 60).toFixed(2);
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (ss < 10) {
    ss = `0${ss}`;
  }
  return `${hh}:${mm}:${ss}`;
}

function formatTimestampSRT(timestamp): any {
  const seconds = timestamp / 1000;
  let hh: any = Math.floor(seconds / 3600);
  let mm: any = Math.floor((seconds - hh * 3600) / 60);
  let ss: any = (seconds - hh * 3600 - mm * 60).toFixed(3);
  if (hh < 10) {
    hh = `0${hh}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (ss < 10) {
    ss = `0${ss}`;
  }
  return `${hh}:${mm}:${ss}`;
}

export default mkvExtract;
