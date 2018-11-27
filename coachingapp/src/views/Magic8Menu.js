import React, {Component}  from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import Magic8Card from '../components/Magic8Card.js';
import {Add, FormatListNumbered, Headset, HowToReg, InsertEmoticon, Menu, People, School, Timer} from '@material-ui/icons';
import {Button, Typography} from '@material-ui/core';
import styled from "styled-components";


const MenuBase = styled.div`
  display: grid;
  margin-top: 4%;
  grid-row: 1/2;
  grid-column: 1/4;
`;

const CardRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2em;
`;

const BurgerMenu = styled.div'';

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
            this.setState({numSelected: this.state.numSelected-1})
            if(this.state.numSelected===1){this.setState({allowed: false})}
        }else if(this.state.numSelected < 2){
            this.setState({numSelected: this.state.numSelected+1, allowed: true})
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <Menu className="burgerIcon"/>
                    </div>
                    <div className = "row">
                        <div className="row">
                            <Typography>
                                "Student & Teacher Observation Tool"
                            </Typography>
                        </div>
                        <div className="row">
                            <Typography>
                                Magic 8"
                            </Typography>
                        </div>
                        <MenuBase>
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
                                <Button className="observeButton" style={{backgroundColor: "#2196F3", opacity: this.state.allowed? 1 : .5}}>
                                    Observe
                                </Button>
                            </CardRow>
                        </MenuBase>
                    </div>
                </div>
            </div>
        );
    }
}

Magic8Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Magic8Menu;
