/**
 * on xiaobai system, there are only two types of files,
 * file or app
 */
export enum FILE_TYPE {
  /** normal file, such as jpeg,txt,csv,etc. */
  FILE = 'FILE',
  /** 
   * xiaobai app, extension is 'xiaobai.app',
   * in essence,it's a json text file
   *  */
  APP = "APP"
}
/**
 * whether application or jpeg,txt, all of them file.
 */
export interface IFile {
  type: FILE_TYPE,
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

