console.log("FollowerBlocker starting.")

function Block_Follower(){
	var $followerlist = $('.zm-profile-card');
	for (i = 0; i < $followerlist.length; i++) {
		var follower_data=$followerlist.eq(i).find(".zg-gray a");
		if(follower_data[3].text=="0 赞同"){
			$followerlist.eq(i).children().hide();
			$followerlist.eq(i).hide();
		}
		if(follower_data[3].text.length <= 6){ // < 1000
			$followerlist.eq(i).children().hide();
			$followerlist.eq(i).hide();
		}
		/* 可拓展选项
		for (j=0;j<follower_data.length;j++){ //0:关注者,1:提问,2:回答,3:赞同
			console.log(i+" : "+follower_data[j].text);
		}
		*/
	}
}

/*
	// 1.0.3 屏蔽三无用户
	var split_href=window.location.href.split("/");
	if(window.location.href.indexOf('https://www.zhihu.com/people/') != -1 && split_href.length>=6 && split_href[5]=="followers"){ // https://www.zhihu.com/people/xxx/followers
		Block_Follower();
	}
	// 1.0.3 加载更多follower
	$('a[class="zu-button-more"]').click(function() {//TODO 1.0.4 Bug #9 fixing
		console.log("1.0.3 : in load-more");
		setTimeout(function() {
			Block_Follower();
		},
		10000)
	});
*/

var split_href=window.location.href.split("/");
if(window.location.href.indexOf('https://www.zhihu.com/people/') != -1 && split_href.length>=6 && split_href[5]=="followers"){
// https://www.zhihu.com/people/xxx/followers
	var followerBtn = $('<a>', {
				href: 'javascript:void(0);',
				tabindex: '-1',
				'data-tip':"s$r$屏蔽",
				'class':"btn-action"
			})
		.click(Block_Follower)
		.insertBefore($('.btn-backtotop'))
	$('<br>').insertBefore($('.btn-backtotop'))
}









var $btnSettings = $('<li>')
	.append(
		$('<a>', {
			href: 'javascript:void(0);',
			tabindex: '-1'
		})
		.append($('<i>', {
			'class': 'zg-icon zg-icon-dd-settings izhihu-settings'
		}))
		.append('THIS?')
	)
	.click(function() {
		$('#zh-top-link-logo').remove()
	})
	.insertBefore($('ul#top-nav-profile-dropdown li:last'))


console.log("FollowerBlocker started.") 
