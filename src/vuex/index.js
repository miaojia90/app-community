import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	blockDetail: [],
	articleList: [], // 社区列表信息
	articlePageInfo: [],
	titleName: '',
	articleDetail: [],
	articleComment: [], //评论列表
	likeInfo: '', //点赞返回出来的信息
	commentLikeInfo: '',
	articleDeleteInfo: '', //删除文章操作
	commentPageInfo: '', //评论的页面数
	articleDetailError: [],
	userDetail: [], //用户详情
	sendArticleList: [], //用户发送帖子列表
	discussArticleList: [], //讨论帖子列表
	followCallBackInfo: [] //关注
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})