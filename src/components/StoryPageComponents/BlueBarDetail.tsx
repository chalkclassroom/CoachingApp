import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const styles: object = {
	button: {
		color: '#ffffff',
		backgroundColor: '#459aeb',
		fontSize: 14,
		fontFamily: 'Arimo',
		letterSpacing: '0.03em'
	},
	titleText: {
		fontSize: 22,
		color: '#2f4b65',
		paddingRight: '20%',
		fontFamily: 'Arimo'
	},
	bodyText: {
		fontSize: 24,
		color: '#000000',
		// paddingRight: '20%',
		fontFamily: 'Arimo',
		textDecoration: 'underline',
		marginTop: '0px'
		// marginBottom:'120px'
	},
	'@media (max-width: 700px)': {
		root: {
			display: 'none'
		}
	},
	'@media (min-width: 701px)': {
		mobileRoot: {
			display: 'none'
		}
	}
};

interface Style {
	root: string;
	mobileRoot: string;
	button: string;
	titleText: string;
	bodyText: string;
	'@media (max-width: 700px)': string;
	'@media (min-width: 701px)': string;
}

interface Props {
	classes: Style;
	title: string;
	text: string;
	button: string;
	onClick(): void;
}

/**
 * formatting for details on our story page
 */
class BlueBarDetail extends React.Component<Props, {}> {
	/**
   * @param {Props} props 
   */
	constructor(props: Props) {
		super(props);
	}

	static propTypes = {
		classes: PropTypes.object,
		title: PropTypes.string,
		text: PropTypes.string,
		button: PropTypes.string,
		onClick: PropTypes.func
	};

	/**
   * render function
   * @return {ReactElement}
   */
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<Grid container direction="column">
						<Grid item>
							<Grid container direction="row" alignItems="center">
								<Grid item xs={9} style={{ paddingLeft: '1em', paddingRight: '1em' }}>
									<Typography className={classes.titleText}>{this.props.title}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ paddingTop: '1em' }}>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								{/* <Grid item xs={2} /> */}
								<Grid item xs={12} style={{ paddingLeft: '1em', paddingRight: '1em' }}>
									<Typography className={classes.bodyText}>{this.props.text}</Typography>
								</Grid>
							</Grid>
						</Grid>
						{this.props.button ? (
							<Grid item style={{ paddingTop: '1em', paddingBottom: '2em' }}>
								<Grid container direction="row" justify="flex-start" alignItems="flex-start">
									<Grid item xs={4} />
									<Grid item xs={8}>
										<Fab variant="extended" onClick={this.props.onClick} className={classes.button}>
											<strong>{this.props.button}</strong>
										</Fab>
									</Grid>
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</div>
				<div className={classes.mobileRoot}>
					<Grid container direction="column">
						<Grid item>
							<Grid container direction="row" alignItems="center">
								<Grid item xs={9} style={{ paddingLeft: '1em', paddingRight: '1em' }}>
									<Typography className={classes.titleText}>{this.props.title}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ paddingTop: '1em' }}>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								<Grid item xs={3} />
								<Grid item xs={9} style={{ paddingLeft: '1em', paddingRight: '1em' }}>
									<Typography className={classes.bodyText}>{this.props.text}</Typography>
								</Grid>
							</Grid>
						</Grid>
						{this.props.button ? (
							<Grid item style={{ paddingTop: '1em', paddingBottom: '2em' }}>
								<Grid container direction="row" justify="flex-start" alignItems="flex-start">
									<Grid item xs={4} />
									<Grid item xs={8}>
										<Fab variant="extended" onClick={this.props.onClick} className={classes.button}>
											<strong>{this.props.button}</strong>
										</Fab>
									</Grid>
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(BlueBarDetail);
