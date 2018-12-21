import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class YesNoDialog extends React.Component {
    constructor(props) {
        /*
        REQUIRED PROPS:
        1. buttonText: text of button to initialize dialog.
        2. dialogTitle: The bold text that asks your user for confirmation of an action.
        3. onAccept: pass a callback function that will execute desired behavior upon accepting the dialog.
         */
        super(props);
    }

    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        this.props.onAccept();
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}
                    variant={this.props.buttonVariant} color=
                    {this.props.buttonColor} aria-label=
                    {this.props.buttonAriaLabel}>
                    {this.props.buttonText}
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {this.props.dialogTitle}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                        <Button
                            onClick={this.handleAccept}
                            color="primary"
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default YesNoDialog;
