# my-tamper-monkey-scripts

## Usage

1. 在 Edge 或 Chrome 的插件商店搜索并下载 `TamperMonkey`

2. 在 `tamper-monkey` 新建脚本，并复制一下代码覆盖默认的脚本代码
```js
// ==UserScript==
// @name         [脚本名称]
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.19/lodash.js
// @require      file://[脚本文件的绝对路径]
// ==/UserScript==
```

3. 启用脚本，刷新需要运行脚本的网页