export default (state = null, action) => {
    switch (action.type) {
			case 'select_blog':
				return action.payload;
			default:
				return state;
	}
};