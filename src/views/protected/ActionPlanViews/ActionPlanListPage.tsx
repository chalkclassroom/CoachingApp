import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Props {

}

interface State {
  result: any
}

/* function createData(date, teacher, magic8) {
  return { date, teacher, magic8 };
} */

const rows = [
  ['01/14/20', 'Katherine Newman', 'Sequential Activities'],
  ['02/23/20', 'Katherine Newman', 'Sequential Activities'],
  ['01/08/20', 'Ben Isenberg', 'Listening to Children'],
  ['03/01/20', 'Ben Isenberg', 'Classroom Climate'],
]

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
    const result = firebase.getActionPlans().then((answer) => {this.setState({result: answer})});
    console.log('result is ', result);
    //console.log(context.auth.uid);
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
          <Grid item style={{width: '100%'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo', border: '1px solid yellow'}}>
              Action Plans
            </Typography>
          </Grid>
          <Grid item>
            <Table>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    Teacher
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    CHALK Practice
                  </Typography>
                </TableCell>
              </TableRow>
              {this.state.result ? (this.state.result.map((value, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      have to convert
                    </TableCell>
                    <TableCell>
                      {value.teacherId}
                    </TableCell>
                    <TableCell>
                      {value.practice}
                    </TableCell>
                  </TableRow>
                )
              })) : (null)}
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

ActionPlanListPage.contextType = FirebaseContext;
export default ActionPlanListPage;