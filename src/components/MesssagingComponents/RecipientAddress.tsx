import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { SelectOption } from './MessagingTypes';

interface RecipentAddressProps {
  selectedOption: SelectOption; 
  setOption: (newOption: SelectOption) => void; 
  firebase: any;
}

interface Teacher {
  email: string;
  id: string;
  label: string;
  firstName: string;
  lastName: string;
}

const RecipentAddress: React.FC<RecipentAddressProps> = (props: RecipentAddressProps) => {
  const [teacherList, setTeacherList] = useState([]);
  useEffect(() => {
    if (teacherList.length === 0) {
      props.firebase.getFullTeacherList()
        .then((teachers: Teacher[]) => {
          setTeacherList(teachers.map((teacher: Teacher) => {
            return {
              value: teacher.email,
              id: teacher.id,
              label: (teacher.firstName + ' ' + teacher.lastName),
            };
          }));
        })
        .catch((err: any) => console.log(err));
    }
  });

  return (
      <Select
        value={props.selectedOption}
        onChange={props.setOption}
        options={teacherList}
      />
    );
}

export default RecipentAddress;
