// A simple To: bar to input email address of the recipient
// Connected to database to show the list of the teachers the user can send to
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select';

/*
const options = [
  { value: 'johnsmith@vanderbilt.edu', label: 'John Smith' },
  { value: 'craig@test.com', label: 'Craig' },
  { value: 'daniel@yahoo.com', label: 'Daniel' },
];
*/

const RecipentAddress: React.FC<{selectedOption: any, setOption: any, firebase: any}> = (props: {selectedOption: any, setOption: any, firebase: any}) => {

  const [teacherList, setTeacherList] = useState(null)
  props.firebase.getFullTeacherList().then(teacherList =>
    teacherList.map(teacher => {return{value: teacher.email, label: teacher.firstName+teacher.lastName}})).then(options => setTeacherList(options));


  const handleChange = newSelectedOption => {
    props.setOption(newSelectedOption);
    console.log(`Option selected:`, props.selectedOption);
  };
  
    return (
      <Select
        value={props.selectedOption}
        onChange={handleChange}
        options={teacherList}
      />
    );
}

export default RecipentAddress;
