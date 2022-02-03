import * as React from 'react';
import Select from 'react-select';
import { SelectOption } from './MessagingTypes';
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
  readOnly: boolean | undefined;
  recipientList: Array<{value: string, id: string, label: string, firstName: string}>;
}

const RecipientAddress: React.FC<RecipientAddressProps> = (props: RecipientAddressProps) => {
  return (
    <Select
      value={props.selectedOption}
      onChange={props.setOption}
      options={props.recipientList}
      styles={customStyles}
      isDisabled={props.readOnly}
    />
  );
}

export default RecipientAddress;
