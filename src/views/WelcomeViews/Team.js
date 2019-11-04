import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import FirebaseContext from "../../components/Firebase/context";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import ProjectAdvisor from '../../components/ProjectAdvisor';
import TeamMemberCard from '../../components/TeamMemberCard';
import TeamMemberExpansion from "../../components/TeamMemberExpansion";

const CC = {
  'name': 'Caroline Christopher, Ph.D.',
  'initials': 'CC',
  'role': 'Principal Investigator',
  'description': 'Dr. Christopher is the Principal Investigator on the project. In 2018, she received a grant from the National Science Foundation (DRK-12-1813008) to develop a web-based coaching tool that guides coaches to collect objective observation data and then links those data with coaching practices. She is currently a Research Assistant Professor at Vanderbilt University.'
};

const DM = {
  'name': 'Deanna Meador, M.A.',
  'initials': 'DM',
  'role': '???',
  'description': 'Ms. Meador is the Associate Director of Vanderbilt University’s ' +  
  'Center for Innovation, the Wond’ry, and serves as a content developer and liaison between the education ' + 
  'research team and the Wond’ry interns. Her prior background working with the Peabody Research Office, ' +
  'in-depth knowledge of their data collection measures and methods, as well as technical development and ' + 
  'user interface skills makes for a valuable addition to the project team.'
};

const KN = {
  'name': 'Katherine Newman, Ph.D.',
  'initials': 'KN',
  'role': 'Research Coordinator',
  'description': 'Dr. Newman is the Research Coordinator on this project.  She comes to us with both a researcher and a coaching lens as she received her doctorate in Teaching and Learning from Vanderbilt University and has worked as an instructional coach for Metro Nashville Public Schools.  She was previously one of our coaching partners and has classroom experience as a kindergarten and fifth grade teacher.'
};

const CS = {
  'name': 'Clare Speer',
  'initials': 'CS',
  'role': 'Software Developer',
  'description': 'Ms. Speer is a Software Developer on this project.  She ' + 
  'contributes significantly to both the research team and to the engineering team with her background ' + 
  'in statistics and programming.  This combination of skills allows her to understand the language ' +
  'of both groups and provides continuity over the course of the project in terms of the programming ' +
  'required to implement the coaching tool’s functionality.'
};

const DF = {
  'name': 'Dale Farran, Ph.D.',
  'role': 'Former Project Affiliate, Early Childhood Content Expert',
  'job': 'Professor of Teaching and Learning',
  'affiliation': 'Vanderbilt University'
};

const MF = {
  'name': 'Mary Fuhs, Ph.D.',
  'role': 'Director of CQ-REF Pilot Study',
  'job': 'Assistant Professor of Psychology',
  'affiliation': 'University of Dayton'
};

const PM = {
  'name': 'Percival Matthews, Ph.D.',
  'role': 'CQ-REF Advisory Board Member',
  'job': 'Assistant Professor of Educational Psychology',
  'affiliation': 'University of Wisconsin'
};

const LM = {
  'name': 'Laura Moore, M.P.P.',
  'role': 'CQ-REF Advisory Board Member',
  'job': 'Deputy Policy Director for Opportunity Insights',
  'affiliation': 'Harvard University'
};

const SJW = {
  'name': 'Sandra Jo Wilson, Ph.D.',
  'role': 'CQ-REF Pilot Study Independent Evaluator',
  'job': 'Principal Associate, Social and Economic Policy',
  'affiliation': 'Abt Associates'
};

const LW = {
  'name': 'Lisa Wiltshire, M.S.',
  'role': 'CQ-REF Advisory Board Member',
  'job': 'Policy Director',
  'affiliation': 'Tennesseans for Quality Early Education'
};

const JW = {
  'name': 'Jules White',
  'role': 'Director of CQ-REF Pilot Study',
  'job': 'Assistant Professor of Psychology',
  'affiliation': 'University of Dayton'
};

const DS = {
  'name': 'Doug Schmidt',
  'role': 'Director of CQ-REF Pilot Study',
  'job': 'Assistant Professor of Psychology',
  'affiliation': 'University of Dayton'
};


