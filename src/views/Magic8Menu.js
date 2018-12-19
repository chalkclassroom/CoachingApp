import React  from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Magic8Card from '../components/Magic8Card.js';
import {Add, FormatListNumbered, Headset, HowToReg, InsertEmoticon, Menu, People, School, Timer} from '@material-ui/icons';
import {Button, GridList, GridListTile} from '@material-ui/core';


const styles = {
    burgerIcon: {
        position: 'relative',
        transform: 'scale(2)',
        marginTop: '2%',
        marginLeft: '2%',
    },

    homeGrid: {
        marginLeft: '15%',
    },

    observeButton: {
        position: 'relative',
        marginTop: '15%',
    },
};

function Magic8Menu(props) {
    const { classes } = props;
    return (
        <div>
            <Menu className={classes.burgerIcon}/>
            <GridList className={classes.homeGrid} spacing={4} cellHeight="320px" cols={4} rows={2}>
                <GridListTile>
                    <Magic8Card backgroundColor='#55EFC4' title="Transition Time" icon={<Timer/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#81ECEC' title="Classroom Climate" icon={<InsertEmoticon/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#74B9FF' title="Math Instruction" icon={<Add/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#A29BFE' title="Engagement in Learning" icon={<School/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#FFEAA7' title="Level of Instruction" icon={<HowToReg/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#FAB1A0' title="Listening to Children" icon={<Headset/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#FF7675' title="Sequential Activities" icon={<FormatListNumbered/>}/>
                </GridListTile>
                <GridListTile>
                    <Magic8Card backgroundColor='#FD79A8' title="Associative & Cooperative Interactions" icon={<People/>}/>
                </GridListTile>
            </GridList>
            <Button className={classes.observeButton} style={{backgroundColor:"#2196F3"}}>Observe</Button>
        </div>
    );
}

Magic8Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Magic8Menu);
