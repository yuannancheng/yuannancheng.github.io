<h1>ONE一句</h1>

<script>

  /*
  new Vue({
    el: '#OneVm',
    data: {
      content: '',
      author: '',
      APIUrl: 'https://api.xygeng.cn/one'
    },
    computed: {
      wrapStyle () {
        return {
          display: 'inline-block',
          position: 'relative'
        }
      },
      contentStyle () {
        return {
          display: 'inline-block',
          whiteSpace: 'pre-wrap'
        }
      },
      authorStyle () {
        return {
          display: 'inline-block',
          float: 'right',
          marginTop: '0'
        }
      }
    },
    methods: {
      getContent () {
        let _this = this;
        let xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState==4 && xmlhttp.status==200) {
              let status = JSON.parse(xmlhttp.responseText);
              _this.content = status.data.content;
              _this.author = '—— ' + status.data.origin;
              console.log(_this);
          }
        }
        xmlhttp.open("GET", this.APIUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send();
      }
    },
    mounted () {
      this.getContent ();
    }
  })
  */

	let api = 'https://api.xygeng.cn/one';
    let xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            let content = JSON.parse(xmlhttp.responseText);
            let el = document.getElementById('main');
            let div = document.createElement('div');
            div.style.display = 'inline-block';
            div.style.position = 'relative';
            div.style.whiteSpace = 'pre-wrap';
            el.appendChild(div);
            let p = document.createElement('p');
            p.innerText = content.data.content;
            p.style.display = 'inline-block';
            div.appendChild(p);
            let br = document.createElement('br');
            br.style.userSelect = 'none';
            div.appendChild(br);
            let origin = document.createElement('p');
            origin.innerHTML = '—— ' + content.data.origin;
            origin.style.display = 'inline-block';
            origin.style.float = 'right';
            origin.style.marginTop = '0';
            div.appendChild(origin);
        }
    }
    xmlhttp.open("GET", api, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();

</script>
