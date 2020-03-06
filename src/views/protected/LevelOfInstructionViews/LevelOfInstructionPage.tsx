import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import { connect } from 'react-redux';
import { toggleLOISettingType } from '../../../state/actions/level-of-instruction';
import LOISettingTypeSel from './LOISettingTypeSel';
import Dashboard from '../../../components/Dashboard';

const styles: object = {
	root: {
		flexGrow: 1,
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column',
		overflowY: 'auto',
		overflowX: 'hidden'
	}
};

interface Props {
	classes: { root: string };
	location: { state: { teacher: { id: string } } };
}

interface State {
	auth: boolean;
	help: boolean;
	notes: boolean;
	recs: boolean;
	open: boolean;
}

/**
 * Level Of Instruction Tool
 * @class LevelOfInstructionPage
 */
class LevelOfInstructionPage extends React.Component<Props, State> {
	/**
   * @param {Props} props 
   */
	constructor(props: Props) {
		super(props);
		this.state = {
			auth: true,
			help: false,
			notes: false,
			recs: true,
			open: false
		};
	}

	/**
   * @param {string} type
   */
	static propTypes = {
		classes: PropTypes.object.isRequired,
		location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string }) }) })
			.isRequired
	};
	/**
   * render function
   * @return {ReactNode}
   */
	render(): React.ReactNode {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<FirebaseContext.Consumer>
					{(firebase: object) => <AppBar firebase={firebase} />}
				</FirebaseContext.Consumer>

				<main style={{ flex: 1 }}>
					<Grid container alignItems="center" style={{height: '100%'}}>
						<Grid item xs={3}>
							<Grid container alignItems={'center'} justify={'center'} direction={'column'}>
								<Dashboard magic8="Level of Instruction" color="#009365" completeObservation={true} />
							</Grid>
						</Grid>
						<Grid item xs={9} justify="center" style={{height: '100%'}}>
							<Grid container alignItems={'center'} justify={'center'} direction={'column'}>
								<FirebaseContext.Consumer>
									{(firebase: object) => (
										<LOISettingTypeSel
											teacherId={this.props.location.state.teacher.id}
											firebase={firebase}
										/>
									)}
								</FirebaseContext.Consumer>
							</Grid>
						</Grid>
					</Grid>
				</main>
			</div>
		);
	}
}

export default connect(toggleLOISettingType)(withStyles(styles)(LevelOfInstructionPage));
