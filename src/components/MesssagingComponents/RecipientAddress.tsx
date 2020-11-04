import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { SelectOption } from './MessagingTypes';

const customStyles = {
  indicatorsContainer: (provided) => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  })
}

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
  const [teacherList, setTeacherList] = useState<Array<{value: string, id: string, label: string}>>([]);
  useEffect(() => {
    if (teacherList.length === 0) {
      props.firebase.getFullTeacherList()
        .then((teachers: Teacher[]) => {
          const newTeacherList: Array<{value: string, id: string, label: string}> = [];
          teachers.forEach((teacher: Teacher) => {
            newTeacherList.push({
              value: teacher.email,
              id: teacher.id,
              label: (teacher.firstName + ' ' + teacher.lastName)
            });
          });
          setTeacherList(newTeacherList);
        })
        .catch((err: Error) => console.log(err));
    }
  });
  console.log(teacherList);

  return (
      <Select
        value={props.selectedOption}
        onChange={props.setOption}
        options={teacherList}
        styles={customStyles}
      />
    );
}

export default RecipentAddress;
