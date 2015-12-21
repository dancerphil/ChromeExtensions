console.log("ZhihuBlocker starting.")

function BlockPeople() {
	var $userlist = $('.blocked-users .item-card a.avatar-link');
	var username = new Array($userlist.length);
	for (i = 0; i < $userlist.length; i++) {
		username[i] = $userlist.eq(i).attr('href').replace('/people/', '');
	}
	localStorage.UserList = username;
}
if (window.location.href == 'https://www.zhihu.com/settings/filter') {
	BlockPeople();
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
			//屏蔽评论
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
		},
		3000)
	})
	//加载更多评论
	$('a[name="load-more"]').click(function() {
		setTimeout(function() {
			//屏蔽评论
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
		},
		10000)
	});

	//屏蔽回答
	if (window.location.href.indexOf('https://www.zhihu.com/question/') != -1) {
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

	//屏蔽时间线
	if (window.location.href == 'https://www.zhihu.com/') {
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
	//localStorage.removeItem('UserList');
}

// 1.0.2 TODO
// console.log(window.location.href.split("/")[0])
console.log("ZhihuBlocker started.") 
