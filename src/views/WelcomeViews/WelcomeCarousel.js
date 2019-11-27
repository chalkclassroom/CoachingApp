import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import topIllustration from "../../assets/icons/HomepageIllustration.svg"
import Helmet from 'react-helmet';
import childrenWalking from '../../assets/icons/Benefits2.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/slides/slide1.png";
import slide2 from "../../assets/slides/slide2.png";
import slide3 from "../../assets/slides/slide3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Logo from '../../logo.svg';
import PieChartSvg from '../../assets/icons/PieChartSvg.svg';
import HighFiveSvg from '../../assets/icons/HighFiveSvg.svg';
import BookSvg from '../../assets/icons/BookSvg.svg';
import FeedbackSvg from '../../assets/icons/FeedbackSvg.svg';
import MedalSvg from '../../assets/icons/MedalSvg.svg';
import LightbulbSvg from '../../assets/icons/LightbulbSvg.svg';
import BoxSvg from '../../assets/icons/BoxSvg.svg';
import SchoolSvg from '../../assets/icons/SchoolSvg.svg';
import ProblemSvg from '../../assets/icons/ProblemSvg.svg';
import LightbulbImpactSvg from '../../assets/icons/LightbulbImpactSvg.svg';
import ProblemOrangeSvg from '../../assets/icons/ProblemOrangeSvg.svg';
import LightbulbYellowImpactSvg from '../../assets/icons/LightbulbYellowImpactSvg.svg';
import PilotProgramSvg from '../../assets/icons/PilotProgramSvg.svg';
import EventsSvg from '../../assets/icons/EventsSvg.svg';
import SearchEngineSvg from '../../assets/icons/SearchEngineSvg.svg';
import MNPSLogo from '../../assets/icons/MNPSLogo.jpg';
import AbtLogo from '../../assets/icons/AbtLogo.png';
import PreschoolPromiseLogo from '../../assets/icons/PreschoolPromiseLogo.jpg';
import UDaytonLogo from '../../assets/icons/UDaytonLogo.jpg';
import UnitedWayLogo from '../../assets/icons/UnitedWayLogo.jpg';
import VanderbiltPeabodyLogo from '../../assets/icons/VanderbiltPeabodyLogo.png';
import WondryLogo from '../../assets/icons/WondryLogo.png';
//import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import LandingDetail from '../../components/LandingPageComponents/LandingDetail.js';
import FeaturesCard from '../../components/LandingPageComponents/FeaturesCard.js';
import Impact from '../../components/LandingPageComponents/Impact.js';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import iPadSvg from '../../assets/icons/iPadSvg.svg';
import CoachWithAppSvg from '../../assets/icons/CoachWithAppSvg.svg';
import BlueMaskSvg from '../../assets/icons/BlueMaskSvg.svg';
import CoachWithAppJpg from '../../assets/icons/CoachWithAppJpg.JPG';
import Step1Svg from '../../assets/icons/Step1Svg.svg';
import Step2Svg from '../../assets/icons/Step2Svg.svg';
import Step3Svg from '../../assets/icons/Step3Svg.svg';
import Step4Svg from '../../assets/icons/Step4Svg.svg';
import Step5Svg from '../../assets/icons/Step5Svg.svg';
import CoachingCycleSvg from '../../assets/icons/CoachingCycleSvg.svg';
import CoachingCycleFullSvg from '../../assets/icons/CoachingCycleFullSvg.svg';
import CoachLandingSvg from '../../assets/CoachLandingSvg.svg';
import CoachLandingPng from '../../assets/CoachLandingPng.png';
import UpcomingEventsModal from '../../components/LandingPageComponents/UpcomingEventsModal.js';
import { ClickAwayListener } from '@material-ui/core/es';

