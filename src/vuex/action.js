import {
	getCommunityList
} from '../service/getData'
import {
	GETCOMMUNTYLIST
} from './mutationTypes.js'

export default {
	//获取社区信息
	async getCommunityListInfo({
		commit,
		state
	}, communityType) {
		console.log(communityType);
		let res = await getCommunityList(communityType);
		commit(GETCOMMUNTYLIST, res);
	}
}