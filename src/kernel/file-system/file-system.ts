
import axios from 'axios'

/**
 * File System
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
