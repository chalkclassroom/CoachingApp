// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface EmailBodyProps {
  email: string | undefined,
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
}

const EmailBody: React.FC<EmailBodyProps> = (props: EmailBodyProps) => {

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    event.persist();
    props.setEmail(event.target.value);
  };

  return (
    <Paper style={{height: '100%'}}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{
          height: '100%',
          width: '100%',
          padding: '1em'
        }}
      >
        <textarea
          value={props.email}
          onChange={handleEmailChange}
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
            outline: 'none',
            fontFamily: 'Arimo',
            resize: 'none',
            overflowX: 'hidden',
            overflowY: 'auto'
          }}
        />
      </Grid>
    </Paper>
  );
}

export default EmailBody;