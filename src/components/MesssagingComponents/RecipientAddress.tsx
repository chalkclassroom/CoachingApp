// A simple To: bar to input email address of the recipient
// Connected to database to show the list of the teachers the user can send to
import React, { useState } from 'react';
import Select from 'react-select';

/*
const options = [
  { value: 'johnsmith@vanderbilt.edu', label: 'John Smith' },
  { value: 'craig@test.com', label: 'Craig' },
  { value: 'daniel@yahoo.com', label: 'Daniel' },
];
*/

const RecipentAddress: React.FC<{selectedOption: any, setOption: any, firebase: any}> = (props: {selectedOption: any, setOption: any, firebase: any}) => {

	const [teacherList, setTeacherList] = useState([{value: '', label: ''}])
	console.log(teacherList);
	console.log(teacherList[0]);
	console.log(teacherList[0].value);
	console.log(teacherList[0].label);
  if (teacherList[0].value === "" && teacherList[0].label === "") {
	props.firebase.getTeacherList().then(teacherList =>
    teacherList.map(teacher => {return {value: teacher.email, label: teacher.firstName+teacher.lastName}})).then(options => { console.log(options); setTeacherList(options); });
  }

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
