import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppBar from '../../components/AppBar';
import FirebaseContext from '../../components/Firebase/FirebaseContext.js';
import Grid from '@material-ui/core/Grid/Grid';

import LogoImage from '../../assets/images/LogoImage.svg';
import PieChartImage from '../../assets/images/PieChartImage.svg';
import HighFiveImage from '../../assets/images/HighFiveImage.svg';
import BookImage from '../../assets/images/BookImage.svg';
import FeedbackImage from '../../assets/images/FeedbackImage.svg';
import MedalImage from '../../assets/images/MedalImage.svg';
import LightbulbImage from '../../assets/images/LightbulbImage.svg';
import BoxImage from '../../assets/images/BoxImage.svg';
import SchoolImage from '../../assets/images/SchoolImage.svg';
import ProblemOrangeImage from '../../assets/images/ProblemOrangeImage.svg';
import LightbulbYellowImpactImage from '../../assets/images/LightbulbYellowImpactImage.svg';
import PilotProgramImage from '../../assets/images/PilotProgramImage.svg';
import EventsImage from '../../assets/images/EventsImage.svg';
import SearchEngineImage from '../../assets/images/SearchEngineImage.svg';
import MNPSLogoImage from '../../assets/images/MNPSLogoImage.jpg';
import AbtLogoImage from '../../assets/images/AbtLogoImage.png';
import PreschoolPromiseLogoImage from '../../assets/images/PreschoolPromiseLogoImage.jpg';
import UDaytonLogoImage from '../../assets/images/UDaytonLogoImage.jpg';
import UnitedWayLogoImage from '../../assets/images/UnitedWayLogoImage.jpg';
import VanderbiltPeabodyLogoImage from '../../assets/images/VanderbiltPeabodyLogoImage.png';
import WondryLogoImage from '../../assets/images/WondryLogoImage.png';
import Typography from '@material-ui/core/Typography/Typography';
import InvolveDetail from '../../components/StoryPageComponents/InvolveDetail.tsx';
import ArrowDetail from '../../components/StoryPageComponents/ArrowDetail.tsx';
import BlueBarDetail from '../../components/StoryPageComponents/BlueBarDetail.tsx';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import UpcomingEventsModal from '../../components/LandingPageComponents/UpcomingEventsModal.tsx';
import PilotModal from '../../components/StoryPageComponents/PilotModal.tsx';
import DemoModal from '../../components/StoryPageComponents/DemoModal.tsx';
import { ClickAwayListener } from '@material-ui/core/es';

