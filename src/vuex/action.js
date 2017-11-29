import fetchJsonp from '../utils/fetchJsonp'

import {
	GETARTICLELIST,
	GETBLOCKDETAIL,
	GETARTICLEDETAIL,
	GETARTICLCOMMENT,
	CLICKLIKECOMMIT,
	COMMENTCLICKLIKECOMMIT,
	DELETEARTICLE,
	NOARTICLE,
	GETUSERDETAIL,
	SENDARTICLELIST,
	DISCUSSARTICLELIST,
	USERFOLLOW
} from './mutationTypes.js'

export default {
	//获取社区信息
	async getArticleList({
			commit,
			state
		}, {
			blockId,
			page,
			pageSize
		}) {
			let result = fetchJsonp('/fortune/community/article-list', {
				blockId: blockId,
				page: page,
				pageSize: pageSize
			})
			result.then(function(response) {
				return response.json()
			}).then(function(json) {
				if (json.error) {
					return;
				}
				commit(GETARTICLELIST, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			})
		},
		//获取板块详情
		async getBlockDetail({
			commit,
			state
		}, blockId) {
			let result = fetchJsonp('/fortune/community/block-detail', {
				blockId: blockId
			});
			result.then(function(response) {
				return response.json()
			}).then(function(json) {
				let res = JSON.stringify(json);
				if (json.error) {
					return;
				}
				commit(GETBLOCKDETAIL, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//获取板块文章详情
		async getArticleDetail({
			commit,
			state
		}, {
			articleId,
			uid,
			sid
		}) {
			let result = fetchJsonp('/fortune/community/article-detail', {
				articleId: articleId,
				uid: uid,
				sid: sid
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				if (json.error) {
					commit(NOARTICLE, json);
				} else {
					commit(GETARTICLEDETAIL, json);
				}
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//获取文章的评论
		async getArticleComment({
			commit,
			state
		}, {
			articleId,
			page,
			pageSize,
			uid,
			sid
		}) {
			let result = fetchJsonp('/fortune/comment/comment-list', {
				code: articleId,
				type: 'community',
				page: page,
				pageSize: pageSize,
				uid: uid,
				sid: sid,
				orderLike: '0'
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				if (json.error) {
					return;
				}
				commit(GETARTICLCOMMENT, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//触发点赞逻辑
		async thumbsUpFun({
			commit,
			state
		}, {
			uid,
			sid,
			articleId
		}) {
			console.log("点赞开始");
			let result = fetchJsonp('/fortune/community/click-like', {
				uid: uid,
				sid: sid,
				articleId: articleId
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				commit(CLICKLIKECOMMIT, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//触发评论点赞的逻辑
		async commentThumbsUpFun({
			commit,
			state
		}, {
			uid,
			sid,
			commentId
		}) {
			console.log("评论点赞开始");
			let result = fetchJsonp('/fortune/comment/click-like', {
				uid: uid,
				sid: sid,
				commentId: commentId,
				type: 'community'
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				commit(COMMENTCLICKLIKECOMMIT, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//删除文章
		async deleteArticleFun({
			commit,
			state
		}, {
			uid,
			sid,
			articleId
		}) {
			console.log("开始删除评论");
			let result = fetchJsonp('/fortune/community/delete-article', {
				uid: uid,
				sid: sid,
				articleId: articleId,
				type: 'community'
			});
			result.then(function(response) {
				console.log(response);
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				commit(DELETEARTICLE, json);
			})['catch'](function(ex) {
				console.log(ex);
				'failed:' + ex;
			});
		},
		//关注
		async followOperateFun({
			commit,
			state
		}, {
			uid,
			sid,
			targetUid,
			focusType
		}) {
			console.log("关注");
			let result = fetchJsonp('/fortune/community/focus', {
				uid: uid,
				sid: sid,
				targetUid: targetUid,
				focusType: focusType
			});
			result.then(function(response) {
				console.log(response);
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				commit(USERFOLLOW, json);
			})['catch'](function(ex) {
				console.log(ex);
				'failed:' + ex;
			});
		},
		//获取用户详情信息
		async getUserDetail({
				commit,
				state
			},
			uid) {
			let result = fetchJsonp('/fortune/community/user-detail', {
				targetId: uid
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				console.log("用户详情", json);
				commit(GETUSERDETAIL, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//获取发送帖子列表
		async getSendArticleList({
			commit,
			state
		}, {
			targetUid,
			page,
			pageSize
		}) {
			let result = fetchJsonp('/fortune/community/send-article-list', {
				targetId: targetUid,
				page: page,
				pageSize: pageSize
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				console.log("发送帖子列表", json);
				commit(SENDARTICLELIST, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		},
		//讨论帖子列表
		async getDiscussArticleList({
			commit,
			state
		}, {
			targetUid,
			page,
			pageSize
		}) {
			let result = fetchJsonp('/fortune/community/discuss-article-list', {
				targetId: targetUid,
				page: page,
				pageSize: pageSize
			});
			result.then(function(response) {
				return response.json();
			}).then(function(json) {
				let res = JSON.stringify(json);
				console.log("讨论帖子列表", json);
				commit(DISCUSSARTICLELIST, json);
			})['catch'](function(ex) {
				'failed:' + ex;
			});
		}
}