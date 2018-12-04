import React, {Component}  from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import Magic8Card from '../components/Magic8Card.js';
import {Add, FormatListNumbered, Headset, HowToReg, Menu, InsertEmoticon, People, School, Timer} from '@material-ui/icons';
import {Button, Typography} from '@material-ui/core';
import styled from "styled-components";


const CardRow = styled.div`
  position: relative;
  display: block;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`;

const BurgerMenu = styled.div`
  display: flex;
`;

class Magic8Menu extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            allowed: false,
            numSelected: 0
        };
    }

    onClick(selected){
        if(selected && this.state.numSelected>0){
            this.setState({numSelected: this.state.numSelected-1});
            if(this.state.numSelected===1){this.setState({allowed: false})}
        }else if(this.state.numSelected < 2){
            this.setState({numSelected: this.state.numSelected+1, allowed: true})
        }
    }
    render() {
        return (
            <div>
                <BurgerMenu>
                    <Menu style={{transform: "scale(3)", marginTop: '22px', marginLeft: '25px', color: "#a5a4a4"}}/>
                </BurgerMenu>
                <div className = "row">
                    <div className="row">
                        <Typography style={{fontSize: "2.4em", color: '#81ECEC'}}>
                            Student & Teacher Observation Tool
                        </Typography>
                    </div>
                    <div className="row">
                        <Typography style={{fontSize: '3em', color: '#a5a4a4'}}>
                            Magic 8
                        </Typography>
                    </div>
                    <div className="row">
                        <Typography style={{fontSize: '1em', color: '#afafaf', marginTop: '2%', marginRight: '31.2%'}}>
                            Select the skills you'd like to focus on:
                        </Typography>
                    </div>
                    <CardRow>
                        <Magic8Card backgroundColor='#55EFC4' title="Transition Time"
                                    icon={<Timer/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#81ECEC' title="Classroom Climate"
                                    icon={<InsertEmoticon/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#74B9FF' title="Math Instruction"
                                    icon={<Add/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#A29BFE' title="Engagement in Learning"
                                    icon={<School/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                    </CardRow>
                    <CardRow>
                        <Magic8Card backgroundColor='#FFEAA7' title="Level of Instruction"
                                    icon={<HowToReg/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#FAB1A0' title="Listening to Children"
                                    icon={<Headset/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#FF7675' title="Sequential Activities"
                                    icon={<FormatListNumbered/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                        <Magic8Card backgroundColor='#FD79A8' title="Associative & Cooperative Interactions"
                                    icon={<People/>} onClick={this.onClick} numSelected={this.state.numSelected}/>
                    </CardRow>
                    <CardRow>
                        <Button
                                style={{backgroundColor: "#2196F3", opacity: this.state.allowed? 1 : .5,
                                    marginLeft: '84%', transform: 'scale(1.4)', display: 'flex', marginBottom: '5px'}}>
                           Observe
                        </Button>
                    </CardRow>
                </div>
            </div>
        );
    }
}

Magic8Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Magic8Menu;
