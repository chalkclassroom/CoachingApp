import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

interface SubjectLineProps {
  subject: string,
  setSubject: React.Dispatch<React.SetStateAction<string>>
}

const SubjectLine: React.FC<SubjectLineProps> = (props: SubjectLineProps) => {
  return (
    <Grid container direction='row' justify='space-between' alignItems='center'>
      <Grid item xs={2}>
        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
          Subject:
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Paper style={{height: '100%'}}>
          <TextField
            value={props.subject}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => props.setSubject(event.target.value)}
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {fontFamily: "Arimo", paddingLeft: '0.5em', paddingRight: '0.5em'}
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SubjectLine;