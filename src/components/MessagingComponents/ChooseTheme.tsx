import * as React from 'react';
import Select from 'react-select';
import { TemplateOption } from './MessagingTypes';

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

interface ChooseThemeProps {
  selectedOption: TemplateOption;
  setOption: (newOption: TemplateOption) => void;
  readOnly: boolean | undefined;
}

const ChooseTheme: React.FC<ChooseThemeProps> = (props: ChooseThemeProps) => {
  const themeList = [
    {value: 'None', id: '0', label: 'None'},
    {value: 'Action Plan', id: '1', label: 'Action Plan'},
    {value: 'Feedback', id: '2', label: 'Feedback'},
    {value: 'Thank You', id: '3', label: 'Thank You'},
    {value: 'CHALK Practice Selection', id: '4', label: 'CHALK Practice Selection'},
  ];

  return (
    <Select
      value={props.selectedOption}
      onChange={props.setOption}
      options={themeList}
      styles={customStyles}
      isDisabled={props.readOnly}
    />
  );
}

export default ChooseTheme;
