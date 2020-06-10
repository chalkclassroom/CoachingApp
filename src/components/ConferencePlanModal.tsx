import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ConferencePlanForm from './ConferencePlanForm';

/**
 * specifies styling for modal
 * @return {React.CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
    return {
        position: "fixed",
        top: `52%`,
        left: `62.5%`,
        transform: `translate(-50%, -50%)`,
    } as React.CSSProperties;
}

const styles: object = {
    paper: {
        position: "absolute",
        width: "60%",
        height: "75%",
        backgroundColor: 'white',
        padding: '2em',
        borderRadius: 8,
        overflow: 'auto'
    },
    photoIcon: {
        height: "15vh"
    },
    "@media (max-width: 700px)": {
        paper: {
            height: '70%',
            width: '60%'
        },
    },
};

interface Style {
    paper: string,
    photoIcon: string,
    '@media (max-width: 700px)': string
}

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
    classes: Style,
    firebase: {},
    teacher: Teacher,
    sessionId: string,
    conferencePlanExists: boolean,

    handleClose(): void,
}

interface State {
    open: boolean,
    role: number
}

/**
 * formatting for modal containing pilot sign up form on landing page
 * @class ConferencePlanModal
 */
class ConferencePlanModal extends React.Component<Props, State> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleClose: PropTypes.func.isRequired,
        firebase: PropTypes.object.isRequired,
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
        sessionId: PropTypes.string.isRequired,
        conferencePlanExists: PropTypes.bool.isRequired,
    };
    state = {
        open: true,
        role: 0
    };

    handleOpen = (): void => {
        this.setState({open: true});
    };

    handleClose = (): void => {
        this.setState({open: false});
        this.props.handleClose();
    };

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const {classes} = this.props;

        return (
            <div>
                <Modal open={this.state.open}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <ConferencePlanForm
                            firebase={this.props.firebase}
                            teacher={this.props.teacher}
                            sessionId={this.props.sessionId}
                            handleClose={this.handleClose}
                            readOnly={false}
                            conferencePlanExists={this.props.conferencePlanExists}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(ConferencePlanModal);