import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff0000"
        },
        secondary: {
            main: "#5da7ff"
        }
    }
});

class YesNoDialog extends React.Component {
    /*
        REQUIRED PROPS:
        1. buttonText: text of button to initialize dialog.
        2. dialogTitle: The bold text that asks your user for confirmation of an action.
        3. onAccept: pass a callback function that will execute desired behavior upon accepting the dialog.
        SHOULD OPEN (BOOLEAN):
        If this is false, then the dialog won't open. For example, if there is no transition currently being measured,
        then cancelling the transition should result in a no-op.
        MISC:
        buttonVariant, buttonColor, buttonAriaLabel: use these to format the button to your liking.
     */

    state = {
        open: false
    };


    handleClickOpen = () => {
        if (this.props.shouldOpen) {
            this.setState({ open: true });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        if (this.props.onAcceptParams !== null) {
            this.props.onAccept(this.props.onAcceptParams);
        } else {
            this.props.onAccept();
        }
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {/* <MuiThemeProvider theme={theme}> */}
                    <Button
                        onClick={this.handleClickOpen}
                        style={this.props.buttonStyle}
                        variant={this.props.buttonVariant}
                        color={this.props.buttonColor}
                        aria-label={this.props.buttonAriaLabel}
                        style={{
                            color:this.props.buttonColor, 
                            backgroundColor:this.props.backgroundColor,
                            borderColor:this.props.buttonColor, 
                            borderWidth:"2px",
                            fontSize:"15px"}}
                    >
                        {this.props.buttonText}
                    </Button>
                {/* </MuiThemeProvider> */}
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