const styles = {
  paper: {
    background: 'blue'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "calc(100%-100px)",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    width: "100%"
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%"
  },
  cardContent: {
    flexGrow: 1
  },
  slide: {
    width: "100%",
    height: "calc(100vh - 80px)",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center"
  },
  slideImg: {
    position: "relative",
    top: "2px",
    maxWidth: "100vw",
    maxHeight: "calc(100vh - 82px)"
  },
  chalkTitle: {
    fontFamily: 'Arimo',
    fontSize: 50,
    color: 'white',
    lineHeight: '130%',
    letterSpacing: '0.07em',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  tagline: {
    fontFamily: 'Arimo',
    fontSize: 24,
    color: 'white',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  blueMask: {
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(to right, rgba(69, 154, 235, 0.3), rgba(69, 154, 235, 0.3))',
    width: '100%',
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
  input:{
    disableUnderline: true,
    color: '#233342',
    fontSize: 20,
    marginLeft: '0.5em'
  },
};


class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: false,
      pilotForm: false,
      demo: false,
      email: "",
      emailAdded: false,
      errors: false,
      emailError: '',
    }
  }

  handleEventsButton = () => {
    this.setState({ events: true });
  };

  handleClickAwayEvents = () => {
    this.setState({ events: false });
  }

  handleSubmit = (event) =>{
    this.validateEmail();
    if (!this.state.errors){
      this.props.firebase.emailListSignUp({
        email: this.state.email,
      })
      .then(function(isSuccess) {
        if(isSuccess){
          this.setState({ emailAdded: true });
        }
      });
    }
  };

  validateState = (name, value) => {
    switch (name) {
      case 'email':
        if (value.length === 0) {
          this.setState({
            'emailError': 'Cannot be empty or contain numbers',
          });
        } else if (!this.validateEmail(value)) {
          this.setState({
            'emailError': 'Not a valid email address',
            'errors': true,
          });
        } else {
          this.setState({
            'emailError': '',
            'errors': false,
          });
        }
        break;
      default:
        this.validateState('email', this.state.email);
        break;
    }
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.validateState(name, event.target.value);
  };

  render() {
    const { classes } = this.props;
    return(
      <div>
        <head>
          <link href="https://fonts.googleapis.com/css?family=Arimo&display=swap" rel="stylesheet" />
        </head>
        <body>
          {this.state.events ? (
            <ClickAwayListener onClickAway={this.handleClickAwayEvents}>
              <UpcomingEventsModal />
            </ClickAwayListener> 
          ) : (
            <div />
          )}
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 10}}>
              <img src={CoachLandingPng} alt = "Coach and Teacher" width="100%" style={{postion: 'relative'}}/>
              <Grid item xs={10} style={{position: 'absolute'}}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid xs={6} style={{paddingTop: '5vh'}}>
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
                    <Typography className={classes.tagline} style={{paddingTop: '10vh'}}>
                      Empowering coaches and teachers
                    </Typography>
                    <Typography className={classes.tagline}>
                      to use meaningful data
                    </Typography>
                    <Typography className={classes.tagline}>
                      to benefit young children
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Grid container direction="column" justify="center" alignItems="center" style={{}}>
                      <Grid item style={{}} alignItems="center">
                        <img src={iPadSvg} alt="tablet" width='100%'/>
                      </Grid>
                      <Grid item style={{paddingTop: '4vh'}}>
                        <Fab variant="extended" style={{color: '#459aeb', backgroundColor: '#ffffff', fontSize: 16, fontFamily: 'Arimo', fontStyle: 'bold'}}> 
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
                <Typography style={{fontFamily: 'Arimo', color: '#2F4B65', fontSize: 42, textAlign: 'center'}}>
                  Why <strong>CHALK?</strong>
                </Typography>
              </Grid>
              <Grid item style={{paddingRight: '3em', paddingBottom: '2em', width:"90%"}}>
                <Impact
                  icon={SchoolSvg}
                  color='#094492'
                  title="IMPACT"
                  text="Research shows that high-quality pre-k education supports
                        children's early cognitive development and future achievement."
                />
              </Grid>
              <Grid item style={{paddingRight: '3em', paddingBottom: '2em', width:"90%"}}>
                <Impact
                  icon={ProblemOrangeSvg}
                  color='#E55529'
                  title="PROBLEM"
                  text="However, current tools to observe and track classroom 
                        practices over time are difficult to use and time-consuming."
                />
              </Grid>
              <Grid item style={{paddingRight: '3em', width: '90%'}}>
                <Impact
                  icon={LightbulbYellowImpactSvg}
                  color='#ffd300'
                  title="MISSION"
                  text={<div>
                          CHALK's mission is to advance pre-k quality with an easy-to-use 
                          tool for coaches and teachers that:
                          <ul>
                            <li>Focuses classroom observations on effective practices</li>
                            <li>Links results to coaching strategies</li>
                            <li>Accelerates professional growth through teacher-reacted action plans around practice improvement</li>
                          </ul>
                        </div>}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="stretch" style={{backgroundColor: '#459aeb'}} className={classes.section}>
              <Grid item xs={4} style={{padding: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon={Logo}
                    altText="Owl Logo"
                    title="Key Classroom Practices"
                    text="Our tool focuses on key classroom practices that predict
                          children's gains across multiple academic and self-regulation
                          domains."
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} style={{paddingTop: 30, paddingBottom: 30, paddingRight: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon={SearchEngineSvg}
                    altText="Observe"
                    title="Observation Tools"
                    text="CHALK provides targeted observation tools that allow 
                          instructional coaches to easily track key classroom 
                          practices on their digital devices in real-time."
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} style={{paddingTop: 30, paddingBottom: 30, paddingRight: 30}}>
                <Grid container justify="center" alignItems="center" style={{height: '100%'}}>
                  <FeaturesCard
                    icon={PieChartSvg}
                    altText="Pie Chart"
                    title="Visualized Data"
                    text="Our tool instantly transforms observation data into 
                          user-friendly visualizations for coaches and teachers 
                          to engage in data-driven coaching conversations for 
                          professional growth."
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems = "center" className={classes.section} style={{backgroundColor: '#dbebfb'}}>
              <Grid item style={{padding: 20}}>
                <Typography style={{fontSize: 42, color:'#2F4B65', textAlign: 'center', fontFamily: 'Arimo'}}>
                  How <strong>CHALK</strong> Works
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="center" alignItems="center">
                  <img src={CoachingCycleFullSvg} alt="Coaching Cycle" width="90%" style={{paddingBottom: 20}}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.section}>
              <Grid item style={{padding: 20}}>
                <Typography style={{fontSize: 42, color:'#2F4B65', textAlign: 'center', fontFamily: 'Arimo'}}>
                  How <strong>CHALK</strong> empowers coaches and teachers
                </Typography>
              </Grid>
              <Grid item style={{paddingTop: '2em'}}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <LandingDetail
                      icon1={HighFiveSvg}
                      iconAlt1="High Five"
                      title1="Empowering Teachers and Coaches"
                      text1="Our tool encourages coaches and teachers to work together
                      in setting data-driven goals to improve specifc classroom
                      practices that benefit children."
                      icon2={BookSvg}
                      iconAlt2="Book"
                      title2="Grounded in Rigorous Research"
                      text2="Users are guided to observe targeted instructional practices that
                      have predicted academic and self-regulation gains for children
                      across hundreds of observations in early childhood classrooms."
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{paddingTop: '3em'}}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <LandingDetail
                      icon1={FeedbackSvg}
                      iconAlt1="Feedback"
                      title1="Individualized and Timely Feedback"
                      text1="Data collected from classroom observations are
                        instantly transformed into simple visualizations and 
                        guidance for next steps."
                      icon2={MedalSvg}
                      iconAlt2="Medal"
                      title2="Target Key Classroom Practices"
                      text2="Our tool focuses on characteristics of the classroom 
                        environment that have a direct, meaningful impact on 
                        children's learning."
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{paddingTop: '3em', paddingBottom: '2em'}}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <LandingDetail
                      icon1={LightbulbSvg}
                      iconAlt1="Lightbulb"
                      title1="Emphasis on Teacher Learning"
                      text1="Teacher reflection and goal-setting in collaboration
                        with responsive coaches builds a culture of learning
                        and self efficacy."
                      icon2={BoxSvg}
                      iconAlt2="Box"
                      title2="Works Across Any Curriculum"
                      text2="We focus on classroom practices that are 
                        important across curricula so teachers and coaches 
                        can apply this tool to any curriculum they use."
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center" style={{backgroundColor: '#dbebfb'}} className={classes.section}>
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={{paddingBottom: '1em'}}>
                  <Grid item xs={2} />
                  <Grid item xs={10} component={Typography} style={{color: '#2F4B65', fontSize: 42, paddingTop: 20, width: '100%', fontFamily: 'Arimo'}}>
                    <strong>GET INVOLVED</strong>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <LandingDetail
                      icon1={PilotProgramSvg}
                      iconAlt1="Participation"
                      title1="Participate in our pilot program!"
                      text1="If you are interested in piloting our tool,
                        we would love your feedback so we can make CHALK
                        the best it can be!"
                      button1="Fill out form"
                      icon2={EventsSvg}
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
              <Grid item style={{width: '100%', paddingTop: '2em'}}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item xs={1} />
                  <Grid item xs={4}>
                    <Typography style={{color: '#2f4b65', fontSize: 22, paddingTop: 30, fontFamily: 'Arimo', fontWeight: 'bold'}}>
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
                      InputLabelProps={{style: {color: '#dbdbdb', fontSize: 20, marginLeft: '0.5em'}}}
                      InputProps={{classes: {input: classes.input}, disableUnderline: true}}
                      style={{backgroundColor: 'white', borderRadius: 10, textAlign: 'center', width: '90%', fontFamily: 'Arimo'}}/>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Fab variant="extended" onClick={this.handleSubmit} style={{color: '#ffffff', backgroundColor: '#459aeb', fontSize: 14, fontFamily: 'Arimo', letterSpacing: '0.03em'}}>
                      <strong>Join mailing list</strong>
                    </Fab>
                    </Grid>
                  </Grid>
                </Grid>
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
                    <img src={MNPSLogo} alt="Metro Nashville Public Schools" style={{maxWidth:125}}/>
                  </Grid>
                  <Grid item>
                    <img src={UnitedWayLogo} alt="United Way" style={{maxWidth:125}} />
                  </Grid>
                  <Grid item>
                    <img src={PreschoolPromiseLogo} alt="Preschool Promise" style={{maxWidth:125}} />
                  </Grid>
                  <Grid item>
                    <img src={AbtLogo} alt="Abt Associates" style={{maxWidth:125}} />
                  </Grid>
                  <Grid item>
                    <img src={WondryLogo} alt="The Wondry" style={{maxWidth:125}} />
                  </Grid>
                  <Grid item>
                    <img src={VanderbiltPeabodyLogo} alt="Vanderbilt Peabody College" style={{maxWidth:125}} />
                  </Grid>
                  <Grid item>
                    <img src={UDaytonLogo} alt="University of Dayton" style={{maxWidth:125}} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </body>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Homepage);
