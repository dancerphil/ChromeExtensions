console.log("FollowerBlocker starting.")

function Block_Follower(){
	var $followerlist = $('.zm-profile-card');
	for (i = 0; i < $followerlist.length; i++) {
		var follower_data=$followerlist.eq(i).find(".zg-gray a");
		// if(follower_data[3].text=="0 赞同"){
		// 	$followerlist.eq(i).children().hide();
		// 	$followerlist.eq(i).hide();
		// }
		if(follower_data[3].text.length < 7){ // length < 7 == < 1000 , length < 6 = < 100 etc.
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

var split_href=window.location.href.split("/");
// https://www.zhihu.com/people/xxx/followers
if(window.location.href.indexOf('https://www.zhihu.com/people/') != -1 && split_href.length>=6 && split_href[5]=="followers"){
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

/*
	// 1.0.3 加载更多follower
	$('a[class="zu-button-more"]').click(function() {//TODO 1.0.4 Bug #9 fixing
		console.log("1.0.3 : in load-more");
		setTimeout(function() {
			Block_Follower();
		},
		10000)
	});
*/

console.log("FollowerBlocker started.") 
