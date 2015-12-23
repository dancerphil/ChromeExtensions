console.log("ZhihuBlocker starting.")

function Load_Filter() {
	var $userlist = $('.blocked-users .item-card a.avatar-link');
	var username = new Array($userlist.length);
	for (i = 0; i < $userlist.length; i++) {
		username[i] = $userlist.eq(i).attr('href').replace('/people/', '');
	}
	localStorage.UserList = username;
}
function Block_Comment() {
	var $commentlist = $('.zm-comment-list .zm-item-comment .zm-item-link-avatar');
	for (i = 0; i < $commentlist.length; i++) {
		var author_href=$commentlist.eq(i).attr('href');
		if (author_href==undefined)continue;
		for (j = 0; j < userlist.length; j++) {
			if (author_href.indexOf(userlist[j]) != -1) {
				$commentlist.eq(i).parents('.zm-item-comment').children().hide();
				$commentlist.eq(i).parents('.zm-item-comment').append('<del>此处内容由 ZhihuBlocker 屏蔽</del>');
			}
		}
	}
}
function Block_Answer() {
	var $answerlist = $('.zm-item-answer');
	for (i = 0; i < $answerlist.length; i++) {
		var author_href=$answerlist.eq(i).find(".author-link").attr('href');
		if (author_href==undefined)continue;
		for (j = 0; j < userlist.length; j++) {
			if (author_href.indexOf(userlist[j]) != -1) {
				$answerlist.eq(i).children().hide();
				$answerlist.eq(i).append('<del>此处内容由 ZhihuBlocker 屏蔽</del>');
			}
		}
	}
}
function Block_Timeline() {
	var $timeline = $('.zm-item-answer-detail');
	for (i = 0; i < $timeline.length; i++) {
		for (j = 0; j < userlist.length; j++) {
		var author_href=$timeline.eq(i).find(".author-link").attr('href');
		if (author_href==undefined)continue;
			if (author_href.indexOf(userlist[j]) != -1) {
				$timeline.eq(i).children().hide();
				$timeline.eq(i).append('<del>此处内容由 ZhihuBlocker 屏蔽</del>');
			}
		}
	}
}
function Block_Follower(){
	var $followerlist = $('.zm-profile-card');
	for (i = 0; i < $followerlist.length; i++) {
		var follower_data=$followerlist.eq(i).find(".zg-gray a");
		if(follower_data[3].text=="0 赞同"){
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

if (window.location.href == 'https://www.zhihu.com/settings/filter') {
	Load_Filter();
}
if (localStorage.UserList == undefined) {
	if (window.location.href != 'https://www.zhihu.com/settings/filter') {
		if (confirm('将要跳转到 https://www.zhihu.com/settings/filter 获取屏蔽列表')) {
			window.location.href = 'https://www.zhihu.com/settings/filter';
		}
	}
} else {
	var userlist = localStorage.UserList.split(',');

	//初次加载评论
	$('a[name="addcomment"]').click(function() {
		setTimeout(function() {
			Block_Comment();

			//加载更多评论
			$('a[name="load-more"]').click(function() {
				setTimeout(function() {
					Block_Comment();
				},
				3000)
			});
		},
		3000)
	})

	//屏蔽回答
	if (window.location.href.indexOf('https://www.zhihu.com/question/') != -1) {
		Block_Answer();
	}

	//屏蔽时间线
	if (window.location.href == 'https://www.zhihu.com/') {
		Block_Timeline();
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

/*
	$(".btn-backtotop").before('<a data-tip="s$r$屏蔽" class="btn-action" click="Block_Follower()"></a><br>');
*/
	// localStorage.removeItem('UserList');
}

console.log("ZhihuBlocker started.") 
