import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Link from "react-router-dom/es/Link";
import Logo from '../assets/logo.png'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color={"primary"}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Logo"
                        className={classNames(
                            classes.menuButton,
                            classes.menuButtonHidden,
                        )}
                    >
                        <img src={Logo} height={'48'}/>
                    </IconButton>
                    <div color="inherit" className={classes.grow}/>
                    <Button color="secondary" variant={"contained"}><Link to={`/login`}>Log In</Link></Button>
                    <Button color="secondary" variant={"contained"}><Link to={`/signup`}>Sign Up</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);