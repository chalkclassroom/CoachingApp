import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActionArea,
    CardContent,
    Icon,
    Typography
} from "@material-ui/core";
import styled from "styled-components";
import lock from "../assets/lock48.png";
import checkmark from "../assets/Checkmark.png";

const styles = {
    title: {
        textAlign: "center"
    },

    titleText: {
        fontSize: "1.7vw"
    },

    icon: {
        position: "relative",
        transform: "scale(4.2)",
        textAlign: "center",
        marginLeft: "43%"
    },

    overlayImage: {
        color: "white",
        fontSize: 100,
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
};

const CardBase = styled.div`
    margin: 5px;
    position: relative;
    display: inline-block;
    //border: dashed 2px #808080;
    border-radius: 5px;
`;

const BackgroundImage = styled.div`
      flex: 1,
      width: null,
      height: null`;

const Overlay = styled.div`
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    z-index: 1000;
    opacity: 0.8
    `;

class Magic8Card extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            selected: false,
        };
    }

    onClick(e) {
        e.preventDefault();
        const { onClick, numSelected } = this.props;
        onClick(this.state.selected, this.props.title);
        if (this.state.selected) {
            this.setState({ selected: false });
        } else if (numSelected < 1) {
            this.setState({ selected: true });
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.unlocked);
        return (
            <CardBase>
                <Card
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        opacity: this.state.selected ? 0.5 : 1,
                        height: "160px;",
                        boxShadow: "none"
                    }}
                    onClick={this.onClick}
                >
                    <CardActionArea style={{ height: "160px", width: "160px" }}>
                        <BackgroundImage>
                            <img src={this.props.icon} style={{display:"block"}}/>
                        </BackgroundImage>
                            {this.props.page === "Training" ? (
                                this.props.unlocked ? (
                                    <Overlay>
                                        <img src={checkmark} className = {classes.overlayImage} style={{width: "100px"}}/>
                                    </Overlay>
                                ) : (
                                    <div/>
                                )) : (
                                    this.props.unlocked ? (
                                        <div/>
                                    ) : (
                                        <Overlay>
                                            <img src={lock} className = {classes.overlayImage}/>
                                        </Overlay>
                                    )
                                )
                            }
                    </CardActionArea>
                </Card>
            </CardBase>
        );
    }
}

Magic8Card.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Magic8Card);
