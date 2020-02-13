// A simple To: bar to input email address of the recipient
// Connected to database to show the list of the teachers the user can send to
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
 import Select from 'react-select';

const options = [
  { value: 'johnsmith@vanderbilt.edu', label: 'John Smith' },
  { value: 'craig@test.com', label: 'Craig' },
  { value: 'daniel@yahoo.com', label: 'Daniel' },
];

class RecipentAddress extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default RecipentAddress;
