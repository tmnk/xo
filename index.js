window.addEventListener('load', function () {
  var ws = new WebSocket('ws://localhost:8080/lil');
  var ul = document.querySelector('ul');
  var newnode = document.createElement('div');
  var body = document.querySelector('body');
  var btn = document.querySelector('button');
  var btnClose = document.querySelector('.close');
  var input = document.querySelector('input');
  newnode.innerHTML = "Close";
  ws.addEventListener('message', function (event) {
    var li = document.createElement('li');
    li.innerHTML = event.data;
    ul.appendChild(li)
  });
  ws.onopen = () => {
    newnode.innerHTML = "OK";
    body.insertBefore(newnode, ul);
  };
  btn.addEventListener('click', function () {
    if (newnode.innerHTML === 'close' || !input.value) return;
    ws.send(input.value);
    input.value = '';
  });
  btnClose.addEventListener('click', () => {
    ws.close();
  })
  });
