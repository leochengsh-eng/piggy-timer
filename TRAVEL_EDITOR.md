# 旅行计划书编辑器

一个本地运行的 Next.js + TypeScript + Tailwind CSS 旅行计划书编辑器 MVP。支持按天编辑行程、时间线、三餐、住宿、备注，并自动保存到 localStorage，可导出 PDF 或 Word。

## 启动

```bash
npm install
npm run dev
```

打开 http://localhost:3000 查看应用。

## 功能

- 三栏布局：Day 导航、计划书正文、时间段详情编辑面板
- 新增、删除、复制 Day
- 新增、删除、编辑时间段，并按开始时间自动排序
- 编辑旅行总览、每日主题、概览、三餐、住宿、备注
- 自动保存到 localStorage，刷新后保留
- 一键重置内置西澳 Perth 示例行程
- 使用 `window.print()` 导出 PDF，并提供 A4 打印样式
- 使用 `docx` + `file-saver` 导出 Word 文档
