export default (state = null, action) => {
    switch (action.type) {
			case 'select_category':
				return action.payload;
			default:
				return state;
	}
};