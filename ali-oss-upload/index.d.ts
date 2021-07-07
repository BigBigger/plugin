import OSS from 'ali-oss';

interface AliOSSUploadOptions extends OSS.Options {
  /** upload dir, default is output */
  from?: string | string[],
}

interface putOption {
  (filename: string, filepath: string): OSS.PutObjectOptions;
}

export declare interface AliOSSUpload {
  (options: AliOSSUploadOptions, putOption: OSS.PutObjectOptions | putOption): void;
}