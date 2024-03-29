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
    return;
  }
  change();
}

function change() {
  var target = document.querySelector('h2 > span');
  if (target.innerText !== '最新ツイート' &&
      target.innerText !== 'Latest Tweets' &&
      target.innerText !== '最新推文' &&
      target.innerText !== 'Последние твиты') {
    document.querySelector('h2 > span').parentElement.parentElement.parentElement.nextElementSibling.children[0].click();
    var menu = document.querySelector('[role="menu"]');
    if (!menu) {
      window.setTimeout(change, 500);
      return;
    }
    check();
  }
}

function check() {
  var menu = document.querySelector('[role="menu"]');
  if (!menu) {
    window.setTimeout(change, 500);
    return;
  }
  menuClick();
}

function menuClick() {
  var menu = document.querySelector('[role="menu"]').children[0].children[0].children[0].children[1];
  if (!menu || typeof menu.click !== 'function') {
    window.setTimeout(menuClick, 500);
    return;
  }
  menu.click();
  console.log('switch to latest tweets!');
}

