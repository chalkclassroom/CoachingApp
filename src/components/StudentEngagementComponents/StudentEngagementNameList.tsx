import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

function StudentEngagementNameList(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Typography variant="title" style={{fontFamily: "Arimo"}} color="textPrimary">
                Enter Student Names
            </Typography>
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Sandra Adams
                            </Typography>
                            {" — Green T's and Brown Short…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
        </React.Fragment>
    );
}

StudentEngagementNameList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentEngagementNameList);