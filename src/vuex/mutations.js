import {
	GETCOMMUNTYLIST
} from './mutationTypes.js'

import {
	setStore,
	getStore
} from '../utils/mUtils'

export default {
	//获取社区列表信息
	[GETCOMMUNTYLIST](state, CommunityListInfo) {
		// state.communityList = {...CommunityListInfo};
		state.communityHead = CommunityListInfo;
		let tempList = CommunityListInfo.topic;
		state.communityList = [...state.communityList,
			...tempList
		];
		// state.communityList = tempList;
		console.log(state.communityList);
	}
}