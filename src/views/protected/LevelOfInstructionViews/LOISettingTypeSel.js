import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import InstructionCounter from './InstructionCounter';

const styles = () => ({
	root: {
		borderWidth: 1,
		borderColor: '#000',
		border: 0,
		borderRadius: 3,
		color: '#fff !important',
		height: 48,
		width: '100%',
		borderRadius: '3px',
		marginTop: '35%',
		textTransform: 'Capitalize',
		fontWeight: '700',
		fontSize: '30',
		fontFamily: 'Arimo'
	},
	button: {
		margin: '-10px',
		width: 150,
		height: 150,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Arimo',
		color: '#fff !important',
		zIndex: '99',
		textTransform: 'Capitalize',
		fontWeight: '700',
		fontSize: '30'
	}
});

class SettingScreen extends React.Component {
	state = {};
	/**
   * @param {string} settingType
   */
	handleButtonChange = (settingType) => {
		this.props.toggleLOISettingType(settingType);
		this.props.switchToInstructionScreen();
	};
	render() {
		return (
			<div alignItems="flex-start">
				<Grid alignItems="flex-start" item xs={12}>
					<Typography
						alignItems="flex-start"
						component="h4"
						variant="h4"
						justify="center"
						style={{ padding: '10px', fontFamily: 'Arimo', fontSize: '50px', fontWeight: 'bold' }}
					>
						What is the activity setting?
					</Typography>
				</Grid>
				<Grid container style={{ marginTop: '25%' }}>
					<Grid container alignItems="flex-start" direction={'row'} style={{ fontFamily: 'Arimo' }}>
						<Grid
							container
							justify="center"
							item
							xl={6}
							md={6}
							sm={12}
							xs={12}
							style={{ fontFamily: 'Arimo' }}
						>
							<Fab
								onClick={() => {
									this.handleButtonChange('Whole group');
								}}
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white',
									textTransform: 'Capitalize',
									fontWeight: '700',
									fontSize: '30',
									fontFamily: 'Arimo'
								}}
							>
								Whole Group
							</Fab>
						</Grid>
						<Grid
							container
							alignItems="flex-start"
							item
							xl={6}
							md={6}
							sm={12}
							xs={12}
							style={{ fontFamily: 'Arimo' }}
						>
							<Fab
								onClick={() => this.handleButtonChange('Centers/Small Group')}
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white',
									textTransform: 'Capitalize',
									fontWeight: '700',
									fontSize: '30',
									fontFamily: 'Arimo'
								}}
							>
								Centers/Small Group
							</Fab>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const SETTING_SCREEN = 0;
const INS_SCREEN = 1;

/**
 * LOI Setting Type buttons
 * @class LOISettingTypeSel
 */

class LOISettingTypeSel extends React.Component {
	constructor(props) {
		super(props);
		const mEntry = {
			teacher: this.props.teacherId,
			observedBy: this.props.firebase.auth.currentUser.uid,
			type: 'Level'
		};
		this.props.firebase.handleSession(mEntry);
	}

	state = {
		addDialog: false,
		selected: '',
		status: SETTING_SCREEN,
		teacherIdCtr: this.props.teacherId,
		groupType: true,
		instructionType: false
	};

	handleButtonChange = (settingValue) => {
		this.setState({ settingType: settingValue });
		this.pushSettingChoice(settingValue);
	};

	toggleLOISettingType = (settingtypeis) => {
		console.log('the setting type is ', settingtypeis);
	};

	switchToInstructionScreen = () => {
		this.setState({ status: INS_SCREEN });
	};

	pushSettingChoice = (settingType) => {
		this.setState({
			groupType: false,
			instructionType: true,
			selected: settingType
		});
	};

	render() {
		return (
			<div>
				{this.state.groupType ? (
					<div alignItems="flex-start">
						<Grid alignItems="flex-start" item xs={12}>
							<Typography
								alignItems="flex-start"
								component="h4"
								variant="h4"
								justify="center"
								style={{ padding: '10px', fontFamily: 'Arimo', fontSize: '50px', fontWeight: 'bold' }}
							>
								What is the activity setting?
							</Typography>
						</Grid>
						<Grid container style={{ marginTop: '25%' }}>
							<Grid container alignItems="flex-start" direction={'row'} style={{ fontFamily: 'Arimo' }}>
								<Grid
									container
									justify="center"
									item
									xl={6}
									md={6}
									sm={12}
									xs={12}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => {
											this.handleButtonChange('Whole group');
										}}
										style={{
											backgroundColor: '#27B78FFF',
											width: 200,
											height: 200,
											color: 'white',
											textTransform: 'Capitalize',
											fontWeight: '700',
											fontSize: '30',
											fontFamily: 'Arimo'
										}}
									>
										Whole Group
									</Fab>
								</Grid>
								<Grid
									container
									alignItems="flex-start"
									item
									xl={6}
									md={6}
									sm={12}
									xs={12}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => this.handleButtonChange('Centers/Small Group')}
										style={{
											backgroundColor: '#27B78FFF',
											width: 200,
											height: 200,
											color: 'white',
											textTransform: 'Capitalize',
											fontWeight: '700',
											fontSize: '30',
											fontFamily: 'Arimo'
										}}
									>
										Centers/Small Group
									</Fab>
								</Grid>
							</Grid>
						</Grid>
					</div>
				) : null}
				{this.state.instructionType ? (
					<InstructionCounter
						selected={this.state.selected}
						teacherId={this.state.teacherIdCtr}
						firebase={this.props.firebase}
					/>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentSetting: state.LOIsettingTypeState.settingType,
		teacherIdis: state.teacherIdCtr
	};
};

LOISettingTypeSel.propTypes = {
	classes: PropTypes.object.isRequired,
	teacherId: PropTypes.string.isRequired,
	toggleLOISettingType: PropTypes.func.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, { toggleLOISettingType })(LOISettingTypeSel, SettingScreen));
