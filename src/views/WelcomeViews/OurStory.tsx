import * as React from "react";
import * as PropTypes from "prop-types";
import AppBar from "../../components/AppBar";
import FirebaseContext from "../../components/Firebase/FirebaseContext.js";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import BookImage from "../../assets/images/BookImage.svg";
import FeedbackImage from "../../assets/images/FeedbackImage.svg";
import MedalImage from "../../assets/images/MedalImage.svg";
import LightbulbImage from "../../assets/images/LightbulbImage.svg";
import PilotProgramImage from "../../assets/images/PilotProgramImage.svg";
import EventsImage from "../../assets/images/EventsImage.svg";
import SearchEngineImage from "../../assets/images/SearchEngineImage.svg";
import InvolveDetail from "../../components/StoryPageComponents/InvolveDetail";
import ArrowDetail from "../../components/StoryPageComponents/ArrowDetail";
import BlueBarDetail from "../../components/StoryPageComponents/BlueBarDetail";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import UpcomingEventsModal from "../../components/StoryPageComponents/UpcomingEventsModal";
import PilotModal from "../../components/StoryPageComponents/PilotModal";
import DemoModal from "../../components/StoryPageComponents/DemoModal";
import { ClickAwayListener } from "@material-ui/core/es";
import ChalkGroupImage from "../../assets/images/ChalkGroupImage.jpg";

