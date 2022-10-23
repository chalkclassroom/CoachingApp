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
import Sites from "../../../components/UsersComponents/Sites";


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
  archivedTeachers: Array<Object>
  archivedCoaches: Array<Object>
  currentPage: string
  propFilter: Array<string>
  sendToSites: Array<Object>
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
      programData: [],
      archivedTeachers: [],
      archivedCoaches: [],
      propFilter: [],
      sendToSites: []
    }
  }

  buildTeacherData = async (sites, programs, teachers, coaches) => {
    let result = []
    let seen = []

    coaches.map(coach => {
      for (let i = 0; i < coach.teachers.length; i++) {
        if(!coach.teachers[i])
        {
          continue;
        }
        let teacher = teachers.find(o => o.id === coach.teachers[i]);
        if(!teacher)
        {
          continue;
        }
        let site = sites.find(o => o.name === teacher.site);
        if(!site)
        {
          continue;
        }
        let program = programs.find(o => o.sites.includes(site.id))

        let draft = {
          coachId: coach.id,
          coachFirstName: coach.firstName,
          coachLastName: coach.lastName,
          siteName: site.name,
          teacherId: teacher.id,
          teacherFirstName: teacher.firstName,
          teacherLastName: teacher.lastName,
          selectedSiteId: site.id,
          selectedProgramName: program.name,
          selectedProgramId: program.id,
          archived: teacher.archived,
          email: teacher.email
        }
        seen.push(teacher.id)
        result.push(draft)
      }
    })

    for (let i = 0; i < teachers.length; i++) {
      if (!seen.includes(teachers[i].id)) {
        let site = sites.find(o => o.name === teachers[i].site);
        if(!site)
        {
          continue;
        }
        let program = programs.find(o => o.sites.includes(site.id))
        let draft = {
          coachId: "",
          coachFirstName: "",
          coachLastName: "",
          siteName: site.name,
          teacherId: teachers[i].id,
          teacherFirstName: teachers[i].firstName,
          teacherLastName: teachers[i].lastName,
          selectedSiteId: site.id,
          selectedProgramName: program.name,
          selectedProgramId: program.id,
          archived: teachers[i].archived,
          email: teachers[i].email
        }
        seen.push(teachers[i].id)
        result.push(draft)
      }
    }

    return result

    // let data: Array<Object> = []
    // let teachersAndCoaches = await this.context.getTeacherData();

    // await teachersAndCoaches.map((doc) => {
    //   let draft = {
    //     coachId: doc.coachId,
    //     coachFirstName: doc.coachFirstName,
    //     coachLastName: doc.coachLastName,
    //     siteName: doc.siteName,
    //     teacherId: doc.teacherId,
    //     teacherFirstName: doc.teacherFirstName,
    //     teacherLastName: doc.teacherLastName,
    //     selectedSiteId: "",
    //     selectedProgramName: "",
    //     selectedProgramId: "",
    //     archived: doc.archived
    //   };
    //   for (let i = 0; i < this.state.siteData.length; i++) {
    //     if (this.state.siteData[i].name === doc.siteName) {
    //       draft["selectedSiteId"] =  this.state.siteData[i].id;
    //       i = this.state.siteData.length;
    //     }
    //   }
    //   for (let i = 0; i < this.state.programData.length; i++) {
    //     if (this.state.programData[i].sites.includes(draft["selectedSiteId"])) {
    //       draft["selectedProgramName"] = this.state.programData[i].name;
    //       draft["selectedProgramId"] =  this.state.programData[i].id;
    //       i = this.state.programData.length
    //     }
    //   }
    //   data.push(draft)
    // })
    // return data;
  }

  buildCoachData = async (siteData, programData, coachData) => {
    // const coachData = await this.context.getCoaches();

    let data = []

    for(let coachIndex in coachData) {
      let value = coachData[coachIndex];



        // Get all the site data for each site a coach is in
        let coachesSites = [];

        // Go through each of the coaches sites
        for(var coachesSiteIndex in value.sites)
        {
          // Get the site's data
          var tempSite = await siteData.find(o => o.id === value.sites[coachesSiteIndex]);

          // Get the programs that have this site in it
          var programsList = await programData.filter( x => x.sites.includes(value.sites[coachesSiteIndex]) );

          // Go through each program
          for(var programIndex in programsList)
          {
            var tempProgram = programsList[programIndex];
            coachesSites.push({
              siteName: tempSite.name,
              siteId: tempSite.id,
              programName: tempProgram.name,
              programId: tempProgram.id
            });
          }
        }

        data.push({
          firstName: value.firstName,
          lastName: value.lastName,
          id:  value.id,
          siteList: coachesSites,
          archived: value.archived ? value.archived : false
        })

        /////////////////////////////////////////////////////////
        /*
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
          siteList: siteList,
          archived: value.archived ? value.archived : false
        })
        */
    }

    // Sort coaches by last name
    data.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))

    return data;
  }

  buildSiteData = (coachData, siteData, programData, filter?) => {
    let seen = [];
    let data = [];
    coachData.map(coach => {
      coach.siteList.map(value => {
        if ((this.props.userRole === "siteLeader") ? filter.includes(value.siteId) : (this.props.userRole === "programleader") ? filter.includes(value.programId) : true){
        data.push({
          siteName: value.siteName,
          siteId: value.siteId,
          programName: value.programName,
          programId: value.programId,
          firstName: coach.firstName,
          lastName: coach.lastName,
          id: coach.id,
          archived: coach.archived
        })
        seen.push(value.siteId)
      }
      })
    })
    siteData.map(site => {
      if (!seen.includes(site.id)) {
        let programId = programData.find(o => o.name === site.programs).id
        data.push({
          siteName: site.name,
          siteId: site.id,
          programName: site.programs,
          programId: programId,
          firstName: "",
          lastName: "",
          id: "",
          archived: false
        })
        seen.push(site.id)
      }
    })
    return data;
  }

  setSites = async () => {
    var siteData = await this.context.getSites();
    this.setState({siteData: siteData});
    return siteData;
  }

  setPrograms = async () => {
    var programData = await this.context.getPrograms();
    this.setState({programData: programData});
    return programData;
  }

  getTeachers = async () => {
    const teachers = await this.context.getAllTeachers();
    return teachers;
  }

  getCoaches = async () => {
    const coaches = await this.context.getAllCoachesPartners();
    return coaches;
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount = async () => {
    //await this.sitesAndPrograms();

    var teachers = await this.getTeachers();
    console.log("Teachers fetched...")

    var coaches = await this.getCoaches();
    console.log("Coaches fetched...", coaches)

    var siteData = await this.setSites();
    console.log("Site Data Done...");

    var programData = await this.setPrograms()
    console.log("Program Data Done...");

    var teacherData = await this.buildTeacherData(siteData, programData, teachers, coaches);
    console.log("Teacher Data Done...");

    var coachData = await this.buildCoachData(siteData, programData, coaches);
    console.log("Coach Data Done...");

    let filter;
    if (this.props.userRole === "programLeader") {
      const {programs} = await this.context.getUserInformation()
      let temp = []
      teacherData = teacherData.filter((item) => {return programs.includes(item.selectedProgramId)})
      for (let coachIndex in coachData) {
        let value = coachData[coachIndex];
        for (let i  = 0;  i < value.siteList.length; i++) {
          if (programs.includes(value.siteList[i].programId)) {
            temp.push(value)
            i = value.siteList.length
          }
        }
      }
      siteData = siteData.filter(item => {return programs.includes(item.programs)})
      programData = programData.filter(item => {return programs.includes(item.id)})
      coachData = temp;
      this.setState({propFilter: programs, siteData: siteData, programData: programData})
      filter = programs;
    }

    if (this.props.userRole === "siteLeader") {
      const {sites} = await this.context.getUserInformation()
      let temp = []
      teacherData = teacherData.filter((item) => {return sites.includes(item.selectedSiteId)})
      for (let coachIndex in coachData) {
        let value = coachData[coachIndex];
        for (let i  = 0;  i < value.siteList.length; i++) {
          if (sites.includes(value.siteList[i].siteId)) {
            temp.push(value)
            i = value.siteList.length
          }
        }
      }
      coachData = temp;
      siteData = siteData.filter(item => {return sites.includes(item.id)})
      programData = programData.filter(item => {return item.sites.some(value => sites.includes(value))})
      this.setState({propFilter: sites, siteData: siteData, programData: programData})
      filter = sites;
    }

    let archivedTeacherData = teacherData;
    let archivedCoachData = coachData;

    this.setState({archivedTeachers: archivedTeacherData, archivedCoaches: archivedCoachData})


    let filteredTeacherData = teacherData.filter((item) => {return item.archived === false})
    this.setState({teacherData: filteredTeacherData});


    let filteredCoachData = coachData.filter((item) => {return item.archived === false})
    this.setState({coachData: filteredCoachData});

    let sendToSites = this.buildSiteData(coachData, siteData, programData, filter ? filter : []);
    this.setState({sendToSites: sendToSites});


  }

  // So we can update teacher data in coaches
  updateTeacherData = (teacherData) => {
    this.setState({teacherData: teacherData});
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
                        updateTeacherData={(data) => this.updateTeacherData(data)}
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
                        teacherData = {this.state.archivedTeachers}
                        coachData = {this.state.archivedCoaches}
                        filter  = {this.state.propFilter}
                        updateTeacherData={(data) => this.updateTeacherData(data)}
                        />
                    } />
                    <Route path="/LeadersSites" render={(props) => 
                      <Sites
                        changePage={(pageName: string) => this.changePage(pageName)}
                        userRole={userRole}
                        location={this.props.location}
                        coachData = {this.state.archivedCoaches}
                        siteData = {this.state.siteData}
                        sitesList = {this.state.sendToSites}
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
