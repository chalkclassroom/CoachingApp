import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import WelcomeCarousel from './WelcomeCarousel';
import FirebaseContext from "../../components/Firebase/context";

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#ffffff',
        height: '100vh'
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
                        <FirebaseContext.Consumer>
                            {
                                firebase => <AppBar firebase={firebase}/>
                            }
                        </FirebaseContext.Consumer>
                        <WelcomeCarousel/> 
            </div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);