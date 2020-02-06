import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
 * Instruction Counter Screen
 * @class InstructionCounter
 */
class InstructionCounter extends React.Component {
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
						style={{ backgroundColor: "#38761dff" }}
					>
						Whole Group test
					</Fab>
          </Grid>
          <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

					<Fab
						onClick={() => this.handleButtonChange('centersOrSmall')}
						classes={{ root: classes.button }}//, label: classes.label
						style={{ backgroundColor: "#38761dff" }}
					>
						test Centers/Small Group
					</Fab>
				</Grid>
        </Grid>
        <Grid container alignItems="flex-start" container direction={'row'} spacing={24} style={{ fontFamily: 'Arimo' }}>

<Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>
 <Fab
   onClick={() => this.handleButtonChange('wholeGroup')}
   classes={{ root: classes.button }}//, label: classes.label
   style={{ backgroundColor: "#1155ccff" }}
 >
   Whole test  Group
 </Fab>
 </Grid>
 <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

 <Fab
   onClick={() => this.handleButtonChange('centersOrSmall')}
   classes={{ root: classes.button }}//, label: classes.label
   style={{ backgroundColor: "#1155ccff" }}
 >
   Centers tst /Small Group
 </Fab>
</Grid>
</Grid>
			</div>
		);
	}
}

InstructionCounter.propTypes = {
	classes: PropTypes.object.isRequired,
	handleNotes: PropTypes.func.isRequired
};

export default withStyles(styles)(connect(null, {  })(InstructionCounter));
