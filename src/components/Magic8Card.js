'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, Icon, Typography} from '@material-ui/core';

const styles = {

    firstCard: {
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 300,
        marginLeft: 20,
        marginTop: 20,
    },

    transitionTime: {
        textAlign: 'center',
        marginTop: '20%',
    },

    transitionTimeText: {
        fontSize: 70,
    },
    firstCardAA: {
        backgroundColor: 'red',
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 300,
        marginTop: '20%',
    },

    transitionTimeIcon: {
        position: 'absolute',
        transform: 'scale(2.2)',
        textAlign: 'center',
        marginLeft: '43%',
    },
};

function Magic8Card(props) {
    const { classes } = props;
    return (
        <div>
            <Card className={classes.firstCard} style={{backgroundColor: this.props.backgroundColor}}>
                <CardActionArea className={classes.firstCardAA}>
                    <Icon className={classes.transitionTimeIcon}>
                        {this.props.icon}
                    </Icon>
                    <CardContent className={classes.transitionTime}>
                        <Typography style = {{fontSize: '1.7vw'}}>
                            {this.props.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

Magic8Card.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Magic8Card);