const styles = {
	root: {
		backgroundColor: '#ffffff'
	},
	mobileRoot: {
		backgroundColor: '#ffffff'
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
		fontWeight: 800,
		color: '#0988EC',
		textAlign: 'center'
	},
	missionTitle: {
		fontFamily: 'Arimo',
		fontSize: 30,
		fontWeight: 900,
		color: '#0988EC',
		textAlign: 'center'
	},
	missionBody: {
		fontFamily: 'Arimo',
		fontSize: 25,
		fontWeight: 800,
		color: '#000000',
		textAlign: 'center'
	},
	ReadMoreTitle: {
		color: '#094492',
		fontSize: 35,
		fontFamily: 'Arimo',
		textAlign: 'center',
		fontStyle: 'normal'
	},
	getInvolvedTitle: {
		color: '#2F4B65',
		fontSize: 42,
		paddingTop: 20,
		width: '100%',
		fontFamily: 'Arimo'
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
		chalkTitle: {
			fontSize: 'calc(24px + (50 - 24) * ((100vw - 300px) / (700 - 300)))'
		},
		tagline: {
			fontSize: 'calc(14px + (24 - 14) * ((100vw - 300px) / (700 - 300)))'
		},
		sectionTitle: {
			fontSize: 32
		},
		pageTitle: {
			fontSize: '45'
		},
		missionTitle: {
			fontSize: '20'
		},
		missionBody: {
			fontSize: '15'
		},
		ReadMoreTitle: {
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

/**
 * Our Story
 * @class OurStory
 */
class OurStory extends React.Component {
	/** 
   * @param {Props} props
   * @return {ReactElement}
   */
	/**
   * @param {Props} props 
   */
	constructor(props) {
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

	/**
   * render function
   * @return {ReactElement}
   */
	render() {
		const { classes } = this.props;
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
									<strong>OUR STORY</strong>
								</Typography>
								<Typography className={classes.missionTitle}>
									<strong>CHALK's MISSION</strong>
								</Typography>
								<Typography className={classes.missionBody}>
									The Chalk Coaching Tool integrates 8 research-backed clusters of classroom practices
									associated with positive Pre-K teaching outcomes. In order to empower coaches and
									teachers to improve classroom practices, we designed an online tool that enables
									coaches to monitor classroom behaviors and to create strategies for teachers to
									provide children with high quality learning experiences.  GRP PICTURE
								</Typography>
							</Grid>
							<Grid item xs={10} />
							<Grid item xs={1} />
						</Grid>
						<Grid item style={{ paddingTop: '1em' }}>
							<Grid container /* direction="row" */>
								<Grid item xs={12}>
									<ArrowDetail
										icon={BookImage}
										iconAlt="Book"
										title="Setting the Research Foundation"
										text="The foundation for CHALK began with two classroom observation research tools: the Child Observation in Preschool and  the Teacher Observation in Preschool.
                       These complex research tools have been used for over a decade to describe, measure, and evaluate hundreds of early childhood classrooms over the course of multiple large evaluation projects.
                        The COP measures observable child behaviors while the TOP measures observable aspects of Pre-K teachers’ classroom behaviors.
                       Together, they provide a comprehensive view of the instruction and classroom climate children experience during their school day."
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ paddingTop: '1em' }}>
							<Grid container /* direction="row" */>
								<Grid item xs={12}>
									<ArrowDetail
										icon={SearchEngineImage}
										iconAlt="Observe"
										title="Performing Field Studies"
										text="Over the course of a research partnership with a Southeastern school district, we developed a vision for Pre-K quality and determined what practices should be measured in classrooms that would provide us with standardized assessment of the quality of the instructional practices being implemented in those classrooms. We chose specific practices that we found to be consistently predictive of children’s academic and self-regulatory gains. 
                      We carefully trained and certified observers to collect a wide variety of information about the participating classrooms across an entire school day at several points over the course of the school year throughout the four-year partnership. To promote rapid cycle continuous quality improvement, data were analyzed and organized into reports given back to teachers and coaches within three weeks of each data collection.
                      "
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							// style={{ paddingTop: '1em', paddingBottom: '1em' }}
						>
							<Grid container /* direction="row" */>
								<Grid item xs={12}>
									<ArrowDetail
										icon={MedalImage}
										iconAlt="Medal"
										title="Identifying the CHALK Classroom Practices"
										text="Through this work, we identified 8 clusters of classroom practices that were associated with children’s gains
                       across a number of domains. Validation was conducted with groups of teachers, coaches and even into kindergarten. 
                      The idea of CHALK was eventually born out of a commitment to rigorous research designed to improve children’s early education. "
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ paddingTop: '1em', paddingBottom: '1em' }}>
							<Grid container /* direction="row" */>
								<Grid item xs={12}>
									<ArrowDetail
										icon={LightbulbImage}
										iconAlt="Lightbulb"
										title="Creating our Vision"
										text="Over the course of the partnership, schools began to focus their professional development on the CHALK practices.
                       Instructional coaches worked with teachers to improve these practices, but some were much harder to improve than others.
                       Moreover, coaches were reliant on data collected by researchers rather than data they collected themselves.
                       We concluded that coaches need a tool that helps them connect what they see in the classroom with questions that help guide their coaching conversations,
                        in addition to concrete strategies for practice improvement. "
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={{ paddingTop: '1em', paddingBottom: '1em' }}>
							<Grid container /* direction="row" */>
								<Grid item xs={12}>
									<ArrowDetail
										icon={HighFiveImage}
										iconAlt="High Five"
										title="Empowering Teachers and Coaches"
										text="CHALK is focused on empowering coaches and transforming classroom experiences. 
                       To achieve this goal, we challenged an interdisciplinary team of coaches, teachers, principals, policy makers, researchers and other stakeholders to bring their unique expertise and perspectives to the table.
                        Finally, we are bringing the vision for the CHALK to life."
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					{/* //rajeev */}
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
								<Grid item xs={10} component={Typography} className={classes.ReadMoreTitle}>
									<strong>Read more about research here:</strong>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="column">
								<Grid item xs={12}>
									<BlueBarDetail text="Data-Driven Improvement in Pre-kindergarten Classrooms: Report From a Partnership in an Urban District" />
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
								<Grid item xs={2} />
								<Grid item xs={10} component={Typography} className={classes.getInvolvedTitle}>
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
								<Grid container direction="row" justify="flex-start" alignItems="center">
									<Grid item xs={1} />
									<Grid item xs={4}>
										<Typography className={classes.mailingListText}>
											Stay informed with our mailing list!
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Grid container direction="row" justify="flex-end" alignItems="center">
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
										</Grid>
									</Grid>
									<Grid item xs={3}>
										<Grid container direction="row" justify="center" alignItems="center">
											<Fab
												variant="extended"
												onClick={this.handleSubmit}
												className={classes.mailingListButton}
											>
												<strong>Join mailing list</strong>
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							)}
						</Grid>
					</Grid>
				</div>
				{/*  <div className={classes.mobileRoot}>
          {this.state.events ? (
            <ClickAwayListener onClickAway={this.handleClickAwayEvents}>
              <UpcomingEventsModal />
            </ClickAwayListener> 
          ) : this.state.pilotModal ? (
              <PilotModal handleClose={this.handleClose} firebase={this.props.firebase}/>
          ) : this.state.demo ? (
            <DemoModal handleClose={this.handleClose} />
          ) : (
            <div />
          )}
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 10}}>
              <img src={CoachLandingMobileImage} alt = "Coach and Teacher" width="100%" style={{postion: 'relative'}}/>
              <Grid item xs={10} style={{position: 'absolute'}}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid xs={8} style={{paddingTop: '0vh'}}>
                    <Typography className={classes.chalkTitle}>
                      <strong>C</strong>oaching to
                    </Typography>
                    <Typography className={classes.chalkTitle}>
                      <strong>H</strong>elp
                    </Typography>
                    <Typography className={classes.chalkTitle}>
                      <strong>A</strong>ctivate
                    </Typography>
                    <Typography className={classes.chalkTitle}>
                      <strong>L</strong>earning for
                    </Typography>
                    <Typography className={classes.chalkTitle}>
                      <strong>K</strong>ids
                    </Typography>
                    <Typography className={classes.tagline} style={{paddingTop: '9vh'}}>
                      Empowering coaches and teachers
                    </Typography>
                    <Typography className={classes.tagline}>
                      to use meaningful data
                    </Typography>
                    <Typography className={classes.tagline}>
                      to benefit young children
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Grid container direction="column" justify="center" alignItems="center" style={{width: '100%'}}>
                      <Grid item alignItems="center">
                        <img src={iPadImage} alt="tablet" width='100%'/>
                      </Grid>
                      <Grid item style={{paddingTop: '4vh'}}>
                        <Fab onClick={this.handleDemoButton} variant="extended" className={classes.demoButton}> 
                          <strong>SEE DEMO</strong>
                        </Fab>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.section}>
              <Grid item>
                <Typography className={classes.sectionTitle}>
                  Why <strong>CHALK?</strong>
                </Typography>
              </Grid>
              <Grid item style={{paddingBottom: '3em', paddingTop: '2em', width:"90%"}}>
                <Impact
                  icon1={SchoolImage}
                  color='#094492'
                  title1="IMPACT"
                  position="center"
                  text1="Research shows that high-quality pre-k education supports
                        children's early cognitive development and future achievement."
                />
              </Grid>
              <Grid item style={{paddingBottom: '3em', width:"90%"}}>
                <Impact
                  icon1={ProblemOrangeImage}
                  color='#E55529'
                  title1="PROBLEM"
                  position="center"
                  text1="However, current tools to observe and track classroom 
                        practices over time are difficult to use and time-consuming."
                />
              </Grid>
              <Grid item style={{paddingBottom: '1em', width: '90%'}}>
                <Impact
                  icon1={LightbulbYellowImpactImage}
                  color='#ffd300'
                  title1="MISSION"
                  position="flex-start"
                  paddingTop='1em'
                  text1={<div>
                          CHALK&apos;s mission is to advance pre-k quality with an easy-to-use 
                          tool for coaches and teachers that:
                          <ul>
                            <li>Focuses classroom observations on effective practices</li>
                            <li>Links results to coaching strategies</li>
                            <li>Accelerates professional growth through teacher-created action plans</li>
                          </ul>
                        </div>}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="stretch" style={{backgroundColor: '#459aeb'}} className={classes.section}>
              <Grid item style={{padding: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon1={LogoImage}
                    altText="Owl Logo"
                    title1="Key Classroom Practices"
                    text1="Our tool focuses on key classroom practices that predict
                          children's gains across multiple academic and self-regulation
                          domains."
                  />
                </Grid>
              </Grid>
              <Grid item style={{paddingLeft: 30, paddingBottom: 30, paddingRight: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon1={SearchEngineImage}
                    altText="Observe"
                    title1="Observation Tools"
                    text1="CHALK provides targeted observation tools that allow
                          instructional coaches to easily track key classroom
                          practices on their digital devices in real-time."
                  />
                </Grid>
              </Grid>
              <Grid item style={{paddingLeft: 30, paddingBottom: 30, paddingRight: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon1={PieChartImage}
                    altText="Pie Chart"
                    title1="Visualized Data"
                    text1="Our tool instantly transforms observation data into
                          user-friendly visualizations for coaches and teachers
                          to engage in data-driven coaching conversations for
                          professional growth."
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems = "center" className={classes.section} style={{backgroundColor: '#dbebfb'}}>
              <Grid item style={{padding: 20}}>
                <Typography className={classes.sectionTitle}>
                  How <strong>CHALK</strong> Works
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="center" alignItems="center">
                  <img src={CoachingCycleFullMobileImage} alt="Coaching Cycle" width="90%" style={{paddingBottom: 20}}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.section}>
              <Grid item style={{padding: 20}}>
                <Typography className={classes.sectionTitle}>
                  How <strong>CHALK</strong> empowers coaches and teachers
                </Typography>
              </Grid>
              <Grid item style={{paddingTop: '2em'}}>
                <InvolveDetail
                  icon1={HighFiveImage}
                  iconAlt1="High Five"
                  title1="Empowering Teachers and Coaches"
                  text1="Our tool encourages coaches and teachers to work together
                  in setting data-driven goals to improve specifc classroom
                  practices that benefit children."
                />
              </Grid>
              <Grid item style={{paddingTop: '3em'}}>
                <InvolveDetail
                  icon1={BookImage}
                  iconAlt1="Book"
                  title1="Grounded in Rigorous Research"
                  text1="Users are guided to observe targeted instructional practices that
                  have predicted academic and self-regulation gains for children
                  across hundreds of observations in early childhood classrooms."
                />
              </Grid>
              <Grid item style={{paddingTop: '3em'}}>
                <InvolveDetail
                  icon1={FeedbackImage}
                  iconAlt1="Feedback"
                  title1="Individualized and Timely Feedback"
                  text1="Data collected from classroom observations are
                        instantly transformed into simple visualizations and 
                        guidance for next steps."
                />
              </Grid>
              <Grid item style={{paddingTop: '3em'}}>
                <InvolveDetail
                  icon1={MedalImage}
                  iconAlt1="Medal"
                  title1="Target Key Classroom Practices"
                  text1="Our tool focuses on characteristics of the classroom 
                        environment that have a direct, meaningful impact on 
                        children's learning."
                />
              </Grid>
              <Grid item style={{paddingTop: '3em'}}>
                <InvolveDetail
                  icon1={LightbulbImage}
                  iconAlt1="Lightbulb"
                  title1="Emphasis on Teacher Learning"
                  text1="Teacher reflection and goal-setting in collaboration
                    with responsive coaches builds a culture of learning
                    and self efficacy."
                />
              </Grid>
              <Grid item style={{paddingTop: '3em', paddingBottom: '2em'}}>
                <InvolveDetail
                  icon1={BoxImage}
                  iconAlt1="Box"
                  title1="Works Across Any Curriculum"
                  text1="We focus on classroom practices that are 
                    important across curricula so teachers and coaches 
                    can apply this tool to any curriculum they use."
                />
              </Grid>
            </Grid>
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{backgroundColor: '#dbebfb'}}
              className={classes.section}
            >
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: '1em'}}>
                  <Grid item xs={12} component={Typography} className={classes.getInvolvedTitle}>
                    <strong>GET INVOLVED</strong>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <InvolveDetail
                  icon1={PilotProgramImage}
                  iconAlt1="Participation"
                  title1="Participate in our pilot program!"
                  text1="If you are interested in piloting our tool,
                    we would love your feedback so we can make CHALK
                    the best it can be!"
                  button="Fill out form"
                  onClick={this.handlePilotButton}
                />
              </Grid>
              <Grid item>
                <InvolveDetail
                  icon1={EventsImage}
                  iconAlt1="People"
                  title1="Join us at our upcoming events!"
                  text1="We give frequent presentations and demonstrations
                    of CHALK. See a list of these events here!"
                  button="View our events"
                  onClick={this.handleEventsButton}
                />
              </Grid>
              <Grid item style={{width: '100%'}}>
                {this.state.emailAdded ? (
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography className={classes.mailingListText} style={{textAlign: 'center', fontSize: 16}}>
                        You have been added to our mailing list.
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container direction="column" justify="flex-start" alignItems="center">
                    <Grid item>
                      <Typography className={classes.mailingListText}>
                        Stay informed with our mailing list!
                      </Typography>
                    </Grid>
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row" justify="center" alignItems="stretch">
                      <TextField
                        label="Enter your email here" //italic 
                        margin="normal"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        helperText={this.state.emailError}
                        InputLabelProps={{style: {color: '#dbdbdb', fontSize: 20, marginLeft: '0.5em'}}}
                        InputProps={{classes: {input: classes.input}, disableUnderline: true}}
                        className={classes.textField}
                      />
                      </Grid>
                    </Grid>
                    <Grid item>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Fab variant="extended" onClick={this.handleSubmit} className={classes.mailingListButton}>
                        <strong>Join mailing list</strong>
                      </Fab>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" style={{paddingTop: '2em'}} className={classes.section}>
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Typography className={classes.partnersText}>
                    Working closely with our partners to better education
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{width: '97%'}}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item>
                    <img src={MNPSLogoImage} alt="Metro Nashville Public Schools" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item>
                    <img src={UnitedWayLogoImage} alt="United Way" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item>
                    <img src={PreschoolPromiseLogoImage} alt="Preschool Promise" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item>
                    <img src={AbtLogoImage} alt="Abt Associates" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item>
                    <img src={WondryLogoImage} alt="The Wondry" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item>
                    <img src={VanderbiltPeabodyLogoImage} alt="Vanderbilt Peabody College" className={classes.partnerLogo} />
                  </Grid>
                  <Grid item style={{paddingTop: '1em'}}>
                    <img src={UDaytonLogoImage} alt="University of Dayton" className={classes.partnerLogo} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>*/}
			</div>
		);
	}
}

OurStory.propTypes = {
	classes: PropTypes.object.isRequired
	// firebase: PropTypes.object.isRequired
};

export default withStyles(styles)(OurStory);
