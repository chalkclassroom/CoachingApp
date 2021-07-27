import * as React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import { SelectOption } from './MessagingTypes';
import { connect } from "react-redux";
import * as Types from '../../constants/Types';

const customStyles = {
  indicatorsContainer: (provided: React.CSSProperties): React.CSSProperties => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  }),
  valueContainer: (provided: React.CSSProperties): React.CSSProperties => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  }),
  option: (provided: React.CSSProperties): React.CSSProperties => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#000000'
  })
}

interface RecipientAddressProps {
  selectedOption: SelectOption;
  setOption: (newOption: SelectOption) => void;
  teachers: Array<Types.Teacher>;
  readOnly: boolean | undefined;
}

const RecipientAddress: React.FC<RecipientAddressProps> = (props: RecipientAddressProps) => {
  const teacherList: Array<{value: string, id: string, label: string, firstName: string}> = [];
  useEffect(() => {
    // converts teacher list into proper format for Select component
    props.teachers.forEach((teacher) => {
      const newTeacher = {
        value: teacher.email,
        id: teacher.id,
        label: (teacher.firstName + ' ' + teacher.lastName),
        firstName: teacher.firstName
      };
      if (newTeacher.id !== 'rJxNhJmzjRZP7xg29Ko6') {
        teacherList.push(newTeacher);
      }
    });
  })

  return (
    <Select
      value={props.selectedOption}
      onChange={props.setOption}
      options={teacherList}
      styles={customStyles}
      isDisabled={props.readOnly}
    />
  );
}

const mapStateToProps = (state: Types.ReduxState): {
  teachers: Array<Types.Teacher>
} => {
  return {
    teachers: state.teacherListState.teachers
  };
};

export default connect(mapStateToProps, null)(RecipientAddress);
