// ==UserScript==
// @name         报名表单填写
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Meet you
// @include      *://*
// @icon         https://www.google.com/s2/favicons?domain=jinshuju.net
// @updateURL    https://yuannancheng.github.io/tampermonkey/autoForm/autoForm.meta.js
// @downloadURL  https://yuannancheng.github.io/tampermonkey/autoForm/autoForm.user.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
  'use strict';

  (function() {
    GM_addStyle(`
        .Meet_You_startBtn {
          display: inline-block;
          position: absolute;
          z-index: 9999999;
          right: 10px;
          top: 10px;
        }
      `);
    const startBtn = document.createElement('button');
    startBtn.className = 'Meet_You_startBtn';
    startBtn.innerText = '开始';
    startBtn.onclick = function() {
      document.body.removeChild(startBtn);
      main();
    }
    document.body.appendChild(startBtn);
    // console.log('注册');
  }());


  function setLocation() {
    GM_addStyle(`
        .Meet_You_bg {
          background-color: rgba(255, 255, 255, 0.5);
          position: fixed;
          display: inline-block;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
        }

        .Meet_You_bg .Meet_You_Tip {
          text-align: center;
          font-size: 30px;
          top: 2px;
          background-color: #aaf3b9;
        }
      `);

    let num = 1;
    let position = [];
    const bg = document.createElement('div');
    bg.className = 'Meet_You_bg';
    const tip = document.createElement('p');
    tip.className = 'Meet_You_Tip';
    tip.innerText = '请点击表单第一项的题目(中心位置)';

    bg.onclick = function(e) {
      if (num === 1) {
        num += 1;
        position.push(e.screenX, e.screenY);
        tip.innerText = '请点击表单第一项的输入框(中心位置)';
      } else if (num === 2) {
        num += 1;
        position[0] = e.screenX - position[0];
        position[1] = e.screenY - position[1];
        // console.log(position);
        tip.innerText = '请选择数据文件';
        let fileContent = selectFile(position, bg);
      }
    }
    bg.appendChild(tip);
    document.body.appendChild(bg);
  }

  function selectFile( off , el) {
    const openFile = popFileSelector();
    openFile.then((msg) => {
      document.body.removeChild(el);
      const data = msg.trim().split(',');
      const dictKey = ['宝宝姓名', '出生日期',
        '身份证号', '家长姓名', '联系电话',
        '工作单位', '详细地址'
      ]
      const Regex = new RegExp('^.{0,10}(' + dictKey.join('|') + ').{0,10}')
      const documentTree = forEachDocument(null, Regex);
      // console.log(documentTree);
      const inputs = getInputs();

      for (let i = 0; i < data.length; i++) {

        const re = new RegExp('^.{0,10}' + dictKey[i] + '.{0,10}')
        let node = null;
        for (let j = 0; j < documentTree.length; j++) {
          const txt = documentTree[j].textContent || documentTree[j];
          if (re.test(txt)) {
            node = documentTree[j].parentNode;
            break;
          }
        }

        inputValue(node, data[i], off, inputs);
      }

    });
  }

  function getOffsetTop(el) {
    return el.offsetParent ?
      el.offsetTop + getOffsetTop(el.offsetParent) :
      el.offsetTop
  }

  function getOffsetLeft(el) {
    return el.offsetParent ?
      el.offsetLeft + getOffsetLeft(el.offsetParent) :
      el.offsetLeft
  }

  function forEachDocument(el, Regex) {
    let result = []
    const nodes = (el || document.body).childNodes;
    [...nodes].forEach(e => {

      if (!isElementNode(e)) {
        const txt = e.textContent || e
        if (Regex.test(txt)) {
          result.push(e);
        }
      }


      if (e.childNodes && e.childNodes.length) {
        let childResult = forEachDocument(e, Regex);
        if (childResult && childResult.length) {
          result.push(...childResult)
        }
      }

    })
    if (result.length) {
      return result
    }
  }

  function isElementNode(node) {
    return node.nodeType === 1;
  }

  function inputValue(el, content, offset, inputs) {
    // GM_setClipboard(content);
    const x = getOffsetTop(el) + offset[0];
    const y = getOffsetLeft(el) + offset[1];
    computeOffset(inputs, el, offset)[0].el.value = content;
    // imitateClick(document.body, x, y);
    // console.log(document.activeElement);
    // document.activeElement.value = content;
  }

  function computeOffset(inputs, el, off) {
    const result = [];
    inputs.forEach(e => {
      result.push({
        el: e.el,
        offset: Math.sqrt(Math.pow(Math.abs(e.x - (getOffsetLeft(el) + off[0])), 2) + Math.pow(Math.abs(e.y - (getOffsetTop(el) + off[1])), 2))
      })
    });
    return result.sort(compare('offset'));
  }

  function compare(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }


  function getInputs() {
    // 页面所有输入框
    const targetInput = document.querySelectorAll('input, textarea, *[contenteditable=true]');
    // 要跳过的类型
    const filter = ['button', 'hidden'];

    const result = [];

    // 遍历处理输入框，绑定提示事件和输入事件
    targetInput.forEach((e) => {
      // 如果是按钮、隐藏元素，则跳过
      if ('type' in e.attributes && filter.includes(e.attributes.type.value)) return

      if (e.nodeName !== 'TEXTAREA' && e.nodeName !== 'INPUT') { // div类的输入框
        console.log('div类输入框');
      } else { // 标准输入框
        result.push({
          el: e,
          x: getOffsetLeft(e),
          y: getOffsetTop(e)
        })
      }
    });
    return result;
  }


  function imitateClick(oElement, iClientX, iClientY) {
    var oEvent;
    if (document.createEventObject) { //For IE
      oEvent = document.createEventObject();
      oEvent.clientX = iClientX;
      oEvent.clientY = iClientY;
      oElement.fireEvent("onclick", oEvent);
    } else {
      oEvent = document.createEvent("MouseEvents");
      oEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0,
        iClientX, iClientY /*, false, false, false, false, 0, null*/ );
      oElement.dispatchEvent(oEvent);
    }
  }


  function popFileSelector() {
    return new Promise((resolve, reject) => {
      let input = document.createElement('input');
      input.value = '选择文件';
      input.type = 'file';
      input.onchange = event => {
        let file = event.target.files[0];
        let file_reader = new FileReader();
        file_reader.onload = () => {
          let fc = file_reader.result;
          resolve(fc); // 返回文件文本内容到Promise
        };
        file_reader.readAsText(file, 'UTF-8');
      };
      input.click();
    });
  }


  function main() {
    setLocation();
  }
})();
