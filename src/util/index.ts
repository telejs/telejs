import { extname, basename } from 'path';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import sizeOf from 'image-size';
import { DocumentAttribute, InputPeer, ResolvedPeer } from '../types';
// import { stat } from 'node:fs';
dotenv.config();

export function logger(...message: any): void {
  if (process.env.DEBUG) {
    const date = new Date();
    console.debug(`[${date.toISOString()}]: `, ...message);
  }
}

// export function getInputPeer(resolvePeer: ResolvedPeer): InputPeer;
export function getInputPeer(
  peerId: number,
  accessHash: string,
  peerType: string
): InputPeer;
export function getInputPeer(
  peer: ResolvedPeer | number,
  accessHash: string,
  peerType: string
): InputPeer {
  if (typeof peer == 'number') {
    if (peerType == 'peerChat' || peerType == 'chat')
      return { _: 'inputPeerChat', chat_id: peer, access_hash: accessHash };
    if (peerType == 'peerUser' || peerType == 'user')
      return { _: 'inputPeerUser', user_id: peer, access_hash: accessHash };
    if (peerType == 'peerChannel' || peerType == 'channel')
      return {
        _: 'inputPeerChannel',
        channel_id: peer,
        access_hash: accessHash,
      };
  } else {
    // return {...peer}
  }

  return { _: 'inputPeerEmpty' };
}

export function getMimeType(fileName: string) {
  const ext = extname(fileName);
  switch (ext) {
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.mp4':
      return 'video/mp4';
    default:
      return 'text/plain';
  }
}

export function getAttributeFile(filePath: string): DocumentAttribute[] {
  const ext = extname(filePath);
  const fileName = basename(filePath);
  const attr: DocumentAttribute[] = [];
  switch (true) {
    case ext == '.jpg':
      const dimension = sizeOf(filePath);
      attr.push({
        _: 'documentAttributeImageSize',
        h: <number>dimension.height,
        w: <number>dimension.width,
      });
    case ext == '.mp4' || ext == '.mkv':
      const videoInfo = getVideoInfo(filePath);
      attr.push({
        _: 'documentAttributeVideo',
        duration: videoInfo.duration,
        h: videoInfo.height,
        w: videoInfo.width,
      });
    default:
      attr.push({ _: 'documentAttributeFilename', file_name: fileName });
      break;
  }
  return attr;
}

interface VideoInfo {
  height: number;
  width: number;
  duration: number;
}
function getVideoInfo(videoPath: string): VideoInfo {
  const command = [
    'ffprobe',
    '-v',
    'error',
    '-show_format_entry',
    'duration',
    '-show_entries',
    'stream=height,width',
    videoPath,
  ];
  try {
    const stdout = execSync(command.join(' '), { stdio: 'pipe' }).toString();
    let width: any = /width=([0-9]+)/i.exec(stdout);
    let height: any = /height=([0-9]+)/i.exec(stdout);
    let duration: any = /duration=([0-9]+)/i.exec(stdout);
    if (!width || !height || !duration) {
      throw new Error('Cannot read video file');
    }
    return {
      width: parseInt(width[1]),
      height: parseInt(height[1]),
      duration: parseInt(duration[1]),
    };
  } catch (err) {
    throw err;
  }
}
