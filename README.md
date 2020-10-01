<h1>一句</h1>

<script>
  const apiUrl = 'http://s.safe.360.cn/sapi/api',
        proxy = 'https://showtime.applinzi.com/proxy.php';
  let data = [];
  let scheduleEl = null;
  let scheduleElVan = null;
  let showTimeDelay = 15E3; // 每条句子展示时间
  let keyframesTime = 15; // 进度条关键帧时间间隔
  let timer = 0;
  let changeTimer = null;
  let resizeTimer = null;
  let el = document.getElementById('main');
  let h1 = el.getElementsByTagName('h1')[0];
  let canWidth = 0;

  function getAjax () {
    return new Promise((resolve, reject)=> {
      const xmlhttp = new XMLHttpRequest();
      const url = proxy + '?url=' + apiUrl;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          resolve(JSON.parse(xmlhttp.responseText));
        }
      }
      xmlhttp.open("GET", url, true);
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlhttp.send();
    });
  }
  async function handelAjax () {
    const result = await getAjax();
    data = result.data.list;
    let midata = [];
    for (let i = 0; i < data.length; i++) {
      if ('mark_ext' in data[i] && data[i].mark_ext.length === 0) midata.push(data[i]); // 删除明星
    }
    data = midata;
    midata = [];
    for (let i = 0; i < data.length; i++) {
      const link_txt = data[i].link_ext.link_txt;
      const reg_filter = [
        '｜', '—', '-', '→',
        '←', ' ', '▷', '◁'
      ]; // 在来源文字前后可能会加的字符
      const reg = new RegExp('\n?(' + reg_filter.join('|') + '){0,2}(点击查看来源|' + link_txt + ')(' + reg_filter.join('|') + '){0,2}$', 'g');
      const link_txt_filter = ['点击查看来源', '》》']; // 需要清除的作者名
      const link_txt_reg = new RegExp('.{0,2}(' + link_txt_filter.join('|') + ').{0,2}$', 'g');
      if (link_txt_reg.test(link_txt)) data[i].link_ext.link_txt = '';
      midata.push({
        'txt': data[i].txt.replace(reg, ''),
        'src': data[i].link_ext.link_txt,
        'pic': data[i].pic
      });
    }
    data = midata;
    console.log(data);
    showInit();
  }
  handelAjax();
  
  function showInit () {
    for (let i = 0; i <= data.length; i++) {
      if (i === data.length) {
        setTimeout(() => {
          handelAjax(); // 循环一次后重新请求数据
        }, i * showTimeDelay);
      } else {
        setTimeout(() => {
          changeShow(i); // 换下一句
        }, i * showTimeDelay);
      }
    }
  }
  function changeShow (id) {
    if(window.getComputedStyle) {
      canWidth = window.getComputedStyle(h1, null).width.split('px')[0];
    } else {
      canWidth = h1.currentStyle.width.split('px')[0];
    }
    let wrap = el.getElementsByClassName('content-wrap')[0];
    if (!wrap) {
      let scheduleCanvas = document.createElement('canvas');
      scheduleCanvas.className = 'scheduleCanvas';
      scheduleCanvas.setAttribute('width', canWidth);
      scheduleCanvas.setAttribute('height', 1);
      el.appendChild(scheduleCanvas);
      scheduleEl = scheduleCanvas;
      scheduleElVan = scheduleCanvas.getContext('2d');
      changeTimer = setInterval(changeSchedule, keyframesTime);
      
      wrap = document.createElement('div');
      wrap.className = 'content-wrap';
      el.appendChild(wrap);
      
      let content = document.createElement('p');
      content.innerText = data[id].txt;
      content.className = 'content';
      wrap.appendChild(content);
      
      let br = document.createElement('br');
      wrap.appendChild(br);
      
      let origin = document.createElement('p');
      origin.className = 'origin';
      if (data[id].src && data[id].src.length > 0) origin.innerHTML = '—— ' + data[id].src;
      else origin.innerHTML = '';
      wrap.appendChild(origin);
    } else {
      let content = wrap.getElementsByClassName('content')[0];
      let origin = wrap.getElementsByClassName('origin')[0];
      content.innerText = data[id].txt;
      if (data[id].src.length > 0) origin.innerHTML = '—— ' + data[id].src;
      else origin.innerHTML = '';
      clearInterval(changeTimer);
      timer = 0;
      scheduleElVan.clearRect(0, 0, scheduleEl.width, scheduleEl.height);
      changeTimer = setInterval(changeSchedule, keyframesTime);
    }
  }
  function changeSchedule() {
    timer = timer + keyframesTime >= showTimeDelay ? showTimeDelay : timer + keyframesTime;
    let newWidth = Math.floor(scheduleEl.width * timer / showTimeDelay);
    scheduleElVan.fillStyle = '#159957'; // 画笔颜色
    scheduleElVan.fillRect(0, 0, newWidth, 1);
  }
  window.onresize = () => {
    if (!resizeTimer) {
      if(window.getComputedStyle) {
        canWidth = window.getComputedStyle(h1, null).width.split('px')[0];
      } else {
        canWidth = h1.currentStyle.width.split('px')[0];
      }
      scheduleEl.setAttribute('width', canWidth);
      setTimeout(() => {
        resizeTimer = null;
      }, 50);
    }
  }

</script>
