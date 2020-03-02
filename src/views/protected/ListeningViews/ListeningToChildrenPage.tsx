import * as React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
import * as Constants from '../../../constants';

interface Props {

}

interface State {

}

/**
 * @class ListeningToChildrenPage
 */
class ListeningToChildrenPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      
    };
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object) => (<AppBar firebase={firebase}
              //classes={{ root: this.props.classes.grow }}
              
            />
          )}
        </FirebaseContext.Consumer>
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object) => (
              <TeacherChecklist
                firebase={firebase}
                magic8="Listening to Children"
                color={Constants.ListeningColor}
                checklist={Constants.Checklist.Listening}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

export default ListeningToChildrenPage;