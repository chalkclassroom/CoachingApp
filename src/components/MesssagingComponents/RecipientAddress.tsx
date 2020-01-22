// A simple To: bar to input email address of the recipient
// Connected to database to show the list of the teachers the user can send to
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
 
const RecipentAddress: React.FC<{}> = () => {
 return (
   <Autocomplete
     options={top5}
     getOptionLabel={option => option.title}
     <div>
       <TextField
         id="outlined-basic"
         label="Outlined"
         margin="normal"
         variant="outlined"
         style={{width: "100%"}}
       />
     </div>
   />
 );
}
 
export default TextField;
