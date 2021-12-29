const fs = require('fs');

const fsChunkStore = require('fs-chunk-store');
const WebTorrent = require('webtorrent-hybrid');

const { log } = require('../helpers/logger');

let hybridClient = null;

let trackerAnnounce = [
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.opentrackr.org:1337',
  'udp://exodus.desync.com:6969',
  'http://nyaa.tracker.wf:7777',
  'http://sukebei.tracker.wf:8888',
  'http://open.nyaatorrents.info:6544'
];

let clientOptions = {};

let torrentsQueue = {
  // 'magnet:!@#123...zxc': {
  //   completed?: boolean;
  //   // indexedDb?: string;
  //   infoHash?: string;
  //   name?: string;
  //   files?: any[];
  // }
};

let torrentOptions = {
  store: fsChunkStore
};

let tableDataRow = [];
let priodicInfo = null;

function initialize(event, config) {
  if (hybridClient == null) {
    trackerAnnounce = [...config.trackerAnnounce, ...trackerAnnounce];
    clientOptions = config.clientOptions;
    clientOptions.tracker.announce = trackerAnnounce;
    torrentsQueue = config.torrentsQueue;
    torrentOptions = {
      ...torrentOptions,
      ...config.torrentOptions
    };
    hybridClient = new WebTorrent(clientOptions);
    log('[TORRENT_CLIENT_HYBRID_MODE_INITIALIZED]', hybridClient);
    handleHybridClient(event, config);
    event.sender.send('client-init', {
      peerId: hybridClient.peerId
    });
    priodicInfo = setInterval(() => {
      event.sender.send('torrent-periodic-info', getAllTorrent());
    }, 10000);
  }
}

function filterTorrentInfo(t) {
  const torrentWires = [];
  for (const w of t.wires) {
    torrentWires.push({
      peerId: w.peerId,
      remoteAddress: w.remoteAddress,
      remotePort: w.remotePort
    });
  }
  const torrentFileList = [];
  for (const tf of t.files) {
    torrentFileList.push({
      name: tf.name,
      downloaded: tf.downloaded,
      length: tf.length,
      path: tf.path
    });
  }
  return {
    name: t.name,
    length: t.length,
    downloaded: t.downloaded,
    uploaded: t.uploaded,
    progress: t.progress,
    downloadSpeed: t.downloadSpeed,
    uploadSpeed: t.uploadSpeed,
    timeRemaining: t.timeRemaining,
    numPeers: t.numPeers,
    ratio: t.ratio,
    // --
    infoHash: t.infoHash,
    magnetURI: t.magnetURI,
    announce: t.announce,
    // --
    files: torrentFileList,
    wires: torrentWires
  }
}

function getAllTorrent() {
  const torrentList = [];
  for (const t of tableDataRow) {
    torrentList.push(filterTorrentInfo(t));
  }
  return torrentList;
}

function getTorrent(infoHash) {
  const torrent = tableDataRow.find(t => t.infoHash === infoHash);
  if (torrent) {
    return filterTorrentInfo(torrent);
  } else {
    return null;
  }
}

function getAllQueue(event, torrent) {
  event.sender.send('torrent-client-all-queue', getAllTorrent());
}

function getDetail(event, torrent) {
  event.sender.send('torrent-file-detail', getTorrent(torrent.infoHash));
}

function handleHybridClient(event, config) {
  hybridClient.on('torrent', torrent => {
    log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent);
    console.log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent.infoHash);
    tableDataRow.push(torrent);
    const x = getTorrent(torrent.infoHash);
    log(x);
    event.sender.send('torrent-init', x);
  });
  hybridClient.on('error', err => {
    log('[TORRENT_CLIENT_ERROR]', err);
    event.sender.send('client-error', err.toString());
  });
}

