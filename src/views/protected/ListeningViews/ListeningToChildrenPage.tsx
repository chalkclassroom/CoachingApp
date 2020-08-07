import * as React from 'react';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
import * as Types from '../../../constants/Types';

/**
 * @function ListeningToChildrenPage
 * @return {ReactElement}
 */
function ListeningToChildrenPage(): React.ReactElement {
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase: Types.FirebaseAppBar): React.ReactNode => (<AppBar firebase={firebase} />)}
      </FirebaseContext.Consumer>
      <main style={{ flexGrow: 1 }}>
        <FirebaseContext.Consumer>
          {(firebase: {
            auth: {
              currentUser: {
                uid: string
              }
            },
            handleSession(mEntry: {
              teacher: string,
              observedBy: string,
              type: string
            }): void,
            handlePushListening(mEntry: {
              checked: Array<number>
            }): Promise<void>
          }): React.ReactNode => (
            <TeacherChecklist
              firebase={firebase}
              type='LC'
            />
          )}
        </FirebaseContext.Consumer>
      </main>
    </div>
  );
}

export default (ListeningToChildrenPage);