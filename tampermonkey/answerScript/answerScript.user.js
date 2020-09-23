// ==UserScript==
// @name         答题辅助脚本
// @namespace    https://yuannancheng.com/
// @version      0.2
// @description  上一题：左键、下一题：右键、判断对错：Enter、前往第1题：1、前往上次题号：L
// @author       Meet you
// @include      *://sljsbmpt.xq5u.com/*
// @match        <$URL$>
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIElEQVR4nO3bT47URhTA4Vej2TM3CTegkRBkmRvkClwABCgLlnMEjpBlEiQYbkBuwh7NOAsgwMC86X8uV7m+b9e2W36bn+x2u0qwqPv/vLhXpnLxs31TmTZvHz59V3kkvnGy9ADQMoFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCCYFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCidOlB4DM/b9e/FJKeTZNcRYRUUpcvHn05Hmt87uC0KwHr1/eiVJeRcRvpcSmlNhExLPN33/8XmsGgdCkB69f3rm8+nhRIu5e31fi6rzWHAKhOVkcERElylmtWQRCU26LIyJimuKi1jx+pNOMreKI6UNEPK41kysITdg6jik2b399+m+tuQTC4lqNI0IgLKzlOCIEwoJajyNCICykhzgiBMICeokjQiBU1lMcEQKhot7iiBAIlfQYR4RAqKDXOCIEwsx6jiNCIMyo9zgiBMJM1hBHhECYwVriiBAIR7amOCIEwhGtLY4IgXAka4wjQiAcwVrjiBAIB1pzHBEC4QBrjyNCIOxphDgiBMIeRokjQiDsaKQ4IgTCDkaLI0IgbGnEOCIEwhZGjSNCINxi5DgiBEJi9DgiBMINxPGJQPiBOL4SCN8Rx/cEwv/E8SOBEBHiuIlAEEdCIIMTR04gAxPH7QQyKHFsRyADEsf2BDIYcexGIAMRx+4EMghx7EcgAxDH/gSycuI4jEBWTByHE8hKieM4BLJC4jgegayMOI5LICsijuMTyEqIYx4CWQFxzEcgnRPHvATSMXHMTyCdEkcdAumQOOoRSGfEUZdAOiKO+gTSCXEsQyAdEMdyBNI4cSzrdOkBSFxNZ5dFHEsSSMtKeVUizm7aLY75ucVqWIkijoUJpEPiqEcgnRFHXeX+Py/uLT3EyKarcvekxPm2x19N8bicTO/nnImvTstULpYeYmSl7Hb8SYnzmHb8EntziwUJgUBCIJAQCCQEAonTqUybpYcYxtV09un1kZv/If/+cI90l+Z5YSXbvJV73VSmzduHT9/NORc5t1gV7BMHbRDIzMTRN4HMSBz9E8hMtl0JeDXF45pzsRsLpmawyzLZcjKdebeqXa4gR2YN+boI5IjEsT4CORJxrJNAjkAc6yWQA4lj3QRyAHGsn0D2JI4xCGQP4hiHQHYkjrEIZAfiGI9AtiSOMQlkC+IYl0BuIY6xCSQhDgRyA3EQIZCfEgdfCOQacfAtgXxDHFwnkM/Ewc8IJMTBzYYPRBxkhg5EHNxm2EDEwTaGDEQcbGu4QMTBLoYKRBzsaphAxME+hghEHOxr9YGIg0OsOhBxcKjVBiIOjmGVgYiDY1ldIOLgmFYViDg4ttUEIg7msIpAxMFcug9EHMyp60DEwdy6DUQc1NBlIOKglu4CEQc1dRWIOKitm0DEwRK6CEQcLKX5QMTBkpoORBwsrdlAxEELmgxEHLSiuUDEQUuaCkQctKaZQMRBi5oIRBy0avFAxEHLFg1EHLRusUDEQQ8WCUQc9KJ6IOKgJ1UDEQe9qRaIOOhRtUAuLz/+KQ56Uy2QUmJz0z5x0KpqgUwxfbhxuzhoVL0rSJTz69vEQeuqBfLm0ZPnEfHsy+cp4r04aN1pzZN9juR5zXPCIRZ/WRFaJhBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAgIRBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAg8R+CSFTHUUbE3wAAAABJRU5ErkJggg==
// @updateURL    https://yuannancheng.com/tampermonkey/answerScript/answerScript.meta.js
// @downloadURL  https://yuannancheng.com/tampermonkey/answerScript/answerScript.user.js
// ==/UserScript==

(function() {
    'use strict';

    function keydown(e) {
        // 节流
        if (window._timer) {
            return
        } else if (window._timer === undefined) {
            window._timer = null;
        }
        window._timer = setTimeout(() => {
            window._timer = null;
        }, 300);

        const el = document.getElementById('try');
        if (el) {
            const wrap = el.getElementsByClassName('table')[0];

            const thisId = document.getElementById('Id').value * 1;
            const infoId = wrap.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText;
            const reg = /[0-9]+\/[0-9]+/;
            const thisIndex = reg.exec(infoId)[0].split('/')[0] * 1;
            const firstId = thisId + thisIndex - 1;

            const lastId = localStorage.getItem('lastIndex') * 1 || null;

            const button = wrap.getElementsByClassName('button');
            const buttonList = {};
            if (button.length === 4) {
                buttonList.prev = button[0];
                buttonList.enter = button[1];
                buttonList.next = button[3];
            } else {
                if (button[0].value === '上一题') { // 到了尾部
                    buttonList.prev = button[0];
                    buttonList.enter = button[1];
                    buttonList.next = false;
                } else { // 到了头部
                    buttonList.prev = false;
                    buttonList.enter = button[0];
                    buttonList.next = button[2];
                }
            }
            const keyCode = e.keyCode;
            switch (keyCode) {
                case 37: // 左方向键
                    if (buttonList.prev) {
                        localStorage.setItem('lastIndex', thisId);
                        buttonList.prev.click();
                    }
                    break;
                case 13: // 回车键 判断对错
                    buttonList.enter.click();
                    break;
                case 39: // 右方向键 下一题
                    if (buttonList.next) {
                        localStorage.setItem('lastIndex', thisId);
                        buttonList.next.click();
                    }
                    break;
                case 49 || 97: // 1键 前往第一题
                    localStorage.setItem('lastIndex', thisId);
                    this.ajax_get('dialogBox','Question/Question.asp?v=Pan&Type=101&Id=' + firstId, 'text');
                    break;
                case 76: // L键 前往上一次题号
                    if (lastId !== null) this.ajax_get('dialogBox','Question/Question.asp?v=Pan&Type=101&Id=' + lastId, 'text');
                    break;
            }
        }
    }

    window.addEventListener('keydown', keydown);

    let style = document.createElement("style");
    style.type = "text/css";
    let text = document.createTextNode(`
        .table_box div {
            font-size: 20px;
            line-height: 30px;
            color: #304455;
        }
        td .eqList:first-child {
            white-space: pre-wrap;
            margin-bottom: 10px;
            color: #304455;
        }
    `);
    style.appendChild(text);
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
})();
