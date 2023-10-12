// 3rd Party Library
import { Decoder, tools } from 'ebml';

// NodeJS Library
import { createReadStream } from 'node:fs';

import { Injectable } from '@nestjs/common';

import { GlobalService } from './global.service';

@Injectable()
export class MkvExtractService {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  padZeroes(arr: ArrayLike<number>): ArrayBufferLike {
    const len = Math.ceil(arr.length / 2) * 2;
    const output = new Uint8Array(len);
    output.set(arr, len - arr.length);
    return output.buffer;
  }

  readUnsignedInteger(data: ArrayBufferLike): number {
    const view = new DataView(data);
    return data.byteLength === 2 ? view.getUint16(0) : view.getUint32(0);
  }

  formatTimestamp(timestamp: number): string {
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

  formatTimestampSRT(timestamp: number): string {
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

  async mkvExtract(fileName: string, filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {

      const startTime = Date.now();
      this.gs.log(`[MKVEXTRACT_START] 📂 ${fileName} -- ${startTime} 🧬`, null, 'error');

      const fileStream = createReadStream(filePath);
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
        this.gs.log(`[MKVEXTRACT_DECODER_ERROR] 🌋 ${fileName} 🧬`, error, 'error');
        fileStream.destroy(error);
        reject(error);
      });

      decoder.on('data', chunk => {
        this.gs.log(`[MKVEXTRACT_DATA_CHUNK] ⌛ ${fileName} -- ${chunk[0]} -- ${chunk[1].name} -- ${chunk[1].dataSize} 🧬`, null, 'error');
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
            if (chunk[1].name === 'unknown') {
              fileStream.destroy(new Error('Unknown File Tag'));
            } else if (chunk[1].name === 'FileName') {
              if (!files[currentFile]) {
                files[currentFile] = {};
              }
              files[currentFile].name = chunk[1].data.toString();
            } else if (chunk[1].name === 'FileData') {
              if (!files[currentFile]) {
                files[currentFile] = {};
              }
              files[currentFile].data = chunk[1].data;
              files[currentFile].size = chunk[1].dataSize;
            } else if (chunk[1].name === 'TrackNumber') {
              trackIndexTemp = chunk[1].data[0];
            } else if (chunk[1].name === 'TrackType') {
              trackTypeTemp = chunk[1].data[0];
            } else if (chunk[1].name === 'CodecPrivate') {
              trackDataTemp = chunk[1].data.toString();
            } else if (chunk[1].name === 'SimpleBlock' || chunk[1].name === 'Block') {
              const trackLength = tools.readVint(chunk[1].data);
              trackIndex = tracks.indexOf(trackLength.value);
              if (trackIndex !== -1) {
                const timestampArray = new Uint8Array(chunk[1].data).slice(trackLength.length, trackLength.length + 2);
                const timestamp = new DataView(timestampArray.buffer).getInt16(0);
                const lineData = chunk[1].data.slice(trackLength.length + 3);
                trackData[trackIndex].push(lineData.toString(), timestamp, currentTimecode);
                subtitleFileSize[trackIndex] += chunk[1].dataSize;
              }
            } else if (chunk[1].name === 'Timecode') {
              const timecode = this.readUnsignedInteger(this.padZeroes(chunk[1].data));
              currentTimecode = timecode;
            } else if (chunk[1].name === 'BlockDuration' && trackIndex !== -1) {
              // the duration is in milliseconds
              const duration = this.readUnsignedInteger(this.padZeroes(chunk[1].data));
              trackData[trackIndex].push(duration);
            }
            break;
          default:
            // do nothing
        }
        if (files[currentFile] && files[currentFile].name && files[currentFile].data && files[currentFile].size) {
          currentFile++;
        }
      });

      fileStream.on('end', () => {
        for (const [idx, val] of trackData.entries()) {
          const heading = val[0];
          const isASS = heading.includes('Format:');
          const formatFn = isASS ? this.formatTimestamp : this.formatTimestampSRT;
          const eventMatches = isASS ? heading.match(/\[Events\]\s+Format:([^\r\n]*)/) : [''];
          const headingParts = isASS ? heading.split(eventMatches[0]) : ['', ''];
          const fixedLines: any = [];
          for (let i = 1; i < val.length; i += 4) {
            const line = val[i];
            const lineTimestamp = val[i + 1];
            const chunkTimestamp = val[i + 2];
            const duration = val[i + 3];
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
            name: fileName + '_' + (idx + 1) + (isASS ? '.ass' : '.srt'),
            data: (isASS ? headingParts[0] + eventMatches[0] + '\r\n' : '') + fixedLines.join('\r\n') + headingParts[1] + '\r\n',
            size: subtitleFileSize[idx]
          });
        };
        const endTime = Date.now();
        this.gs.log(`[MKVEXTRACT_END] 🎬 ${fileName} -- ${endTime} -- ${(endTime - startTime) / 1000} seconds 🧬`, files, 'error');
        resolve(files);
      });

      fileStream.pipe(decoder as any);

    });
  }

}
