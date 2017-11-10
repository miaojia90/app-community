import fetch from '../utils/fetch'
import {
	getStore
} from '../utils/mUtils'

/**
 * 获取社区列表信息
 */
export const getCommunityList = (communityType) => fetch('/api/getCommunityList', {
	communityType: communityType
});