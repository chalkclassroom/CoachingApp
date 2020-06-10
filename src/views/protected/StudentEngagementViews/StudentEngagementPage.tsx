import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import CenterMenuStudentEngagement from "../../../components/StudentEngagementComponents/CenterMenuStudentEngagement";
import {connect} from "react-redux";
import Dashboard from "../../../components/Dashboard";
import Countdown from "../../../components/Countdown";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 5000;


const styles: object = {
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 0
    }
};

interface Teacher {
    email: string,
    firstName: string,
    lastName: string,
    notes: string,
    id: string,
    phone: string,
    role: string,
    school: string
}

interface Props {
    classes: {
        root: string,
        grow: string
    },
    teacherSelected: Teacher
}

interface State {
    time: number,
    completeEnabled: boolean
}

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class StudentEngagementPage extends React.Component<Props, State> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        teacherSelected: PropTypes.exact({
            email: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            notes: PropTypes.string,
            id: PropTypes.string,
            phone: PropTypes.string,
            role: PropTypes.string,
            school: PropTypes.string
        }).isRequired
    };
    state = {
        time: RATING_INTERVAL,
        recs: true,
        completeEnabled: false,
    };

    tick = (): void => {
        if (this.state.time <= 0) {
            this.setState({time: 0});
        } else {
            if (this.state.time - 1000 < 0) {
                this.setState({time: 0});
            } else {
                this.setState({time: this.state.time - 1000});
            }
        }
    };

    handleTimerReset = (): void => {
        this.setState({time: RATING_INTERVAL});
        clearInterval(this.timer);
    };

    /**
     * @param {boolean} enable
     */
    handleCompleteButton = (enable: boolean): void => {
        this.setState({completeEnabled: enable});
    };

    handleTimerStart = (): void => {
        this.timer = setInterval(this.tick, 1000);
    };

    /**
     * render function
     * @return {ReactElement}
     */
    render(): React.ReactElement {
        return (
            <div className={this.props.classes.root}>
                <FirebaseContext.Consumer>
                    {(firebase: object): React.ReactNode => <AppBar firebase={firebase}/>}
                </FirebaseContext.Consumer>
                <Grid
                    container
                    alignItems={"center"}
                    justify={"center"}
                    direction={"row"}
                >
                    <Grid
                        container
                        alignItems={"flex-start"}
                        justify={"flex-start"}
                        direction={"row"}
                    >
                        <Grid item xs={3}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <Dashboard
                                    type="SE"
                                    infoDisplay={
                                        this.state.completeEnabled &&
                                        <Countdown type="SE" timerTime={RATING_INTERVAL} time={this.state.time}/>
                                    }
                                    infoPlacement="center"
                                    completeObservation={this.state.completeEnabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <FirebaseContext.Consumer>
                                {(firebase: object): React.ReactNode => (
                                    <CenterMenuStudentEngagement
                                        teacherId={this.props.teacherSelected.id}
                                        firebase={firebase}
                                        onStatusChange={this.handleCompleteButton}
                                        time={this.state.time}
                                        handleTimerReset={this.handleTimerReset}
                                        handleTimerStart={this.handleTimerStart}
                                    />
                                )}
                            </FirebaseContext.Consumer>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teacherSelected: state.teacherSelectedState.teacher
    };
};

StudentEngagementPage.contextType = FirebaseContext;

export default connect(mapStateToProps, {})(
    withStyles(styles)(StudentEngagementPage)
);
