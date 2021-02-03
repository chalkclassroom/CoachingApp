// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';

interface EmailBodyProps {
  email: string | undefined,
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>,
  attachments: Array<{content: string, filename: string, type: string, disposition: string}> | undefined,
  handleDelete(position: number): void,
  readOnly: boolean | undefined
}

interface AttachmentBarProps {
  title: string,
  handleDelete(): void,
  handlePreview(): void
}

const AttachmentBar: React.FC<AttachmentBarProps> = (props: AttachmentBarProps) => {
  return(
    <Card style={{
      width: '100%',
      marginTop: '0.5em'
    }}>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{padding: '0.5em'}}>
        <Grid item>
          <Typography variant="body1" style={{fontFamily: 'Arimo'}}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid item onClick={(): void => props.handlePreview()}>
              <VisibilityIcon />
            </Grid>
            <Grid item onClick={(): void => props.handleDelete()} style={{paddingLeft: '1em'}}>
              <CloseIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

AttachmentBar.propTypes = {
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired
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
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        style={{
          height: '100%',
          width: '100%',
          padding: '1em',
        }}
      >
        <Grid item style={{width: '100%', height: '70%'}}>
          <textarea
            value={props.email}
            onChange={handleEmailChange}
            readOnly={props.readOnly}
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              outline: 'none',
              fontFamily: 'Arimo',
              fontSize: '1.2em',
              resize: 'none',
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
          />
        </Grid>
        <Grid item style={{width: '100%', maxHeight: '30%', overflowY: 'auto'}}>
          {props.attachments? (
            props.attachments.map((attachment, index) => {
              return(
                <AttachmentBar
                  key={index}
                  title={attachment.filename}
                  handleDelete={(): void => props.handleDelete(index)}
                  handlePreview={(): void => console.log('insert preview func here')}
                />
              )
            })
          ) : (null)}
        </Grid>
      </Grid>
    </Paper>
  );
}

EmailBody.propTypes = {
  email: PropTypes.string.isRequired,
  attachments: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired
}

export default EmailBody;