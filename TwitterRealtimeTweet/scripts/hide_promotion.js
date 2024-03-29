
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
    window.setTimeout(hide, 1000);
    return;
  }
  [...document.querySelector('section > div > div > div').children]
    .filter((div) => div.innerText.match(/プロモーション$/))
    .filter((div) => div.style.display !== 'none')
    .forEach((e) => {
      e.style.display = 'none';
      console.log(`hide! ${e.querySelector('a').href}`);
    });
};
