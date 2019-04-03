import Button from "@material-ui/core/Button";
import ChildTeacherBehaviorsDuringCentersRating from "./ChildTeacherBehaviorsDuringCentersRating";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import grey from "@material-ui/core/colors/grey";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {
    addNewCenter,
    incrementCenterCount
} from "../../state/actions/associative-cooperative";
import FirebaseContext from "../Firebase/context";

// TODO: X in top right corner, press and hold to remove/edit the center.

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    }
});

const VisitCenterButton = ({centerName, visitCount, onClick}) => {
    let hsl = Math.max(82 - 4 * visitCount, 54);

    return (
        <Button
            variant="contained"
            color="primary"
            style={{
                minHeight: 150,
                minWidth: 150,
                backgroundColor: `hsl(247, 92%, ${hsl}%`
            }}
            onClick={onClick}
        >
            {centerName}
            <br/>
            <br/>
            {visitCount}
        </Button>
    );
};

class NewCenterDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add a New Center</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of the new center.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        inputRef={cn => (this.centerName = cn)}
                        margin="dense"
                        id="center-name"
                        label="Center Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.props.handleSubmit(this.centerName.value)}
                        color="primary"
                    >
                        Add Center
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

class CenterMenu extends React.Component {
    constructor(props) {
        super(props);
        let mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid,
            type: 'AC'
        };
        this.props.firebase.handleSession(mEntry);
    }

    state = {
        addDialog: false,
        ratingScreen: false,
        currentCenter: undefined
    };

    handleClickOpen = () => {
        this.setState({addDialog: true});
    };

    handleClose = () => {
        this.setState({addDialog: false});
    };

    toggleRatingScreen = () => {
        this.setState({ratingScreen: !this.state.ratingScreen});
    };

    handleAddCenter = centerName => {
        this.props.addNewCenter(centerName);
        this.handleClose();
    };

    // Entry point for a center visit.
    handleCenterVisit = centerName => {
        this.toggleRatingScreen();
        this.setState({currentCenter: centerName});
    };

    // Exit point for a center visit.
    finishCenterVisit = centerName => {
        if (centerName !== undefined) {
            this.props.incrementCenterCount(centerName);
        }
    };

    render() {
        if (this.state.ratingScreen) {
            return (
                <ChildTeacherBehaviorsDuringCentersRating
                    currentCenter={this.state.currentCenter}
                    toggleScreen={this.toggleRatingScreen}
                    finishVisit={centerName => this.finishCenterVisit(centerName)}
                    firebase={this.props.firebase}
                />
            );
        } else {
            return (
                <Grid
                    container
                    spacing={16}
                    justify="flex-start"
                    alignItems="center"
                    direction="row"
                >
                    <NewCenterDialog
                        open={this.state.addDialog}
                        handleClose={this.handleClose}
                        handleSubmit={this.handleAddCenter}
                    />
                    {this.props.centers.map((center, index) => (
                        <Grid item xs={3} style={{textAlign: "center"}}>
                            <VisitCenterButton
                                centerName={center.name}
                                visitCount={center.count}
                                onClick={() => this.handleCenterVisit(center.name)}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={3} style={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            style={{
                                minHeight: 150,
                                minWidth: 150,
                                backgroundColor: grey[400]
                            }}
                            onClick={this.handleClickOpen}
                        >
                            Add Center <br/> <br/> +
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        centers: state.associativeCenterState.associativeCenters
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        {addNewCenter, incrementCenterCount}
    )(CenterMenu)
);
