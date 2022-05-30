# Netless App Hello, world!

见 [netless-app](https://github.com/netless-io/netless-app#useful-context-apis) 主页文档。

## 注册与使用

1. 在加入房间之前注册 app

```js
import { register } from "@netless/fastboard";
import HelloWorld from "@netless/app-hello-world";

register({
  kind: "HelloWorld",
  src: HelloWorld,
});
```

2. 在加入房间后，调用 `WindowManager.addApp` 添加 app 到房间内

```js
import { createFastboard, mount } from '@netless/fastboard'
const fastboard = await createFastboard(...)
mount(fastboard, document.querySelector('#app'))

// ...
fastboard.manager.addApp({ kind: "HelloWorld" })
```

3. (可选) 将其注册为 fastboard 工具栏 apps 展开菜单中的一个按钮

```js
import { apps } from "@netless/fastboard";

apps.push({
  icon: "https://api.iconify.design/mdi:file-question-outline.svg?color=currentColor",
  kind: "HelloWorld",
  label: "Hello, world!",
  onClick: fastboard => {
    fastboard.manager.addApp({ kind: "HelloWorld" });
  },
});
```
