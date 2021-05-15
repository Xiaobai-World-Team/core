/**
 * virtual disk api;
 * avoid some users using cloud disk,because the priceis hard to bear. so matain target is save of small size file.
 */


import axios from 'axios'

/**
 * file system
 */
export class XiaobaiFileSystem {
  /** read dir file list */
  async readDir(path: String) {
    return (await axios.post('/storage/fileSystem/readDir', {
      path
    })).data.data
  }
  /** mkdir */
  async mkDir(path: String) {
    return (await axios.post('/storage/fileSystem/mkdir', {
      path
    })).data.data
  }
}
