import React from 'react';
import PropTypes from "prop-types";
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import  {toggleLOISettingType,test}  from '../../../state/actions/level-of-instruction';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import InstructionCounter from './InstructionCounter';

const styles = (theme) => ({

	root: {
		borderWidth: 1,
		borderColor: '#000',
		border: 0,
		borderRadius: 3,
		color: '#fff !important',
		height: 48,
		width: '100%',
		// padding: '0 80%',
		borderRadius: '3px',
		// marginLeft: "-95%",
		marginTop: '35%',
		textTransform: 'Capitalize',
		fontWeight:'700',
		fontSize:'30',
		fontFamily: "Arimo",

		// position: "relative",
		// left: "-14rem",
		// top:" 0.5rem",
		// marginLeft: '-10%'
	},
	button: {
		margin: '-10px',
		width: 150,
		height: 150,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
	    fontFamily: "Arimo",
		color: '#fff !important',
		zIndex: '99',
		textTransform: 'Capitalize',
		fontWeight:'700',
		fontSize:'30'

		// position: "absolute"

		//backgroundColor: '#27B78FFF'
	},
	grow: {
		flexgrow: 1
	}
});

class SettingScreen extends React.Component {
	// constructor(props){
	// 	super(props)
	// }
	state = {
		clicked: null
		//settingtype: []
	};

	/**
   * @param {string} settingtype
   */
	handleButtonChange = (settingtype) => {
		this.props.toggleLOISettingType(settingtype)
		// this.props.toggleLOISettingType('datais')
		this.setState({
			clicked: settingtype
		});
		this.props.switchToInstructionScreen();

	};

	/**
   * @param {string} settingtype
   */

	handleSettingBtnClick = (settingtype) => {
	this.props.toggleLOISettingType(settingtype);
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
					{/* <Grid item xs={3}>
						<Grid container alignItems={'center'} justify={'center'} direction={'row'} />
					</Grid> */}

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
								onClick={e =>{this.handleButtonChange('wholeGroup')}}
								//	classes={{ root: classes.button }}//, label: classes.label
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white',
									textTransform: 'Capitalize',
									fontWeight:'700',
									fontSize:'30',
									fontFamily: "Arimo",

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
								onClick={() => this.handleButtonChange('centersOrSmall')}
								//classes={{ root: classes.button }}//, label: classes.label
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white',
									textTransform: 'Capitalize',
									fontWeight:'700',
									fontSize:'30',
									fontFamily: "Arimo",


								}}
							>
								Centers/Small Group
							</Fab>
						</Grid>
					</Grid>
				</Grid>

				{/*         </Grid>
 */}
			</div>
		);
	}
}
const SETTING_SCREEN = 0;
//const INSTRUCTION_COUNTER =1;
const INS_SCREEN =1;

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
			type: 'Level',
		//	LOISetting: this.props.state.settingtype
		};
		this.props.firebase.handleSession(mEntry);
	}

	state = {
		addDialog: false,
		status: SETTING_SCREEN,
	//	currentCenter: undefined,
	//	totalVisitCount: 0
	};

	switchToSettingScreen = () => {
		this.setState({ status: SETTING_SCREEN });
	};

	switchToInstructionScreen = () => {
		this.setState({ status: INS_SCREEN });
	//	this.props.onStatusChange(true);
	};



	render() {
		const { classes } = this.props;

		switch (this.state.status) {
			case INS_SCREEN:
					return (
						<InstructionCounter
						currentSetting={this.state.settingType}
						firebase={this.props.firebase}
					  />
					);
					
			case SETTING_SCREEN:
				return (
					<SettingScreen
						switchToInstructionScreen={this.switchToInstructionScreen}
						toggleLOISettingType={this.props.toggleLOISettingType}
					/>
				);

			

			default:
				return <div>Unknown status value!!!</div>;
		}
	}
}

 const mapStateToProps = (state) => {
	return {
		whatSetting: state.settingType
	};
};
 
 LOISettingTypeSel.propTypes = {
	classes: PropTypes.object.isRequired,
	toggleLOISettingType: PropTypes.func.isRequired
}; 

export default withStyles(styles)(
	connect(  mapStateToProps, { toggleLOISettingType } )(LOISettingTypeSel,SettingScreen)
);
// export default withStyles(styles)(
// 	connect(mapStateToProps, { toggleLOISettingType })(
// 		LOISettingTypeSel,SettingScreen
// 	)
//   );