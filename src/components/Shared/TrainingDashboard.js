import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/index';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

const styles = {
	card: {
		border: '3px solid #d9d9d9',
		borderRadius: 10,
		backgroundColor: '#fff',
		height: '100%',
		boxShadow: '5px',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justify: 'space-evenly',
		display: 'flex',
		flex: '1',
		flexWrap: 'nowrap'
	},
	container: {
		minWidth: '240px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontSize: '1em'
	},

	iconContainer: {
		display: 'flex',
		flexDireciton: 'column',
		justifyContent: 'center'
	},
	buttonsListContainer: {
		display: 'flex',
		flexDirection: 'column'
	},

	// iPad Pro 12.9" Portrait
	'@media only screen and (max-width:1024px) and (orientation:portrait)': {
		buttonsListContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center'
		},
		iconContainer: {
			display: 'none'
		},
		viewButtons: {
			minWidth: '240px',
			maxWidth: '325px'
		}
	},

	//iPad Pro 10.5" Landscape
	'@media only screen and (max-width:1112px) and (orientation:landscape)': {
		container: {
			fontSize: '0.7em'
		}
	},

	// iPad Pro 10.5" Portrait
	'@media only screen and (max-width:834px) and (orientation:portrait)': {
		viewButtons: {
			maxWidth: '395px'
		}
	},

	//iPad-Mini Landscape
	'@media only screen and (max-width:1024px) and (orientation:landscape)': {
		container: {
			fontSize: '0.9em'
		}
	},

	// iPad-Mini Portrait
	'@media only screen and (max-width:768px) and (orientation:portrait)': {
		container: {
			fontSize: '0.6em'
		},
		viewButtons: {
			maxWidth: '240px'
		}
	},

	// Minor Breakpoint - 920px width
	'@media only screen and (max-width:920px) and (orientation:landscape)': {
		buttonsListContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center'
		},
		iconContainer: {
			display: 'none'
		},
		viewButtons: {
			maxWidth: '250px'
		}
	},

	// Mobile Landscape
	'@media only screen and (max-width:600px)': {
		container: {
			fontSize: '0.8em'
		},
		viewButtons: {
			maxWidth: '180px'
		}
	}
};

function TrainingDashboard(props) {
	const {
		classes,
		ViewEnum,
		view,
		Icon,
		conceptsClick,
		definitionsClick,
		exampleClick,
		demonstrationClick,
		tryItClick,
		knowledgeCheckClick,
		colorTheme
	} = props;

	const { container, buttonsListContainer, iconContainer, viewButtons } = classes;

	return (
		<div>
			<Card className={classes.card}>
				<Grid
					container
					padding={12}
					spacing={0}
					direction="column"
					justify="center"
					alignItems="center"
					style={{ marginRight: 20, marginLeft: 20 }}
				/>
				<div className={container}>
					<ListItem className={iconContainer}>
						<img src={Icon} width={'100px'} alt="Magic Eight" />
					</ListItem>
					<div className={buttonsListContainer}>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.CONCEPTS ? 'contained' : 'outlined'}
									onClick={conceptsClick}
								>
									CONCEPTS
								</Button>
							</MuiThemeProvider>
						</ListItem>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.DEFINITIONS ? 'contained' : 'outlined'}
									onClick={definitionsClick}
									//  style={{ fontSize:'1em' , backgroundColor: buttonColor, color:'white' }}
								>
									DEFINITIONS
								</Button>
							</MuiThemeProvider>
						</ListItem>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.EXAMPLE ? 'contained' : 'outlined'}
									onClick={exampleClick}
									disabled
								>
									EXAMPLE
								</Button>
							</MuiThemeProvider>
						</ListItem>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.DEMONSTRATION ? 'contained' : 'outlined'}
									onClick={demonstrationClick}
								>
									DEMONSTRATION
								</Button>
							</MuiThemeProvider>
						</ListItem>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.TRYIT ? 'contained' : 'outlined'}
									onClick={tryItClick}
									// style={{ fontSize:'1em' }}
									// style={{ fontSize:'1em' , backgroundColor: buttonColor, color:'white' }}
									disabled
								>
									TRY IT YOURSELF
								</Button>
							</MuiThemeProvider>
						</ListItem>
						<ListItem className={viewButtons}>
							<MuiThemeProvider theme={colorTheme}>
								<Button
									size="large"
									color="primary"
									fullWidth={true}
									variant={view === ViewEnum.KNOWLEDGECHECK ? 'contained' : 'outlined'}
									onClick={knowledgeCheckClick}
								>
									KNOWLEDGE CHECK
								</Button>
							</MuiThemeProvider>
						</ListItem>
					</div>
				</div>
			</Card>
		</div>
	);
}

TrainingDashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	ViewEnum: PropTypes.object.isRequired,
	view: PropTypes.number.isRequired,
	Icon: PropTypes.object.isRequired,
	conceptsClick: PropTypes.func.isRequired,
	definitionsClick: PropTypes.func.isRequired,
	exampleClick: PropTypes.func.isRequired,
	demonstrationClick: PropTypes.func.isRequired,
	tryItClick: PropTypes.func.isRequired,
	knowledgeCheckClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TrainingDashboard);
