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

import {
	setStore,
	getStore
} from '../utils/mUtils'

export default {
	//获取板块信息
	[GETBLOCKDETAIL](state, blockDetail) {
		state.blockDetail = blockDetail;
	},
	//获取社区列表信息
	[GETARTICLELIST](state, articleList) {
		state.articlePageInfo = articleList.page;
		let tempList = articleList.items;
		state.articleList = [state.articleList,
			...tempList
		];
		state.titleName = '最新';
	},
	//没有帖子详情页
	[NOARTICLE](state, articleDetailError) {
		state.articleDetailError = articleDetailError;
	},
	// 获取帖子详情的信息
	[GETARTICLEDETAIL](state, articleDetail) {
		state.articleDetail = articleDetail;
	},
	// 获取帖子详情的评论信息
	[GETARTICLCOMMENT](state, articleComment) {
		state.commentPageInfo = articleComment.page;
		console.log(state.commentPageInfo);
		let tempList = articleComment.items;
		console.log("...state.articleComment", state.articleComment);
		if (articleComment.page.current == 1) {
			state.articleComment = tempList;
		} else {
			state.articleComment = [...state.articleComment,
				...tempList
			];
		}
		console.log("...tempList", tempList);
		console.log("xxxxxstate.articleComment", state.articleComment);
	},
	//点赞提交按钮
	[CLICKLIKECOMMIT](state, likeInfo) {
		console.log("likeInfo", likeInfo);
		state.likeInfo = likeInfo;
	},
	//评论点赞提交按钮
	[COMMENTCLICKLIKECOMMIT](state, likeInfo) {
		console.log("likeInfo", likeInfo);
		if (likeInfo == 1) {
			likeInfo = new Date().getTime();
		}
		console.log("likeInfo", likeInfo);
		state.commentLikeInfo = likeInfo;
	},
	//删除文章
	[DELETEARTICLE](state, articleDeleteInfo) {
		console.log("articleDeleteInfo", articleDeleteInfo);
		state.articleDeleteInfo = articleDeleteInfo;
	},
	//获取用户详情信息
	[GETUSERDETAIL](state, userDetail) {
		console.log("userDetail", userDetail);
		state.userDetail = userDetail;
		console.log("state.userDetail", userDetail);
	},
	//获取发送帖子列表
	[SENDARTICLELIST](state, sendArticleList) {
		console.log("sendArticleList", sendArticleList);
		state.sendArticleList = sendArticleList;
	},
	//讨论帖子列表
	[DISCUSSARTICLELIST](state, discussArticleList) {
		console.log("discussArticleList", discussArticleList);
		state.discussArticleList = discussArticleList;
	},
	//关注
	[USERFOLLOW](state, followCallBackInfo) {
		console.log("followCallBackInfo", followCallBackInfo);
		state.followCallBackInfo = followCallBackInfo;
	}
}