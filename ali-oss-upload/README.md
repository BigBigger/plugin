## @bigbigger/ali-oss-upload
This Webpack plugin allows you to auto upload to Aliyun oss after build;



## Install

```bash
npm install @bigbigger/ali-oss-upload -dev
# or
yarn add @bigbigger/ali-oss-upload -D
```



## Usage

```javascript
const AliOSSUpload = require('@bigbigger/ali-oss-upload');

module.exports = {
  // ...rest of the config
  configureWebpack: {
    plugins: [
      new AliOSSUpload({
         region: '<Your region>',
         accessKeyId: '<Your AccessKeyId>',
         accessKeySecret: '<Your AccessKeySecret>',
         bucket: '<Your bucket>',
         form: '', // default is output.path
      })
    ],
  },
}
```



## Options

```javascript
new AliOSSUpload(clientOptions, putOptions)
```

### clientOptions

Type: `Object`

##### from

Type: `string | string[]`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage)

##### ...

other params use for create oss client

See supported `ali oss` [options](https://help.aliyun.com/document_detail/64097.html)

### putOptions

Type: `Object | Function (filename, filepath): Object`

ali oss putObject

See supported [options](https://help.aliyun.com/document_detail/31978.html)



## License

MIT