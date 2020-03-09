import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toggleLOISettingType } from '../../state/actions/level-of-instruction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import { connect } from 'react-redux';
import { pushOntoLoiStack, popOffLoiStack } from '../../state/actions/level-of-instruction.js';

const styles: object = {
	category: {
		borderWidth: 1,
		borderColor: '#000',
		border: 0,
		color: '#fff !important',
		height: 48,
		width: '100%',
		borderRadius: '3px',
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
};

interface Props {
  teacherId: string,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleLOISession(entry: {teacher: string, observedBy: string, setting: string, type: string}): void,
    handlePushInstruction(insType: string): void,
  },
  selected: string,
  totalVisitCount: number,
  classes: {
    category: string,
    button: string
  },
  pushOntoLoiStack(insType: string): void,
  popOffLoiStack(): void
}

/**
 * @class InstructionCounter
 */
class InstructionCounter extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
		super(props);
		const mEntry = {
			teacher: this.props.teacherId,
			observedBy: this.props.firebase.auth.currentUser.uid,
			setting: this.props.selected,
			type: 'level'
		};
		this.props.firebase.handleLOISession(mEntry);
	}

  /**
   * @param {string} insType
   */
	handlePushFire = (insType: string): void => {
		this.props.firebase.handlePushInstruction(insType);
		this.props.pushOntoLoiStack(insType);
	};

  /**
   * @return {void}
   */
	handleUndo = (): void => {
		if (this.props.totalVisitCount > 0) {
			this.props.popOffLoiStack();
			this.props.firebase.handlePushInstruction('UNDO');
		}
  };
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    teacherId: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    pushOntoLoiStack: PropTypes.func.isRequired,
    popOffLoiStack: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired,
    totalVisitCount: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
	render(): React.ReactNode {
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
										onClick={(): void => this.handlePushFire('highLevel')}
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
										className={classes.category}
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
										onClick={(): void => this.handlePushFire('followUp')}
										classes={{ root: classes.button }}
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
							<Button onClick={(): void => this.handleUndo()}>
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
										onClick={(): void => this.handlePushFire('lowLevel')}
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
										className={classes.category}
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
										onClick={(): void => this.handlePushFire('specificSkill')}
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

const mapStateToProps = (state): {currentSetting: string, totalVisitCount: number} => {
  console.log('map state param ', state);
  console.log('map state return ', state.LOIsettingTypeState.settingType, state.instructionstackstate.instructionStack.length)
	return {
		currentSetting: state.LOIsettingTypeState.settingType,
		totalVisitCount: state.instructionstackstate.instructionStack.length
	};
};

export default withStyles(styles)(
	connect(mapStateToProps, { toggleLOISettingType, pushOntoLoiStack, popOffLoiStack })(InstructionCounter)
);