const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#ffffff',
        height: '100vh'
    },
    grow: {
        flexGrow: 1,
    },
    card: {
      width: '70vw',
      height: '40vh',
      padding: 50
    },
    groupPhoto: {
      height: 0,
      paddingTop: '50%'
    },
    titleText: {
      padding: 20,
      color: 'black',
      textAlign: 'center',
    },
    groupImage: {
      marginTop: 50,
      borderRadius: '15px 15px 15px 15px',
      width: '70%',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      //border: '5px solid black',
      //borderCollapse: 'separate',
      //overflow: 'hidden',
      //perspective: '1px'
    },
    individualImage: {
      width: '30%',
      borderRadius: '15px',
    },
    overlay: {
      background: 'rgb(0, 0, 0, 0.5)',
      color: '#292525',
      width: '100%'
    },
    positionText: {
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15
    },
    descriptionText: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: 'justify'
    },
    descriptionTextNew: {
      textAlign: 'justify',
      paddingBottom: 20
    },
    descriptionNameText: {
      textAlign: 'left',
      paddingTop: 20
    },
    descriptionPositionText: {
      textAlign: 'left',
      paddingBottom: 6
    },
    descriptionText2: {
      paddingLeft: 40,
      paddingRight: 150,
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: 'justify'
    },
    imageBox: {
      width: '60%',
      //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      textAlign: 'center',
      borderRadius: '15px',
      //'0 15px 25px 0 rgba(9, 68, 146, 0.2), 0 15px 25px 0 rgba(9, 68, 146, 0.19)'
    }
};

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null
    }
  }

  openCC = () => {
    if (this.state.open === 'CC'){
      this.setState({
        open: null
      })
    } else {
      this.setState({
        open: 'CC'
      })
    }
  }

  openDM = () => {
    if (this.state.open === 'DM'){
      this.setState({
        open: null
      })
    } else {
      this.setState({
        open: 'DM'
      })
    }
  }

  openKN = () => {
    if (this.state.open === 'KN'){
      this.setState({
        open: null
      })
    } else {
      this.setState({
        open: 'KN'
      })
    }
  }

  openCS = () => {
    if (this.state.open === 'CS'){
      this.setState({
        open: null
      })
    } else {
      this.setState({
        open: 'CS'
      })
    }
  }

  render() {
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h3" className={classes.titleText}>
              Our Team
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center" alignItems="center" style={{paddingTop: 10}}>
              <Grid container direction="row" justify="center" alignItems="flex-start" style={{paddingTop: 10}}>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={CC}
                    open={this.state.open==='CC'}
                    handleClick={this.openCC}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={DM}
                    open={this.state.open==='DM'}
                    handleClick={this.openDM}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
              {this.state.open==='CC' ? (
                <TeamMemberExpansion
                  person={CC}
                />
              ) : this.state.open==='DM' ? (
                <TeamMemberExpansion
                  person={DM}
                />
              ) : (
                null
              )}
              <Grid container direction="row" justify="center" alignItems="center" style={{paddingTop: 15}}>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={KN}
                    open={this.state.open==='KN'}
                    handleClick={this.openKN}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={CS}
                    open={this.state.open==='CS'}
                    handleClick={this.openCS}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
              {this.state.open==='KN' ? (
                <TeamMemberExpansion
                  person={KN}
                />
              ) : this.state.open==='CS' ? (
                <TeamMemberExpansion
                  person={CS}
                />
              ) : (
                null
              )}
            </Grid>
            <Grid item>
              <Typography variant="h3" className={classes.titleText}>
                Advisors
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <ProjectAdvisor person={DF} />
                  </Grid>
                  <Grid item xs={5}>
                    <ProjectAdvisor person={MF} />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <ProjectAdvisor person={PM} />
                  </Grid>
                  <Grid item xs={5}>
                    <ProjectAdvisor person={LM} />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <ProjectAdvisor person={SJW} />
                  </Grid>
                  <Grid item xs={5}>
                    <ProjectAdvisor person={LW} />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Team.propTypes = {
    classes: PropTypes.object.isRequired
  };

const TeamRouter = withRouter(Team)
export default withStyles(styles)(TeamRouter);

