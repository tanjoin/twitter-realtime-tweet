
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
  var section = document.querySelector('section > div > div > div');
  if (!section || !section.childElementCount === 0) {
    window.setTimeout(hide, 500);
    return;
  }
  var list = [...document.querySelector('section > div > div > div').children]
    .filter((div) => div.innerText.match(/プロモーション$/))
    .filter((div) => div.style.display !== 'none');
  if (list.length > 0) {
    console.log('hide!');
    list.forEach((e) => e.style.display = 'none');
  }
};
