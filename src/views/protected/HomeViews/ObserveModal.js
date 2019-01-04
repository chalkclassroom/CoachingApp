import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import cyan from "@material-ui/core/colors/teal";
import CloseIcon from "@material-ui/icons/Close"
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TeacherSvg from '../../../assets/icons/teacher.svg'
import {withRouter} from "react-router-dom";

function getModalStyle () {

    return {
        position: 'fixed',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 4 * 1 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: cyan,
    },
});

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '40%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: '100%',
        height: '500',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class ObserveModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            value: 0,
            teachers: []
        };

        this.selectTeacher = this.selectTeacher.bind(this);
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

    componentDidMount() {
        this.props.firebase.getTeacherList().on('value', snapshot => {
            this.setState((previousState, currentProps) => {
                console.log(snapshot.val());
                console.log(previousState.teachers);

                let arraySnapshot = [];
                let objectSnapshot = snapshot.val();

                Object.keys(objectSnapshot).forEach(key=>{
                   arraySnapshot.push({key: objectSnapshot[key]})
                });

                return {teachers: previousState.teachers.concat(arraySnapshot)};
            });
        });
    }

    selectTeacher(teacherInfo) {
        console.log(teacherInfo);
        this.props.history.push({pathname: '/Magic8Menu', state: teacherInfo});
    }

    render () {
        const {classes} = this.props;

        return (
            <div>
                <Modal
                    open={this.state.open}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid xs={12} container alignItems="center" direction="row" justify="space-between">
                            <Typography component={'h6'} variant={'h6'}>
                                Select a Teacher to Observe
                            </Typography>
                            <IconButton style={{padding: 10}}>
                                <Tooltip title={"Close"} placement={'right'}>
                                    <CloseIcon onClick={this.props.handleClose}/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid xs={12} container alignItems="center" direction="column" justify="flex-start">
                            <List className={classes.list}>
                                {
                                    this.state.teachers.map( teacher => console.log(Object.values(teacher)[0]))}
                                {
                                    this.state.teachers.map( teacher =>
                                        <ListItem alignItems="flex-start" onClick={()=>this.selectTeacher(teacher)}>
                                            <ListItemAvatar>
                                                <Avatar alt="Teacher Profile Pic" src={TeacherSvg} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={Object.values(teacher)[0].firstName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                                            School Name
                                                        </Typography>
                                                        {" — Class Name"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

ObserveModal.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.object.isRequired
};

const ObserveModalWithRouter = withRouter(ObserveModal);
export default withStyles(styles)(ObserveModalWithRouter);