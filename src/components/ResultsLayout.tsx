import * as React from 'react'
import * as PropTypes from 'prop-types'
import FirebaseContext from './Firebase/FirebaseContext'
import { withStyles } from '@material-ui/core/styles'
import AppBar from './AppBar'
import Grid from '@material-ui/core/Grid'
import { Tabs, Tab } from '@material-ui/core'
import TabBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import 'chartjs-plugin-datalabels'
import ResultsDashboard from './ResultsDashboard'
import ActionPlanForm from './ActionPlanForm'
import ConferencePlanForm from './ConferencePlanForm'
import LogoImage from '../assets/images/LogoImage.svg'
import CHALKLogoGIF from '../assets/images/CHALKLogoGIF.gif'
import * as Types from '../constants/Types'
import Firebase from './Firebase'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const styles: object = {
    main: {
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        height: '100%',
    },
    resultsContent: {
        position: 'relative',
        width: '70vw',
        marginTop: '0.5em',
    },
    dataContent: {
        position: 'relative',
        width: '60vw',
        marginTop: '0.5em',
    },
    buttonText: {
        fontSize: '12px',
        textAlign: 'center',
    },
    transitionTypeButton: {
        width: '70px',
        height: '70px',
    },
    tabBar: {
        marginBottom: '10px',
        height: '5%',
        width: '100%',
    },
    coachPrepCard: {
        width: '100%',
        overflow: 'auto',
    },
    backButton: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
        color: '#333333',
        borderRadius: 3,
        textTransform: 'none',
    },
    grid: {
        direction: 'row',
        height: '100%',
    },
    dashboardGrid: {
        width: '25%',
    },
    contentGrid: {
        width: '75%',
        height: '100%',
    },
    // ipad landscape
    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
        main: {
            height: '90vh',
            paddingTop: 0,
            paddingBottom: 0,
        },
        dashboardGrid: {
            height: '100%',
        },
    },
    // ipad portait
    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
        main: {
            height: '90vh',
            paddingTop: 0,
            paddingBottom: 0,
        },
        grid: {
            direction: 'column',
            height: '100%',
        },
        dashboardGrid: {
            width: '100%',
            height: '25%',
        },
        contentGrid: {
            paddingTop: '2em',
            width: '100%',
            height: '75%',
        },
        resultsContent: {
            width: '90vw',
        },
        dataContent: {
            width: '90vw',
        },
    },
}

interface Props {
    teacher: Types.Teacher
    classes: Style
    magic8: string
    summary: React.ReactNode
    details: React.ReactNode
    trendsGraph: React.ReactNode
    changeSessionId(event: React.SyntheticEvent): void
    sessionId: string
    sessionDates: Array<{ id: string; sessionStart: { value: string } }>
    questions: React.ReactNode
    chosenQuestions: Array<string>
    notes: Array<{ id: string; content: string; timestamp: string }>
    actionPlanExists: boolean
    conferencePlanId: string
    addNoteToPlan(conferencePlanId: string, note: string): void
    conferencePlanExists: boolean
    noDataYet: boolean
    literacyType?: string
}

interface Style {
    main: string
    resultsContent: string
    dataContent: string
    buttonText: string
    transitionTypeButton: string
    tabBar: string
    coachPrepCard: string
    backButton: string
    grid: string
    dashboardGrid: string
    contentGrid: string
}

interface State {
    view: string
    tabValue: number
    actionPlanEditMode: boolean
    conferencePlanEditMode: boolean
    count: number
    notesModal: boolean
    actionPlanFormSaved: boolean
    actionPlanModalOpen: boolean
    nextView: string | null
    awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null
}

/**
 * layout for results pages
 * @class ResultsLayout
 */
