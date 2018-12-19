import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import WelcomeCarousel from './WelcomeCarousel';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#2196f3'
    },
    grow: {
        flexGrow: 1,
    }
};

function Welcome(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar/>
            <WelcomeCarousel/>
            <footer>
                Vanderbilt University
            </footer>
        </div>
    );
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);