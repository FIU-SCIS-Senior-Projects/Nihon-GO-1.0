export default (state = null, action) => {
	switch (action.type) {
		case 'select_itinerary':
			return action.payload;
		default:
			return state;
	}
};