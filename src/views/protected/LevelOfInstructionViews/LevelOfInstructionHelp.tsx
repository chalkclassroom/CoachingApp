import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LevelOfInstructionHelpCard from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

/**
 * specifies styling for modalins
 * @return {css}
 */
function getModalStyle(): React.CSSProperties {
	return {
		position: 'fixed',
		top: `50%`,
		left: `50%`,
		transform: `translate(-50%, -50%)`
	} as React.CSSProperties;
}

const styles: object = {
	paper: {
		position: 'absolute',
		width: '67%',
		backgroundColor: 'white',
		padding: '2em',
    borderRadius: 8
	},
	disapprovalTitle: {
		backgroundColor: '#E14B24',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		width: '25%'
	},
	disapprovalExample: {
		backgroundColor: '#F9D8CE',
		padding: '1%'
	},
	redirectionTitle: {
		backgroundColor: '#E69129',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		width: '25%'
	},
	redirectionExample: {
		backgroundColor: '#FAE8CF',
		padding: '1%'
	},
	generalTitle: {
		backgroundColor: '#46D3AA',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		width: '25%'
	},
	generalExample: {
		backgroundColor: '#D7F6EE',
		padding: '1%'
	},
	specificTitle: {
		backgroundColor: '#0C3C87',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		width: '25%'
	},
	specificExample: {
		backgroundColor: '#B3D1FA',
		padding: '1%'
	}
};

/**
 * Level Of Instruction time look-fors
 * @class LevelOfInstructionHelp
 * 
 * 
 */
class LevelOfInstructionHelp extends React.Component<Props, State> {
	state = {
		open: true
	};

	handleOpen = (): void => {
		this.setState({ open: true });
	};

	handleClose = (): void => {
		this.setState({ open: false });
	};

	static propTypes = {
		classes: PropTypes.object.isRequired
	};

	/**
   * render function
   * @return {ReactNode}
   */
	render(): React.ReactNode {
		const { classes } = this.props;

		return (
			<div>
				<Modal open={this.state.open}>
					<div style={getModalStyle()} className={classes.paper}>
						<Grid container alignItems="center" direction="column" justify="flex-start">
							<LevelOfInstructionHelpCard />
						</Grid>
					</div>
				</Modal>
			</div>
		);
	}
}

export default withStyles(styles)(LevelOfInstructionHelp);
