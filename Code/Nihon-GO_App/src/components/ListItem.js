import React, { Component } from 'react';
import { 
	Text, 
	TouchableWithoutFeedback, 
	View, 
	Image,
	LayoutAnimation,
	UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
	componentWillUpdate() {
		UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	}
	
	renderInformation() {
		const { library, expanded } = this.props;
		const { headerContentStyle, headerTextStyle, imageStyle } = styles;
		
		if (expanded) {
			return (
				<View style={headerContentStyle}>
					<Text style={headerTextStyle}>Address:</Text>
					<Text style={{ flex: 1 }}>{library.address}</Text>
					<Text style={headerTextStyle}>Description:</Text>
					<Text style={{ flex: 1 }}>{library.description}</Text>
					<Text style={headerTextStyle}>Suggested Duration:</Text>
					<Text style={{ flex: 1 }}>{library.duration}</Text>
					<Image 
						style={imageStyle}
						source={{ uri: library.image }} 
					/>
				</View>
			);
		}
	}
	
	render() {
		const { locationStyle } = styles;
		const { location, address } = this.props.library;
		
		return (
			<TouchableWithoutFeedback
				onPress={() => this.props.selectLibrary(address)}
			>
				<View>
					<CardSection>
						<Text style={locationStyle}>
							{location}
						</Text>
					</CardSection>
					{this.renderInformation()}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	locationStyle: {
		fontSize: 25,
		paddingLeft: 15
	},
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		paddingLeft: 25,
		paddingRight: 25
	},
	headerTextStyle: {
		fontSize: 18
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center'
	}
};

const mapStateToProps = (state, ownProps) => {
	const expanded = state.selectedLibraryId === ownProps.library.address;
	
	return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);