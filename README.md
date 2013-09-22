fix-cjk-linebreak.js
====================

This is a simple javascript used to fix the extra space between CJK symbols and
punctuations introduced by the line break in the souce file of a HTML page.

## The Problem

The HTML specification does not talking about how to render the line break in
the HTML source file. It simplely treat it as a single space. For the western
languages, this treatment is O.K., since there should be a space between each
word. But for the CJK languages, usually there is no space between two CJK
symbols or punctuations. Therefore, the line break in the source file of an
HTML page will lead to undesired extra space.

For example, consider the following HTML source codes:

    <p>1. 测试样例：这是源码中的第一行，以中文字符结束
          这是源码中的第二行，以中文字符开头</p>
    <p>1. 正确结果：这是源码中的第一行，以中文字符结束这是源码中的第二行，以中文字符开头</p>

The text in the first `<p>` element will have an undesired extra space between
two lines in the souce code.

## The Solution

We use a javascript to modify the innel HTML of `<p>` elements, removing all
the extra spaces introduced by the line breaks.

## Dependency

This script depends the following packages:

- XRegExp: (http://xregexp.com/)
- DomReady: (https://github.com/ded/domready)

## Installation

### Manually

You can install the script manually.

- Download the script at:

### Use Bower

## Browser support

I have test the scripts under the following browsers.

- Firefox: 23.0.1
- Chrome 23.0.1271.97

If anyone test it under other browsers, please let me know. Thanks a lot.
