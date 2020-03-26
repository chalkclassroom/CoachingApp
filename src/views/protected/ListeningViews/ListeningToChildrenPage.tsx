import * as React from 'react';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
import * as Constants from '../../../constants';

interface Props {
  location: {
    state: {
      teacher: {
        id: string
      }
    }
  }
}

/**
 * @function ListeningToChildrenPage
 * @param {Props} props
 * @return {ReactElement}
 */
function ListeningToChildrenPage(props: Props): React.ReactElement {
  const { location } = props;
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase: object): React.ReactNode => (<AppBar firebase={firebase}/>)}
      </FirebaseContext.Consumer>
      <main style={{ flex: 1 }}>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => (
            <TeacherChecklist
              firebase={firebase}
              teacherId={location.state.teacher.id}
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

export default ListeningToChildrenPage;