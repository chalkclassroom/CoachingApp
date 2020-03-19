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
    classes: Style
}

interface State {
    students: Array<string>,
    open: boolean,
    setOpen: boolean,
    studentTextFieldValue: string
}

/**
 * Student Engagement Name Collection Page
 * @class StudentEngagementNameList
 */
class StudentEngagementNameList extends React.Component<Props, State> {

    state = {
        students: ['harsha','josh'] as string[],
        open: false,
        setOpen: false,
        studentTextFieldValue: '' as string,
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

    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.setOpen}
                    onClose={()=>this.handleClose()}
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
                                    value={this.state.studentTextFieldValue} onChange={this.handleStudentTextFieldChange}
                                />
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={()=>this.handleAddStudent(this.state.studentTextFieldValue.toString())} color="secondary" autoFocus>
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
                                Please Enter the Student Names in your Class for taking an Observation.
                            </Typography>
                            </Grid>
                            <Grid
                                alignItems="flex-start"
                                direction="row"
                                justify="center"
                                container item xs={4}
                            >
                                <Fab className={classes.button} aria-label="add" onClick={ () =>this.handleClickOpen()}>
                                    <AddIcon />
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
                                {this.state.students.map((student: string,i: number) => {
                                    return (
                                        <GridListTile key={i+"grid"} cols={1} className={classes.paper}>
                                            <Card>
                                                <CardContent>
                                                    <Paper className={classes.root} elevation={1} style={{padding:8}}>
                                                        <Typography variant="subtitle2">
                                                        {i+1+" : "+student}
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
                            <Button key={"Begin"} variant="contained" className={classes.button}>
                                Begin Observation
                            </Button>
                        </Grid>
                    </div>
        );
    }
}



StudentEngagementNameList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentEngagementNameList);