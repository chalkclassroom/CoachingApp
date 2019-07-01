import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import FirebaseContext from "../../components/Firebase/context";
import { withStyles } from '@material-ui/core/styles';

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

class About extends React.Component {

    render() {
        const {classes} = this.props;
        return ( 
            <div className={classes.root}>
                        <FirebaseContext.Consumer>
                            {
                                firebase => <AppBar firebase={firebase}/>
                            }
                        </FirebaseContext.Consumer>

                       <h1>TESTING ABOUT STUFF </h1>
            </div>
        );
    }
}
About.propTypes = {
    classes: PropTypes.object.isRequired
  };

const AboutwRouter = withRouter(About)
export default withStyles(styles)(AboutwRouter);
