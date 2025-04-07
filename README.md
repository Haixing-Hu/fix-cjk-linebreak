# fix-cjk-linebreak

修复 HTML 源文件中由于换行导致的中日韩 (CJK) 符号和标点之间的多余空格。

## 问题

HTML 规范没有明确说明如何渲染源文件中的换行符，它只是简单地将其视为一个空格。对于西方语言来说，这种处理方式是可以的，因为每个单词之间应该有一个空格。但对于中日韩语言，通常两个 CJK 符号或标点之间没有空格。因此，HTML 页面源文件中的换行符会导致不必要的额外空格。

例如，考虑以下 HTML 源代码：

```html
<p>1. 测试样例：这是源码中的第一行，以中文字符结束
      这是源码中的第二行，以中文字符开头</p>
<p>1. 正确结果：这是源码中的第一行，以中文字符结束这是源码中的第二行，以中文字符开头</p>
```

第一个 `<p>` 元素中的文本会在源代码中的两行间有一个不必要的额外空格。

## 解决方案

我们使用 JavaScript 来修改 `<p>` 元素的内部 HTML，移除由换行符引入的所有额外空格。

## 依赖

此脚本依赖于以下包（已内置到 UMD 版本中）：

- XRegExp: (http://xregexp.com/)

## 安装

### 使用 npm 安装

```bash
npm install fix-cjk-linebreak
```

### 手动安装

你也可以手动安装脚本：

1. 从以下地址下载脚本: https://unpkg.com/fix-cjk-linebreak
2. 将脚本放在你站点的某个目录中，并在 HTML 页面中引入它。

## 使用方法

### 使用 npm 模块

```javascript
// ESM
import fixCJKLinebreak from 'fix-cjk-linebreak';

// 自动修复页面中的所有段落
fixCJKLinebreak.autoFix();

// 或者手动修复特定元素下的段落
document.addEventListener('DOMContentLoaded', function() {
  fixCJKLinebreak.fix(document.getElementById('content'));
});

// 具名导入
import { fix, autoFix } from 'fix-cjk-linebreak';

// CommonJS
const { fix, autoFix } = require('fix-cjk-linebreak');

// 使用导入的函数
autoFix();
// 或
document.addEventListener('DOMContentLoaded', function() {
  fix(document.getElementById('content'));
});
```

### 直接在 HTML 中使用

在你的网页的 `<head>..</head>` 部分添加以下代码：

```html
<!-- UMD 版本已包含所有依赖 -->
<script src="https://unpkg.com/fix-cjk-linebreak"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    fixCJKLinebreak.fix(document.body);
  });
</script>
```

或者使用自动修复功能：

```html
<!-- UMD 版本已包含所有依赖 -->
<script src="https://unpkg.com/fix-cjk-linebreak"></script>
<script>
  fixCJKLinebreak.autoFix();
</script>
```

`fix` 函数接受一个参数，该参数应该是一个 DOM 元素。该函数将修复参数 DOM 元素下的所有 `<p>` 元素，移除由源代码中的换行符引入的 CJK 字符之间的额外空格。

请查看 `test` 目录下的测试页面以了解使用示例。

## 浏览器支持

该脚本已在以下浏览器中测试：

- Firefox: 23.0.1+
- Chrome: 23.0.1271.97+
- Edge: 最新版本
- Safari: 最新版本

## 许可证

GPL-2.0
