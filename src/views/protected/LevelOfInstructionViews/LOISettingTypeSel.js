import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';


const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit,
		width: 150,
		height: 150,
		textAlign: 'center',
		display: "flex",
		flexDirection: "column",
		fontFamily: "Arimo"
    	//backgroundColor: '#27B78FFF'
	},
  grow: {
    flexGrow: 1
  }
});

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
			type: "Level"
		  };
		  this.props.firebase.handleSession(mEntry);

		this.state = {
			selected: null
		};
	}

	/**
   * @param {string} settingtype
   */
	handleButtonChange = (settingtype) => {
		this.props.toggleLOISettingType(settingtype);
		this.setState({
			selected: settingtype
		});
	};

	/**
   * render function
   * @return {ReactElement}
   */
	render() {
		const { classes } = this.props;

		return (
			<div>
				 <Grid container direction="column" justify="center" alignItems="center">
          <Typography component="h4" variant="h4"  align="center" style={{ padding: "10px", fontFamily: 'Arimo' }}
          >
           What is the activity setting?
          </Typography>
	</Grid>
        <Grid container alignItems="flex-start" container direction={'row'} spacing={24} style={{ fontFamily: 'Arimo' }}>

				 <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>
					<Fab
						onClick={() => this.handleButtonChange('wholeGroup')}
						classes={{ root: classes.button }}//, label: classes.label
						style={{ backgroundColor: "#27B78FFF" }}
					>
						Whole Group
					</Fab>
          </Grid>
          <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

					<Fab
						onClick={() => this.handleButtonChange('centersOrSmall')}
						classes={{ root: classes.button }}//, label: classes.label
						style={{ backgroundColor: "#27B78FFF" }}
					>
						Centers/Small Group
					</Fab>
				</Grid>
        </Grid>

			</div>
		);
	}
}

LOISettingTypeSel.propTypes = {
	classes: PropTypes.object.isRequired,
//	handleLOISettingType: PropTypes.func.isRequired,
	toggleLOISettingType: PropTypes.func.isRequired,
	handleNotes: PropTypes.func.isRequired
};

export default withStyles(styles)(connect(null, { toggleLOISettingType })(LOISettingTypeSel));
