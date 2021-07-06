# BigBigger

> 工具包、插件集

### [/mock](./mock/README.md)

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