const styles: object = {
	root: {
		backgroundColor: '#ffffff'
	},
	arrowVertical: {
		 // margin: theme.spacing(1),
		  borderRadius: 75,
		  width: '0.5px',
		  height: '190px',
		  backgroundColor: '#ffffff',
	  },
	mobileRoot: {
		backgroundColor: '#ffffff'
	},
	  groupImage: {
		width: "100%",
		borderRadius: "50px",
		marginTop:'0px',
		marginBottom:'80px',
       // height: '458px'
	  },
	  cardSize: {
		maxWidth: 994,
	  },
	  cardMedia: {
		height: 500,
	  },
	chalkTitle: {
		fontFamily: 'Arimo',
		fontSize: 'calc(16px + (80 - 16) * ((100vw - 300px) / (1600 - 300)))',
		color: 'white',
		lineHeight: '130%',
		letterSpacing: '0.07em',
		textShadow:
			'0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	tagline: {
		fontFamily: 'Arimo',
		fontSize: 'calc(12px + (36 - 12) * ((100vw - 300px) / (1600 - 300)))',
		color: 'white',
		textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	blueMask: {
		position: 'absolute',
		bottom: 0,
		background: 'linear-gradient(to right, rgba(69, 154, 235, 0.3), rgba(69, 154, 235, 0.3))',
		width: '100%'
	},
	section: {
		paddingTop: 10,
		paddingBottom: 10
	},
	partnersText: {
		fontStyle: 'italic',
		fontSize: 16,
		color: '#2F4B65',
		fontFamily: 'Arimo',
		paddingLeft: '2em'
	},
	input: {
		disableUnderline: true,
		color: '#233342',
		fontSize: 20,
		marginLeft: '0.5em'
	},
	demoButton: {
		color: '#459aeb',
		backgroundColor: '#ffffff',
		fontSize: 16,
		fontFamily: 'Arimo',
		fontStyle: 'bold'
	},
	sectionTitle: {
		fontFamily: 'Arimo',
		color: '#2F4B65',
		fontSize: 42,
		textAlign: 'center'
	},
	pageTitle: {
		fontFamily: 'Arimo',
		fontSize: 55,
		color: '#0988EC',
		textAlign: 'center',
		letterSpacing:'8px',
		fontWeight:600,
		marginTop:'50px',
	},
	missionTitle: {
		fontFamily: 'Arimo',
		fontSize: 30,
		fontWeight: 900,
		color: '#0988EC',
		textAlign: 'center',
		marginTop:'20px',
		marginBottom:'20px'
	},
	missionBody: {
		fontFamily: 'Arimo',
		fontSize: 24,
		// textAlign:'justify',
		color: '#000',
		display: 'flex',
		marginTop:'0px',
		marginBottom:'40px'
	},
	arrowBody:{
		fontSize: 20,
		color: '#000000',
		// textAlign: 'justify',
		fontFamily: 'Arimo',
		width: '70%'
	},
	'@media (max-width: 700px)': {
		root: {
			display: 'none'
		},
	},
	'@media (min-width: 701px)': {
		mobileRoot: {
			display: 'none'
		}
	},
	readMoreTitle: {
		color: '#094492',
		fontSize: 35,
		fontFamily: 'Arimo',
		textAlign: 'center',
		fontWeight: 'bold',
		letterSpacing:'8px',
		marginTop:'20px',
		marginBottom:'10px'
	},
	readMoreBody: {
		fontSize: 24,
		color: '#000000',
		paddingRight: '20%',
		fontFamily: 'Arimo',
		marginTop:'0px',
		marginLeft:'60px',
		lineHeight: '33px',
		marginBottom:'180px'
	  },
	getInvolvedTitle: {
		color: '#2F4B65',
		fontSize: 42,
		paddingTop: 20,
		width: '100%',
		fontFamily: 'Arimo',
		letterSpacing:'4px',
		marginTop:'20px',
		marginBottom:'20px'
	},
	mailingListText: {
		color: '#2f4b65',
		fontSize: 22,
		paddingTop: 30,
		fontFamily: 'Arimo',
		fontWeight: 'bold'
		},
	textField: {
		backgroundColor: 'white',
		borderRadius: 75,
		paddingTop: 5,
		textAlign: 'center',
		fontStyle: 'italic',
		width: '90%',
		fontFamily: 'Arimo'
	  },
	mailingListButton: {
		color: '#ffffff',
		backgroundColor: '#459aeb',
		fontSize: 14,
		fontFamily: 'Arimo',
		letterSpacing: '0.03em'
	},
	arrowBar:{
		width: '10px',
		height: '1190px', 
		position:'absolute',
		backgroundColor: '#86CCFF' ,// ' #86CCFF',
		display: 'inline-block',
        marginTop: '-35px',
		marginRight: '64px',
		marginLeft: '-48px',
		zIndex: 0
	},
	arrowCurve:{    
	 width: '9.9px',
	 height: '9.9px', 
	 backgroundColor: '#86CCFF',  // '#86CCFF',
	 borderRadius: '50%',
	 // display: 'inline-block',
	 marginBottom: '0',
	 marginRight: '64px',
	 marginLeft: '-48px',
  	position:'absolute',
	  marginTop: '-37px',
	  zIndex: 5
  },		

	partnerLogo: {
		maxWidth: 125
	},
	
	'@media (max-width: 700px)': {
		root: {
			display: 'none'
		},
		largeRoot: {
			display: 'none'
		},
		vertical: {
			borderLeft: '15px solid #86CCFF',
			height: '10em',
		marginLeft: '4.5em',
		
	  },
	  groupImage: {
		width: "60%",
		borderRadius: "50px",
		marginTop:'0px',
		marginBottom:'20px',
       // height: '458px'
	  },
		chalkTitle: {
			fontSize: 'calc(24px + (50 - 24) * ((100vw - 300px) / (700 - 300)))',
		},
		tagline: {
			fontSize: 'calc(14px + (24 - 14) * ((100vw - 300px) / (700 - 300)))'
		},
		sectionTitle: {
			fontSize: 32
		},
		pageTitle: {
			fontSize: '45',
			letterSpacing:'2em',
			fontWeight:600
		},
		missionTitle: {
			fontSize: '20',
			marginTop:'20px',
			marginBottom:'20px'
		},
		missionBody: {
			fontSize: 20,
			color: '#000',
			display: 'flex',
			fontFamily: 'Arimo',
			marginTop:'20px',
			marginBottom:'40px'
		},
		missionBody1:{
			fontSize: 20,
			color: '#000',
			fontFamily: 'Arimo'
		},
		readMoreTitle: {
			fontSize: 25
		},
		getInvolvedTitle: {
			textAlign: 'center'
		},
		mailingListText: {
			paddingLeft: '1em',
			paddingRight: '1em',
			paddingTop: '2em',
			fontSize: 18
		},
		mailingListButton: {
			paddingTop: '1em',
			textTransform: 'capitalize',
			paddingBottom: '1em'
		}
	},

	'@media (min-width: 701px) and (max-width: 1279px)': {
		arrowBar:{
			width: '10px',
			height: '2210px', 
						   position:'absolute',
						   backgroundColor: '#86CCFF' ,// ' #86CCFF',
						   display: 'inline-block',
						// marginBottom: '7px',
						//   borderRadius: '15%',
						   marginTop: '-35px',
						   marginRight: '64px',
						   marginLeft: '-48px',
						   zIndex: 0
		},
		arrowCurve:{    
			width: '9.9px',
			 height: '9.9px', 
		 backgroundColor: '#86CCFF',  // '#86CCFF',
		 borderRadius: '50%',
		 //display: 'inline-block',
		 marginBottom: '0',
		 marginRight: '64px',
		 marginLeft: '-48px',
	  	position:'absolute',
		  marginTop: '-37px',
		  zIndex: 5
	
	  },
		mobileRoot: {
			display: 'none'
		},
		largeRoot: {
			display: 'none'
		},
		largeImage: {
			display: 'none'
		}
	},
	'@media (min-width: 1280px)': {
		rootImage: {
			display: 'none'
		},
		mobileRoot: {
			display: 'none'
		}
	}
};

interface Props {
	classes: Style
  };
  
  interface Style {
	  readMoreBody: string;
	  section: string;
	  readMoreTitle: string;
	  root: string,
	  mobileRoot: string,
	  titleText: string,
	'@media (max-width: 700px)': string,
	'@media (min-width: 701px)': string
  }
  
  interface State {
	events: boolean,
	pilotModal: boolean,
	demo: boolean,
	email: string
	emailAdded: boolean,
	errors: boolean,
	emailError: string  };

/**
 * Our Story
 * @class OurStory
 */
class OurStory extends React.Component<Props, State> {
	/**
   * @param {Props} props 
   */
  constructor(props: Props) {
	super(props);

		this.state = {
			events: false,
			pilotModal: false,
			demo: false,
			email: '',
			emailAdded: false,
			errors: true,
			emailError: ''
		};
	}

	handleEventsButton = () => {
		this.setState({ events: true });
	};

	handlePilotButton = () => {
		this.setState({ pilotModal: true });
		console.log('handle pilot button executed');
	};

	handleDemoButton = () => {
		this.setState({ demo: true });
	};

	handleClickAwayEvents = () => {
		this.setState({ events: false });
	};

	handleClose = () => {
		this.setState({
			pilotModal: false,
			demo: false,
			events: false
		});
	};

	handleSubmit = () => {
		this.validateEmail();
		if (!this.state.errors) {
			this.props.firebase
				.emailListSignUp({
					email: this.state.email
				})
				.then(() => {
					this.setState({ emailAdded: true });
				});
		}
	};

	/**
   * validates user-entered text1
   * @param {string} name
   * @param {value} value
   */
	validateState = (name, value) => {
		switch (name) {
			case 'email':
				if (value.length === 0) {
					this.setState({
						emailError: 'Cannot be empty or contain numbers'
					});
				} else if (!this.validateEmail(value)) {
					this.setState({
						emailError: 'Not a valid email address',
						errors: true
					});
				} else {
					this.setState({
						emailError: '',
						errors: false
					});
				}
				break;
			default:
				this.validateState('email', this.state.email);
				break;
		}
	};

	/**
   * validates that user-entered text1 is a valid email
   * @param {string} email
   * @return {boolean}
   */
	validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	/**
   * responds to change in user-entered text1
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
		this.validateState(name, event.target.value);
	};

	public static propTypes = {
		classes: PropTypes.object.isRequired
	  };
	

	/**
   * render function
   * @return {ReactElement}
   */
	render() {
		const { classes } = this.props;
		var data1 =
	<Typography>
			  <p className={classes.arrowBody} >
		The foundation for CHALK began with two classroom observation research tools: 
		the  <a target="_blank" href="">Child Observation in Preschool</a> and  <a target="_blank" href="">the Teacher Observation in Preschool.</a> 
		These complex research tools have been used for over a decade to describe, measure, and evaluate hundreds
		of early childhood classrooms over the course of multiple large evaluation projects.
		 The COP measures observable child behaviorswhile the TOP measures observable aspects of Pre-K teachers’ classroom behaviors. 
		 Together, they provide a comprehensive view of the instruction and classroom climate children experience during their school day. 
		</p>
	</Typography>
			var data2 =
	<Typography>
			  <p className={classes.arrowBody} >
		Over the course of a research partnership with a Southeastern school district, we developed a vision for Pre-K quality and
		 determined what practices should be measured in classrooms that would provide us with standardized assessment of the quality 
		 of the instructional practices being implemented in those classrooms. We chose specific practices that we found to be consistently
		  predictive of children’s academic and self-regulatory gains. </p>
		  <p className={classes.arrowBody} >
     	 We carefully trained and certified observers to collect a wide variety of information about the participating classrooms across an entire
	   school day at several points over the course of the school year throughout the four-year partnership. To promote rapid cycle continuous 
	   quality improvement, data were analyzed and organized into reports given back to teachers and coaches within three weeks of each data 
	   collection.		</p>

		</Typography>
					var data3 =
		<Typography>
					  <p className={classes.arrowBody} >
					  Through this work, we identified 8 clusters of classroom practices that were<a target="_blank" href=""> associated with children’s gains across a number of domains.</a>
					   Validation was conducted with groups of teachers, coaches and even into kindergarten.
					   The idea of CHALK was eventually born out of a commitment to rigorous research designed to improve children’s early education. </p>
		</Typography>
					var data4 =
					<Typography>
					  <p className={classes.arrowBody} >
					  Over the course of the partnership, schools began to focus their professional development on the CHALK practices.
					   Instructional coaches worked with teachers to improve these practices, but some were much harder to improve than others. 
					   Moreover, coaches were reliant on data collected by researchers rather than data they collected themselves. 
					   We concluded that coaches need a tool that helps them connect what they see in the classroom with questions that help guide their coaching 
					   conversations, in addition to concrete strategies for practice improvement. </p>
		</Typography>
					var data5=
					<Typography>
					  <p className={classes.arrowBody} >
					  CHALK is focused on empowering coaches and transforming classroom experiences.
					   To achieve this goal, we challenged an <a target="_blank" href="">interdisciplinary team</a>  of coaches, teachers, principals, policy makers, researchers 
					   and other stakeholders to bring their unique expertise and perspectives to the table.
					   Finally, we are bringing the vision for the CHALK to life.  </p>
		</Typography>
				var data6=
		<Typography>
				  <p className={classes.readMoreBody} >
				<a target="_blank" href="">Data-Driven Improvement in Pre-kindergarten Classrooms: Report From a Partnership in an Urban District</a>
				</p>
		</Typography>
		return (
			<div>
				<div className={classes.root}>
					<FirebaseContext.Consumer>{(firebase) => <AppBar firebase={firebase} />}</FirebaseContext.Consumer>
					{this.state.events ? (
						<ClickAwayListener onClickAway={this.handleClickAwayEvents}>
							<UpcomingEventsModal />
						</ClickAwayListener>
					) : this.state.pilotModal ? (
						<PilotModal handleClose={this.handleClose} firebase={this.props.firebase} />
					) : this.state.demo ? (
						<DemoModal handleClose={this.handleClose} />
					) : (
						<div />
					)}
					<Grid container direction="column" justify="center" alignItems="center">
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="center"
							className={classes.section}
						>
							<Grid item style={{ padding: 20 }}>
								<Typography className={classes.pageTitle}>
									OUR STORY
								</Typography>
								<Typography className={classes.missionTitle}>
									<strong>CHALK'S MISSION</strong>
								</Typography>	
							


		<Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}  style={{paddingLeft: '1em', paddingRight: '1em'}}>
         	<Typography  className={classes.missionBody}>
									The Chalk Coaching Tool integrates 8 research-backed clusters of classroom practices
									associated with positive Pre-K teaching outcomes. In order to empower coaches and
									teachers to improve classroom practices, we designed an online tool that enables
									coaches to monitor classroom behaviors and to create strategies for teachers to
									provide children with high quality learning experiences. 
								</Typography>
        </Grid>

        <Grid item xs>
        </Grid>
      </Grid>
	  <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6} >
		<img className={classes.groupImage}
             src={ChalkGroupImage}
             alt="Chalk Team Group Picture"
         />
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>		
								
							</Grid>
							<Grid item xs={10} />
							<Grid item xs={1} />
						</Grid>

						
					
						<Grid item >
						<Grid container direction="row" >
								<Grid  xs={3}>
						<Grid
										container
										 direction="row"
										 justify="flex-end"
										alignItems="flex-start"
										style={{ height: '100%' }}
									>
 
									</Grid>
									</Grid>
									<Grid xs={9}>
											
					 
					  <div  className={classes.arrowCurve}>
							</div>
								
							<div  className={classes.arrowBar}>
							</div>
					       
								</Grid>
									</Grid>
							<Grid container direction="row">
								<Grid item xs={12}>
									<ArrowDetail
										icon={BookImage}
										iconAlt="Book"
										title="Setting the Research Foundation"
										text={data1}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item >
							<Grid container  direction="row">
								<Grid item xs={12}>
									<ArrowDetail
										icon={SearchEngineImage}
										iconAlt="Observe"
										title="Performing Field Studies"
										text={data2}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							// style={{ paddingTop: '1em', paddingBottom: '1em' }}
						>
							<Grid container  direction="row" >
								<Grid item xs={12}>
									<ArrowDetail
										icon={MedalImage}
										iconAlt="Medal"
										title="Identifying the CHALK Classroom Practices"
										text={data3}
										/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container  direction="row" >
								<Grid item xs={12}>
									<ArrowDetail
										icon={LightbulbImage}
										iconAlt="Lightbulb"
										title="Creating our Vision"
										text={data4 }
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item >
							<Grid container direction="row" >
								<Grid item xs={12}>
									<ArrowDetail
										icon={PilotProgramImage}
										iconAlt="Participation"
										title="Forming our Team"
										text={data5}
									/>
									
								</Grid>
							</Grid>
						</Grid>
						<Grid container direction="row" >
								<Grid  xs={3}>
						<Grid
										container
										 direction="row"
										 justify="flex-end"
										alignItems="flex-start"
										style={{ height: '100%' }}
									>
                    
                      <div  style={{    
						  width: 0, 
						  height: '0', 
						 borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
	  borderTop: '50px solid  #86CCFF',
	  marginRight: '18px',
	  marginBottom: '50px',
	}} />
                    
									</Grid>
									</Grid>
									<Grid xs={9}>
								
								</Grid>
									</Grid>
					</Grid>
				
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						style={{ backgroundColor: '#86CCFF' }}
						className={classes.section}
					>
						<Grid item style={{ width: '100%' }}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="flex-start"
								style={{ paddingBottom: '1em' }}
							>
								<Grid item xs={1} />
								<Grid item xs={10} component={Typography} className={classes.readMoreTitle}>
									Read more about our research here:
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="column">
								<Grid item xs={12}>
									<BlueBarDetail text= {data6} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					{/* end */}
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						style={{ backgroundColor: '#dbebfb' }}
						className={classes.section}
					>
						<Grid item style={{ width: '100%' }}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="flex-start"
								style={{ paddingBottom: '1em' }}
							>
								<Grid item  xl={3}
									md={3}
									sm={3}
									 />

								<Grid item xs={12} xl={6}
									md={6}
									sm={6} component={Typography} className={classes.getInvolvedTitle}>
									<strong>OR GET INVOLVED</strong>
								</Grid>

							</Grid>
						</Grid>

						<Grid item>
							<Grid container direction="row">
								<Grid item xs={12}>
									<InvolveDetail
										icon1={PilotProgramImage}
										iconAlt1="Participation"
										title1="Participate in our pilot program!"
										text1="If you are interested in piloting our tool,
                        we would love your feedback so we can make CHALK
                        the best it can be!"
										button1="Fill out form"
										onClick1={this.handlePilotButton}
										icon2={EventsImage}
										iconAlt2="People"
										title2="Join us at our upcoming events!"
										text2="We give frequent presentations and demonstrations
                        of CHALK. See a list of these events here!"
										button2="View our events"
										onClick2={this.handleEventsButton}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ width: '100%', paddingTop: '2em' }}>
							{this.state.emailAdded ? (
								<Grid container direction="row" justify="center" alignItems="center">
									<Grid item xs={12}>
										<Typography className={classes.mailingListText} style={{ textAlign: 'center' }}>
											You have been added to our mailing list.
										</Typography>
									</Grid>
								</Grid>
							) : (
								<Grid container direction="row" justify="flex-end" alignItems="center">
									  <Grid item  xl={3}
									md={3}
									sm={3}
									xs={3}  />
									<Grid item   xl={3}
									md={3}
									sm={3}
									xs={3} >
										<Typography className={classes.mailingListText}>
											Stay informed with our mailing list!
										</Typography>
									</Grid>
									<Grid item direction="row"
									 xl={6}
									md={6}
									sm={6}
									xs={6}   alignItems="center">
									<div style={{flexDirection:'row',display:'flex'}}>
										<div style={{width:'50%',}}>
											<TextField											
												label="Enter your email here"
												margin="normal"
												value={this.state.email}
												onChange={this.handleChange('email')}
												helperText={this.state.emailError}
												InputLabelProps={{
													style: { color: '#dbdbdb', fontSize: 20, marginLeft: '0.5em' }
												}}
												InputProps={{
													classes: { input: classes.input },
													disableUnderline: true
												}}
												className={classes.textField}
											/>
											
										</div>
										<div style={{justifyContent: 'flex-start', marginLeft: '-116px', marginTop: '16px'}}>
											<Fab
												variant="extended"
												onClick={this.handleSubmit}
												className={classes.mailingListButton} style={{ height: '58px'}}
											>
												<strong>Join mailing list</strong>
											</Fab>
											</div>
											</div>
								</Grid>									
								</Grid>
							)}
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

OurStory.propTypes = {
	classes: PropTypes.object.isRequired
	// firebase: PropTypes.object.isRequired
};

export default withStyles(styles)(OurStory);
