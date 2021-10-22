// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react'
import * as PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CloseIcon from '@material-ui/icons/Close'
// import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

interface EmailBodyProps {
    email: string | undefined
    emailId: string | undefined
    setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
    attachments:
        | Array<{
              content: string
              filename: string
              type: string
              disposition: string
              id: string
              teacherId: string
              actionPlan: boolean
              result: boolean
              summary?: boolean
              details?: boolean
              trends?: boolean
              practice?: string
              date?: Date
          }>
        | undefined
    handleDelete(
        position: number,
        emailId: string | undefined,
        attachmentId: string
    ): void
    readOnly: boolean | undefined
}

interface AttachmentBarProps {
    title: string
    content: string
    handleDelete(): void
    handlePreview(): void
    readOnly: boolean | undefined
}

const AttachmentBar: React.FC<AttachmentBarProps> = (
    props: AttachmentBarProps
) => {
    return (
        <Card style={{ margin: '0.5em 0 0 1em' }}>
            <Grid
                container
                direction="col"
                justify="space-between"
                alignItems="center"
                style={{ padding: '0.2em 0.5em' }}
            >
                <Grid item>
                    <Typography
                        variant="body1"
                        style={{ fontFamily: 'Arimo', fontSize: '.8rem' }}
                    >
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        {props.content === '' ? (
                            <Grid item>
                                <CircularProgress size="1.5em" />
                            </Grid>
                        ) : null}
                        {/* ADD THIS LAATER
            <Grid item onClick={(): void => props.handlePreview()} style={{paddingLeft: '1em'}}>
              <VisibilityIcon />
            </Grid> */}
                        <Grid
                            item
                            onClick={
                                props.readOnly
                                    ? undefined
                                    : (): void => props.handleDelete()
                            }
                            style={{ paddingLeft: '1em' }}
                        >
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
    content: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    // handlePreview: PropTypes.func.isRequired
}

const EmailBody: React.FC<EmailBodyProps> = (props: EmailBodyProps) => {
    const handleEmailChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        event.persist()
        props.setEmail(event.target.value)
    }

    return (
        <Paper
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            <Grid
                container
                style={{
                    width: '100%',
                }}
            >
                {props.attachments
                    ? props.attachments.map((attachment, index) => {
                          return (
                              <AttachmentBar
                                  key={index}
                                  content={attachment.content}
                                  title={attachment.filename}
                                  handleDelete={(): void =>
                                      props.handleDelete(
                                          index,
                                          props.emailId,
                                          attachment.id
                                      )
                                  }
                                  readOnly={props.readOnly}
                              />
                          )
                      })
                    : null}
            </Grid>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                style={{
                    height: '100%',
                    width: '100%',
                    padding: '2em 0 0 1em',
                }}
            >
                <Grid item style={{ width: '100%', height: '100%' }}>
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
                            overflowY: 'auto',
                            padding: 0,
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

EmailBody.propTypes = {
    email: PropTypes.string.isRequired,
    attachments: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
}

export default EmailBody
