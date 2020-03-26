import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import Paper  from '@material-ui/core/Paper';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import CircularProgressbar from "react-circular-progressbar";

import grey from "@material-ui/core/colors/grey";
import {amber} from "@material-ui/core/colors";
import * as firebase from "firebase";
import * as Constants from "constants";


const styles: object = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
        // background: '#ede7f6',
        backgroundColor: '#e99b2e',
    },
    gridList: {
        width: 500,
        height: 360,
    },
    inline: {
        display: 'inline',
    },
});

interface Style {
    paper: string,
}

interface Props {
    classes: Style,
    teacherId: string,
    observedBy: number,
    time: number,
    handleTimerReset(): void,
    firebase: {
        auth: {
            currentUser: {
                uid: string
            }
        },
        handleSession(entry: object): void,
        handlePushSE(totalPointsPerRun: any): void
    },
}

interface State {
    students: Array<string>,
    open: boolean,
    setOpen: boolean,
    studentTextFieldValue: string
    status: any,
    currentStudent: number,
    nthRun: number,
    totalPointsPerRun: Array<number>,
    selectedPoint: number,
}

const NAME_LIST = 0;
const OBSERVATION = 1;

/**
 * Student Engagement Name Collection Page
 * @class CenterMenuStudentEngagement
 */
class CenterMenuStudentEngagement extends React.Component<Props, State> {


