[English](README.eng.md) | [中文](README.zh.md)
# AI 英语学习助手

一个浏览器扩展，帮助英语学习者高效记忆和练习新词汇，基于 AI 技术。

## 功能特色
- **快速输入：** 通过网页上的浮动按钮，快速输入 10 个英文单词
- **AI 智能生成：** 使用 AI API，瞬间生成包含新单词标注的英文短文及完整中文翻译
- **词汇重复：** 新单词在不同语境中多次出现，强化记忆
- **简单句型：** 生成内容以简单语法和词汇为主，适合小学阶段学习者
- **历史记录：** 所有查询和结果本地保存，随时查看和清除历史
- **无需登录：** 所有数据本地存储，保护隐私，使用便捷
- **Markdown 支持：** 结果以美观的 Markdown 格式展示
- **自定义 API Key：** 可在扩展选项中安全设置自己的 API 密钥

## 安装方法
1. 下载或克隆本仓库
2. 打开浏览器扩展页面（如 `chrome://extensions` 或 `edge://extensions`）
3. 启用开发者模式
4. 点击“加载已解压的扩展”，选择项目文件夹
5. 在扩展选项页设置你的 API 密钥和模型

## 使用方法
- 点击浮动按钮打开输入窗口
- 输入最多 10 个英文单词并提交
- 查看生成的英文短文和中文翻译
- 可随时查看或清除查询历史
- 按下快捷键可以将选中的文本添加到单词列表中

## 项目结构
- `manifest.json` — 扩展配置
- `background.js` — 处理 API 请求与历史记录
- `content.js` — 注入浮动按钮
- `popup/` — 单词输入与结果主界面
- `history/` — 历史记录查看与管理
- `icons/` — 扩展图标
- `vendor/` — 第三方库（如 marked.js）
- `options.html` & `options.js` — API 密钥管理

## 关键词
英语学习、词汇、AI 写作、Gemini、英文阅读、浏览器扩展、英语助手、Markdown、Edge 扩展、Chrome 扩


## 关注作者

- [B站账号](https://space.bilibili.com/12732048?spm_id_from=333.1007.0.0)
- [小红书账号](https://www.xiaohongshu.com/user/profile/684ce591000000001d022ce8?tab=note&subTab=note)