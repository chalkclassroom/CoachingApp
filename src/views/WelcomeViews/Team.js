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
import PreschoolPromiseLogo from "../../assets/icons/PreschoolPromiseLogo_NoTagLine.jpg";
import UnitedWayLogo from "../../assets/icons/UnitedWayLogo.jpg";
import UDaytonLogo from "../../assets/icons/UDaytonLogo.jpg";
import VanderbiltPeabodyLogo from "../../assets/icons/VanderbiltPeabodyLogo.png";
import WondryLogo from "../../assets/icons/TheWondry.png";
import VanderbiltEngineeringLogo from "../../assets/icons/engineering.png";
import AbtLogo from "../../assets/icons/AbtLogo.png";
import * as Constants from '../../constants';


const styles = {
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    height: '100vh'
  },
  titleText: {
    paddingTop: 20,
    color: 'black',
    textAlign: 'center',
  },
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
                    person={Constants.CC}
                    open={this.state.open==='CC'}
                    handleClick={this.openCC}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={Constants.DM}
                    open={this.state.open==='DM'}
                    handleClick={this.openDM}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
              {this.state.open==='CC' ? (
                <TeamMemberExpansion
                  person={Constants.CC}
                />
              ) : this.state.open==='DM' ? (
                <TeamMemberExpansion
                  person={Constants.DM}
                />
              ) : (
                null
              )}
              <Grid container direction="row" justify="center" alignItems="center" style={{paddingTop: 15}}>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={Constants.KN}
                    open={this.state.open==='KN'}
                    handleClick={this.openKN}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TeamMemberCard
                    person={Constants.CS}
                    open={this.state.open==='CS'}
                    handleClick={this.openCS}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
              {this.state.open==='KN' ? (
                <TeamMemberExpansion
                  person={Constants.KN}
                />
              ) : this.state.open==='CS' ? (
                <TeamMemberExpansion
                  person={Constants.CS}
                />
              ) : (
                null
              )}
            </Grid>
            <div style={{padding: 40}} />
            <Grid item>
              <Grid container direction="row" justify="center" alignItems="center">
                <div style={{width: '100%', backgroundColor: '#d9eafb', paddingTop: 5, paddingBottom: 15}}>
                  <Grid item style={{paddingBottom: 20}}>
                    <Typography variant="h3" className={classes.titleText}>
                      Advisors
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center" alignItems="center">
                      <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.DF} />
                        </Grid>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.MF} />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.PM} />
                        </Grid>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.LM} />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.DS} />
                        </Grid>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.JW} />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" style={{paddingBottom: 15}}>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.SJW} />
                        </Grid>
                        <Grid item xs={6}>
                          <ProjectAdvisor person={Constants.LW} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <div style={{padding: 20}} />
            <Grid item>
              <Typography variant="h3" className={classes.titleText}>
                Partners
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={UDaytonLogo} alt="University of Dayton" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={PreschoolPromiseLogo} alt="Preschool Promise" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={UnitedWayLogo} alt="United Way" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={VanderbiltEngineeringLogo} alt="Vanderbilt School of Engineering" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={WondryLogo} alt="The Wond'ry" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={VanderbiltPeabodyLogo} alt="Peabody College" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <img src={AbtLogo} alt="Abt Associates" style={{maxWidth: 250}}/>
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    {/* insert MNPS logo here */}
                  </Grid>
                </Grid>
                <Grid item xs={4} style={{padding: 20}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    {/* insert TSU logo here */}
                  </Grid>
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

