import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import * as moment from 'moment';
import TransitionTimeIconImage from '../../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../../../assets/images/AssocCoopIconImage.svg';

interface Props {

}

interface State {
  result: Array<{
    id: string,
    teacherId: string,
    teacherLastName: string,
    teacherFirstName: string,
    date: {seconds: number, nanoseconds: number},
    practice: string
  }>
}

/**
 * @class ActionPlanListPage
 */
class ActionPlanListPage extends React.Component<{}, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    
    this.state={
      result: null
    }
  }

  /**
   * 
   */
  componentDidMount(): void {
    const firebase = this.context;
    firebase.getActionPlans().then(
      (answer: Array<{
        id: string,
        teacherId: string,
        date: {seconds: number, nanoseconds: number},
        practice: string,
        teacherFirstName: string,
        teacherLastName: string
      }>) => {
      let firstName = '';
      let lastName = '';
      answer.forEach((
        actionPlan: {
          id: string,
          teacherId: string,
          date: {seconds: number, nanoseconds: number},
          practice: string,
          teacherFirstName: string,
          teacherLastName: string
        }
      ) => 
        firebase.getTeacherFirstName(actionPlan.teacherId).then((name: string) => {
          firstName = name;
        }).then(() => {
          actionPlan.teacherFirstName = firstName;
        }).then(() => {
          firebase.getTeacherLastName(actionPlan.teacherId).then((name: string) => {
            lastName = name;
          }).then(() => {
            actionPlan.teacherLastName = lastName;
          }).then(() => {
            this.setState({result: answer})
          })
        })
      )
    });
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid direction="column" justify="center" alignItems="center">
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo'}}>
              Action Plans
            </Typography>
          </Grid>
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Grid container justify="center" alignItems="center">
              <Table style={{width: '80%', border: '1px solid #a9a9a9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <TableRow>
                  <TableCell style={{backgroundColor: '#d8ecff'}}>
                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell style={{backgroundColor: '#d8ecff'}}>
                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                      Teacher
                    </Typography>
                  </TableCell>
                  <TableCell style={{backgroundColor: '#d8ecff'}}>
                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                      CHALK Practice
                    </Typography>
                  </TableCell>
                </TableRow>
                {this.state.result ? (this.state.result.map((value, index) => {
                  const newDate = new Date(0);
                  newDate.setUTCSeconds(value.date.seconds);
                  const name = value.teacherLastName + ', ' + value.teacherFirstName;
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                          {moment(newDate).format('MM/DD/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                          {name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                          <Grid item xs={10}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {value.practice}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {value.practice === 'Transition Time' ? (
                              <img
                                src={TransitionTimeIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Classroom Climate' ? (
                              <img
                                src={ClassroomClimateIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Math Instruction' ? (
                              <img
                                src={MathIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Student Engagement' ? (
                              <img
                                src={EngagementIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Level of Instruction' ? (
                              <img
                                src={InstructionIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Listening to Children' ? (
                              <img
                                src={ListeningIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Sequential Activities' ? (
                              <img
                                src={SequentialIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : value.practice === 'Associative and Cooperative Interactions' ? (
                              <img
                                src={AssocCoopIconImage}
                                alt="Magic 8 Icon"
                              />
                            ) : <div />}
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )
                })) : (null)}
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ActionPlanListPage.contextType = FirebaseContext;
export default ActionPlanListPage;