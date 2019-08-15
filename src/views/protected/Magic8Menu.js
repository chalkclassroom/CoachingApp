import React, { Component } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import Magic8Card from "../../components/Magic8Card.js";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import FirebaseContext from "../../components/Firebase/context";
import AppBar from "../../components/AppBar";
import { withStyles } from "@material-ui/core/styles";
import AssociativeCooperativeIcon from "../../assets/icons/AssocCoopInteractions.svg";
import ClassroomClimateIcon from "../../assets/icons/ClassroomClimate.svg";
import LevelInstructionIcon from "../../assets/icons/LevelofInstruction.svg";
import ListenToChildrenIcon from "../../assets/icons/ListeningtoChildren.svg";
import MathInstructionIcon from "../../assets/icons/MathInstruction.svg";
import SequentialActivitiesIcon from "../../assets/icons/SequentialActivities.svg";
import StudentEngagementIcon from "../../assets/icons/StudentEngagement.svg";
import TransitionTimeIcon from "../../assets/icons/TransitionTime.svg";
import Icon from '@material-ui/core/Icon'

const CardRow = styled.div`
    position: relative;
    display: block;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    }
};

const MAP = {
    "None": 0,
    "TransitionTime": 1,
    "ClassroomClimate": 2,
    "MathInstruction": 3,
    "StudentEngagement": 4,
    "LevelOfInstruction": 5,
    "ListeningToChildren": 6,
    "SequentialActivities": 7,
    "AssociativeCooperativeInteractions": 8
};
class Magic8Menu extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            allowed: false,
            numSelected: 0,
            selected: "none",
            unlocked: [1, 8, 7, 2], 
        };

        this.setUnlockedSectionsState = this.setUnlockedSectionsState.bind(this)
    }



    onClick(selected, title) {
        if (selected && this.state.numSelected > 0) {
            this.setState({
                numSelected: this.state.numSelected - 1,
                selected: "none"
            });
            if (this.state.numSelected === 1) {
                this.setState({ allowed: false });
            }
        } else if (this.state.numSelected < 1) {
            this.setState({
                numSelected: this.state.numSelected + 1,
                allowed: true,
                selected: title
            });
        }
    }

    handleObserve = () => {
        if (this.state.unlocked.includes(MAP[this.state.selected])) {
                if (this.props.history.location.state.type === "Observe") {
                    this.props.history.push({
                        pathname: `/${this.state.selected}`,
                        state: this.props.location.state
                    })
                } else {
                    this.props.history.push({
                        pathname: `/${this.state.selected}Results`,
                        state: this.props.location.state
                    });
                }
            } else {
                console.log("Not unlocked");
                this.props.history.push({
                    pathname: `/${this.state.selected}TrainingHome`,
                    state: this.props.location.state
                })
            }
    };

    setUnlockedSectionsState(){
        let firebase = this.context;
        firebase.getUnlockedSections().then((unlocked)=>{
            console.log(unlocked);
            this.setState({
                unlocked: unlocked
            });
        });
    }

    componentDidMount() {
        this.setUnlockedSectionsState();
    }

    render() {
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                <div className="row">
                    <div className="row" align="center">
                        <Typography
                            style={{ fontSize: "2.9em", color: "#000000", marginTop: "5%" }}
                        >
                            Magic 8™
                        </Typography>
                    </div>
                    <div className="row">
                        <Typography
                            style={{ fontSize: "1em",
                                color: "#000000",
                                marginLeft: "17%",
                                marginTop: "2%",
                                marginBottom: "2vh"}}
                        >
                            Select the skill you'd like to focus on:
                        </Typography>

                    </div>
                    <CardRow>
                        <Magic8Card
                            title="TransitionTime"
                            icon={TransitionTimeIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(1)}
                        />
                        <Magic8Card
                            title="ClassroomClimate"
                            icon={ClassroomClimateIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(2)}
                        />
                        <Magic8Card
                            title="MathInstruction"
                            icon={MathInstructionIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(3)}
                        />
                        <Magic8Card
                            title="StudentEngagement"
                            icon={StudentEngagementIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(4)}
                        />
                    </CardRow>
                    <CardRow>
                        <Magic8Card
                            title="LevelOfInstruction"
                            icon={LevelInstructionIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(5)}
                        />
                        <Magic8Card
                            title="ListeningToChildren"
                            icon={ListenToChildrenIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(6)}
                        />
                        <Magic8Card
                            title="SequentialActivities"
                            icon={SequentialActivitiesIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(7)}
                        />
                        <Magic8Card
                            title="AssociativeCooperativeInteractions"
                            icon={AssociativeCooperativeIcon}
                            onClick={this.onClick}
                            numSelected={this.state.numSelected}
                            unlocked={this.state.unlocked.includes(8)}
                        />
                    </CardRow>
                    <CardRow>
                        <Button
                            style={{
                                backgroundColor: "#2196F3",
                                opacity: this.state.allowed ? 1 : 0.5,
                                marginLeft: "75%",
                                transform: "scale(1.1)",
                                display: "flex",
                                marginBottom: "5px",
                                color: "white",
                                marginTop: "4vh"
                            }}
                            onClick={this.handleObserve}
                        >
                        {
                        this.state.unlocked.includes(MAP[this.state.selected]) ? 'Observe' : 'Start Training' }
                            
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <Icon style={{ marginLeft: 5 }}>send</Icon>
                        </Button>
                    </CardRow>
                </div>
            </div>
        );
    }
}

Magic8Menu.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

Magic8Menu.contextType = FirebaseContext;
export default withStyles(styles)(Magic8Menu);
