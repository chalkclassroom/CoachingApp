import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import TransitionTimeIcon from "../assets/icons/TransitionTime.svg"
import ClassroomClimateIcon from "../assets/icons/ClassroomClimate.svg"
import MathIcon from "../assets/icons/MathInstruction.svg"
import EngagementIcon from "../assets/icons/StudentEngagement.svg"
import InstructionIcon from "../assets/icons/LevelofInstruction.svg"
import ListeningIcon from "../assets/icons/ListeningtoChildren.svg"
import SequentialIcon from "../assets/icons/SequentialActivities.svg"
import AssocCoopIcon from "../assets/icons/AssocCoopInteractions.svg"
import TransitionTimeNotes from "../assets/icons/NotesTT.svg"
import ClassroomClimateNotes from "../assets/icons/NotesCC.svg"
import MathNotes from "../assets/icons/NotesMath.svg"
import EngagementNotes from "../assets/icons/NotesEngagement.svg"
import InstructionNotes from "../assets/icons/NotesInstruction.svg"
import ListeningNotes from "../assets/icons/NotesListening.svg"
import SequentialNotes from "../assets/icons/NotesSequential.svg"
import AssocCoopNotes from "../assets/icons/NotesAssocCoop.svg"
import TransitionTimeLookFors from "../assets/icons/LookForsTT.svg"
import ClassroomClimateLookFors from "../assets/icons/LookForsCC.svg"
import MathLookFors from "../assets/icons/LookForsMath.svg"
import EngagementLookFors from "../assets/icons/LookForsEngagement.svg"
import InstructionLookFors from "../assets/icons/LookForsInstruction.svg"
import ListeningLookFors from "../assets/icons/LookForsListening.svg"
import SequentialLookFors from "../assets/icons/LookForsSequential.svg"
import AssocCoopLookFors from "../assets/icons/LookForsAssocCoop.svg"
import Notes from "./Notes";
import FirebaseContext from "./Firebase/context";
import { ClickAwayListener } from '@material-ui/core/es';
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import YesNoDialog from "./Shared/YesNoDialog";
import { resetTransitionTime } from "../state/actions/transition-time";
import { connect } from "react-redux";




