import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';

interface Props {

}

interface State {

}

function createData(date, teacher, magic8) {
  return { date, teacher, magic8 };
}

const rows = [
  createData('01/14/20', 'Katherine Newman', 'Sequential Activities'),
  createData('02/23/20', 'Katherine Newman', 'Sequential Activities'),
  createData('01/08/20', 'Ben Isenberg', 'Listening to Children'),
  createData('03/01/20', 'Ben Isenberg', 'Classroom Climate'),
]

/**
 * @class ActionPlanListPage
 */
class ActionPlanListPage extends React.Component<Props, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    
    this.state={

    }
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
    );
  }
}

ActionPlanListPage.contextType = FirebaseContext;
export default ActionPlanListPage;