function handleWebWire(event, wire) {
  log('[TORRENT_WIRE_CONNECT]', wire);
  console.log('[TORRENT_WIRE_CONNECT]', wire.peerId);
  let wireName = wire.peerId || 'Unknown!';
  if (wire.remoteAddress && wire.remotePort) {
    wireName = `${wire.remoteAddress}:${wire.remotePort}`;
  }
  wire.once('close', () => {
    log('[TORRENT_WIRE_DISCONNECT]', wireName);
    // event.sender.send('torrent-wire-disconnect', wire);
    event.sender.send('torrent-wire-disconnect', wireName);
  });
  // event.sender.send('torrent-wire-connect', wire);
  event.sender.send('torrent-wire-connect', wireName);
}

function handleHybridTorrent(event, torrent) {
  torrent.on('done', () => {
    log('[TORRENT_FILE_DONE]', torrent);
    event.sender.send('torrent-file-done', getTorrent(torrent.infoHash));
  });
  torrent.on('warning', warn => {
    log('[TORRENT_FILE_WARNING]', warn);
    event.sender.send('torrent-file-warning', warn.toString());
  });
  torrent.on('error', err => {
    log('[TORRENT_FILE_ERROR]', err);
    event.sender.send('torrent-file-error', err.toString());
  });
}

function processTorrent(event, torrent, completed) {
  torrent.on('wire', wire => handleWebWire(event, wire));
  torrentsQueue[torrent.infoHash] = {
    completed: completed,
    // indexedDb: torrent.name + ' - ' + torrent.infoHash.slice(0, 8),
    infoHash: torrent.infoHash,
    name: torrent.name,
    files: []
  };
  for (const file of torrent.files) {
    const tf = file;
    torrentsQueue[torrent.infoHash].files.push({
      name: tf.name,
      offset: tf.offset,
      length: tf.length,
      path: tf.path
    });
  }
  handleHybridTorrent(event, torrent);
}

function downloadFiles(event, magnetHash, opts = torrentOptions) {
  hybridClient.add(magnetHash, opts, torrent => {
    log('[TORRENT_FILE_DOWNLOAD_READY]', torrent);
    console.log('[TORRENT_FILE_DOWNLOAD_READY]', torrent.infoHash);
    processTorrent(event, torrent, false);
  });
}

function uploadFiles(event, data) {
  log('[TORRENT_CLIENT_QUEUE_UPLOAD]', data);
  // const files = [];
  // for (const file of data.filePaths) {
  //   files.push(fs.createReadStream(file));
  // }
  hybridClient.seed(data.filePaths, {
    ...torrentOptions,
    name: data.userInput.torrentBerkasName.inputText.replace(/[/?%*:|"<>]/g, '-')
  }, torrent => {
    log('[TORRENT_FILE_SEED_READY]', torrent);
    console.log('[TORRENT_FILE_SEED_READY]', torrent.infoHash);
    processTorrent(event, torrent, true);
  });
}

function removeTorrent(event, torrentId) {
  tableDataRow = tableDataRow.filter(el => el.infoHash !== torrentId);
  hybridClient.remove(torrentId, {
    destroyStore: true
  }, err => {
    if (err) {
      log('[TORRENT_FILE_REMOVE_ERROR]', err);
    }
    delete torrentsQueue[torrentId];
    getDetail(event, torrent);
  });
}

function pauseTorrent(event, torrentId) {
  if (torrentId) {
    const torrent = hybridClient.get(torrentId);
    if (torrent) {
      torrent.pause();
      getDetail(event, torrent);
    }
  }
}

function resumeTorrent(event, torrentId) {
  const torrent = hybridClient.get(torrentId);
  if (torrent) {
    torrent.resume();
    getDetail(event, torrent);
  }
}

function removeAll(event) {
  for (const t of hybridClient.torrents) {
    removeTorrent(event, t.infoHash);
  }
}

module.exports = {
  initialize,
  getAllQueue,
  getDetail,
  downloadFiles,
  uploadFiles,
  removeTorrent,
  pauseTorrent,
  resumeTorrent,
  removeAll
};