class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            magic8: "",
            color: "",
            infoDisplay: "",
            notes: false,
            help: false,
            auth: true,
            time: new Date().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }),
            submitFunc: null,
        }
    }

    handleHelpModal = () => {
        this.setState({ help: true });
    };

    handleClickAwayHelp = () => {
        this.setState({ help: false });
    };

    handleNotes = open => {
        if (open) {
            this.setState({ notes: true });
        } else {
            this.setState({ notes: false });
        }
    };

    render(){
        return(
            <div>
                {this.state.help ? (
                    <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
                        
                        {(() => {switch (this.props.magic8) {
                            case "Transition Time":
                                return <TransitionTimeHelp />;
                                break;
                            case "Classroom Climate":
                                return <ClassroomClimateHelp />;
                                break;
                            default:
                                return <div />;
                            }
                        })()}
                        
                    </ClickAwayListener>
                ) : this.state.notes ? (
                    <FirebaseContext.Consumer>
                        {firebase => (
                            <Notes
                                open={true}
                                onClose={this.handleNotes}
                                color={this.props.color}
                                text={this.props.magic8 + " Notes"}
                                firebase={firebase}
                            />
                        )}
                    </FirebaseContext.Consumer>
                ) : (
                    <div />
                )}
                <Card style = {{
                    border: "3px solid gray",
                    backgroundColor: "#fff",
                    height: "100%",
                    boxShadow: "5px",
                    width: "90%",
                    marginRight: "5%",
                    marginLeft: "5%",
                    flexDirection: "column",
                    alignItems: "center",
                    justify: "space-evenly",
                    display: "flex",
                    flex: "1",
                    flexWrap: "nowrap"
                }}>
                    <Grid container flexGrow={1} padding="50" spacing={0} direction="column" justify="center" alignItems="center">
                        <Grid item style={{marginTop:"10px"}}>
                            <img src={this.props.magic8==="Transition Time" ? TransitionTimeIcon
                                : this.props.magic8==="Classroom Climate" ? ClassroomClimateIcon
                                : this.props.magic8==="Math" ? MathIcon
                                : this.props.magic8==="Level of Engagement" ? EngagementIcon
                                : this.props.magic8==="Level of Instruction" ? InstructionIcon
                                : this.props.magic8==="Listening to Children" ? ListeningIcon
                                : this.props.magic8==="Sequential Activities" ? SequentialIcon
                                : AssocCoopIcon} alt="Magic 8 Icon" width="100px" height="100px"/>
                        </Grid>
                        <Grid item style={{marginTop:"5px"}}>
                            {this.props.infoDisplay}
                        </Grid>
                        <Grid item lg container style={{marginTop:"5px"}} direction="row" spacing={16} class="help" alignItems="center" alignContent="center">
                            <Grid item lg styles={{flex:1, flexDirection: "row", justifyContent: "space-between", padding: "20%", flexWrap: "nowrap"}}>
                                <Button className="lookFor" onClick={this.handleHelpModal} styles={{width: '90%'}}>
                                    <img src={this.props.magic8==="Transition Time" ? TransitionTimeLookFors
                                        : this.props.magic8==="Classroom Climate" ? ClassroomClimateLookFors
                                        : this.props.magic8==="Math" ? MathLookFors
                                        : this.props.magic8==="Level of Engagement" ? EngagementLookFors
                                        : this.props.magic8==="Level of Instruction" ? InstructionLookFors
                                        : this.props.magic8==="Listening to Children" ? ListeningLookFors
                                        : this.props.magic8==="Sequential Activities" ? SequentialLookFors
                                        : AssocCoopLookFors} alt="Look-Fors" width="60px" />
                                </Button>
                                <Button className="notes" onClick={this.handleNotes} styles={{width: '40%'}}>
                                    <img src={this.props.magic8==="Transition Time" ? TransitionTimeNotes
                                        : this.props.magic8==="Classroom Climate" ? ClassroomClimateNotes
                                        : this.props.magic8==="Math" ? MathNotes
                                        : this.props.magic8==="Level of Engagement" ? EngagementNotes
                                        : this.props.magic8==="Level of Instruction" ? InstructionNotes
                                        : this.props.magic8==="Listening to Children" ? ListeningNotes
                                        : this.props.magic8==="Sequential Activities" ? SequentialNotes
                                        : AssocCoopNotes} alt="Notes" width="60px"/>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item style={{marginTop:"5px"}}>
                            Start Time: {this.state.time}
                        </Grid>
                        <Grid item style={{marginTop: "5px", marginBottom: "10px", marginLeft: "5px", marginRight: "5px", alignContent: "flex-end", display: "flex"}}>
                            {/* <Button variant="outlined" style={{color: this.props.color, borderColor: this.props.color, borderWidth: "2px", fontSize: "15px", alignSelf: "flex-end", marginTop: "auto"}}> <b>COMPLETE OBSERVATION</b> </Button> */}
                            <FirebaseContext.Consumer>
                                {firebase => (
                                    <YesNoDialog
                                        buttonText={<b>COMPLETE OBSERVATION</b>}
                                        buttonVariant={"outlined"}
                                        buttonColor={this.props.color}
                                        buttonStyle={{ margin: 10 }}
                                        dialogTitle={
                                            "Are you sure you want to complete this observation?"
                                        }
                                        shouldOpen={true}
                                        onAccept={() => {
                                            this.props.submitFunc();
                                            this.props.history.push({
                                                pathname: "/Home",
                                                state: this.props.history.state
                                            });
                                            firebase.endSession();
                                        }}
                                    />
                                )}
                            </FirebaseContext.Consumer>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

Dashboard.propTypes = {
    magic8: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    infoDisplay: PropTypes.instanceOf(Element).isRequired,
};

export default withRouter(connect(
    null,
    { resetTransitionTime }
)(Dashboard));