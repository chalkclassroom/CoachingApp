import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Fab } from '@material-ui/core';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { toggleNewGroupType } from '../../../state/actions/level-of-instruction';
import { connect } from 'react-redux';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import Crop75RoundedIcon from '@material-ui/icons/Crop75Rounded';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit,
		width: 150,
		height: 150,
    textAlign: 'center',
    backgroundColor: '#27B78FFF'
	},
	label: {
		flexDirection: 'column ',
		textAlign: 'center'
	},
	infoButton: {
    position: 'center ',
		textAlign: 'center'
  },
  titleContainer: {
		width: '100%',
		margin: '0',
		padding: '0',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
});

const themes = createMuiTheme({
	palette: {
		infoButton: {
			backgroundColor: '#ccccccff',
			color: '#ccccccff',
      fontFamily: 'Arimo'
		},
		groupColor: {
			backgroundColor: '#27B78FFF',
			color: '#27B78FFF',
		  //textColor: 'white',
			//primaryTextColor: 'white'
    },
    backButton: {
      color: '#333333',
      borderRadius: 3,
      textTransform: 'none'
    }
    
  }
});

/**
 * transition type buttons
 * @class GroupTypeSel
 */
class GroupTypeSel extends React.Component {
	/**
   * @param {Props} props 
   */
	constructor(props) {
		super(props);

		this.state = {
			selected: null
		};
	}
	/**
   * invoked after component updates
   * @param {prevProps} prevProps
   */


	/**
   * @param {string} type
   */
	handleButtonChange = (type) => {
		this.props.handleGroupType(type);
		this.props.toggleNewGroupType(type);
		this.setState({
			selected: type
		});
		if (type === 'other') {
			this.props.handleNotes(true);
		}
	};

	/**
   * render function
   * @return {ReactElement}
   */
	render() {
		const { classes } = this.props;

		return (
			<div>

				<Grid container alignItems="flex-start" container direction={'row'} style={{ fontFamily: 'Arimo' }}>

				<div className={classes.titleContainer}>
					<Button
						variant="contained"
            size="medium"
            onClick={null}
            className={classes.backButton}
            fullWidth={true}
					>
						<b>Select Activity Setting </b>
					</Button>

				</div>

				</Grid>
        <Grid container alignItems="flex-start" container direction={'row'} spacing={24} style={{ fontFamily: 'Arimo' }}>

				 <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>
					<Fab
						onClick={() => this.handleButtonChange('wholeGroup')}
						classes={{ root: classes.button }}//, label: classes.label
            style={{root: themes.palette.groupColor}}
					>
						Whole Group
					</Fab>
          </Grid>
          <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

					<Fab
						onClick={() => this.handleButtonChange('centersOrSmall')}
						classes={{ root: classes.button }}//, label: classes.label
            style={{root: themes.palette.groupColor}}
					>
						Centers/Small Group
					</Fab>
				</Grid>
        </Grid>

			</div>
		);
	}
}

GroupTypeSel.propTypes = {
	classes: PropTypes.object.isRequired,
	handleGroupType: PropTypes.func.isRequired,
	toggleNewGroupType: PropTypes.func.isRequired,
	handleNotes: PropTypes.func.isRequired
};

export default withStyles(styles)(connect(null, { toggleNewGroupType })(GroupTypeSel));
