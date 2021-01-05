// ==UserScript==
// @name         信息平台图片预览
// @version      0.4
// @description  实现信息平台附件预览功能
// @author       在同一时空相遇 y17870181601@163.com
// @namespace    https://greasyfork.org/zh-CN/users/690564-%E5%9C%A8%E5%90%8C%E4%B8%80%E6%97%B6%E7%A9%BA%E7%9B%B8%E9%81%87
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFIElEQVR4nO3bT47URhTA4Vej2TM3CTegkRBkmRvkClwABCgLlnMEjpBlEiQYbkBuwh7NOAsgwMC86X8uV7m+b9e2W36bn+x2u0qwqPv/vLhXpnLxs31TmTZvHz59V3kkvnGy9ADQMoFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCCYFAQiCQEAgkBAIJgUBCIJAQCCQEAgmBQEIgkBAIJAQCidOlB4DM/b9e/FJKeTZNcRYRUUpcvHn05Hmt87uC0KwHr1/eiVJeRcRvpcSmlNhExLPN33/8XmsGgdCkB69f3rm8+nhRIu5e31fi6rzWHAKhOVkcERElylmtWQRCU26LIyJimuKi1jx+pNOMreKI6UNEPK41kysITdg6jik2b399+m+tuQTC4lqNI0IgLKzlOCIEwoJajyNCICykhzgiBMICeokjQiBU1lMcEQKhot7iiBAIlfQYR4RAqKDXOCIEwsx6jiNCIMyo9zgiBMJM1hBHhECYwVriiBAIR7amOCIEwhGtLY4IgXAka4wjQiAcwVrjiBAIB1pzHBEC4QBrjyNCIOxphDgiBMIeRokjQiDsaKQ4IgTCDkaLI0IgbGnEOCIEwhZGjSNCINxi5DgiBEJi9DgiBMINxPGJQPiBOL4SCN8Rx/cEwv/E8SOBEBHiuIlAEEdCIIMTR04gAxPH7QQyKHFsRyADEsf2BDIYcexGIAMRx+4EMghx7EcgAxDH/gSycuI4jEBWTByHE8hKieM4BLJC4jgegayMOI5LICsijuMTyEqIYx4CWQFxzEcgnRPHvATSMXHMTyCdEkcdAumQOOoRSGfEUZdAOiKO+gTSCXEsQyAdEMdyBNI4cSzrdOkBSFxNZ5dFHEsSSMtKeVUizm7aLY75ucVqWIkijoUJpEPiqEcgnRFHXeX+Py/uLT3EyKarcvekxPm2x19N8bicTO/nnImvTstULpYeYmSl7Hb8SYnzmHb8EntziwUJgUBCIJAQCCQEAonTqUybpYcYxtV09un1kZv/If/+cI90l+Z5YSXbvJV73VSmzduHT9/NORc5t1gV7BMHbRDIzMTRN4HMSBz9E8hMtl0JeDXF45pzsRsLpmawyzLZcjKdebeqXa4gR2YN+boI5IjEsT4CORJxrJNAjkAc6yWQA4lj3QRyAHGsn0D2JI4xCGQP4hiHQHYkjrEIZAfiGI9AtiSOMQlkC+IYl0BuIY6xCSQhDgRyA3EQIZCfEgdfCOQacfAtgXxDHFwnkM/Ewc8IJMTBzYYPRBxkhg5EHNxm2EDEwTaGDEQcbGu4QMTBLoYKRBzsaphAxME+hghEHOxr9YGIg0OsOhBxcKjVBiIOjmGVgYiDY1ldIOLgmFYViDg4ttUEIg7msIpAxMFcug9EHMyp60DEwdy6DUQc1NBlIOKglu4CEQc1dRWIOKitm0DEwRK6CEQcLKX5QMTBkpoORBwsrdlAxEELmgxEHLSiuUDEQUuaCkQctKaZQMRBi5oIRBy0avFAxEHLFg1EHLRusUDEQQ8WCUQc9KJ6IOKgJ1UDEQe9qRaIOOhRtUAuLz/+KQ56Uy2QUmJz0z5x0KpqgUwxfbhxuzhoVL0rSJTz69vEQeuqBfLm0ZPnEfHsy+cp4r04aN1pzZN9juR5zXPCIRZ/WRFaJhBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAgIRBICAQSAoGEQCAhEEgIBBICgYRAICEQSAgEEgKBhEAg8R+CSFTHUUbE3wAAAABJRU5ErkJggg==
// @match        http://jw.jxslsd.com:9995/
// @match        http://jw.jxslsd.com:9090/
// @match        http://xg.jxslsd.com:6931/
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      *
// @updateURL    https://yuannancheng.github.io/tampermonkey/imgPreview/imgPreview.meta.js
// @downloadURL  https://yuannancheng.github.io/tampermonkey/imgPreview/imgPreview.user.js
// @run-at       document-idle
// @note         V.0.4(2021-01-05) 增加学工系统预览
// ==/UserScript==
