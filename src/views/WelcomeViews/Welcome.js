import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import WelcomeCarousel from './WelcomeCarousel';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#2196f3'
    },
    grow: {
        flexGrow: 1,
    }
};

class Welcome extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar/>
                <WelcomeCarousel/>
            </div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);