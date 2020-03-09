import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import InstructionCounter from '../../../components/LevelOfInstructionComponents/InstructionCounter';

const styles = {
	text: {
    padding: '10px',
    fontFamily: 'Arimo',
    fontSize: '50px',
    fontWeight: 'bold'
	},
	button: {
		backgroundColor: '#27B78FFF',
    width: 200,
    height: 200,
    color: 'white',
    textTransform: 'Capitalize',
    fontWeight: '700',
    fontSize: '1.5em',
    fontFamily: 'Arimo'
	}
};

/**
 * LOI Setting Type buttons
 * @class LOISettingTypeSel
 */
class LOISettingTypeSel extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
		super(props);
		const mEntry = {
			teacher: this.props.teacherId,
			observedBy: this.props.firebase.auth.currentUser.uid,
			type: 'level'
		};
    this.props.firebase.handleSession(mEntry);

    this.state = {
      selected: '',
      teacherId: this.props.teacherId,
      groupType: true,
    };
	}

  /**
   * @param {string} settingType
   * @return {void}
   */
	pushSettingChoice = (settingType) => {
		this.setState({
			groupType: false,
			selected: settingType
		});
	};

  /**
   * render function
   * @return {ReactNode}
   */
	render() {
    const { classes } = this.props;
		return (
			<div style={{width: '100%'}}>
				{this.state.groupType ? (
					<div alignItems="flex-start">
						<Grid alignItems="flex-start" item xs={12}>
							<Typography
								alignItems="flex-start"
								component="h4"
								variant="h4"
								justify="center"
                align="center"
								className={classes.text}
							>
								What is the activity setting?
							</Typography>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: '10%' }}>
              <Grid item xs={6}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Fab
                    onClick={() => {
                      this.pushSettingChoice('wholeGroup');
                    }}
                    className={classes.button}
                  >
                    Whole Group
                  </Fab>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Fab
                    onClick={() => {
                      this.pushSettingChoice('centersSmall');
                    }}
                    className={classes.button}
                  >
                    Centers/Small Group
                  </Fab>
                </Grid>
              </Grid>
						</Grid>
					</div>
				) : (
          <InstructionCounter
						selected={this.state.selected}
						teacherId={this.state.teacherId}
						firebase={this.props.firebase}
					/>
        )}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentSetting: state.LOIsettingTypeState.settingType,
		teacherIdis: state.teacherId
	};
};

LOISettingTypeSel.propTypes = {
	classes: PropTypes.object.isRequired,
  teacherId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, { toggleLOISettingType })(LOISettingTypeSel));
