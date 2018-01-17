if (window.location.href.indexOf('https://tour.go-zh.org/') != -1) {
	console.log("[ZhihuBlocker]: Go Blocker Started.")

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	funcRemoveClass = function() {
    $('#explorer .menu-button.ng-scope.ng-binding.active').removeClass('menu-button')
  }
  new MutationObserver(funcRemoveClass).observe(document.getElementById('explorer'), {
    subtree: true,
    attributes: true
  });
}
