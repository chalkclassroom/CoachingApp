import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { spacing, typography, palette } from '@material-ui/system';
import { connect } from 'react-redux';
import { addNewCenter, incrementCenterCount } from '../../../state/actions/math-instruction';

// TODO: X in top right corner, press and hold to remove/edit the center.

const Box = styled.div`${palette}${spacing}${typography}`;

// const style = {
//     '@media only screen and (max-width:768px) and (orientation:portrait)': {

//   root: {
//     position: "relative!important",
//     left: "-10rem!important",
//     top:" 1.5rem!important",
//     padding: "0 216px!important",
//   }
//   }
// }

const styles = (theme) => ({
	/*  '@media only screen and (max-width:768px)': {
		root: {
      position: "relative!important",
      left: "-10rem!important",
      top:" 1.5rem!important",
      padding: "0 216px!important",
    }
  }, */
	'@media only screen and (max-width:834px) and (orientation:portrait)': {
		// strip: {
		//   position: "relative!important",
		//   left: "-10rem!important",
		//   top:" 1.5rem!important",
		//   padding: "0 216px!important",
		// }
	},

	root: {
		border: 0,
		borderRadius: 3,
		color: '#fff !important',
		height: 48,
		width:'100%',
		// padding: '0 80%',
		borderRadius: '3px',
		// marginLeft: "-95%",
		marginTop: '35%',
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
		// fontFamily: "Arimo",
		color: '#fff !important',
		zIndex: '99'

		// position: "absolute"

		//backgroundColor: '#27B78FFF'
	},
	grow: {
		flexGrow: 1
	}
});

class CenterChecklist extends React.Component {
	state = {
		checked: [],
		settingtype: []
	};

	/**
   * @param {string} settingtype
   */
	handleButtonChange = (settingtype) => {
		this.props.toggleLOISettingType(settingtype);
		this.setState({
			selected: settingtype
		});
	};

	handleDone = (settingtype) => {
		this.state.checked.forEach((checked) => {
			this.props.toggleLOISettingType(settingtype);
		});
		this.props.switchToCenterMenu();
	};

