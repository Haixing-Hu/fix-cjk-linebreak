/**
 *  fix-cjk-linebreak.js
 *
 *  Fix the extra space between CJK symbols and punctuations introduced by the
 *  line break in the souce file of a HTML page.
 *
 *  (c) copyright Haixing Hu, 2013-2023
 *  https://github.com/haixing-hu/fix-cjk-linebreak
 */

import XRegExp from 'xregexp';

// The regular expression representing the range of CJK symbols and punctuations,
// including all Chinese characters, punctuations and symbols
const CJK_RANGE = '[\\u4E00-\\u9FFF\\u3000-\\u303F\\uFF00-\\uFFEF\\u2000-\\u206F]';

// The XRegExp object matching the line break between CJK symbols and
// punctuations
const CJK_LINEBREAK_PATTERN = XRegExp('(' + CJK_RANGE + ')'
                                    + '[\\r\\n\\s]+'
                                    + '(' + CJK_RANGE + ')',
                                   'gm');

/**
 *  Fixes the extra space between CJK symbols and punctuations introduced by
 *  the line break in the souce file of an HTML page.
 *
 *  @param el
 *   The DOM element to be fixed. This function will fix all '<p>' elements
 *   in the sub-tree of `el`.
 */
function fix(el) {
    var paragraphs = el.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
        var p = paragraphs[i];
        p.innerHTML = XRegExp.replace(p.innerHTML, CJK_LINEBREAK_PATTERN, '$1$2');
    }
}

// auto fix the document
function autoFix() {
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                fix(document.body);
            });
        } else {
            fix(document.body);
        }
    }
}

// export the functions and auto fix
export { fix, autoFix };

// 对于 ES 模块环境，默认导出函数
export default { fix, autoFix }; 