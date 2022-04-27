import * as React from 'react';
import * as PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
import TeacherModal from '../HomeViews/TeacherModal';
import { connect } from "react-redux";
import * as Types from '../../../constants/Types';
import Firebase from '../../../components/Firebase'
import withObservationTimeout from "../../../components/HOComponents/withObservationWrapper";
import {clearListeningCount} from "../../../state/actions/listening-to-children";


/* function handleCloseTeacherModal(): void => {
  this.setState({ teacherModal: false })
}; */

interface Props {
  teacherSelected: Types.Teacher
  preBack: () => Promise<boolean>
  clearListeningCount(): void
}

/**
 * @function ListeningToChildrenPage
 * @param {Props} props
 * @return {ReactElement}
 */
function ListeningToChildrenPage(props: Props): React.ReactElement {
  const { teacherSelected } = props;
  const [teacherModal, setTeacherModal] = useState(false);
  useEffect(() => {
    if (!teacherSelected) {
      setTeacherModal(true)
    }
  });
  useEffect(() => {
    return () => {
      props.clearListeningCount()
    }
  }, [])
  return (
    teacherSelected ? (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => (<AppBar confirmAction={props.preBack} firebase={firebase} />)}
        </FirebaseContext.Consumer>
        <main>
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => (
              <TeacherChecklist
                firebase={firebase}
                type='LC'
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    ) : (
      <FirebaseContext.Consumer>
        {(firebase: Firebase): React.ReactElement => (
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

ListeningToChildrenPage.propTypes = {
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

export default connect(mapStateToProps, {clearListeningCount})(withObservationTimeout(ListeningToChildrenPage));