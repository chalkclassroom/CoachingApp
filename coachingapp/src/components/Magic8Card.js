'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, Icon, Typography} from '@material-ui/core';
import styled from "styled-components";

const styles = {

    card: {
        width: '20%',
        height: '20%',
    },
    title: {
        textAlign: 'center',
        marginTop: '20%',
    },

    titleText: {
        fontSize: '1.7vw',
    },

    icon: {
        position: 'absolute',
        transform: 'scale(2.2)',
        textAlign: 'center',
        marginLeft: '43%',
    },
};

const CardBase = styled.div`
  margin: 5px;
  position: relative;
  display: inline-block;
  //border: dashed 2px #808080;
  border-radius: 5px;
  width: 20%;
`;

class Magic8Card extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            selected: false
        };
    }

    onClick(e) {
        e.preventDefault();
        const { onClick, numSelected } = this.props;
        onClick(this.state.selected);
        if(this.state.selected){this.setState({selected: false})}
        else if(numSelected<2){this.setState({selected: true})}
    }

    render() {
        return (
            <CardBase>
                <Card style={{backgroundColor: this.props.backgroundColor, opacity: this.state.selected? .5 : 1}}
                        onClick = {this.onClick}>
                    <CardActionArea className = "card">
                        <Icon className="icon">
                            {this.props.icon}
                        </Icon>
                        <CardContent className="title">
                            <Typography className="titleText">
                                {this.props.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </CardBase>
        );
    }
}

Magic8Card.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Magic8Card);