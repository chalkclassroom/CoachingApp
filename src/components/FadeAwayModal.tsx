import * as React from 'react';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
    return {
        position: "fixed",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    } as React.CSSProperties;
}

const styles: object = {
    paper: {
        position: "absolute",
        backgroundColor: 'white',
        padding: '1em',
        borderRadius: 8,
    }
};

interface Props {
    classes: { paper: string },
    open: boolean,
    text: string
}

/**
 * small modal to alert user when they have done something
 * use setTimeout on the open prop to close modal
 * @param {Props} props
 * @return {ReactElement}
 */
function FadeAwayModal(props: Props): React.ReactElement {
    const {classes, open, text} = props;

    return (
        <div>
            <Modal open={open} closeAfterTransition>
                <Fade in={open}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h5" gutterBottom style={{fontFamily: "Arimo"}}>
                            {text}
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default withStyles(styles)(FadeAwayModal);