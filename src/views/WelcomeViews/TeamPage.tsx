import * as React from "react";
import * as PropTypes from "prop-types";
import AppBar from "../../components/AppBar";
import FirebaseContext from "../../components/Firebase/FirebaseContext.js";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ProjectAdvisor from "../../components/TeamPageComponents/ProjectAdvisor.tsx";
import TeamMemberCard from "../../components/TeamPageComponents/TeamMemberCard.tsx";
import TeamMemberExpansion from "../../components/TeamPageComponents/TeamMemberExpansion.tsx";
import PreschoolPromiseLogoImage from "../../assets/images/PreschoolPromiseLogoImage.jpg";
import UnitedWayLogoImage from "../../assets/images/UnitedWayLogoImage.jpg";
import UDaytonLogoImage from "../../assets/images/UDaytonLogoImage.jpg";
import VanderbiltPeabodyLogoImage from "../../assets/images/VanderbiltPeabodyLogoImage.png";
import WondryLogoImage from "../../assets/images/WondryLogoImage.png";
import VanderbiltEngineeringLogoImage from "../../assets/images/VanderbiltEngineeringLogoImage.png";
import AbtLogoImage from "../../assets/images/AbtLogoImage.png";
import MNPSLogoImage from "../../assets/images/MNPSLogoImage.jpg";
import * as Constants from "../../constants";

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    height: "100vh"
  },
  mobileRoot: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    height: "100vh"
  },
  titleText: {
    paddingTop: 20,
    color: "black",
    textAlign: "center",
    fontFamily: "Arimo"
  },
  "@media (max-width: 700px)": {
    root: {
      display: "none"
    }
  },
  "@media (min-width: 701px)": {
    mobileRoot: {
      display: "none"
    }
  }
};

interface Props {
  classes: Style
};

interface Style {
  root: string,
  mobileRoot: string,
  titleText: string,
  '@media (max-width: 700px)': string,
  '@media (min-width: 701px)': string
}

interface State {
  open: string
};

