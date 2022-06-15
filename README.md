# Netless App Template

[Netless App 文档](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

## 快速开始

前置条件：至少需要安装了 `git`、`node 16`、`npm 8`。

本项目是一个模版仓库，请点击右上角 `Use this template` 生成一个属于你自己的仓库，再基于它进行开发。

默认的 `main` 分支模版是基于 TypeScript 且不依赖任何框架编写的，你也可以在其他分支找到不同的模版，在生成仓库时选择 `Include all branches` 即可同时将他们复制进你的仓库。

> 如果你安装了 [GitHub CLI](https://cli.github.com)，也可以用这个命令一键生成并 clone 本仓库
>
>     gh repo create your-app-name --template netless-io/community-apps --include-all-branches

在 .env 文件里[配置好房间](#配置白板房间)后，执行 `npm install` 安装依赖，执行 `npm start` 进行本地测试。

## 配置白板房间

请将本目录下的 .env.example 文件复制一份，重命名为 .env 或 .env.local 后，在里面填写必须的白板房间信息。

## 提交到社区 App 列表

开发完 App 后，可以在 [Community Apps](https://github.com/netless-io/community-apps) 仓库提交你的项目，方便更多人发现和使用。

## 清单

- [ ] 添加 .env 或 .env.local
- [ ] 修改 package.json 里的 `name`，`private` 等字段
- [ ] (可选) 发布 npm 包
- [ ] 添加 License
- [ ] 修改 README
- [ ] (可选) 添加 Logo
