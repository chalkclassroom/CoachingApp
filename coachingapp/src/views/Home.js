import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Link from "react-router-dom/es/Link";



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
            <AppBar position="static" style={{backgroundColor: '#00c1b8'}}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Classroom Quality Ref
                    </Typography>
                    <Button color="inherit"><Link styles={{display:"block", height: '100%'}} to={`/Magic8Menu`}>Login</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);