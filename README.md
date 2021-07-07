# BigBigger

> 工具包、插件集

# package

|                    Package                    | version |
| :-------------------------------------------: | :------ |
|          [@bigbigger/mock](./mockjs)          | 0.1.1   |
| [@bigbigger/ali-oss-upload](./ali-oss-upload) | 0.1.1   |

### [@bigbigger/mock](./mockjs#readme)

模拟请求 & 模拟数据

- template: function支持promise异步返回

  ```javascript
  Mock.mock(rurl, async function( options ))
  Mock.mock(rurl, rtype, async function( options ))
  ```

- 支持自定义返回状态

  ```javascript
  {
    ...,
    _status: 200, // custom status
  }
  ```

### [@bigbigger/ali-oss-upload](./ali-oss-upload)

打包后自动上传aliyun oss

- clientOptions

  ```javascript
  {
    from: '' | [''], // 上传文件夹,默认为output.path
    ... // 其它参数为oss client参数
  }
  ```

- putOptions

  ```javascript
  { ... } // 上传文件的配置
  或
  (filename, filepath) // 不同文件不同配置
  ```

  配置内容参考[阿里云文档](https://help.aliyun.com/document_detail/31978.html)

