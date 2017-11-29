import fetch from '../utils/fetch'
import {
	getStore
} from '../utils/mUtils'

/**
 * 获取板块详情信息
 */
export const getBlockDetailInfo = (blockId) => fetch('/fortune/community/block-detail', {
	blockId: blockId,
	callback: ''
});

/**
 * 获取帖子列表信息
 */
export const getArticleListInfo = (blockId, page, pageSize) => fetch('/fortune/community/article-list', {
	blockId: blockId,
	page: page,
	pageSize: pageSize,
	callback: ''
});