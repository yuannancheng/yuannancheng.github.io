<h1>ONE一句</h1>

<script>

  let apiUrl = 'https://api.xygeng.cn/one';
  let timer = 0;
  let changeTimer = null;
  let scheduleEl = null;

  function setValue (value) {
    let el = document.getElementById('main');
    let wrap = el.getElementsByClassName('wrap')[0];
    if (!wrap) {
      let scheduleBackground = document.createElement('div');
      scheduleBackground.className = 'scheduleBackground';
      scheduleBackground.style.position = 'relative';
      scheduleBackground.style.width = '100%';
      scheduleBackground.style.backgroundColor = '#eeeeee';
      scheduleBackground.style.height = '1px';
      scheduleBackground.style.margin = '-1em auto 1em';
      el.appendChild(scheduleBackground);
      
      let schedule = document.createElement('div');
      schedule.className = 'schedule';
      schedule.style.position = 'absolute';
      schedule.style.width = '0';
      schedule.style.height = '1px';
      schedule.style.left = '0';
      schedule.style.top = '0';
      schedule.style.backgroundColor = '#159957';
      scheduleBackground.appendChild(schedule);
      
      scheduleEl = schedule;
      changeTimer = setInterval(changeSchedule, 30);
      
      wrap = document.createElement('div');
      wrap.style.display = 'inline-block';
      wrap.style.position = 'relative';
      wrap.style.whiteSpace = 'pre-wrap';
      wrap.className = 'wrap';
      el.appendChild(wrap);
      
      let content = document.createElement('p');
      content.innerText = value.data.content;
      content.style.display = 'inline-block';
      content.className = 'content';
      wrap.appendChild(content);

      let br = document.createElement('br');
      br.style.userSelect = 'none';
      wrap.appendChild(br);

      let origin = document.createElement('p');
      origin.innerHTML = '—— ' + value.data.origin;
      origin.style.display = 'inline-block';
      origin.style.float = 'right';
      origin.style.marginTop = '0';
      origin.className = 'origin';
      wrap.appendChild(origin);
    } else {
      let content = wrap.getElementsByClassName('content')[0];
      let origin = wrap.getElementsByClassName('origin')[0];
      content.innerText = value.data.content;
      origin.innerHTML = '—— ' + value.data.origin;
      clearInterval(changeTimer);
      timer = 0;
      changeTimer = setInterval(changeSchedule, 30);
    }
  }
  
  function changeSchedule () {
    timer = timer + 30 >= 60000 ? 60000 : timer + 30;
    let newWidth = Math.floor(timer / 60000 * 10000) / 100;
    scheduleEl.style.width = newWidth + '%';
  }

  (function getContent () {
    let xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let result = JSON.parse(xmlhttp.responseText);
        setValue(result);
        setTimeout(() => {
          getContent();
        }, 60000)
      }
    }
    xmlhttp.open("GET", apiUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
  })();

</script>
