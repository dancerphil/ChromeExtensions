

if (window.location.href.indexOf('douban.com/') !== -1
  && window.location.href.indexOf('collect') !== -1
  && window.location.href.indexOf('?') === -1) {
	console.log("[ZhihuBlocker]: Douban Additional Information Added.");
	var tags = $('.tag-list .clearfix span')
	var sum = 0;
	for(var i = 0; i < tags.length; i++) {
		sum += Number(tags[i].innerHTML)
	}
	var info = $('.info h1').html()
  var reg = /\((\S+)\)/g;
  var result = reg.exec(info);
  if(result) { // double check not in tag sort
    var element = '<li class="z_label on clearfix"><a href="#" title="总计">总计</a><span>'+sum+'</span></li>'
    if(sum!==Number(result[1])) {
      element = '<li class="z_label on clearfix" style="background: #b87878"><a href="#" title="总计">总计</a><span>'+sum+'</span></li>'
    }
    $('.tag-list').append(element)
	}
}
