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
    	textAlign: 'center'
    	//backgroundColor: '#27B78FFF'
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
	//	this.props.handleLOISettingType(type);
		this.props.toggleLOISettingType(type);
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
