// content_script.js からリクエストを受け取り、アドレスバーにアイコンを表示する.
((global) => {
  'use strict';
  chrome.extension.sendRequest({}, (res) => {});
  setup();
})(this.self || global);

function setup() {
  var target = document.querySelector('h2 > span');
  if (!target) {
    window.setTimeout(setup, 500);
    console.log('Wait!');
    return;
  }
  change();
}

function change() {
  var target = document.querySelector('h2 > span');
  if (target.innerText !== '最新ツイート') {
    document.querySelector('h2 > span').parentElement.parentElement.parentElement.nextElementSibling.children[0].click();
    var menu = document.querySelector('[role="menu"]');
    if (!menu) {
      window.setTimeout(change, 500);
      console.log('Wait!!');
      return;
    }
    menuClick();
  } else {
    console.log('Already!');
  }
}

function menuClick() {
  var menu = document.querySelector('[role="menu"]');
  if (!menu) {
    window.setTimeout(change, 500);
    console.log('Why?');
    return;
  }
  menu.children[0].children[0].children[0].children[1].click();
  console.log('Complete!');
}