/** 
 * class for the team page 
 * @class TeamPage
*/
class TeamPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      open: null
    };
  }

  openCC = () => {
    if (this.state.open === "CC") {
      this.setState({
        open: null
      });
    } else {
      this.setState({
        open: "CC"
      });
    }
  };

  openDM = () => {
    if (this.state.open === "DM") {
      this.setState({
        open: null
      });
    } else {
      this.setState({
        open: "DM"
      });
    }
  };

  openKN = () => {
    if (this.state.open === "KN") {
      this.setState({
        open: null
      });
    } else {
      this.setState({
        open: "KN"
      });
    }
  };

  openCS = () => {
    if (this.state.open === "CS") {
      this.setState({
        open: null
      });
    } else {
      this.setState({
        open: "CS"
      });
    }
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
    return (
      <div>
        <div className={classes.root}>
          <FirebaseContext.Consumer>
            {(firebase: object) => <AppBar firebase={firebase} />}
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
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ paddingTop: 10 }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  style={{ paddingTop: 10 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <TeamMemberCard
                      person={Constants.CC}
                      open={this.state.open === "CC"}
                      handleClick={this.openCC}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TeamMemberCard
                      person={Constants.DM}
                      open={this.state.open === "DM"}
                      handleClick={this.openDM}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "CC" ? (
                  <TeamMemberExpansion person={Constants.CC} />
                ) : this.state.open === "DM" ? (
                  <TeamMemberExpansion person={Constants.DM} />
                ) : null}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ paddingTop: 15 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <TeamMemberCard
                      person={Constants.KN}
                      open={this.state.open === "KN"}
                      handleClick={this.openKN}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TeamMemberCard
                      person={Constants.CS}
                      open={this.state.open === "CS"}
                      handleClick={this.openCS}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "KN" ? (
                  <TeamMemberExpansion person={Constants.KN} />
                ) : this.state.open === "CS" ? (
                  <TeamMemberExpansion person={Constants.CS} />
                ) : null}
              </Grid>
              <div style={{ padding: 40 }} />
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d9eafb",
                      paddingTop: 5,
                      paddingBottom: 15
                    }}
                  >
                    <Grid item style={{ paddingBottom: 20 }}>
                      <Typography variant="h3" className={classes.titleText}>
                        Advisors
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          style={{ paddingBottom: 15 }}
                        >
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.DF} />
                          </Grid>
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.MF} />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          style={{ paddingBottom: 15 }}
                        >
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.PM} />
                          </Grid>
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.LM} />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          style={{ paddingBottom: 15 }}
                        >
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.DS} />
                          </Grid>
                          <Grid item xs={6}>
                            <ProjectAdvisor person={Constants.JW} />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          style={{ paddingBottom: 15 }}
                        >
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
              <div style={{ padding: 20 }} />
              <Grid item>
                <Typography variant="h3" className={classes.titleText}>
                  Partners
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={UDaytonLogoImage}
                        alt="University of Dayton"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={PreschoolPromiseLogoImage}
                        alt="Preschool Promise"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={UnitedWayLogoImage}
                        alt="United Way"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={VanderbiltEngineeringLogoImage}
                        alt="Vanderbilt School of Engineering"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={WondryLogoImage}
                        alt="The Wond'ry"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={VanderbiltPeabodyLogoImage}
                        alt="Peabody College"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={AbtLogoImage}
                        alt="Abt Associates"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={MNPSLogoImage}
                        alt="Metro Nashville Public Schools"
                        style={{ maxWidth: 250 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      {/* insert TSU logo here */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.mobileRoot}>
          <FirebaseContext.Consumer>
            {(firebase: object) => <AppBar firebase={firebase} />}
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
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ paddingTop: 10 }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  style={{ paddingTop: 10 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TeamMemberCard
                      person={Constants.CC}
                      open={this.state.open === "CC"}
                      handleClick={this.openCC}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "CC" ? (
                  <TeamMemberExpansion person={Constants.CC} />
                ) : null}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  style={{ paddingTop: 20 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TeamMemberCard
                      person={Constants.DM}
                      open={this.state.open === "DM"}
                      handleClick={this.openDM}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "DM" ? (
                  <TeamMemberExpansion person={Constants.DM} />
                ) : null}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  style={{ paddingTop: 20 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TeamMemberCard
                      person={Constants.KN}
                      open={this.state.open === "KN"}
                      handleClick={this.openKN}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "KN" ? (
                  <TeamMemberExpansion person={Constants.KN} />
                ) : null}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  style={{ paddingTop: 20 }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <TeamMemberCard
                      person={Constants.CS}
                      open={this.state.open === "CS"}
                      handleClick={this.openCS}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                {this.state.open === "CS" ? (
                  <TeamMemberExpansion person={Constants.CS} />
                ) : null}
              </Grid>
              <div style={{ padding: 40 }} />
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d9eafb",
                      paddingTop: 5,
                      paddingBottom: 15
                    }}
                  >
                    <Grid item style={{ paddingBottom: 20 }}>
                      <Typography variant="h3" className={classes.titleText}>
                        Advisors
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.DF} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.MF} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.PM} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.LM} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.DS} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.JW} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.SJW} />
                        </Grid>
                        <Grid item style={{ padding: 15 }}>
                          <ProjectAdvisor person={Constants.LW} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
              <div style={{ padding: 20 }} />
              <Grid item>
                <Typography variant="h3" className={classes.titleText}>
                  Partners
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={UDaytonLogoImage}
                        alt="University of Dayton"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={PreschoolPromiseLogoImage}
                        alt="Preschool Promise"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={UnitedWayLogoImage}
                        alt="United Way"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={VanderbiltEngineeringLogoImage}
                        alt="Vanderbilt School of Engineering"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={WondryLogoImage}
                        alt="The Wond'ry"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={VanderbiltPeabodyLogoImage}
                        alt="Peabody College"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={AbtLogoImage}
                        alt="Abt Associates"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img
                        src={MNPSLogoImage}
                        alt="Metro Nashville Public Schools"
                        style={{ maxWidth: 200 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={3} style={{ padding: 20 }} />
                  <Grid item xs={6} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      {/* insert TSU logo here */}
                    </Grid>
                  </Grid>
                  <Grid item xs={3} style={{ padding: 20 }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

TeamPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamPage);