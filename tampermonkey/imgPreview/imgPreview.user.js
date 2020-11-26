// ==UserScript==
// @name         教务系统图片预览
// @version      0.1
// @description  实现教务处双创学分审核系统附件预览功能
// @author       在同一时空相遇 y17870181601@163.com
// @namespace    https://greasyfork.org/zh-CN/users/690564-%E5%9C%A8%E5%90%8C%E4%B8%80%E6%97%B6%E7%A9%BA%E7%9B%B8%E9%81%87
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIElEQVR4nO3bT47URhTA4Vej2TM3CTegkRBkmRvkClwABCgLlnMEjpBlEiQYbkBuwh7NOAsgwMC86X8uV7m+b9e2W36bn+x2u0qwqPv/vLhXpnLxs31TmTZvHz59V3kkvnGy9ADQMoFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCCYFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCidOlB4DM/b9e/FJKeTZNcRYRUUpcvHn05Hmt87uC0KwHr1/eiVJeRcRvpcSmlNhExLPN33/8XmsGgdCkB69f3rm8+nhRIu5e31fi6rzWHAKhOVkcERElylmtWQRCU26LIyJimuKi1jx+pNOMreKI6UNEPK41kysITdg6jik2b399+m+tuQTC4lqNI0IgLKzlOCIEwoJajyNCICykhzgiBMICeokjQiBU1lMcEQKhot7iiBAIlfQYR4RAqKDXOCIEwsx6jiNCIMyo9zgiBMJM1hBHhECYwVriiBAIR7amOCIEwhGtLY4IgXAka4wjQiAcwVrjiBAIB1pzHBEC4QBrjyNCIOxphDgiBMIeRokjQiDsaKQ4IgTCDkaLI0IgbGnEOCIEwhZGjSNCINxi5DgiBEJi9DgiBMINxPGJQPiBOL4SCN8Rx/cEwv/E8SOBEBHiuIlAEEdCIIMTR04gAxPH7QQyKHFsRyADEsf2BDIYcexGIAMRx+4EMghx7EcgAxDH/gSycuI4jEBWTByHE8hKieM4BLJC4jgegayMOI5LICsijuMTyEqIYx4CWQFxzEcgnRPHvATSMXHMTyCdEkcdAumQOOoRSGfEUZdAOiKO+gTSCXEsQyAdEMdyBNI4cSzrdOkBSFxNZ5dFHEsSSMtKeVUizm7aLY75ucVqWIkijoUJpEPiqEcgnRFHXeX+Py/uLT3EyKarcvekxPm2x19N8bicTO/nnImvTstULpYeYmSl7Hb8SYnzmHb8EntziwUJgUBCIJAQCCQEAonTqUybpYcYxtV09un1kZv/If/+cI90l+Z5YSXbvJV73VSmzduHT9/NORc5t1gV7BMHbRDIzMTRN4HMSBz9E8hMtl0JeDXF45pzsRsLpmawyzLZcjKdebeqXa4gR2YN+boI5IjEsT4CORJxrJNAjkAc6yWQA4lj3QRyAHGsn0D2JI4xCGQP4hiHQHYkjrEIZAfiGI9AtiSOMQlkC+IYl0BuIY6xCSQhDgRyA3EQIZCfEgdfCOQacfAtgXxDHFwnkM/Ewc8IJMTBzYYPRBxkhg5EHNxm2EDEwTaGDEQcbGu4QMTBLoYKRBzsaphAxME+hghEHOxr9YGIg0OsOhBxcKjVBiIOjmGVgYiDY1ldIOLgmFYViDg4ttUEIg7msIpAxMFcug9EHMyp60DEwdy6DUQc1NBlIOKglu4CEQc1dRWIOKitm0DEwRK6CEQcLKX5QMTBkpoORBwsrdlAxEELmgxEHLSiuUDEQUuaCkQctKaZQMRBi5oIRBy0avFAxEHLFg1EHLRusUDEQQ8WCUQc9KJ6IOKgJ1UDEQe9qRaIOOhRtUAuLz/+KQ56Uy2QUmJz0z5x0KpqgUwxfbhxuzhoVL0rSJTz69vEQeuqBfLm0ZPnEfHsy+cp4r04aN1pzZN9juR5zXPCIRZ/WRFaJhBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAgIRBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAg8R+CSFTHUUbE3wAAAABJRU5ErkJggg==
// @match        http://jw.jxslsd.com:9995/
// @match        http://jw.jxslsd.com:9090/
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      *
// @updateURL    https://yuannancheng.github.io/tampermonkey/imgPreview/imgPreview.meta.js
// @downloadURL  https://yuannancheng.github.io/tampermonkey/imgPreview/imgPreview.user.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function getAjax (url, pl, _t) {
        return new Promise((resolve, reject) => {
            const tokenKey = 'lyedu';
            const headers = {
                'Accept': 'application/json',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer undefined',
                'Content-Type': 'application/json;charset=UTF-8',
                'csrfToken': (function() { return compile.md5(_t + tokenKey); }()),
                'permission': 'creditRecognition:query',
                'X-Requested-With': 'XMLHttpRequest'
            };
            const fileReader = new FileReader();
            GM_xmlhttpRequest({
                method: "POST",
                url: url,
                data: JSON.stringify(pl),
                headers: headers,
                responseType: 'blob',
                onload: function(r) {
                    const blob = r.response;
                    fileReader.onload = function(evt) {
                        // 用Data URI的格式读取文件内容
                        const result = evt.target.result;
                        resolve(result);
                    }
                    // 以Data URI的形式加载blob
                    fileReader.readAsDataURL(blob);
                }
            });
        });
    }

    async function handelAjax (pl) {
        const _t = Date.parse(new Date) / 1e3;
        const url = 'http://jw.jxslsd.com:9995/api/baseInfo/fileUploadResource/downloadFile?_t=' + _t;
        const result = await getAjax(url, pl, _t);
        if (result) {
            const oldView = document.querySelector('.Meet_you_img_preview');
            if (oldView && 'tagName' in oldView && oldView.tagName === 'DIV') {
                const img = oldView.getElementsByClassName('img')[0];
                img.src = result;
                oldView.classList.remove('Meet_you_hidden');
            } else {
                const preview = document.createElement('div');
                preview.className = 'Meet_you_img_preview';

                const img = document.createElement('img');
                img.src = result;
                img.className = 'img';
                preview.appendChild(img);

                const close = document.createElement('span');
                close.className = 'close';
                close.addEventListener('click', () => {
                    document.querySelector('.Meet_you_img_preview').classList.add('Meet_you_hidden');
                });
                preview.appendChild(close);

                const rotate = document.createElement('span');
                rotate.className = 'rotate';
                rotate.addEventListener('click', () => {
                    const previewBox = document.querySelector('.Meet_you_img_preview');
                    const oldRo = previewBox.rotateDeg || '0';
                    const newRo = oldRo * 1 + 90;
                    document.querySelector('.Meet_you_img_preview > .img').style.transform = 'rotate(' + newRo +'deg)';
                    previewBox.rotateDeg = newRo;
                });
                preview.appendChild(rotate);

                const widthUp = document.createElement('span');
                widthUp.className = 'widthUp';
                widthUp.addEventListener('click', () => {
                    const previewBox = document.querySelector('.Meet_you_img_preview');
                    const oldSi = previewBox.widthSize || '70';
                    const newSi = oldSi * 1 + 10 >= 200 ? 200 : oldSi * 1 + 10;
                    document.querySelector('.Meet_you_img_preview > .img').style.width = newSi +'%';
                    previewBox.widthSize = newSi;
                });
                preview.appendChild(widthUp);

                const widthDo = document.createElement('span');
                widthDo.className = 'widthDo';
                widthDo.addEventListener('click', () => {
                    const previewBox = document.querySelector('.Meet_you_img_preview');
                    const oldSi = previewBox.widthSize || '70';
                    const newSi = oldSi * 1 - 10 <= 0 ? 10 : oldSi * 1 - 10;
                    document.querySelector('.Meet_you_img_preview > .img').style.width = newSi +'%';
                    previewBox.widthSize = newSi;
                });
                preview.appendChild(widthDo);

                document.body.appendChild(preview);
            }
        } else {
            alert('操作失败，请稍后重试。');
        }
    }

    function addHandelClick () {
        var label = document.querySelector('label[title=\'附件信息:\']');
        if (label) {
            var a = label.parentElement.parentElement.querySelectorAll('a');
            for (let i = 0; i < a.length; i++) {
                let el = a[i];
                for (let _a in el) {
                    if (/^__reactInternalInstance\$([0-9]|[a-z]){5,15}$/.test(_a)) {
                        console.log('绑定事件');
                        const pl = el[_a].return.memoizedProps.children[1]._owner.memoizedState.fileList[0];
                        el.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            var loading = document.querySelector('.ajax-loading');
                            loading.style.display = 'block';
                            handelAjax(pl);
                            loading.style.display = 'none';
                            return false;
                        });
                    }
                }
            }
        }
    }

    (function () {
        // init
        GM_addStyle(`
            .Meet_you_img_preview {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 999999;
                overflow-y: auto;
                text-align: center;
                background-color: rgba(0, 0, 0, .5);
            }

            .Meet_you_img_preview > .img {
                width: 70%;
                position: relative;
                margin: 30px auto;
            }

            .Meet_you_img_preview > .close,
            .Meet_you_img_preview > .rotate,
            .Meet_you_img_preview > .widthUp,
            .Meet_you_img_preview > .widthDo {
                position: fixed;
                right: 40px;
                background-color: #fff;background-size: 70%;
                background-position: 50%;
                background-repeat: no-repeat;
                height: 50px;
                width: 50px;
                cursor: pointer;
                border-radius: 20%;
                box-shadow: #fff 0px 0px 7px;
            }

            .Meet_you_img_preview > .close {
                top: 20px;
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2MzcxMTM1NjA4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzMTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAyMi41ODM0NjcgMTI3LjgwMzczMyA4OTQuNzc5NzMzIDAgNTExLjI5MTczMyAzODMuNDYyNCAxMjcuODQ2NCAwIDAgMTI3LjgwMzczMyAzODMuNDk2NTMzIDUxMS4yNzQ2NjcgMCA4OTQuNzM3MDY3IDEyNy44NDY0IDEwMjIuNTQwOCA1MTEuMjkxNzMzIDYzOS4wNzg0IDg5NC43Nzk3MzMgMTAyMi41NDA4IDEwMjIuNTgzNDY3IDg5NC43MzcwNjcgNjM5LjEzODEzMyA1MTEuMjc0NjY3WiIgcC1pZD0iMTMxNCIgZmlsbD0iIzUzODZGNiI+PC9wYXRoPjwvc3ZnPg==);
            }

            .Meet_you_img_preview > .rotate {
                top: 90px;
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2Mzc3MjUyMTc5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM3NjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTM1LjQ5NzE0MyA2NTkuMDE3MTQzYTM2LjkzNzE0MyAzNi45MzcxNDMgMCAwIDEtMS43NTU0MjkgMTguNTA1MTQzIDQzNC4zMjIyODYgNDM0LjMyMjI4NiAwIDAgMS0zNzAuOTgwNTcxIDMzNy43NzM3MTRDMzI1LjYzMiAxMDQ1LjY1MDI4NiAxMDcuMzczNzE0IDg3Ni4yNTE0MjkgNzcuNTMxNDI5IDYzNy4yOTM3MTRhNDM1LjcxMiA0MzUuNzEyIDAgMCAxIDM3OC41ODc0MjgtNDg3LjEzMTQyOGM1Ljc3ODI4Ni0xLjI0MzQyOSAxMy4zODUxNDMtMS45MDE3MTQgMTkuNzQ4NTcyLTEuOTc0ODU3LTIuNjMzMTQzLTI0LjEzNzE0My01Ljg1MTQyOS00Ni41MTg4NTctNy44OTk0MjktNjYuMjY3NDI5LTMuMjkxNDI5LTI1LjUyNjg1Ny02LjU4Mjg1Ny00NC42MTcxNDMtNi41ODI4NTctNTAuOTgwNTcxLTEuOTc0ODU3LTcuMDIxNzE0LTEuMzg5NzE0LTE1LjM2IDMuNjU3MTQzLTIxLjA2NTE0M2EyMS43OTY1NzEgMjEuNzk2NTcxIDAgMCAxIDMxLjMwNTE0My00LjYwOGwwLjU4NTE0MiAxLjI0MzQyOCAxNy45OTMxNDMgMTYuNTMwMjg2IDEyNi42ODM0MjkgOTguOTYyMjg2IDE3LjkyIDEzLjMxMiAxNS4zNiAxMS40MTAyODVjNS4xMiAzLjgwMzQyOSA3LjY4IDguODUwMjg2IDguOTk2NTcxIDE0LjYyODU3MmEyMC4yNjA1NzEgMjAuMjYwNTcxIDAgMCAxLTQuMzg4NTcxIDE2LjYwMzQyOGwtMTEuNDEwMjg2IDE1LjM2LTEzLjMxMiAxNy45Mkw1NTUuODg1NzE0IDMzNy45MmwtMTQuNTU1NDI4IDE4LjU3ODI4Ni0xLjI0MzQyOSAwLjY1ODI4NWEyMy42MjUxNDMgMjMuNjI1MTQzIDAgMCAxLTMxLjg5MDI4NiAzLjI5MTQyOWMtNS43NzgyODYtNS4xMi05LjY1NDg1Ny0xMi43MjY4NTctOC40MTE0MjgtMTkuNzQ4NTcxLTEuMzE2NTcxLTUuNzA1MTQzLTMuMjkxNDI5LTI1LjQ1MzcxNC02LjU4Mjg1Ny01MC45ODA1NzItMi42MzMxNDMtMTcuODQ2ODU3LTUuMjY2Mjg2LTM4LjgzODg1Ny03Ljg5OTQyOS01OS45MDQtNi40MzY1NzEgMC0xMy4zODUxNDMgMS45NzQ4NTctMTkuNzQ4NTcxIDEuOTc0ODU3LTE5My44Mjg1NzEgMjQuNTAyODU3LTMzMi43MjY4NTcgMjAxLjgwMTE0My0zMDguMjk3MTQzIDM5NS41NTY1NzIgMjQuNTAyODU3IDE5My44Mjg1NzEgMjAxLjgwMTE0MyAzMzIuNzI2ODU3IDM5NS41NTY1NzEgMzA4LjIyNGEzNTMuNDI2Mjg2IDM1My40MjYyODYgMCAwIDAgMzAzLjYxNi0yODEuMzA3NDI5IDQwLjA4MjI4NiA0MC4wODIyODYgMCAwIDEgMzQuMzc3MTQzLTMwLjEzNDg1N2MyMi4yMzU0MjktMy4yOTE0MjkgNDMuMzczNzE0IDEzLjE2NTcxNCA0NC43NjM0MjkgMzQuODg5MTQzeiIgZmlsbD0iIzUzODZGNiIgb3BhY2l0eT0iLjgwMSIgcC1pZD0iMzc2NyI+PC9wYXRoPjwvc3ZnPg==);
            }

            .Meet_you_img_preview > .widthUp {
                top: 160px;
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2Mzc3Mjc2MDI0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjcgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ2MjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjU4NTkzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik03MjIuNDg4ODg5IDY0Mi44NDQ0NDRjNDUuNTExMTExLTYyLjU3Nzc3OCA3My45NTU1NTYtMTM2LjUzMzMzMyA3My45NTU1NTUtMjE2LjE3Nzc3N0M3OTYuNDQ0NDQ0IDIyMS44NjY2NjcgNjMxLjQ2NjY2NyA1Ni44ODg4ODkgNDI2LjY2NjY2NyA1Ni44ODg4ODlTNTYuODg4ODg5IDIyMS44NjY2NjcgNTYuODg4ODg5IDQyNi42NjY2NjcgMjIxLjg2NjY2NyA3OTYuNDQ0NDQ0IDQyNi42NjY2NjcgNzk2LjQ0NDQ0NGM3OS42NDQ0NDQgMCAxNTMuNi0yOC40NDQ0NDQgMjE2LjE3Nzc3Ny02OC4yNjY2NjZsMjIxLjg2NjY2NyAyMjEuODY2NjY2YzIyLjc1NTU1NiAyMi43NTU1NTYgNTYuODg4ODg5IDIyLjc1NTU1NiA3OS42NDQ0NDUgMCAyMi43NTU1NTYtMjIuNzU1NTU2IDIyLjc1NTU1Ni01Ni44ODg4ODkgMC03OS42NDQ0NDRsLTIyMS44NjY2NjctMjI3LjU1NTU1NnpNNDU1LjExMTExMSA3MzkuNTU1NTU2Yy0xNzAuNjY2NjY3IDAtMzQxLjMzMzMzMy0xNDIuMjIyMjIyLTM0MS4zMzMzMzMtMzEyLjg4ODg4OVMyNTYgMTEzLjc3Nzc3OCA0MjYuNjY2NjY3IDExMy43Nzc3NzggNzM5LjU1NTU1NiAyNTYgNzM5LjU1NTU1NiA0MjYuNjY2NjY3IDU5Ny4zMzMzMzMgNzM5LjU1NTU1NiA0MjYuNjY2NjY3IDczOS41NTU1NTYiIGZpbGw9IiM1Mzg2RjYiIHAtaWQ9IjQ2MjgiPjwvcGF0aD48cGF0aCBkPSJNMjI3LjU1NTU1NiAzOTguMjIyMjIyaDM5OC4yMjIyMjJ2NTYuODg4ODg5SDIyNy41NTU1NTZ6IiBmaWxsPSIjNTM4NkY2IiBwLWlkPSI0NjI5Ij48L3BhdGg+PHBhdGggZD0iTTM5OC4yMjIyMjIgMjI3LjU1NTU1Nmg1Ni44ODg4ODl2Mzk4LjIyMjIyMkgzOTguMjIyMjIyeiIgZmlsbD0iIzUzODZGNiIgcC1pZD0iNDYzMCI+PC9wYXRoPjwvc3ZnPg==);
            }

            .Meet_you_img_preview > .widthDo {
                top: 230px;
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2Mzc3MzYwNTk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjcgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzMTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjU4NTkzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik03MjIuNDg4ODg5IDY0Mi44NDQ0NDRjNDUuNTExMTExLTYyLjU3Nzc3OCA3My45NTU1NTYtMTM2LjUzMzMzMyA3My45NTU1NTUtMjE2LjE3Nzc3N0M3OTYuNDQ0NDQ0IDIyMS44NjY2NjcgNjMxLjQ2NjY2NyA1Ni44ODg4ODkgNDI2LjY2NjY2NyA1Ni44ODg4ODlTNTYuODg4ODg5IDIyMS44NjY2NjcgNTYuODg4ODg5IDQyNi42NjY2NjcgMjIxLjg2NjY2NyA3OTYuNDQ0NDQ0IDQyNi42NjY2NjcgNzk2LjQ0NDQ0NGM3OS42NDQ0NDQgMCAxNTMuNi0yOC40NDQ0NDQgMjE2LjE3Nzc3Ny02OC4yNjY2NjZsMjIxLjg2NjY2NyAyMjEuODY2NjY2YzIyLjc1NTU1NiAyMi43NTU1NTYgNTYuODg4ODg5IDIyLjc1NTU1NiA3OS42NDQ0NDUgMCAyMi43NTU1NTYtMjIuNzU1NTU2IDIyLjc1NTU1Ni01Ni44ODg4ODkgMC03OS42NDQ0NDRsLTIyMS44NjY2NjctMjI3LjU1NTU1NnpNNDU1LjExMTExMSA3MzkuNTU1NTU2Yy0xNzAuNjY2NjY3IDAtMzQxLjMzMzMzMy0xNDIuMjIyMjIyLTM0MS4zMzMzMzMtMzEyLjg4ODg4OVMyNTYgMTEzLjc3Nzc3OCA0MjYuNjY2NjY3IDExMy43Nzc3NzggNzM5LjU1NTU1NiAyNTYgNzM5LjU1NTU1NiA0MjYuNjY2NjY3IDU5Ny4zMzMzMzMgNzM5LjU1NTU1NiA0MjYuNjY2NjY3IDczOS41NTU1NTYiIGZpbGw9IiM1Mzg2RjYiIHAtaWQ9IjEzMTIiPjwvcGF0aD48cGF0aCBkPSJNMjI3LjU1NTU1NiAzOTguMjIyMjIyaDM5OC4yMjIyMjJ2NTYuODg4ODg5SDIyNy41NTU1NTZ6IiBmaWxsPSIjNTM4NkY2IiBwLWlkPSIxMzEzIj48L3BhdGg+PHBhdGggZD0iTTExNDQuODg4ODg4NTUgMjI3LjU1NTU1Nmg1Ni44ODg4ODl2Mzk4LjIyMjIyMkgxMTQ0Ljg4ODg4ODU1eiIgZmlsbD0iIzUzODZGNiIgcC1pZD0iMTMxNCI+PC9wYXRoPjwvc3ZnPg==);
            }

            .Meet_you_hidden { display: none; }
        `);
        window.addEventListener('click', (e) => {
            const keyword = ['查看', '审批']; // 点击这些按钮的将会出现【附件】
            if (e.target.tagName === 'A' && keyword.includes(e.target.innerText)) {
                setTimeout(() => {
                    addHandelClick();
                }, 100);
            }
        });
    }());

    var compile = (function() {
        const _this = new Object();

        // jsMD5 by https://github.com/kohyama/jsMD5
        // 数字或者数组类型的加密
        _this.md5_n = function(M) {
            function F(x, y, z) {
                return (x & y) | (~x & z);
            }

            function G(x, y, z) {
                return (x & z) | (y & ~z);
            }

            function H(x, y, z) {
                return x ^ y ^ z;
            }

            function I(x, y, z) {
                return y ^ (x | ~z);
            }

            function to4bytes(n) {
                return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff];
            }

            var originalLength = M.length; // for Step.2

            // 3.1 Step 1. Append Padding Bits
            M.push(0x80);
            var l = (56 - M.length) & 0x3f;
            for (let i = 0; i < l; i++) {
                M.push(0);
            }

            // 3.2 Step 2. Append Length
            to4bytes(8 * originalLength).forEach(function(e) {
                M.push(e);
            });
            [0, 0, 0, 0].forEach(function(e) {
                M.push(e);
            });

            // 3.3 Step 3. Initialize MD Buffer
            var A = [0x67452301];
            var B = [0xefcdab89];
            var C = [0x98badcfe];
            var D = [0x10325476];
            var AA, BB, CC, DD;

            // 3.4 Step 4. Process Message in 16-Word Blocks
            function rounds(a, b, c, d, k, s, t, f) {
                a[0] += f(b[0], c[0], d[0]) + X[k] + t;
                a[0] = ((a[0] << s) | (a[0] >>> (32 - s)));
                a[0] += b[0];
            }
            var X;
            for (let i = 0; i < M.length; i += 64) {
                X = [];
                for (var j = 0; j < 64; j += 4) {
                    var k = i + j;
                    X.push(M[k] | (M[k + 1] << 8) | (M[k + 2] << 16) | (M[k + 3] << 24));
                }
                AA = A[0];
                BB = B[0];
                CC = C[0];
                DD = D[0];

                // Round 1.
                rounds(A, B, C, D, 0, 7, 0xd76aa478, F);
                rounds(D, A, B, C, 1, 12, 0xe8c7b756, F);
                rounds(C, D, A, B, 2, 17, 0x242070db, F);
                rounds(B, C, D, A, 3, 22, 0xc1bdceee, F);
                rounds(A, B, C, D, 4, 7, 0xf57c0faf, F);
                rounds(D, A, B, C, 5, 12, 0x4787c62a, F);
                rounds(C, D, A, B, 6, 17, 0xa8304613, F);
                rounds(B, C, D, A, 7, 22, 0xfd469501, F);
                rounds(A, B, C, D, 8, 7, 0x698098d8, F);
                rounds(D, A, B, C, 9, 12, 0x8b44f7af, F);
                rounds(C, D, A, B, 10, 17, 0xffff5bb1, F);
                rounds(B, C, D, A, 11, 22, 0x895cd7be, F);
                rounds(A, B, C, D, 12, 7, 0x6b901122, F);
                rounds(D, A, B, C, 13, 12, 0xfd987193, F);
                rounds(C, D, A, B, 14, 17, 0xa679438e, F);
                rounds(B, C, D, A, 15, 22, 0x49b40821, F);

                // Round 2.
                rounds(A, B, C, D, 1, 5, 0xf61e2562, G);
                rounds(D, A, B, C, 6, 9, 0xc040b340, G);
                rounds(C, D, A, B, 11, 14, 0x265e5a51, G);
                rounds(B, C, D, A, 0, 20, 0xe9b6c7aa, G);
                rounds(A, B, C, D, 5, 5, 0xd62f105d, G);
                rounds(D, A, B, C, 10, 9, 0x02441453, G);
                rounds(C, D, A, B, 15, 14, 0xd8a1e681, G);
                rounds(B, C, D, A, 4, 20, 0xe7d3fbc8, G);
                rounds(A, B, C, D, 9, 5, 0x21e1cde6, G);
                rounds(D, A, B, C, 14, 9, 0xc33707d6, G);
                rounds(C, D, A, B, 3, 14, 0xf4d50d87, G);
                rounds(B, C, D, A, 8, 20, 0x455a14ed, G);
                rounds(A, B, C, D, 13, 5, 0xa9e3e905, G);
                rounds(D, A, B, C, 2, 9, 0xfcefa3f8, G);
                rounds(C, D, A, B, 7, 14, 0x676f02d9, G);
                rounds(B, C, D, A, 12, 20, 0x8d2a4c8a, G);

                // Round 3.
                rounds(A, B, C, D, 5, 4, 0xfffa3942, H);
                rounds(D, A, B, C, 8, 11, 0x8771f681, H);
                rounds(C, D, A, B, 11, 16, 0x6d9d6122, H);
                rounds(B, C, D, A, 14, 23, 0xfde5380c, H);
                rounds(A, B, C, D, 1, 4, 0xa4beea44, H);
                rounds(D, A, B, C, 4, 11, 0x4bdecfa9, H);
                rounds(C, D, A, B, 7, 16, 0xf6bb4b60, H);
                rounds(B, C, D, A, 10, 23, 0xbebfbc70, H);
                rounds(A, B, C, D, 13, 4, 0x289b7ec6, H);
                rounds(D, A, B, C, 0, 11, 0xeaa127fa, H);
                rounds(C, D, A, B, 3, 16, 0xd4ef3085, H);
                rounds(B, C, D, A, 6, 23, 0x04881d05, H);
                rounds(A, B, C, D, 9, 4, 0xd9d4d039, H);
                rounds(D, A, B, C, 12, 11, 0xe6db99e5, H);
                rounds(C, D, A, B, 15, 16, 0x1fa27cf8, H);
                rounds(B, C, D, A, 2, 23, 0xc4ac5665, H);

                // Round 4.
                rounds(A, B, C, D, 0, 6, 0xf4292244, I);
                rounds(D, A, B, C, 7, 10, 0x432aff97, I);
                rounds(C, D, A, B, 14, 15, 0xab9423a7, I);
                rounds(B, C, D, A, 5, 21, 0xfc93a039, I);
                rounds(A, B, C, D, 12, 6, 0x655b59c3, I);
                rounds(D, A, B, C, 3, 10, 0x8f0ccc92, I);
                rounds(C, D, A, B, 10, 15, 0xffeff47d, I);
                rounds(B, C, D, A, 1, 21, 0x85845dd1, I);
                rounds(A, B, C, D, 8, 6, 0x6fa87e4f, I);
                rounds(D, A, B, C, 15, 10, 0xfe2ce6e0, I);
                rounds(C, D, A, B, 6, 15, 0xa3014314, I);
                rounds(B, C, D, A, 13, 21, 0x4e0811a1, I);
                rounds(A, B, C, D, 4, 6, 0xf7537e82, I);
                rounds(D, A, B, C, 11, 10, 0xbd3af235, I);
                rounds(C, D, A, B, 2, 15, 0x2ad7d2bb, I);
                rounds(B, C, D, A, 9, 21, 0xeb86d391, I);

                A[0] += AA;
                B[0] += BB;
                C[0] += CC;
                D[0] += DD;
            }

            var rval = [];
            to4bytes(A[0]).forEach(function(e) {
                rval.push(e);
            });
            to4bytes(B[0]).forEach(function(e) {
                rval.push(e);
            });
            to4bytes(C[0]).forEach(function(e) {
                rval.push(e);
            });
            to4bytes(D[0]).forEach(function(e) {
                rval.push(e);
            });
            return rval;
        }
        // 字符串加密
        _this.md5 = function(s) {
            s = String(s);
            var M = [];
            for (var i = 0; i < s.length; i++) {
                M.push(s.charCodeAt(i));
            }
            var d = _this.md5_n(M);
            var rstr = '';
            d.forEach(function(e) {
                var s = e.toString(16);
                while (s.length < 2) {
                    s = '0' + s;
                }
                rstr += s;
            });
            return rstr;
        }

        return _this;
    }());

})();
