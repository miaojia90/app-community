import {
	getStyle
} from '../../utils/mUtils'

export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				window.addEventListener('scroll', () => {
					if (document.body.scrollTop + window.innerHeight >= el.clientHeight) {
						binding.value();
					}
				});
			}
		}
	}
};