import * as React from 'react'
import * as PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import AppBar from '../../../components/AppBar'
import RatingModal from '../../../components/ClassroomClimateComponent/RatingModal'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import BehaviorCounter from '../../../components/ClassroomClimateComponent/BehaviorCounter'
import { connect } from 'react-redux'
import {
  appendClimateRating, emptyClimateRating,
  emptyClimateStack,
} from '../../../state/actions/classroom-climate'
import Dashboard from '../../../components/Dashboard'
import Countdown from '../../../components/Countdown'
import EmptyToneRating from '../../../components/ClassroomClimateComponent/EmptyToneRating'
import TeacherModal from '../HomeViews/TeacherModal'
import * as Types from '../../../constants/Types'
import Firebase from '../../../components/Firebase'
import withObservationWrapper from "../../../components/HOComponents/withObservationWrapper";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 130000

const styles: object = {
    root: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    grow: {
        flexGrow: 1,
    },
    backButton: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
        color: '#333333',
        borderRadius: 3,
        textTransform: 'none',
    },
    main: {
        height: '100%',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
    },
    dashboardGrid: {
        width: '25%',
    },
    contentGrid: {
        width: '75%',
    },
    grid: {
        direction: 'row',
    },
    // ipad landscape
    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
        main: {
            height: '90vh',
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
    // ipad portrait
    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
        main: {
            height: '90vh',
            paddingTop: 0,
            paddingBottom: 0,
        },
        dashboardGrid: {
            width: '100%',
            height: '25%',
        },
        contentGrid: {
            width: '100%',
            height: '75%',
        },
        grid: {
            direction: 'column',
        },
    },
}

interface Props {
    classes: {
        root: string
        grow: string
        backButton: string
        main: string
        dashboardGrid: string
        contentGrid: string
        grid: string

    }
    appendClimateRating(rating: number): void
  preBack(): Promise<boolean>
  emptyClimateRating(): void
  emptyClimateStack(): void
  forceComplete: boolean
}

