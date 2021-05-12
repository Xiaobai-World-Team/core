export interface IFile {
  /** file name */
  name: String;
  /** full path of this file */
  fullPath: string;
  /** check whether the file is a directory */
  isDirectory: boolean
  /** last modified of file */
  LastModified: Date
  /** Content-Length of file*/
  ContentLength: Number
  /** Content-Type of file */
  ContentType: String
}

// /** File System */
// export abstract class XiaobaiFileBasic {
//   /** Read file list from custom path */
//   abstract readDir(path: string): Promise<IFile[]>
// }
