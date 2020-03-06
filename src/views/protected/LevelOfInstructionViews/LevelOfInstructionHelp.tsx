import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LevelOfInstructionHelpCard from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

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
	}
};

/**
 * Level Of Instruction time look-fors
 * @class LevelOfInstructionHelp
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
