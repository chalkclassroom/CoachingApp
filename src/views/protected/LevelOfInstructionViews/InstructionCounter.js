import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import { connect } from 'react-redux';
import { pushOntoLoiStack, popOffLoiStack } from '../../../state/actions/level-of-instruction';

const styles = (theme) => ({
	root: {
		borderWidth: 1,
		borderColor: '#000',
		border: 0,
		borderRadius: 3,
		color: '#fff !important',
		height: 48,
		width: '100%',
		borderRadius: '3px',
		// marginTop: '35%',
		textTransform: 'Capitalize',
		fontWeight: 'normal',
		fontSize: '1.2em',
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
		fontWeight: 'bold',
    fontSize: '1.5em',
    paddingRight: '0.5em',
    paddingLeft: '0.5em'
	}
});

class InstructionCounter extends React.Component {
	constructor(props) {
		super(props);
		const mEntry = {
			teacher: this.props.teacherId,
			observedBy: this.props.firebase.auth.currentUser.uid,
			setting: this.props.selected,
			type: 'level'
		};
		this.props.firebase.handleLOISession(mEntry);
	}

	state = {
		addDialog: false,
		totalVisitCount: 0
	};

	handlePushFire = (insType) => {
		const mEntry = {
			instructionType: insType,
			Type: 'level'
		};
		this.props.firebase.handlePushInstruction(mEntry);
		this.props.pushOntoLoiStack(mEntry);
	};

	handleUndo = () => {
		if (this.props.totalVisitCount > 0) {
			this.props.popOffLoiStack();
			const mEntry = {
				instructionType: 'UNDO',
				Type: 'UNDO'
			};
			this.props.firebase.handlePushInstruction(mEntry);
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Grid justify="center" alignItems="stretch" direction="row" style={{ width: '100%', paddingLeft: '3em', paddingRight: '3em' }}>
					<Grid justify="flex-start" alignItems="center" direction="row">
						<Grid container spacing={0} direction="row" alignItems="center">
							<Grid container xs={12} direction={'row'}>
								<Grid
									container
									alignItems="center"
                  justify="flex-end"
									xl={3}
									md={3}
									sm={3}
									xs={3}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => this.handlePushFire('highLevel')}
										className={classes.button}
										style={{
											backgroundColor: '#38761dff',
											width: 180,
											height: 180
										}}
									>
										Ask High-Level Question
									</Fab>
								</Grid>

								<Grid container alignItems="center" md={5} style={{ fontFamily: 'Arimo' }}>
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
									alignItems="center"
									xl={3}
									md={3}
									sm={3}
									xs={3}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => this.handlePushFire('followUp')}
										classes={{ root: classes.button }} //, label: classes.label
										style={{
											backgroundColor: '#38761dff',
											width: 180,
											height: 180
										}}
									>
										Follow-up on Children’s Responses
									</Fab>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container xs={12} direction={'row'}>
						<Grid
							container
							alignItems="flex-start"
							xl={3}
							md={3}
							sm={3}
							xs={3}
							style={{ fontFamily: 'Arimo' }}
						/>
						<Grid
							container
							alignItems="center"
							justify="center"
							md={5}
							style={{ fontFamily: 'Arimo' }}
						>
							<div width={100} height={100} style={{ fontSize: '80px' }}>
								{this.props.totalVisitCount}
							</div>
						</Grid>
						<Grid
							container
							alignItems="flex-start"
							xl={3}
							md={3}
							sm={3}
							xs={3}
							style={{ fontFamily: 'Arimo' }}
						/>
					</Grid>
					<Grid container xs={12} direction={'row'}>
						<Grid
							container
							alignItems="flex-start"
							xl={3}
							md={3}
							sm={3}
							xs={3}
							style={{ fontFamily: 'Arimo' }}
						/>
						<Grid
							container
							alignItems="center"
							justify="center"
							md={5}
							style={{ fontFamily: 'Arimo' }}
						>
							<Button onClick={() => this.handleUndo()}>
								<ReplySharpIcon style={{ fontSize: '80px' }} width={100} height={100} />
							</Button>
						</Grid>
						<Grid
							container
							alignItems="flex-start"
							xl={3}
							md={3}
							sm={3}
							xs={3}
							style={{ fontFamily: 'Arimo' }}
						/>
					</Grid>
					<Grid justify="flex-start" alignItems="center" direction="row">
						<Grid container spacing={0} direction="row" alignItems="center">
							<Grid container xs={12} direction={'row'}>
								<Grid
									container
									alignItems="center"
                  justify="flex-end"
									xl={3}
									md={3}
									sm={3}
									xs={3}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => this.handlePushFire('lowLevel')}
										className={classes.button}
										style={{
											backgroundColor: '#1155ccff',
											width: 180,
											height: 180
										}}
									>
										Ask Low-Level Question
									</Fab>
								</Grid>
								<Grid container alignItems="center" md={5} style={{ fontFamily: 'Arimo' }}>
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
									xl={3}
									md={3}
									sm={3}
									xs={3}
									style={{ fontFamily: 'Arimo' }}
								>
									<Fab
										onClick={() => this.handlePushFire('specificSkill')}
										classes={{ root: classes.button }}
										style={{
											backgroundColor: '#1155ccff',
											width: 180,
											height: 180
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentSetting: state.LOIsettingTypeState.settingType,
		totalVisitCount: state.instructionstackstate.instructionStack.length
	};
};

InstructionCounter.propTypes = {
	classes: PropTypes.object.isRequired,
	teacherId: PropTypes.string.isRequired,
	toggleLOISettingType: PropTypes.func.isRequired
};

export default withStyles(styles)(
	connect(mapStateToProps, { toggleLOISettingType, pushOntoLoiStack, popOffLoiStack })(InstructionCounter)
);