	render() {
		const { classes } = this.props;

		return (
			<div alignItems="flex-start">
				<Grid alignItems="flex-start" item xs={12}>
					{/*                  <Grid container direction="co
						lumn" alignItems="center">
 */}{' '}
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
								onClick={() => this.handleDone('wholeGroup')}
								//	classes={{ root: classes.button }}//, label: classes.label
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white'
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
								onClick={() => this.handleDone('centersOrSmall')}
								//classes={{ root: classes.button }}//, label: classes.label
								style={{
									backgroundColor: '#27B78FFF',
									width: 200,
									height: 200,
									color: 'white'
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

const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;

class LOISettingTypeSel extends React.Component {
	constructor(props) {
		super(props);
		const mEntry = {
			teacher: this.props.teacherId,
			observedBy: this.props.firebase.auth.currentUser.uid,
			type: 'Math'
		};
		this.props.firebase.handleSession(mEntry);
	}

	state = {
		addDialog: false,
		status: CENTER_CHECKLIST,
		currentCenter: undefined,
		totalVisitCount: 0
	};

	handleClickOpen = () => {
		this.setState({ addDialog: true });
	};

	handleClose = () => {
		this.setState({ addDialog: false });
	};

	switchToCenterChecklist = () => {
		this.setState({ status: CENTER_CHECKLIST });
	};

	switchToCenterMenu = () => {
		this.setState({ status: CENTER_MENU });
		this.props.onStatusChange(true);
	};

	render() {
		const { classes } = this.props;

		switch (this.state.status) {
			case CENTER_CHECKLIST:
				return (
					<CenterChecklist
						switchToCenterMenu={this.switchToCenterMenu}
						addCenter={this.props.toggleLOISettingType}
					/>
				);
			case CENTER_MENU:
				return (
					<div>
						<Grid justify="center" alignItems="stretch" direction="row" style={{ margin: 10 }}>
							{/* <Grid justify="flex-start" alignItems="center" direction="row">
								<Grid container spacing={0} direction="row" alignItems="center">
									
								<Grid container xs={12} container direction={'row'}>
										<Grid
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={12}
											style={{ fontFamily: 'Arimo' }}
										>
											<Fab
												//onClick={() => this.handleButtonChange('wholeGroup')}
												// classes={{ root: classes.button }}//, label: classes.label
												className={classes.button}
												style={{ backgroundColor: '#38761dff',
												width: 200,
												height: 180 }}
											>
												Ask High-Level Question
											</Fab>
										</Grid>

										<Grid
											container
											alignItems="flex-start"
											item
											md={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Button
												disabled
												style={{ backgroundColor: '#6aa84fff',  color: '#fff!important' }}
												className={classes.root}
											>
												Inferential Instruction
											</Button>
										</Grid>
										<Grid
										
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={12}
											style={{ fontFamily: 'Arimo',marginLeft:'10px' }}
										>
											<Fab
												//	onClick={() => this.handleButtonChange('centersOrSmall')}
												classes={{ root: classes.button }} //, label: classes.label
												style={{ backgroundColor: '#38761dff',
												width: 200,
												height: 180 }}
											>
												Follow-up on Children’s Responses
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							</Grid> */}



							<Grid justify="flex-start" alignItems="center" direction="row">
								<Grid container spacing={0} direction="row" alignItems="center">
									
									<Grid container xs={12} container direction={'row'}>
										<Grid
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Fab
												//onClick={() => this.handleButtonChange('wholeGroup')}
												// classes={{ root: classes.button }}//, label: classes.label
												className={classes.button}
												style={{ backgroundColor: '#38761dff',
												width: 200,
												height: 200 }} //,{ zIndex: 100 }
											>
											Ask High-Level Question
											</Fab>
										</Grid>

										<Grid
											container
											alignItems="flex-start"
											item
											md={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Button
												disabled
												style={{ backgroundColor: '#6aa84fff', color: '#fff!important' }}
												className={classes.root}
											>
													Inferential Instruction
											</Button>
										</Grid>
										<Grid
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Fab
												//	onClick={() => this.handleButtonChange('centersOrSmall')}
												classes={{ root: classes.button }} //, label: classes.label
												style={{ backgroundColor: '#38761dff',
												width: 200,
												height: 200 }}
											>
												Follow-up on Children’s Responses
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							</Grid>


							<Grid container xs={12} container direction={'row'}>
							<Grid
								container
								alignItems="flex-start"
								item
								xl={4}
								md={4}
								sm={4}
								xs={12}
								style={{ fontFamily: 'Arimo' }}
							/>

							<Grid
								container
								alignItems="center"
								justify="center"
								item
								md={4}
								style={{ fontFamily: 'Arimo' }}
								alignItems="center"
							>
								<div  width={100} height={100} style={{fontSize:'80px'}}>
									0</div>
							</Grid>

							<Grid
								container
								alignItems="flex-start"
								item
								xl={4}
								md={4}
								sm={4}
								xs={12}
								style={{ fontFamily: 'Arimo' }}
							/>
							</Grid>

							<Grid container xs={12} container direction={'row'}>
							<Grid
								container
								alignItems="flex-start"
								item
								xl={4}
								md={4}
								sm={4}
								xs={12}
								style={{ fontFamily: 'Arimo' }}
							/>

							<Grid
								container
								alignItems="center"
								justify="center"
								item
								md={4}
								style={{ fontFamily: 'Arimo' }}
								alignItems="center"
							>
								<ReplySharpIcon  style={{fontSize:'80px'}} width={100} height={100} />
							</Grid>

							<Grid
								container
								alignItems="flex-start"
								item
								xl={4}
								md={4}
								sm={4}
								xs={12}
								style={{ fontFamily: 'Arimo' }}
							/>
							</Grid>

							<Grid justify="flex-start" alignItems="center" direction="row">
								<Grid container spacing={0} direction="row" alignItems="center">
									
									<Grid container xs={12} container direction={'row'}>
										<Grid
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Fab
												//onClick={() => this.handleButtonChange('wholeGroup')}
												// classes={{ root: classes.button }}//, label: classes.label
												className={classes.button}
												style={{ backgroundColor: '#1155ccff',
												width: 200,
												height: 200 }} //,{ zIndex: 100 }
											>
												Ask Low-Level Question
											</Fab>
										</Grid>

										<Grid
											container
											alignItems="flex-start"
											item
											md={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Button
												disabled
												style={{ backgroundColor: '#6d9eebff', color: '#fff!important' }}
												className={classes.root}
											>
												Basic Skills Instruction
											</Button>
										</Grid>
										<Grid
											container
											alignItems="flex-start"
											item
											xl={4}
											md={4}
											sm={4}
											xs={4}
											style={{ fontFamily: 'Arimo' }}
										>
											<Fab
												//	onClick={() => this.handleButtonChange('centersOrSmall')}
												classes={{ root: classes.button }} //, label: classes.label
												style={{ backgroundColor: '#1155ccff',
												width: 200,
												height: 200 }}
											>
												Teach Specific Skills
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
				);

			default:
				return <div>Unknown status value!!!</div>;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		centers: state.settingType
	};
};

LOISettingTypeSel.propTypes = {
	onStatusChange: PropTypes.func.isRequired
};

export default withStyles(styles)(
	connect(mapStateToProps, { toggleLOISettingType, incrementCenterCount })(LOISettingTypeSel)
);