class ResultsLayout extends React.Component<Props, State> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)

        this.state = {
            view: 'data',
            nextView: null,
            tabValue: 0,
            actionPlanEditMode: false,
            conferencePlanEditMode: false,
            count: 0,
            notesModal: false,
            actionPlanFormSaved: true,
            actionPlanModalOpen: false,
            awaitingConfirmationRef: null
        }
    }

    /**
     * @param {string} name
     */
    viewClick = async (name: string): void => {
        if (this.state.view === 'actionPlan' &&
            name !== 'actionPlan' &&
            !this.state.actionPlanFormSaved) {
            this.setState({
                nextView: name,
                actionPlanModalOpen: true,
            })
          await this.handleActionPlanModal()
        } else if (this.state.view !== name) {
            this.setState({ view: name })
        }
    }

    onActionPlanFormChange = (saved: boolean): void => {
        this.setState({
            actionPlanFormSaved: saved
        })
    }

    handleSummary = (): void => {
        if (this.state.tabValue !== 0) {
            this.setState({
                tabValue: 0,
            })
        }
    }

    handleDetails = (): void => {
        if (this.state.tabValue !== 1) {
            this.setState({
                tabValue: 1,
            })
        }
    }

    handleTrends = (): void => {
        if (this.state.tabValue !== 2) {
            this.setState({
                tabValue: 2,
            })
        }
    }

    handleOpenNotes = (): void => {
        this.setState({ notesModal: true })
    }

    handleCloseNotes = (): void => {
        this.setState({ notesModal: false })
    }

    onActionPlanModalOpen =  (): Promise<boolean> => {
      this.setState({actionPlanModalOpen: true})
      return new Promise<boolean>((resolve: (discard: boolean) => void, reject): void => {
        this.setState({awaitingConfirmationRef: {resolve}})
      })
    }

    onActionPlanModalDiscard = (): void => {
      if(this.state.awaitingConfirmationRef) {
        this.state.awaitingConfirmationRef.resolve(true)
      }
        this.setState({
            actionPlanModalOpen: false,
            view: this.state.nextView,
            actionPlanFormSaved: true,
          awaitingConfirmationRef: null
        })
    }

    onActionPlanModalClose = (): void => {
      if(this.state.awaitingConfirmationRef) {
        this.state.awaitingConfirmationRef.resolve(false)
      }
        this.setState({
            actionPlanModalOpen: false,
          awaitingConfirmationRef: null
        })
    }

    handleActionPlanModal = async () => {
      if(!(this.state.view === 'actionPlan') || this.state.actionPlanFormSaved) {
        return Promise.resolve(true)
      }
      return this.onActionPlanModalOpen();
    }

    // eslint-disable-next-line require-jsdoc
    componentDidMount(): void {
        Chart.Legend.prototype.afterFit = function () {
            this.height = this.height + 20;
        }
    }

    // eslint-disable-next-line require-jsdoc
    componentWillUnmount(): void {
        Chart.Legend.prototype.afterFit = function () {
            this.height = this.height - 20;
        }
    }


    static propTypes = {
        teacher: PropTypes.exact({
            email: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            id: PropTypes.string,
            phone: PropTypes.string,
            role: PropTypes.string,
            school: PropTypes.string,
            notes: PropTypes.string,
        }).isRequired,
        classes: PropTypes.object.isRequired,
        magic8: PropTypes.string.isRequired,
        summary: PropTypes.element.isRequired,
        details: PropTypes.element.isRequired,
        trendsGraph: PropTypes.element.isRequired,
        changeSessionId: PropTypes.func.isRequired,
        sessionId: PropTypes.string.isRequired,
        sessionDates: PropTypes.array.isRequired,
        questions: PropTypes.element.isRequired,
        chosenQuestions: PropTypes.array.isRequired,
        notes: PropTypes.array.isRequired,
        actionPlanExists: PropTypes.bool.isRequired,
        conferencePlanId: PropTypes.string.isRequired,
        addNoteToPlan: PropTypes.func.isRequired,
        conferencePlanExists: PropTypes.bool.isRequired,
        noDataYet: PropTypes.bool.isRequired,
    }

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { classes } = this.props
        return (
            <div>
                <FirebaseContext.Consumer>
                    {(firebase: Firebase): React.ReactNode => (
                        <AppBar confirmAction={this.handleActionPlanModal} firebase={firebase} />
                    )}
                </FirebaseContext.Consumer>
                <Dialog open={this.state.actionPlanModalOpen}>
                    <DialogTitle style={{ fontFamily: 'Arimo' }}>
                        You have unsaved changes in your action plan.
                        Are you sure you want to discard them?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.onActionPlanModalClose}>
                            No, keep editing
                        </Button>
                        <Button onClick={this.onActionPlanModalDiscard}>
                            Yes, discard changes
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className={classes.main}>
                    <Grid
                        container
                        justify="center"
                        alignItems="flex-start"
                        className={classes.grid}
                    >
                        <Grid
                            item
                            className={classes.dashboardGrid}
                            style={{
                                alignSelf: 'flex-start',
                                paddingTop: '0.5em',
                            }}
                        >
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                                direction="column"
                                style={{ height: '100%', width: '100%' }}
                            >
                                <Grid item style={{ width: '100%' }}>
                                    <ResultsDashboard
                                        magic8={this.props.magic8}
                                        view={this.state.view}
                                        viewClick={this.viewClick}
                                        sessionId={this.props.sessionId}
                                        conferencePlanId={
                                            this.props.conferencePlanId
                                        }
                                        addNoteToPlan={this.props.addNoteToPlan}
                                        changeSessionId={
                                            this.props.changeSessionId
                                        }
                                        sessionDates={this.props.sessionDates}
                                        notes={this.props.notes}
                                        handleOpenNotes={this.handleOpenNotes}
                                        handleCloseNotes={this.handleCloseNotes}
                                        notesModal={this.state.notesModal}
                                        literacyType={this.props.literacyType}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.contentGrid}
                            justify="flex-start"
                            direction="column"
                            alignItems="center"
                        >
                            {this.props.noDataYet ? (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    style={{ height: '88vh' }}
                                >
                                    <Grid item>
                                        <img
                                            src={LogoImage}
                                            alt="CHALK"
                                            height="100vh"
                                        />
                                    </Grid>
                                    <Grid item style={{ paddingTop: '3em' }}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            style={{
                                                fontFamily: 'Arimo',
                                                paddingLeft: '1em',
                                                paddingRight: '1em',
                                            }}
                                        >
                                            You have not completed any{' '}
                                            {this.props.magic8 === 'AC'
                                                ? 'Associative and Cooperative'
                                                : this.props.magic8}{' '}
                                            observations for{' '}
                                            {this.props.teacher.firstName +
                                                ' ' +
                                                this.props.teacher
                                                    .lastName}{' '}
                                            yet.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {/* <Button
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/Magic8Menu",
                          state: { teacher: this.props.teacher, type: this.props.type, teachers: this.props.teacherList}
                        })
                      }}
                    >
                      Make an Observation
                    </Button> */}
                                    </Grid>
                                </Grid>
                            ) : (
                                <div>
                                    {this.state.view === 'data' ? (
                                        <div className={classes.dataContent}>
                                            <Grid item>
                                                <TabBar
                                                    position="static"
                                                    color="default"
                                                    className={classes.tabBar}
                                                >
                                                    <Tabs
                                                        value={
                                                            this.state.tabValue
                                                        }
                                                        indicatorColor="primary"
                                                        textColor="primary"
                                                        variant="fullWidth"
                                                    >
                                                        <Tab
                                                            label="Summary"
                                                            onClick={
                                                                this
                                                                    .handleSummary
                                                            }
                                                            style={{
                                                                fontFamily:
                                                                    'Arimo',
                                                                fontSize: '1em',
                                                            }}
                                                        />
                                                        <Tab
                                                            label="Details"
                                                            onClick={
                                                                this
                                                                    .handleDetails
                                                            }
                                                            style={{
                                                                fontFamily:
                                                                    'Arimo',
                                                                fontSize: '1em',
                                                            }}
                                                        />
                                                        <Tab
                                                            label="Trends"
                                                            onClick={
                                                                this
                                                                    .handleTrends
                                                            }
                                                            style={{
                                                                fontFamily:
                                                                    'Arimo',
                                                                fontSize: '1em',
                                                            }}
                                                        />
                                                    </Tabs>
                                                </TabBar>
                                            </Grid>
                                            <Grid item>
                                                {this.state.tabValue === 0 ? (
                                                    <div>
                                                        {this.props
                                                            .sessionId ? (
                                                            <div>
                                                                {
                                                                    this.props
                                                                        .summary
                                                                }
                                                            </div>
                                                        ) : (
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justify="center"
                                                                alignItems="center"
                                                            >
                                                                <img
                                                                    src={
                                                                        CHALKLogoGIF
                                                                    }
                                                                    alt="Loading"
                                                                    width="100%"
                                                                />
                                                            </Grid>
                                                        )}
                                                    </div>
                                                ) : this.state.tabValue ===
                                                    1 ? (
                                                    <div>
                                                        <Grid
                                                            style={{
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            {this.props
                                                                .sessionId ? (
                                                                <div>
                                                                    {
                                                                        this
                                                                            .props
                                                                            .details
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justify="center"
                                                                    alignItems="center"
                                                                >
                                                                    <img
                                                                        src={
                                                                            CHALKLogoGIF
                                                                        }
                                                                        alt="Loading"
                                                                        width="100%"
                                                                    />
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {this.props.trendsGraph}
                                                    </div>
                                                )}
                                            </Grid>
                                        </div>
                                    ) : this.state.view === 'questions' ? (
                                        <div className={classes.resultsContent}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            align="center"
                                                            style={{
                                                                fontFamily:
                                                                    'Arimo',
                                                                padding:
                                                                    '0.5em',
                                                            }}
                                                        >
                                                            Based on the
                                                            observation results,
                                                            select a category to
                                                            guide your
                                                            reflection on
                                                            classroom practices
                                                            and plan your next
                                                            steps.
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    {this.props.questions}
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ) : this.state.view === 'conferencePlan' ? (
                                        <div className={classes.resultsContent}>
                                            {this.props.sessionId ? (
                                                <div>
                                                    <FirebaseContext.Consumer>
                                                        {(firebase: {
                                                            createConferencePlan(
                                                                teacherId: string,
                                                                sessionId: string,
                                                                magic8: string
                                                            ): Promise<void>
                                                            getConferencePlan(
                                                                sessionId: string
                                                            ): Promise<
                                                                Array<{
                                                                    id: string
                                                                    feedback: Array<
                                                                        string
                                                                    >
                                                                    questions: Array<
                                                                        string
                                                                    >
                                                                    addedQuestions: Array<
                                                                        string
                                                                    >
                                                                    notes: Array<
                                                                        string
                                                                    >
                                                                    date: {
                                                                        seconds: number
                                                                        nanoseconds: number
                                                                    }
                                                                }>
                                                            >
                                                            saveConferencePlan(
                                                                conferencePlanId: string,
                                                                feedback: Array<
                                                                    string
                                                                >,
                                                                questions: Array<
                                                                    string
                                                                >,
                                                                addedQuestions: Array<
                                                                    string
                                                                >,
                                                                notes: Array<
                                                                    string
                                                                >
                                                            ): Promise<void>
                                                            getCoachFirstName(): Promise<
                                                                string
                                                            >
                                                            getCoachLastName(): Promise<
                                                                string
                                                            >
                                                        }): React.ReactNode => (
                                                            <ConferencePlanForm
                                                                conferencePlanExists={
                                                                    this.props
                                                                        .conferencePlanExists
                                                                }
                                                                editMode={
                                                                    this.state
                                                                        .conferencePlanEditMode
                                                                }
                                                                firebase={
                                                                    firebase
                                                                }
                                                                teacher={
                                                                    this.props
                                                                        .teacher
                                                                }
                                                                chosenQuestions={
                                                                    this.props
                                                                        .chosenQuestions
                                                                }
                                                                readOnly={false}
                                                                sessionId={
                                                                    this.props
                                                                        .sessionId
                                                                }
                                                                magic8={
                                                                    this.props
                                                                        .magic8
                                                                }
                                                                notesModal={
                                                                    this.state
                                                                        .notesModal
                                                                }
                                                            />
                                                        )}
                                                    </FirebaseContext.Consumer>
                                                </div>
                                            ) : (
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <img
                                                        src={CHALKLogoGIF}
                                                        alt="Loading"
                                                        width="100%"
                                                    />
                                                </Grid>
                                            )}
                                        </div>
                                    ) : this.state.view === 'actionPlan' ? (
                                        <div className={classes.resultsContent}>
                                            {this.props.sessionId ? (
                                                <div>
                                                    <FirebaseContext.Consumer>
                                                        {(firebase: {
                                                            createActionPlan(
                                                                teacherId: string,
                                                                magic8: string
                                                            ): Promise<void>
                                                            getAPInfo(
                                                                actionPlanId: string
                                                            ): Promise<{
                                                                sessionId: string
                                                                goal: string
                                                                goalTimeline: firebase.firestore.Timestamp
                                                                benefit: string
                                                                dateModified: {
                                                                    seconds: number
                                                                    nanoseconds: number
                                                                }
                                                                dateCreated: {
                                                                    seconds: number
                                                                    nanoseconds: number
                                                                }
                                                                coach: string
                                                                teacher: string
                                                                tool: string
                                                            }>
                                                            getTeacherActionPlans(
                                                                practice: string,
                                                                teacherId: string
                                                            ): Promise<
                                                                Array<{
                                                                    id: string
                                                                    date: {
                                                                        seconds: number
                                                                        nanoseconds: number
                                                                    }
                                                                    newDate: Date
                                                                }>
                                                            >
                                                            getActionSteps(
                                                                actionPlanId: string
                                                            ): Promise<
                                                                Array<{
                                                                    step: string
                                                                    person: string
                                                                    timeline: firebase.firestore.Timestamp
                                                                }>
                                                            >
                                                            saveActionPlan(
                                                                actionPlanId: string,
                                                                goal: string,
                                                                goalTimeline: Date | null,
                                                                benefit: string
                                                            ): Promise<void>
                                                            saveActionStep(
                                                                actionPlanId: string,
                                                                index: string,
                                                                step: string,
                                                                person: string,
                                                                timeline: Date | null
                                                            ): Promise<void>
                                                            createActionStep(
                                                                actionPlanId: string,
                                                                index: string
                                                            ): Promise<void>
                                                            getCoachFirstName(): Promise<
                                                                string
                                                            >
                                                            getCoachLastName(): Promise<
                                                                string
                                                            >
                                                        }): React.ReactNode => (
                                                            <ActionPlanForm
                                                                onFormChange={this.onActionPlanFormChange}
                                                                firebase={
                                                                    firebase
                                                                }
                                                                teacher={
                                                                    this.props
                                                                        .teacher
                                                                }
                                                                sessionId={
                                                                    this.props
                                                                        .sessionId
                                                                }
                                                                readOnly={false}
                                                                actionPlanExists={
                                                                    this.props
                                                                        .actionPlanExists
                                                                }
                                                                editMode={
                                                                    this.state
                                                                        .actionPlanEditMode
                                                                }
                                                                magic8={
                                                                    this.props
                                                                        .magic8
                                                                }
                                                            />
                                                        )}
                                                    </FirebaseContext.Consumer>
                                                </div>
                                            ) : (
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <img
                                                        src={CHALKLogoGIF}
                                                        alt="Loading"
                                                        width="100%"
                                                    />
                                                </Grid>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

ResultsLayout.contextType = FirebaseContext
export default withStyles(styles)(ResultsLayout)
