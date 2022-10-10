import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'
import { Switch, Route,} from "react-router-dom";
import UsersIcon from '../../../assets/icons/UsersIcon.png';
import Teachers from "../../../components/UsersComponents/Teachers";
import Coaches from "../../../components/UsersComponents/Coaches";
import Skeleton from "./Skeleton"
import Archives from "../../../components/UsersComponents/Archives";


const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pictureBar: {
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    minHeight: '4em',
    maxHeight: '200px',
  },
};

const Styles = {
    navItems: {
        background: 'rgb(234, 234, 234)',
        border: '1px',
        borderColor: 'gray',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
    },


    navMenu: {
        // background: 'green',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        gridColumnGap: '50px',
        listStyle: 'none',
        textAlign: 'center',
        width: '100vw',
        justifyContent: 'flex-start'
    },

    navLinks: is_current => ({
        color: 'Black',
        textDecoration: is_current ? 'underline' : 'none',
        padding: '0.5rem 1rem',
        cursor: 'default',
        fontWeight: is_current ? 'bold' : 'normal'
    })
}

const MenuItems = [
    {
        title: 'Sites',
        url: '/LeadersSites',
    },
    {
        title: 'Coaches',
        url: '/LeadersCoaches',
    },
    {
        title: 'Teachers',
        url: '/LeadersTeachers',
    },
]


interface Style {
  root: string,
  pictureBar: string
}

interface Props {
  classes: Style,
  history: H.History,
  userRole: string,
  location: string
}

interface State {
  coachData: Array<Object>
  teacherData: Array<Object>
  siteData: Array<Object>
  programData: Array<Object>
  currentPage: string,
}

function checkCurrent(item: string) {
    if ( item === location.pathname )
        return true;
    return false;
}

/**
 * reports page
 * @class ReportsPage
 */
class UsersPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      currentPage: "",
      coachData: [],
      teacherData: [],
      siteData: [],
      programData: []
    }
  }

  buildTeacherData = async (): Promise<Array<Object>> => {
    let data: Array<Object> = []
    let teachersAndCoaches = await this.context.getTeacherData();

    await teachersAndCoaches.map((doc) => {
      let draft = {
        coachId: doc.coachId,
        coachFirstName: doc.coachFirstName,
        coachLastName: doc.coachLastName,
        siteName: doc.siteName,
        teacherId: doc.teacherId,
        teacherFirstName: doc.teacherFirstName,
        teacherLastName: doc.teacherLastName,
        selectedSiteId: "",
        selectedProgramName: "",
        selectedProgramId: "",
      };
      for (let i = 0; i < this.state.siteData.length; i++) {
        if (this.state.siteData[i].name === doc.siteName) {
          draft["selectedSiteId"] =  this.state.siteData[i].id;
          i = this.state.siteData.length;
        }
      }
      for (let i = 0; i < this.state.programData.length; i++) {
        if (this.state.programData[i].sites.includes(draft["selectedSiteId"])) {
          draft["selectedProgramName"] = this.state.programData[i].name;
          draft["selectedProgramId"] =  this.state.programData[i].id;
          i = this.state.programData.length
        }
      }
      data.push(draft)
    })
    return data;
  }

  buildCoachData = async () => {
    const coachData = await this.context.getCoaches();
    let data = []

    for(let coachIndex in coachData) {
      let value = coachData[coachIndex];
      if (value.role === "coach") {
        let sites = await this.context.fetchSitesForCoach(await value.id);
        let siteList: Array<Object> = []

        for(let siteIndex in sites) {

          var site = sites[siteIndex];

          for (let i = 0; i < this.state.programData.length; i++) {
            if (this.state.programData[i].sites.includes(site.id)) {
              siteList.push({
                siteName: site.name,
                siteId: site.id,
                programName: this.state.programData[i].name,
                programId: this.state.programData[i].id
              })
            }
          }
        }

        data.push({
          firstName: value.firstName,
          lastName: value.lastName,
          id:  value.id,
          siteList: siteList
        })
      }
    }

    // Sort coaches by last name
    data.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))

    console.log(data)
    return data;
  }

  sitesAndPrograms = async () => {
    this.setState({siteData: await this.context.getSites()})
    this.setState({programData: await this.context.getPrograms()})
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount = async () => {
    await this.sitesAndPrograms();

    var teacherData = await this.buildTeacherData();

    this.setState({teacherData: teacherData});

    var coachData = await this.buildCoachData(teacherData);
    console.log("teacher data : ", teacherData);
    console.log("coach data : ", coachData);
    console.log("coach data 2 : ", typeof coachData);

    this.setState({coachData: coachData});


  }



  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      pictureBar: PropTypes.string,
    }).isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history
  }


  changePage = (pageName: string) => {
    this.setState({currentPage: pageName});
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, userRole} = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container className={classes.pictureBar}>
            <Grid item xs={1} style={{padding: '1em 0 1em 0'}}>
                <img src={UsersIcon} style={{fill: '#6f39c4', height: '100px', width: '100px', minHeight: '2em', maxHeight: '100px', minWidth: '2em', paddingLeft: '2.4em'}} />
            </Grid>
        </Grid>
        <nav style={Styles.navItems}>
                <ul style={Styles.navMenu}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li style={{float: 'left'}}key={index}>
                                <a style={Styles.navLinks(checkCurrent(item.url))} onClick = {() => this.props.history.push(item.url)}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <ul style={{listStyle: 'none'}}>
                  <li style={{float: 'right', marginRight:'3vw'}}>
                    <a style={Styles.navLinks(checkCurrent('/LeadersArchive'))} onClick = {() => this.props.history.push('/LeadersArchive')}>
                    Archive
                    </a>
                  </li>
                </ul>
            </nav>
        <div style={{display: "flex"}}>
          <Grid container>
            <Grid container>
                <Grid item xs={12} style={{paddingTop:"1em"}}>
                  <Switch location={location} key={location.pathname}>
                    <Route path="/LeadersUsers" component={Skeleton} />
                    <Route path="/LeadersCoaches" render={(props) =>
                      <Coaches
                        changePage={(pageName: string) => this.changePage(pageName)}
                        userRole={userRole}
                        location={this.props.location}
                        teacherData = {this.state.teacherData}
                        coachData = {this.state.coachData}
                        siteData = {this.state.siteData}
                        programData = {this.state.programData}
                        />
                    } />
                    <Route path="/LeadersTeachers" render={(props) =>
                      <Teachers
                        changePage={(pageName: string) => this.changePage(pageName)}
                        userRole={userRole}
                        location={this.props.location}
                        teacherData = {this.state.teacherData}
                        coachData = {this.state.coachData}
                        siteData = {this.state.siteData}
                        programData = {this.state.programData}
                        />
                    } />
                    <Route path="/LeadersArchive" render={(props) =>
                      <Archives
                        changePage={(pageName: string) => this.changePage(pageName)}
                        userRole={userRole}
                        location={this.props.location}
                        />
                    } />
                  </Switch>
                </Grid>
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {coachName: string, userRole: Role} => {
  return {
    coachName: state.coachState.coachName,
    userRole: state.coachState.role
  };
};

UsersPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(UsersPage));
