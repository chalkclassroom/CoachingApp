import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField, Popover, Collapse, Fab } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import InfoIcon from '@material-ui/icons/Info'
import SaveImage from '../assets/images/SaveImage.svg'
import SaveGrayImage from '../assets/images/SaveGrayImage.svg'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FadeAwayModal from './FadeAwayModal'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import CHALKLogoGIF from '../assets/images/CHALKLogoGIF.gif'
import * as moment from 'moment'
import * as Types from '../constants/Types'
import * as Constants from '../constants/Constants'
import * as H from 'history'
import ReactRouterPropTypes from 'react-router-prop-types'
import Firebase from './Firebase'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ActionPlanForPdf from './MessagingComponents/ActionPlanForPdf'
import PrintIcon from '@material-ui/icons/Print';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none',
  },
}

interface Props {
  classes: Style
  actionPlanId?: string
  teacher: Types.Teacher
  magic8?: string
  firebase: Firebase,
  sessionId?: string
  readOnly: boolean
  actionPlanExists: boolean
  editMode?: boolean
  history?: H.History
  onFormChange?: (saved: boolean) => void
}

interface State {
  tool: string
  goal: string
  goalTimeline: Date | null
  benefit: string
  date: Date
  actionSteps: string
  actionStepsArray: Array<{
    step: string
    person: string
    timeline: Date | null
  }>
  editMode: boolean
  actionPlanExists: boolean
  actionPlanId: string
  coachFirstName: string
  coachLastName: string
  createMode: boolean
  saved: boolean
  saveModal: boolean
  anchorEl: HTMLElement | null
  popover: string
  createDialog: boolean
  dialog: boolean
  savedAlert: boolean
  planNumber: Number
  readOnly: boolean
}

interface Style {
  textField: string
  backButton: string
}

/**
 * Form for user to complete action plan
 * @class ActionPlanForm
 */
