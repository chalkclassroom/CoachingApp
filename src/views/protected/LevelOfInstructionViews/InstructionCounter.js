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

import { connect } from 'react-redux';
import { pushOntoLoiStack, popOffLoiStack  } from '../../../state/actions/level-of-instruction';

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
		flexGrow: 1
	}
});


// interface Props {
// 	teacherId: string,
// 	firebase: {
// 	  auth: {
// 		currentUser: {
// 		  uid: string
// 		}
// 	  },
// 	  handleSession(entry: object): void,
// 	  handlePushInstruction(entry: object): void         //handlePushInstruction(entry: object) for LOI
// 	},
// 	pushOntoLoiStack(entry: object): void,
// 	popOffLoiStack(): void,               
// 	totalVisitCount: number
//   }


class InstructionCounter extends React.Component {
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
	//	status: CENTER_CHECKLIST,
	//	currentCenter: undefined,
		totalVisitCount: 0
	};

	handlePushFire = (type) => {
		const mEntry = {
			InstructionResponse: type,
		  // Type: this.props.climateType
		  Type: "Level"
		};
		this.props.firebase.handlePushInstruction(mEntry);
		this.props.pushOntoLoiStack(mEntry);
	  };

	  handleUndo = () => {
		if (this.props.totalVisitCount > 0) {
		  this.props.popOffLoiStack();
		  // <<<<<<< Updated upstream
		  const mEntry = {
			InstructionResponse: "UNDO",
			Type: "UNDO"
		  };
		  this.props.firebase.handlePushInstruction(mEntry);
		}
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
		// this.props.onStatusChange(true);
	};

	render() {
		const { classes } = this.props;

				return (
					<div>
						<Grid justify="center" alignItems="stretch" direction="row" style={{ margin: 10 }}>
						

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
												onClick={() => this.handlePushFire('Ask High-Level Question')}
												className={classes.button}
												style={{
													backgroundColor: '#38761dff',
													width: 200,
													height: 200
												}} //,{ zIndex: 100 }
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
													onClick={() => this.handlePushFire('Follow-up on Children’s Responses')}
												classes={{ root: classes.button }} //, label: classes.label
												style={{
													backgroundColor: '#38761dff',
													width: 200,
													height: 200
												}}
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
									<div width={100} height={100} style={{ fontSize: '80px' }}>
									{this.props.totalVisitCount}
									</div>
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
									<Button  onClick={() => this.handleUndo()}>
										<ReplySharpIcon style={{ fontSize: '80px' }} width={100} height={100} />
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
												onClick={() => this.handlePushFire('Ask Low-Level Question')}
												className={classes.button}
												style={{
													backgroundColor: '#1155ccff',
													width: 200,
													height: 200
												}} 
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
													onClick={() => this.handlePushFire('Teach Specific Skills')}
												classes={{ root: classes.button }} 
												style={{
													backgroundColor: '#1155ccff',
													width: 200,
													height: 200
												}}
											>
												Teach Specific Skills
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
			
				)

			
		}
	
}

const mapStateToProps = (state) => {
	return {
		centers: state.settingType,
		 totalVisitCount: state.instructionstackstate.instructionStack.length
	};
};

// InstructionCounter.propTypes = {
// 	onStatusChange: PropTypes.func.isRequired
// };

export default withStyles(styles)(
	connect(mapStateToProps, { toggleLOISettingType,pushOntoLoiStack, popOffLoiStack })(InstructionCounter)
);
