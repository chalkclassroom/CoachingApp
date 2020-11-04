import * as React from 'react';
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

interface ChooseThemeProps {
  selectedOption: SelectOption; 
  setOption: (newOption: SelectOption) => void; 
}

const ChooseTheme: React.FC<ChooseThemeProps> = (props: ChooseThemeProps) => {
  const teacherList = [
    {value: 'None', id: '0', label: 'None'},
    {value: 'Action Plan', id: '1', label: 'Action Plan'},
    {value: 'Feedback', id: '2', label: 'Feedback'},
    {value: 'Thank You', id: '3', label: 'Thank You'},
  ];

  return (
      <Select
        value={props.selectedOption}
        onChange={props.setOption}
        options={teacherList}
        styles={customStyles}
      />
    );
}

export default ChooseTheme;
