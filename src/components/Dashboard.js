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
import { emptyClimateStack } from "../state/actions/classroom-climate";
import { deleteAllCenters } from "../state/actions/associative-cooperative";
import { connect } from "react-redux";
import IncompleteObservation from "./IncompleteObservation.js";
import TotalVisitCount from "./TotalVisitCount.js";






class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: false,
            help: false,
            auth: true,
            time: new Date().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }),
            submitFunc: null,
            alignFormat: "center",
            incomplete: false, 
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

    handleIncomplete = () => {
        this.setState({ incomplete: true });
    };

    handleClickAwayIncomplete = () => {
        this.setState({ incomplete: false });
    }

    render(){
        const magic8 = this.props.magic8;
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
                ) : this.state.incomplete ? (
                    <ClickAwayListener onClickAway={this.handleClickAwayIncomplete}>
                        <IncompleteObservation />
                    </ClickAwayListener>                    
                ) : (
                    <div />
                )}
                <Card style = {{
                    border: "3px solid #d9d9d9",
                    borderRadius: 10,
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
                        <Grid item style={{marginTop:"5px", height: "41vh", width:"90%", marginLeft:"5px", marginRight:"5px", display: "flex", alignItems: this.props.infoPlacement, justifyItems: "center"}}>
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
                        {this.props.completeObservation ? 
                        <Grid item style={{marginTop: "5px", marginBottom: "10px", marginLeft: "10px", marginRight: "10px", alignContent: "flex-end", display: "flex"}}>
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
                                            magic8 === "Classroom Climate" ? this.props.emptyClimateStack()
                                            : magic8 === "Transition Time" ? this.props.resetTransitionTime()
                                            : magic8 === "Sequential Activities" ? this.props.deleteAllCenters()
                                            : this.props.deleteAllCenters();
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
                        :
                        <Grid item style={{marginTop: "5px", marginBottom: "10px", marginLeft: "10px", marginRight: "10px", alignContent: "flex-end", display: "flex"}}>
                            <Button variant="outlined" onClick={this.handleIncomplete} style={{color: "#d9d9d9", borderColor: "#d9d9d9", borderWidth: "2px", fontSize: "15px", alignSelf: "flex-end", marginTop: "auto"}}> <b>COMPLETE OBSERVATION</b> </Button>
                        </Grid>
                                    }
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
    submitFunc: PropTypes.func.isRequired,
};

export default withRouter(connect(
    null,
    { resetTransitionTime , emptyClimateStack, deleteAllCenters}
)(Dashboard));