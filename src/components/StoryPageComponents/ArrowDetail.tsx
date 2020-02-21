import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles: object = {
	button: {
		color: '#ffffff',
		backgroundColor: '#459aeb',
		fontSize: 14,
		fontFamily: 'Arimo',
		letterSpacing: '0.03em'
	},
	titleText: {
		fontSize: 25,
		color: '#000000',
		fontFamily: 'Arimo',
		fontWeight: 'bold',
		width: '60%',
		// marginTop:''
		marginTop: '25px',
		marginBottom: '22px'
	},
	rounded: {
		backgroundColor: '#86CCFF',
		height: 90,
		width: 90
	},
	vertical: {
		borderLeft: '15px solid #86CCFF',
		height: '50%',
		marginLeft: '4.5em'
	},
	verticalOne: {
		borderLeft: '15px solid #86CCFF',
		height: '25%',
		marginLeft: '4.5em'
	},

	bodyText: {
		fontSize: 20,
		color: '#000000',
		display: 'flex',
		// textAlign: 'justify',
		fontFamily: 'Arimo',
		width: '100%'
	},
	'@media (max-width: 700px)': {
		root: {
			display: 'none'
		},
		vertical: {
			borderLeft: '15px solid #86CCFF',
			height: '25em',
			marginLeft: '4.5em',
			radius: '25%'
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
	iconAlt: string;
	icon: string;
	title: string;
	text: string;
	button: string;
	onClick(): void;
}

/**
 * formatting for details on our story page
 */
class ArrowDetail extends React.Component<Props, {}> {
	/**
   * @param {Props} props 
   */
	constructor(props: Props) {
		super(props);
	}

	static propTypes = {
		classes: PropTypes.object,
		iconAlt: PropTypes.string,
		icon: PropTypes.string,
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
						<Grid>
							<Grid container direction="row">
								<Grid xs={3}>
									<Grid
										container
										direction="row"
										justify="flex-end"
										alignItems="flex-start"
										style={{ height: '100%' }}
									>
										{/* 										<div className={classes.verticalOne} style={{ paddingLeft: '63px' }} />
 */}{' '}
									</Grid>
								</Grid>
								<Grid xs={9} style={{ paddingLeft: '1em', paddingRight: '1em' }} />
							</Grid>
						</Grid>

						<Grid item>
							<Grid container direction="row">
								<Grid item xs={3}>
									<Grid
										container
										direction="row"
										justify="flex-end"
										alignItems="flex-start"
										style={{ height: '100%' }}
									>
										<div style={{ marginLeft: '2rem' }}>
											<Avatar variant="circle" className={classes.rounded}>
												<img
													alt={this.props.iconAlt}
													src={this.props.icon}
													height={56}
													width={56}
													// style={{ paddingRight: 0 }}
												/>
											</Avatar>
											{/* 											<div className={classes.vertical} style={{ paddingLeft: 45 }} />
 */}{' '}
										</div>
									</Grid>
								</Grid>
								<Grid
									item
									xs={8}
									justify="flex-start"
									alignItems="flex-end"
									style={{ paddingLeft: '7em' }}
								>
									<Typography className={classes.titleText}>{this.props.title}</Typography>
									<Typography className={classes.bodyText}>{this.props.text}</Typography>
								</Grid>
							</Grid>
						</Grid>
						{this.props.button ? (
							<Grid item>
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
								<Grid item xs={3}>
									<Grid
										container
										direction="row"
										justify="flex-end"
										alignItems="flex-start"
										style={{ height: '100%' }}
									>
										<img alt={this.props.iconAlt} src={this.props.icon} width="70%" />
										<div className={classes.vertical} style={{ paddingLeft: 45 }} />
									</Grid>
								</Grid>
								<Grid item xs={9} style={{ paddingLeft: '1em', paddingRight: '1em' }}>
									<Typography className={classes.titleText}>{this.props.title}</Typography>
									<Typography className={classes.bodyText}>{this.props.text}</Typography>
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
							<Grid item>
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

export default withStyles(styles)(ArrowDetail);