    /**
     * @param {Props} props
     */
    constructor(props) {
        super(props);
        const mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid,
            type: "SE"
        };
        this.props.firebase.handleSession(mEntry);
    }

    state = {
        students: ['harsha','josh'] as string[],
        open: false,
        setOpen: false,
        studentTextFieldValue: '' as string,
        status: NAME_LIST as any,
        currentStudent: 0 as number,
        nthRun: 0 as number,
        totalPointsPerRun: [0] as number[],
        selectedPoint: -1 as number,
    };


    handleClickOpen = () => {
        this.setState({ setOpen: true });
    };

    handleClose = () => {
        this.setState({ setOpen: false });
    };



    handleAddStudent = (studentName: string): void => {
        if(studentName){
            const newList = this.state.students.concat(studentName);
            this.setState({ students: newList, studentTextFieldValue: '', setOpen: false });
        }
    };

    handleStudentTextFieldChange = (e : React.ChangeEvent<{}>): void =>{
        this.setState({
            studentTextFieldValue: e.target.value
        });
    }

    switchToObservationPage = () => {
        this.setState({ status: OBSERVATION });
        this.props.onStatusChange(true);
    }

    switchToNameList = () => {
        this.setState({ status: NAME_LIST });
        this.props.onStatusChange(false);
    }

    handleSkipRating = () => {
        if((this.state.currentStudent +1) % this.state.students.length === 0){
            this.setState({nthRun: this.state.nthRun +1 });
        }
        this.handleSelectedValue(-1);
        this.setState({ currentStudent: (this.state.currentStudent +1) % this.state.students.length });
        this.props.handleTimerReset();
    }

    handleConfirmRating = () => {
        if(this.state.selectedPoint !== -1){
            //creates the clone of the state
            let pointsState = this.state.totalPointsPerRun.slice();
            pointsState[this.state.nthRun] = isNaN(pointsState[this.state.nthRun])? 0 : pointsState[this.state.nthRun]+ this.state.selectedPoint;
            this.setState({ totalPointsPerRun: pointsState, selectedPoint: -1 });


            if((this.state.currentStudent +1) % this.state.students.length === 0){
                this.setState({nthRun: this.state.nthRun +1 });
            }
            this.setState({ currentStudent: (this.state.currentStudent +1) % this.state.students.length });
            this.props.handleTimerReset();
            this.handleSelectedValue(-1);
            this.props.firebase.handlePushSE(this.state.totalPointsPerRun);
        }
    }

    handleSelectedValue=(point: number) =>{
        this.setState({ selectedPoint: point });
    }


    static propTypes = {
        classes: PropTypes.object.isRequired,
        onStatusChange: PropTypes.func.isRequired,
        teacherId: PropTypes.string,
        firebase: PropTypes.object.isRequired,
        time: PropTypes.number.isRequired,
        handleTimerReset: PropTypes.func.isRequired
    }


    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { classes, time } = this.props;
        switch (this.state.status) {
            case NAME_LIST:
                return (
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"center"}
                        direction={"column"}
                    >
                        <Dialog
                            open={this.state.setOpen}
                            onClose={() => this.handleClose()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Enter Student Name"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You can add a description of the Student for Your Reference.
                                    <form>
                                        <TextField
                                            id="name-filled"
                                            label="Student Name"
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            value={this.state.studentTextFieldValue}
                                            onChange={this.handleStudentTextFieldChange}
                                        />
                                    </form>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleClose()} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => this.handleAddStudent(this.state.studentTextFieldValue.toString())}
                                    color="secondary" autoFocus>
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            justify={'center'}
                            xs={12}
                            style={{margin:40}}
                        >
                            <Grid
                                alignItems="flex-end"
                                direction="row"
                                justify="center"
                                container item xs={8}
                            >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    Create Student List
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom style={{fontFamily: "Arimo"}}>
                                    Please Enter the Student Names.
                                </Typography>
                            </Grid>
                            <Grid
                                alignItems="flex-start"
                                direction="row"
                                justify="center"
                                container item xs={4}
                            >
                                <Fab className={classes.button} aria-label="add" onClick={() => this.handleClickOpen()}>
                                    <AddIcon/>
                                </Fab>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            justify="center"
                            style={{marginTop: 50}}
                        >
                            <Grid
                                alignItems="flex-start"
                                direction="row"
                                justify="flex-start"
                                container item xs={12}
                            >
                                <GridList cellHeight={60} className={classes.gridList} cols={4}>
                                    {this.state.students.map((student: string, i: number) => {
                                        return (
                                            <GridListTile key={i + "grid"} cols={1} className={classes.paper}>
                                                <Card>
                                                    <CardContent>
                                                        <Paper className={classes.root} elevation={1}
                                                               style={{padding: 8}}>
                                                            <Typography variant="subtitle2">
                                                                {i + 1 + " : " + student.charAt(0).toUpperCase()+student.substring(1)}
                                                            </Typography>
                                                        </Paper>
                                                    </CardContent>
                                                </Card>
                                            </GridListTile>
                                        );
                                    })}
                                </GridList>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                            justify="flex-start"
                        >
                            <Button key={"Begin"} variant="contained" className={classes.button}
                                    onClick={() => this.switchToObservationPage()}>
                                Begin Observation
                            </Button>
                        </Grid>
                    </Grid>
                );
            case OBSERVATION:
                return (
                    <Grid
                        container
                        alignItems="center"
                        direction="row"
                        justify={'center'}
                        xs={12}
                    >
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={12}
                        >
                            <Grid item xs={10}>
                            <Button variant="contained"style={{fontFamily: "Arimo"}} onClick={() =>this.switchToNameList()}>
                                <BackIcon/>  Back
                            </Button>
                            </Grid>
                            <Grid item xs={2}>
                            <CircularProgressbar
                                fill="#FFFFFF"
                                percentage={this.state.currentStudent/this.state.students.length === 0 ? 1: (this.state.currentStudent/this.state.students.length)*100}
                                text={`Sweep ${this.state.nthRun + 1 }`}
                                initialAnimation={false}
                                styles={{
                                    path: { stroke: "#e99b2e" },
                                    text: { fill: "#e99b2e", fontSize: "16px" },
                                    background: { fill: "#e99b2e" }
                                }}
                            /></Grid>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="center"
                            container
                            item xs={12}
                        >
                            <Typography variant="h6" gutterBottom style={{fontFamily: "Arimo"}}>
                                 {this.props.time != 0?"Please observe ":"Now Rate "}this Student's level of Engagement.
                            </Typography>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="center"
                            container
                            item xs={12}
                        >
                            <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                {this.state.students[this.state.currentStudent].charAt(0).toUpperCase()+this.state.students[this.state.currentStudent].substr(1)}
                            </Typography>
                        </Grid>
                        <Grid
                            alignItems="stretch"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={8}
                            style={{marginTop: 150, marginBottom: 50}}
                        >
                            <Button
                                variant={this.state.selectedPoint === 0? "contained": "outlined"}
                                disabled={this.props.time!=0?true:false}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(0)}
                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>0</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Off Task
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                variant={this.state.selectedPoint === 1? "contained": "outlined"}
                                disabled={this.props.time!=0?true:false}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(1)}

                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>1</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Mildy Engaged
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                disabled={this.props.time!=0?true:false}
                                variant={this.state.selectedPoint === 2? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14,
                                }}
                                onClick={()=>this.handleSelectedValue(2)}

                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>2</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Engaged
                                </Typography>
                                </Grid>
                            </Button>
                            <Button
                                disabled={this.props.time!=0?true:false}
                                variant={this.state.selectedPoint === 3? "contained": "outlined"}
                                style={{
                                    minHeight: 100,
                                    maxHeight: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    fontFamily: "Arimo",
                                    fontSize: 14
                                }}
                                onClick={()=>this.handleSelectedValue(3)}

                            >
                                <Grid
                                    alignItems="center"
                                    direction="column"
                                    justify="center"
                                    container
                                    item xs={12}
                                >
                                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                                    <b>3</b>
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Highly Engaged
                                </Typography>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            container
                            item xs={6}
                        >
                            <Button variant="outlined"  style={{fontFamily: "Arimo", color: "red", }} onClick={() =>this.handleSkipRating()}>
                                SKIP RATING
                            </Button>
                            <Button color="primary" variant="contained" className={classes.button} style={{fontFamily: "Arimo"}} disabled={this.state.selectedPoint === -1 || this.props.time !==0} onClick={() =>this.handleConfirmRating()}>
                                CONFIRM RATING
                            </Button>
                        </Grid>
                    </Grid>);
            default:
                return <div>Unknown status value!!!</div>;
        }
    }


}

CenterMenuStudentEngagement.propTypes = {
    classes: PropTypes.object.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    teacherId: PropTypes.string,
    firebase: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    handleTimerReset: PropTypes.func.isRequired,
};

export default withStyles(styles)(CenterMenuStudentEngagement);