class ActionPlanForm extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)

    this.state = {
      tool: '',
      goal: '',
      goalTimeline: null,
      benefit: '',
      date: new Date(),
      actionSteps: '',
      actionStepsArray: [
        {
          step: '',
          person: '',
          timeline: new Date(),
        },
      ],
      editMode: false,
      actionPlanExists: this.props.actionPlanExists,
      actionPlanId: '',
      coachFirstName: '',
      coachLastName: '',
      createMode: false,
      saved: true,
      saveModal: false,
      anchorEl: null,
      popover: '',
      createDialog: false,
      dialog: false,
      savedAlert: false,
      planNumber: 0,
      readOnly: this.props.readOnly
    }
  }

  handleAddActionStep = (): void => {
    this.setState(
      {
        actionStepsArray: [
          ...this.state.actionStepsArray,
          {
            step: '',
            person: '',
            timeline: null,
          },
        ],
      },
      () => {
        this.props.firebase.createActionStep(
          this.state.actionPlanId,
          (this.state.actionStepsArray.length - 1).toString(),
        )
      },
    )
  }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   * @param {string} popover
   */
  handlePopoverOpen = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    popover: string,
  ): void => {
    this.setState({
      anchorEl: event.currentTarget,
      popover: popover,
    })
  }

  handlePopoverClose = (): void => {
    this.setState({
      anchorEl: null,
      popover: '',
    })
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (name === 'goal') {
      this.setState({
        goal: event.target.value,
        saved: false,
      })
    } else if (name === 'benefit') {
      this.setState({
        benefit: event.target.value,
        saved: false,
      })
    }
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeActionStep = (number: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newArray = [...this.state.actionStepsArray]
    newArray[number].step = event.target.value
    this.setState({
      actionStepsArray: newArray,
      saved: false,
    })
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangePerson = (number: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newArray = [...this.state.actionStepsArray]
    newArray[number].person = event.target.value
    this.setState({
      actionStepsArray: newArray,
      saved: false,
    })
  }

  /**
   * @param {number} number
   * @param {Date | null} date
   * @return {void}
   */
  handleChangeTimeline = (number: number, date: Date | null): void => {
    const newArray = [...this.state.actionStepsArray]
    newArray[number].timeline = date
    this.setState({
      actionStepsArray: newArray,
      saved: false,
    })
  }

  /**
   * opens dialog for creating new action plan
   */
  handleCreate = (): void => {
    this.setState({
      createDialog: true,
    })
  }

  /**
   * closes dialog for creating new action plan
   */
  handleCloseCreate = (): void => {
    this.setState({
      createDialog: false,
    })
  }

  createNewActionPlan = (): void => {
    this.props.firebase
      .createActionPlan(this.props.teacher.id, this.props.magic8, this.state.planNumber)
      .then(() => {
        this.props.firebase.completeAppointment(
          this.props.teacher.id,
          'Action Plan',
          Constants.ToolAbbreviations[
            this.props.magic8 as Types.ToolAbbreviationsKey
            ],
        )
        this.setState({
          editMode: true,
          actionPlanExists: true,
          createMode: true,
          createDialog: false,
        })
        this.getAllActionPlans()
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  handleYes = () => {
    this.props.firebase.setActionPlanStatus(this.state.actionPlanId);
    this.createNewActionPlan()
  }

  /**
   * @param {string} actionPlanId
   */
  getActionPlan = async (actionPlanId: string) => {
    await this.props.firebase
      .getAPInfo(actionPlanId)
      .then(
        (actionPlanData: {
          sessionId: string
          goal: string
          goalTimeline: firebase.firestore.Timestamp | null
          benefit: string
          dateModified: { seconds: number; nanoseconds: number }
          dateCreated: { seconds: number; nanoseconds: number }
          coach: string
          teacher: string
          tool: string
          planNum: number
          status: string
        }) => {
          const newDate = this.changeDateType(
            actionPlanData.dateModified,
          )
          this.setState({
            tool: actionPlanData.tool,
            actionPlanExists: true,
            goal: actionPlanData.goal,
            goalTimeline:
              actionPlanData.goalTimeline
                ? actionPlanData.goalTimeline.toDate()
                : null,
            benefit: actionPlanData.benefit,
            date: newDate,
            planNumber: actionPlanData.planNum ? actionPlanData.planNum : 1
          })
          const newActionStepsArray: Array<{
            step: string
            person: string
            timeline: Date
          }> = []
          this.props.firebase
            .getActionSteps(actionPlanId)
            .then(
              (
                actionStepsData: Array<{
                  step: string
                  person: string
                  timeline: firebase.firestore.Timestamp | null
                }>,
              ) => {
                actionStepsData.forEach((value, index) => {
                  newActionStepsArray[index] = {
                    step: value.step,
                    person: value.person,
                    timeline:
                      value.timeline ? value.timeline.toDate() : null,
                  }
                })
              },
            )
            .then(() => {
              this.setState({
                actionStepsArray: newActionStepsArray,
                actionPlanId: actionPlanId
              })
            })
            .catch(() => {
              console.log('error retrieving action steps')
            })
        },
      )
      .catch(error => console.log('getActionPlan', error))
  }

  /**
   * @param {Object} date
   * @return {Date}
   */
  changeDateType = (date: { seconds: number; nanoseconds: number }): Date | null => {
    if (date){
      const newDate = new Date(0)
      newDate.setUTCSeconds(date.seconds)
      return newDate
    }else{
      return null
    }

  }

  getAllActionPlans = (): void => {
    this.props.firebase
      .getTeacherActionPlans(this.props.magic8, this.props.teacher.id)
      .then(
        (
          actionPlanData: Array<{
            id: string
            date: { seconds: number; nanoseconds: number }
            newDate: Date
          }>,
        ) => {
          const newArr: Array<{
            id: string
            seconds: number
            newDate: Date
          }> = []
          actionPlanData.map(value => {
            const newDate = this.changeDateType(value.date)
            newArr.push({
              id: value.id,
              seconds: value.date.seconds,
              newDate: newDate,
            })
            return { newArr }
          })
          return newArr
        },
      )
      .then(newArr => {
        newArr.sort((a, b) => b.seconds - a.seconds)
        return newArr
      })
      .then(newArr => {
        if (newArr[0]) {
          this.setState({ actionPlanId: newArr[0].id })
          this.getActionPlan(newArr[0].id)
        } else {
          this.setState({ actionPlanId: '' })
          this.createNewActionPlan()
        }
      })
  }

  /**
   * saves action plan by updating Cloud Firestore records
   * @return {void}
   */
  handleSave = (): void => {
    this.props.firebase
      .saveActionPlan(
        this.state.actionPlanId,
        this.state.goal,
        this.state.goalTimeline,
        this.state.benefit
      )
      .then(() => {
        this.props.firebase.completeAppointment(
          this.props.teacher.id,
          'Action Plan',
          Constants.ToolAbbreviations[
            this.props.magic8 as Types.ToolAbbreviationsKey
          ]
        )
        this.getActionPlan(this.state.actionPlanId)
      })
      .catch(() => {
        console.log('error with saving action plan')
      })
    this.state.actionStepsArray.forEach((value, index) => {
      this.props.firebase
        .saveActionStep(
          this.state.actionPlanId,
          index.toString(),
          value.step,
          value.person,
          value.timeline
        )
        .then(() => {
          this.setState(
            {
              saved: true,
              dialog: false,
            },
            () => {
              this.setState({ savedAlert: true }, () => {
                setTimeout(() => {
                  this.setState({ savedAlert: false })
                }, 1500)
              })
            }
          )
          this.getActionPlan(this.state.actionPlanId)
        })
        .catch((e) => {
          console.log('error in saving action step ', index)
        })
    })
  }

  toggleEdit = (): void => {
    this.setState({ readOnly: !this.state.readOnly })
  }


  handleUndoChanges = (): void => {
    this.getActionPlan(this.state.actionPlanId)
    this.setState({
      dialog: false,
      saved: true,
    })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.props.actionPlanId
      ? this.getActionPlan(this.props.actionPlanId)
      : this.getAllActionPlans()
    this.props.firebase.getCoachFirstName().then((name: string) => {
      this.setState({ coachFirstName: name })
    })
    this.props.firebase.getCoachLastName().then((name: string) => {
      this.setState({ coachLastName: name })
    })
  }

  downloadPDF = (): void => {
    const elementId = "ActionPlanPDFComponent";

    const input: HTMLElement = document.getElementById(elementId);
    let base64data: string | ArrayBuffer | null = null;
    let newBase64Data = '';
    html2canvas(input, {
      scale: 1,
      onclone: function (clonedDoc) {
        clonedDoc.getElementById(elementId).style.visibility = 'visible';
      },
    }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf

      const imgData = canvas.toDataURL('image/png');

      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = canvas.height * pageWidth / canvas.width;

      let position = 10;
      const maxPosition = 0 - imgHeight; // Position needs to be negative but we don't want it exceeding the image height

      // Handle it if it's too big for one page
      while (position > maxPosition) {
        pdf.addImage(imgData, 'PNG', 10, position , pageWidth - 20, imgHeight);
        position -= pageHeight; // This value moves the image up so only the right portion shows on this page
        if (position > maxPosition) {
          pdf.addPage();
        }
      }

      // use this for downloading pdf
      pdf.save("ActionPlanPDF.pdf");
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

  /**
   * lifecycle method invoked after component updates
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.state.saved !== prevState.saved) {
      this.props.onFormChange?.(this.state.saved)
    }
    if (this.props.editMode != prevProps.editMode) {
      this.getActionPlan(this.state.actionPlanId)
    }
    if (this.state.actionPlanExists != prevState.actionPlanExists) {
      this.getActionPlan(this.state.actionPlanId)
    }
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
      school: PropTypes.string,
    }).isRequired,
    readOnly: PropTypes.bool.isRequired,
    actionPlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool,
    history: ReactRouterPropTypes.history,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props
    const goalOpen = Boolean(this.state.popover === 'goal-popover')
    const goalTimelineOpen = Boolean(
      this.state.popover === 'goal-timeline-popover',
    )
    const benefitOpen = Boolean(this.state.popover === 'benefit-popover')
    const actionStepOpen = Boolean(
      this.state.popover === 'action-step-popover',
    )
    const personOpen = Boolean(this.state.popover === 'person-popover')
    const timelineOpen = Boolean(this.state.popover === 'timeline-popover')
    const goalId = goalOpen ? 'goal-popover' : undefined
    const goalTimelineId = goalTimelineOpen
      ? 'goal-timeline-popover'
      : undefined
    const benefitId = benefitOpen ? 'benefit-popover' : undefined
    const actionStepId = actionStepOpen ? 'action-step-popover' : undefined
    const personId = personOpen ? 'person-popover' : undefined
    const timelineId = timelineOpen ? 'timeline-popover' : undefined
    return (
      <div style={{ width: '100%' }} id="ap">
        <FadeAwayModal open={this.state.savedAlert} text="Saved!" />
        {this.state.createDialog ? (
          <Dialog open={this.state.createDialog}>
            <DialogTitle style={{ fontFamily: 'Arimo' }}>
              Send Plan to Maintenance Folder
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to send this action plan to the Maintenance Folder? Action plans in the maintenance folder cannot be re-opened for editing.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseCreate}>
                No
              </Button>
              <Button onClick={this.handleYes}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        {this.state.actionPlanExists ? (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ width: '100%' }}
          >
            <Grid item style={{ width: '100%' }}>

                {this.props.history ? ( // if viewing on Action Plan Page
                  <>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{ width: '100%', paddingTop: '0.5em', paddingBottom: '1em' }}
                    >
                      <Grid item xs={12}>
                        <Grid container direction="row" justify="center" alignItems="center" style={{ width: '100%' }}>

                          <Grid item xs={3}>
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>
                              ACTION PLAN
                            </Typography>
                          </Grid>
                          <Grid container direction="row" justifyContent="flex-end" xs={3}>
                            {this.state.readOnly ? (
                              <Fab
                                aria-label="Edit"
                                name="Edit"
                                size="small"
                                onClick={this.toggleEdit}
                                className={classes.actionButton}
                                style={{ backgroundColor: '#F9FE49' }}
                              >
                                <EditOutlinedIcon style={{ color: '#555555' }} />
                              </Fab>
                            ) : (
                              <Button style={{ width: 40, height: 40 }} onClick={this.handleSave}>
                                {this.state.saved ? (
                                  <img alt="Save" src={SaveGrayImage} style={{ width: '100%' }} />
                                ) : (
                                  <img alt="Save" src={SaveImage} style={{ width: '100%' }} />
                                )}

                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<PrintIcon />}
                              onClick={this.downloadPDF}
                              style={{
                                'white-space': 'initial',
                                'line-height': '20px',
                                textAlign: 'left',
                                justifyContent: 'flex-start',
                                marginBottom: '15px',
                                padding: '11px 15px',
                                textTransform: 'none',
                                marginLeft: '12px',
                              }}
                            >
                              Print
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Render a hidden component that will be used to print the page*/}
                    <div
                      id="ActionPlanPDFComponent"
                      style={{
                        backgroundColor: '#ffffff',
                        width: '210mm',
                        minHeight: '290mm',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        visibility: 'hidden',
                        position: 'fixed',
                        right: -1000,
                      }}
                    >
                      <ActionPlanForPdf
                        tool={this.state.tool}
                        apGoal={this.state.goal}
                        goalTimeline={this.state.goalTimeline}
                        benefit={this.state.benefit}
                        date={this.state.date}
                        actionSteps={this.state.actionStepsArray}
                        teacher={this.props.teacher}
                        coachName={this.state.coachFirstName + ' ' + this.state.coachLastName}
                      />
                    </div>
                  </>

                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ width: '100%' }}
                  >
                    <Grid item xs={11}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography
                            variant="h4"
                            style={{
                              fontFamily: 'Arimo',
                            }}
                          >
                            {'ACTION PLAN ' + this.state.planNumber}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {/* <Button
                          onClick={
                            this.handleCreate
                          }
                        >
                          <AddCircleIcon
                            fontSize="large"
                            style={{
                              fill: '#459aeb',
                            }}
                          />
                        </Button> */}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={this.handleSave}>
                        {this.state.saved ? (
                          <img
                            alt="Save"
                            src={SaveGrayImage}
                            style={{
                              width: '100%',
                            }}
                          />
                        ) : (
                          <img
                            alt="Save"
                            src={SaveImage}
                            style={{
                              width: '100%',
                            }}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                )}
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ fontFamily: 'Arimo' }}
              >
                <Grid item xs={4}>
                  {this.props.teacher.firstName +
                    ' ' +
                    this.props.teacher.lastName}
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                  >
                    {this.state.coachFirstName +
                    ' ' +
                    this.state.coachLastName}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                  >
                    {moment(this.state.date).format(
                      'MM/DD/YYYY',
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                width: '100%',
                paddingTop: '0.4em',
                paddingBottom: '0.8em',
              }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <Grid
                  item
                  style={{
                    width: '77%',
                    border: '2px solid #094492',
                    borderRadius: '0.5em',
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    style={{ width: '100%' }}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{ width: '100%' }}
                      >
                        <Grid item xs={11}>
                          <Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.3em',
                              marginTop:
                                '0.3em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Goal
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid
                            container
                            justify="flex-end"
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item>
                              <InfoIcon
                                style={{
                                  fill:
                                    '#094492',
                                  marginRight:
                                    '0.3em',
                                  marginTop:
                                    '0.3em',
                                }}
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'goal-popover',
                                  )
                                }
                              />
                              <Popover
                                id={goalId}
                                open={
                                  goalOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'bottom',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Writing
                                    a
                                    High-Quality
                                    Goal
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Clearly
                                        define
                                        what
                                        you
                                        want
                                        to
                                        achieve.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Check
                                        that
                                        your
                                        goal
                                        can
                                        be
                                        measured
                                        by
                                        <br />
                                        the
                                        CHALK
                                        observation
                                        tool
                                        (e.g.
                                        Reduce
                                        <br />
                                        center
                                        time
                                        clean-up
                                        transition
                                        to
                                        7
                                        <br />
                                        minutes).
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="goal"
                        name="goal"
                        type="text"
                        value={this.state.goal}
                        onChange={this.handleChange(
                          'goal',
                        )}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        multiline
                        rowsMax={3}
                        rows={3}
                        className={
                          classes.textField
                        }
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.state.readOnly,
                          style: {
                            fontFamily: 'Arimo',
                            width: '98%',
                            marginLeft: '0.5em',
                          },
                        }}
                        style={{
                          marginTop: 0,
                          paddingTop: '0em',
                          marginBottom: 0,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    width: '22%',
                    border: '2px solid #4fd9b3',
                    borderRadius: '0.5em',
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    style={{ width: '100%' }}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{ width: '100%' }}
                      >
                        <Grid item xs={11}>
                          <Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.3em',
                              marginTop:
                                '0.3em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Achieve by:
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid
                            container
                            justify="flex-end"
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item>
                              <InfoIcon
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'goal-timeline-popover',
                                  )
                                }
                                style={{
                                  fill:
                                    '#4fd9b3',
                                  marginRight:
                                    '0.3em',
                                  marginTop:
                                    '0.3em',
                                }}
                              />
                              <Popover
                                id={
                                  goalTimelineId
                                }
                                open={
                                  goalTimelineOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'bottom',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Achieve
                                    by:
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Indicate
                                    a
                                    date
                                    by
                                    which
                                    you
                                    will
                                    achieve
                                    <br />
                                    your
                                    goal.
                                  </Typography>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      style={{ paddingLeft: '0.5em' }}
                    >
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yy"
                          margin="normal"
                          id="date-picker-inline"
                          readOnly={
                            this.state.readOnly
                          }
                          inputProps={{
                            readOnly: this.state.readOnly,
                          }}
                          autoOk={true} // closes date picker on selection
                          value={
                            this.state
                              .goalTimeline
                          }
                          onChange={(
                            date: Date | null,
                          ): void => {
                            this.setState({
                              goalTimeline: date,
                              saved: false,
                            })
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                width: '100%',
                paddingBottom: '0.8em',
              }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ height: '100%' }}
              >
                <Grid
                  item
                  xs={12}
                  style={{
                    border: '2px solid #e99c2e',
                    borderRadius: '0.5em',
                    height: '100%',
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    style={{ width: '100%' }}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{ width: '100%' }}
                      >
                        <Grid item xs={11}>
                          <Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.5em',
                              marginTop:
                                '0.5em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Benefit for Students
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid
                            container
                            justify="flex-end"
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item>
                              <InfoIcon
                                style={{
                                  fill:
                                    '#e99c2e',
                                  marginRight:
                                    '0.3em',
                                  marginTop:
                                    '0.3em',
                                }}
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'benefit-popover',
                                  )
                                }
                              />
                              <Popover
                                id={
                                  benefitId
                                }
                                open={
                                  benefitOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'bottom',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Benefit
                                    for
                                    Students
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        How
                                        will
                                        achieving
                                        this
                                        goal
                                        improve
                                        children&apos;s
                                        <br />
                                        learning?
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        How
                                        will
                                        achieving
                                        this
                                        goal
                                        enhance
                                        the
                                        classroom
                                        <br />
                                        environment
                                        and
                                        children&apos;s
                                        experience?
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="benefit"
                        name="benefit"
                        type="text"
                        value={this.state.benefit}
                        onChange={this.handleChange(
                          'benefit',
                        )}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={
                          classes.textField
                        }
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.state.readOnly,
                          style: {
                            fontFamily: 'Arimo',
                            width: '98%',
                            marginLeft: '0.5em',
                          },
                        }}
                        style={{
                          marginTop: 0,
                          paddingTop: '0em',
                          paddingBottom: '0.5em',
                          marginBottom: 0,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>   
            <Grid
              item
              xs={12}
              style={{ width: '100%', height: '38vh', border: '2px solid #0988ec', borderRadius: '0.5em', }}
            >
              <table style={{borderCollapse: 'collapse', width: '100%' }}>
                <tr >
                  <th style={{paddingBottom: '8px'}}></th>
                  <th style={{textAlign: 'left', width: '55%', paddingBottom: '8px'}}><Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.5em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Action Steps&ensp;
                            <InfoIcon
                                style={{
                                  fill:
                                    '#0988ec',
                                  marginRight:
                                    '0.3em'
                                }}
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'action-step-popover',
                                  )
                                }
                              />
                              <Popover
                                id={
                                  actionStepId
                                }
                                open={
                                  actionStepOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Generating
                                    Action
                                    Steps
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Break
                                        down
                                        the
                                        goal
                                        into
                                        two
                                        or
                                        more
                                        actions.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Consider
                                        what
                                        knowledge
                                        or
                                        skills
                                        will
                                        lead
                                        to
                                        <br />
                                        achieving
                                        the
                                        goal.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Create
                                        at
                                        least
                                        one
                                        action
                                        step
                                        that
                                        describes
                                        <br />
                                        how
                                        the
                                        coach
                                        will
                                        support
                                        the
                                        teacher.
                                        <br />
                                        Example:
                                        modeling,
                                        scheduling
                                        progress
                                        check-ins
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover></Typography></th>
                  <th style={{textAlign: 'left', width:'22%', paddingBottom: '8px'}}><Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.5em',
                              marginTop:
                                '0.5em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Persons&ensp;<InfoIcon
                                style={{
                                  fill:
                                    '#ffd300',
                                  marginRight:
                                    '0.3em'
                                }}
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'person-popover',
                                  )
                                }
                              />
                              <Popover
                                id={
                                  personId
                                }
                                open={
                                  personOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'bottom',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Persons
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        List
                                        the
                                        person(s)
                                        responsible
                                        for
                                        completing
                                        <br />
                                        each
                                        action
                                        step.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Both
                                        the
                                        coach
                                        and
                                        teacher
                                        are
                                        responsible
                                        <br />
                                        for
                                        action
                                        steps.
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                          </Typography></th>
                  <th style={{textAlign: 'left', width:'23%', paddingBottom: '8px'}}><Typography
                            style={{
                              fontSize: '1em',
                              fontFamily:
                                'Arimo',
                              marginLeft:
                                '0.5em',
                              fontWeight:
                                'bold',
                            }}
                          >
                            Timeline&ensp;<InfoIcon
                                style={{
                                  fill:
                                    '#6f39c4',
                                  marginRight:
                                    '0.3em'
                                }}
                                onClick={(
                                  e: React.ChangeEvent<| HTMLInputElement
                                    | HTMLTextAreaElement
                                    | HTMLSelectElement>,
                                ): void =>
                                  this.handlePopoverOpen(
                                    e,
                                    'timeline-popover',
                                  )
                                }
                              />
                              <Popover
                                id={
                                  timelineId
                                }
                                open={
                                  timelineOpen
                                }
                                anchorEl={
                                  this
                                    .state
                                    .anchorEl
                                }
                                onClose={
                                  this
                                    .handlePopoverClose
                                }
                                anchorOrigin={{
                                  vertical:
                                    'bottom',
                                  horizontal:
                                    'right',
                                }}
                                transformOrigin={{
                                  vertical:
                                    'top',
                                  horizontal:
                                    'center',
                                }}
                                elevation={
                                  16
                                }
                              >
                                <div
                                  style={{
                                    padding:
                                      '2em',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily:
                                        'Arimo',
                                    }}
                                  >
                                    Timeline
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Assign
                                        a
                                        timeframe
                                        for
                                        each
                                        action
                                        step
                                        that
                                        <br />
                                        supports
                                        the
                                        coach
                                        and
                                        teacher
                                        in
                                        achieving
                                        <br />
                                        the
                                        goal.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontFamily:
                                            'Arimo',
                                        }}
                                      >
                                        Example
                                        Timeline:
                                        <br />
                                        Action
                                        Step
                                        1:
                                        3/6/2020
                                        <br />
                                        Action
                                        Step
                                        2:
                                        3/12/2020
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                          </Typography></th>
                </tr>
                {this.state.actionStepsArray.map(
                        (value, index) => {
                          return (
                            <tr style={{verticalAlign: 'top'}} key={index}>
                              <td style={{paddingTop: '1.2em'}}>{index+1+'.'}</td>
                              <td style={{paddingTop: '1.2em'}}><TextField
                                id={
                                  'actionSteps' +
                                  index.toString()
                                }
                                name={
                                  'actionSteps' +
                                  index.toString()
                                }
                                type="text"
                                value={
                                  value.step
                                }
                                onChange={this.handleChangeActionStep(
                                  index,
                                )}
                                margin="normal"
                                variant="standard"
                                fullWidth
                                multiline
                                // rowsMax={2}
                                // rows={2}
                                className={
                                  classes.textField
                                }
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.state.readOnly,
                                  style: {
                                    fontFamily:
                                      'Arimo',
                                    width:
                                      '90%',
                                    marginLeft:
                                      '0.5em',
                                    marginRight:
                                      '0.5em',
                                  },
                                }}
                                style={{
                                  marginTop:
                                    '-0.25em',
                                  paddingBottom:
                                    '0.5em',
                                  marginBottom: 0,
                                }}
                              /></td>
                              <td style={{paddingTop: '1.2em'}}><TextField
                                  id={
                                    'person' +
                                    index.toString()
                                  }
                                  name={
                                    'person' +
                                    index.toString()
                                  }
                                  type="text"
                                  value={
                                    value.person
                                  }
                                  onChange={this.handleChangePerson(
                                    index,
                                  )}
                                  margin="normal"
                                  variant="standard"
                                  fullWidth
                                  multiline
                                  // rowsMax={
                                  //   2
                                  // }
                                  // rows={2}
                                  className={
                                    classes.textField
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                    readOnly: this.state.readOnly,
                                    style: {
                                      fontFamily:
                                        'Arimo',
                                      width:
                                        '90%',
                                      marginLeft:
                                        '0.5em',
                                      marginRight:
                                        '0.5em',
                                    },
                                  }}
                                  style={{
                                    marginTop:
                                      '-0.25em',
                                    paddingBottom:
                                      '0.5em',
                                    marginBottom: 0,
                                  }}
                                /></td>
                                <td style={{textAlign:'right'}}><MuiPickersUtilsProvider
                                  utils={
                                    DateFnsUtils
                                  }
                                >
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yy"
                                    margin="normal"
                                    id={
                                      'date-picker-inline' +
                                      index.toString()
                                    }
                                    readOnly={
                                      this.state.readOnly
                                    }
                                    inputProps={{
                                      readOnly: this.state.readOnly,
                                    }}
                                    autoOk={
                                      true
                                    } // closes date picker on selection
                                    value={
                                      value.timeline
                                    }
                                    onChange={(
                                      date: Date | null,
                                    ): void => {
                                      this.handleChangeTimeline(
                                        index,
                                        date,
                                      )
                                    }}
                                  />
                                </MuiPickersUtilsProvider></td>
                            </tr>
                          )
                        },
                      )}
              </table>
              <Button
                            disabled={
                              this.state.readOnly
                            }
                            onClick={
                              this
                                .handleAddActionStep
                            }
                            style={{
                              marginLeft:
                                '0.3em',
                              paddingBottom:
                                '0.5em',
                            }}
                          >
                            <AddCircleIcon
                              style={{
                                fill: this.state.readOnly
                                  ? '#a9a9a9'
                                  : '#0988ec',
                                marginRight:
                                  '0.3em',
                                marginTop:
                                  '0.3em',
                              }}
                            />
                          </Button>
            </Grid>
            {this.props.history ? (<></>) : (<Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="stretch"
                style={{ height: '100%', paddingTop: '0.8em',}}
              >
            <Grid
                  item
                  style={{
                    width: '21%',
                    // border: '2px solid #6f39c4',
                    borderRadius: '0.5em',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ width: '100%' }}
                      >
                        <Grid item> 
                        <Button 
                        style={{ width: '100%' }} 
                        variant="contained"
                        onClick={
                          this.handleCreate
                        }
                        ><Typography
                        style={{
                          fontSize: '1em',
                          fontFamily:
                            'Arimo',
                          marginLeft:
                            '0.5em',
                          marginTop:
                            '0.5em',
                          fontWeight:
                            'bold',
                        }}
                      >
                        Send to Maintenance folder
                      </Typography>
                        </Button>
                  </Grid>
                </Grid>
                </Grid>
                </Grid>)}
          </Grid>
        ) : (
          <div>
            <img
              src={CHALKLogoGIF}
              alt="Loading"
              width="100%"
            />
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(ActionPlanForm)
