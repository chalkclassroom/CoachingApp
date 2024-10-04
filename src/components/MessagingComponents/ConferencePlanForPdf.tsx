import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField, Fab } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as  moment from 'moment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import PrintIcon from '@material-ui/icons/Print'
import { changeTeacher } from '../../state/actions/teacher'
import LogoImage from '../../assets/images/LogoImage.png'
import TransitionTimeImage from '../../assets/images/TransitionTimeImage.png'
import ClassroomClimateIconImage from '../../assets/images/ClassroomClimateIconImage.png'
import MathIconImage from '../../assets/images/MathIconImage.png'
import LevelofInstructionImage from '../../assets/images/LevelofInstructionImage.png'
import EngagementIconImage from '../../assets/images/EngagementIconImage.png'
import ListeningtoChildrenImage from '../../assets/images/ListeningtoChildrenImage.png'
import SequentialActivitiesImage from '../../assets/images/SequentialActivitiesImage.png'
import LiteracyIconImage from '../../assets/images/LiteracyIconImage.png'
import AssocCoopInteractionsImage from '../../assets/images/AssocCoopInteractionsImage.png'

const BlankTheme = createTheme({
  palette: {
    primary: {
      main: '#a3a3a3'
    }
  }
});

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
}

interface Props {
  teacher: Types.Teacher,
  coachFirstName: string,
  coachLastName: string,
  date: string,
  feedback: Array<string>,
  questions: Array<string>,
  addedQuestions: Array<string>,
  notes: Array<string>,
  tool: string,

  // magic8?: string,
  // sessionId?: string,
  // readOnly: boolean,
  // conferencePlanExists: boolean,
  // editMode: boolean,
  // chosenQuestions: Array<string>,
  // conferencePlanId?: string,
  // history?: H.History,
  // notesModal: boolean,
  // viewClick(view:string): void
  // practice: string
  // teacherList: Array<Types.Teacher>,
}

interface State {
  readOnly: boolean
}

interface Style {
  textField: string,
  backButton: string
}


/**
 * Form for user to complete action plan
 * @class ConferencePlanForPdf
 */
class ConferencePlanForPdf extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      readOnly: true
    }
  }


  // Download pdf of conference plan
  downloadPDF = (): void => {
    const elementId = "ActionPlanPDFComponent";

    const input: HTMLElement = document.getElementById(elementId);
    let base64data: string | ArrayBuffer | null = null;
    let newBase64Data = '';
    html2canvas(input, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById(elementId).style.visibility = 'visible';
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.png";
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const pageHeight = 265;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
      let position = 10;
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // use this for downloading pdf
      pdf.save("download.pdf");
      const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf'});
      const reader = new FileReader();
      reader.readAsDataURL(blobPDF);
      reader.onloadend = function(): void {
        base64data = reader.result;
        if (base64data) {
          newBase64Data = (base64data as string).replace('data:application/pdf;base64,', '');
        }
      }
    })
  }


  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {

  }

  /**
   * lifecycle method invoked after component updates
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate(prevProps: Props, prevState: State): void {
  }

  static propTypes = {
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    readOnly: PropTypes.bool.isRequired,
    conferencePlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    chosenQuestions: PropTypes.array.isRequired,
    notesModal: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history
  };


  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <>
        <div style={{width: '100%'}} id='cp'>
          {
            <div>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                style={{width: '100%'}}
              >
                <Grid item style={{width: '100%'}}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{width: '100%', paddingTop: '0.5em', paddingBottom: '1em'}}
                  >
                    <Grid item xs={2}>
                      <img
                        src={LogoImage}
                        alt='CHALK'
                        width='50%'
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
                        <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                          CONFERENCE PLAN
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container direction="row" justify="flex-end" alignItems="center">
                        <img
                          src={
                            this.props.tool === 'Transition Time' ? TransitionTimeImage
                              : this.props.tool === 'Classroom Climate' ? ClassroomClimateIconImage
                                : this.props.tool === 'Math Instruction' ? MathIconImage
                                  : this.props.tool === 'Level of Instruction' ? LevelofInstructionImage
                                    : this.props.tool === 'Level of Engagement' ? EngagementIconImage
                                      : this.props.tool === 'Listening to Children' ? ListeningtoChildrenImage
                                        : this.props.tool === 'Sequential Activities' ? SequentialActivitiesImage
                                          : this.props.tool === 'Literacy Instruction' ? LiteracyIconImage
                                            : AssocCoopInteractionsImage
                          }
                          alt="Icon"
                          width='50%'
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{width: '100%'}}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    style={{fontFamily: 'Arimo'}}
                  >
                    <Grid item xs={4}>
                      {this.props.teacher.firstName + " " + this.props.teacher.lastName}
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="row" justify="center">
                        {this.props.coachFirstName + " " + this.props.coachLastName}
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="row" justify="flex-end">
                        {moment(this.props.date).format('MM/DD/YYYY')}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                style={{width: '100%'}}
              >
                <Grid item style={{width: "100%", marginBottom: '0.8em', marginTop: '0.4em', border: '2px solid #094492', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Strengths-Based Feedback
                          </Typography>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.props.feedback.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"feedback" + index.toString()}
                                name={"feedback" + index.toString()}
                                type="text"
                                placeholder={"Type your feedback here!"}
                                value={value}
                                margin="none"
                                variant="standard"
                                fullWidth
                                multiline
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.state.readOnly,
                                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                                }}
                                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                                className={classes.textField}
                              />
                            </li>
                          )
                        })}
                      </ul>

                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{width: "100%", marginBottom: '0.8em', border: '2px solid #e55529', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Reflection Questions
                          </Typography>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.props.addedQuestions[0] ? this.props.addedQuestions.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"addedQuestions" + index.toString()}
                                name={"addedQuestions" + index.toString()}
                                type="text"
                                placeholder={index===0 ? "Type your questions here, or add them from the Questions tab!": null}
                                value={value}
                                margin="none"
                                variant="standard"
                                fullWidth
                                multiline
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.state.readOnly,
                                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                                }}
                                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                                className={classes.textField}
                              />
                            </li>
                          )
                        }) : (<div />)}
                        {this.props.questions.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"questions" + index.toString()}
                                name={"questions" + index.toString()}
                                type="text"
                                placeholder={
                                  !this.props.addedQuestions[0] && index===0
                                    ? "Type your questions here, or add them from the Questions tab!"
                                    : "Type your question here!"
                                }
                                value={value}
                                margin="none"
                                variant="standard"
                                fullWidth
                                multiline
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.state.readOnly,
                                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                                }}
                                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                                className={classes.textField}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{width: "100%", border: '2px solid #009365', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Notes
                          </Typography>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.props.notes.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"notes" + index.toString()}
                                name={"notes" + index.toString()}
                                type="text"
                                placeholder={"Type your note here!"}
                                value={value}
                                margin="none"
                                variant="standard"
                                fullWidth
                                multiline
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.state.readOnly,
                                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                                }}
                                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                                className={classes.textField}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          }
        </div>
      </>
    );
  }
}


export default withStyles(styles)((ConferencePlanForPdf));