interface State {
    auth: boolean
    time: number
    ratingIsOpen: boolean
    recs: boolean
    incompleteRating: boolean
    teacherModal: boolean
}

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class ClassroomClimatePage extends React.Component<Props, State> {
    timer: NodeJS.Timeout
    state = {
        auth: true,
        time: RATING_INTERVAL,
        ratingIsOpen: false,
        recs: true,
        incompleteRating: false,
        teacherModal: false,
    }

    tick = (): void => {
        if (this.state.time <= 0) {
            this.handleRatingModal()
            this.setState({ time: RATING_INTERVAL })
        } else {
            if (this.state.time - 1000 < 0) {
                this.setState({ time: 0 })
            } else {
                this.setState({ time: this.state.time - 1000 })
            }
        }
    }

    /**
     * @return {void}
     */
    handleRatingModal = (): void => {
        this.setState({ ratingIsOpen: true })
    }

    /**
     * @param {number} rating
     * @return {void}
     */
    handleRatingConfirmation = (rating: number): void => {
        this.setState({ ratingIsOpen: false })

        this.props.appendClimateRating(rating)

        const entry = {
            BehaviorResponse: rating,
            Type: 'Rat',
            ratingInterval: RATING_INTERVAL,
        }
        const firebase = this.context
        firebase.handlePushClimate(entry)
    }

    /**
     * @return {void}
     */
    handleIncomplete = (): void => {
        this.setState({ incompleteRating: true })
    }

    /**
     * @return {void}
     */
    handleClickAwayIncomplete = (): void => {
        this.setState({ incompleteRating: false })
    }

    handleCloseTeacherModal = (): void => {
        this.setState({ teacherModal: false })
    }

    stopTimer = (): void => {
        clearInterval(this.timer)
    }

    startTimer = (): void => {
        this.timer = global.setInterval(this.tick, 1000)
    }

    /** lifecycle method invoked after component mounts */
    componentDidMount(): void {
        if (!this.props.teacherSelected) {
            this.setState({ teacherModal: true })
        }
        this.timer = global.setInterval(this.tick, 1000)
    }

    /** lifecycle method invoked just before component is unmounted */
    componentWillUnmount(): void {
        clearInterval(this.timer)
      this.props.emptyClimateStack()
      this.props.emptyClimateRating()
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        appendClimateRating: PropTypes.func.isRequired,
        teacherSelected: PropTypes.exact({
            email: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            notes: PropTypes.string,
            id: PropTypes.string,
            phone: PropTypes.string,
            role: PropTypes.string,
            school: PropTypes.string,
        }).isRequired,
    }

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        return this.props.teacherSelected ? (
            <div className={this.props.classes.root}>
                <FirebaseContext.Consumer>
                    {(firebase: Firebase): React.ReactNode => (
                        <AppBar confirmAction={this.props.preBack} firebase={firebase} />
                    )}
                </FirebaseContext.Consumer>
                <Modal open={this.state.ratingIsOpen}>
                    <RatingModal
                        handleRatingConfirmation={this.handleRatingConfirmation}
                        handleIncomplete={this.handleIncomplete}
                    />
                </Modal>
                <Modal open={this.state.incompleteRating}>
                    <ClickAwayListener
                        onClickAway={this.handleClickAwayIncomplete}
                    >
                        <EmptyToneRating />
                    </ClickAwayListener>
                </Modal>
                <main className={this.props.classes.main}>
                    <Grid
                        container
                        alignItems={'center'}
                        justify={'center'}
                        direction={'column'}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Grid
                            container
                            alignItems={'center'}
                            justify={'space-evenly'}
                            style={{ width: '100%', height: '100%' }}
                            className={this.props.classes.grid}
                        >
                            <Grid
                                item
                                className={this.props.classes.dashboardGrid}
                                style={{ paddingTop: '0.5em' }}
                            >
                                <Grid
                                    container
                                    alignItems={'center'}
                                    justify={'center'}
                                    direction={'column'}
                                    style={{ height: '100%' }}
                                >
                                    <Grid item>
                                        <Dashboard
                                            type="CC"
                                            infoDisplay={
                                                <Countdown
                                                    type="CC"
                                                    time={this.state.time}
                                                    timerTime={RATING_INTERVAL}
                                                />
                                            }
                                            infoPlacement="center"
                                            completeObservation={true}
                                            startTimer={this.startTimer}
                                            stopTimer={this.stopTimer}
                                            forceComplete={this.props.forceComplete}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                className={this.props.classes.contentGrid}
                            >
                                <Grid
                                    container
                                    alignItems={'center'}
                                    justify={'center'}
                                    direction={'column'}
                                    style={{ height: '100%' }}
                                >
                                    <FirebaseContext.Consumer>
                                        {(firebase: {
                                            auth: {
                                                currentUser: {
                                                    uid: string
                                                }
                                            }
                                            handleSession(entry: object): void
                                            handlePushClimate(
                                                entry: object
                                            ): void
                                        }): React.ReactNode => (
                                            <BehaviorCounter
                                                firebase={firebase}
                                            />
                                        )}
                                    </FirebaseContext.Consumer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        ) : (
            <FirebaseContext.Consumer>
                {(firebase: {
                    getTeacherList(): Promise<Types.Teacher[]>
                }): React.ReactElement => (
                    <TeacherModal
                        handleClose={this.handleCloseTeacherModal}
                        firebase={firebase}
                        type={'Observe'}
                    />
                )}
            </FirebaseContext.Consumer>
        )
    }
}

const wrapperOptions = {
  totalTime: 180,
  modalTime: 170,
  confirmationPrompt: 'Would you like to complete the Observation?',
  confirmText: 'Yes, Complete',
  cancelText: 'No, Continue here'
}

const mapStateToProps = (
    state: Types.ReduxState
): {
    teacherSelected: Types.Teacher
} => {
    return {
        teacherSelected: state.teacherSelectedState.teacher,
    }
}

ClassroomClimatePage.contextType = FirebaseContext

export default connect(mapStateToProps, {
    appendClimateRating,
    emptyClimateStack,
    emptyClimateRating
})(withStyles(styles)(withObservationWrapper(ClassroomClimatePage, wrapperOptions)))
