
((global) => {
  'use strict';
  chrome.extension.sendRequest({}, (res) => {});
  setup();
})(this.self || global);

function setup() {
  var target = document.querySelector('body');
  if (!target) {
    window.setTimeout(setup, 500);
    return;
  }
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      hide();
    });
  });
  observer.observe(target, {
    childList: true,
    subtree: true
  });
};

function hide() {
  [...document.querySelector('section > div > div > div').children].filter((div) => div.innerText.match(/プロモーション$/)).forEach((e) => e.style.display = 'none');
};
