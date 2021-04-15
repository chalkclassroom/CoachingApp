import * as React from 'react';
import * as PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import Checklist from '../../../components/LiteracyComponents/Checklist';
import TeacherModal from '../HomeViews/TeacherModal';
import { connect } from "react-redux";
import * as Types from '../../../constants/Types';

/* function handleCloseTeacherModal(): void => {
  this.setState({ teacherModal: false })
}; */

interface Props {
  teacherSelected: Types.Teacher,
  location: {
    state: {
      checklist: string
    }
  },
}

/**
 * @function ListeningToChildrenPage
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyInstructionPage(props: Props): React.ReactElement {
  const { teacherSelected } = props;
  const location = useLocation();
  const history = useHistory();
  console.log('location', location);
  console.log('and history', history);
  const [teacherModal, setTeacherModal] = useState(false);
  useEffect(() => {
    if (!teacherSelected) {
      setTeacherModal(true)
    }
  });
  return (
    teacherSelected ? (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => (<AppBar firebase={firebase} />)}
        </FirebaseContext.Consumer>
        <main>
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
              <Checklist
                firebase={firebase}
                type='LI'
                // checklist={location.state.checklist}
                checklist='FoundationalTeacher'
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    ) : (
      <FirebaseContext.Consumer>
        {(firebase: {
          getTeacherList(): Promise<Types.Teacher[]>
        }): React.ReactElement => (
          <TeacherModal
            handleClose={(): void => setTeacherModal(false)}
            firebase={firebase}
            type={"Observe"}
          />
        )}
      </FirebaseContext.Consumer>
    )
  );
}

LiteracyInstructionPage.propTypes = {
  teacherSelected: PropTypes.exact({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
    school: PropTypes.string
  }).isRequired
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default connect(mapStateToProps, null)(LiteracyInstructionPage);