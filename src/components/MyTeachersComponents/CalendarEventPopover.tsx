import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  Fab
} from '@material-ui/core';
import moment from 'moment';
import * as Types from '../../constants/Types';
import * as Constants from '../../constants/Constants';
import TransitionTimeIconImage from "../../assets/images/TransitionTimeIconImage.svg";
import EngagementIconImage from "../../assets/images/EngagementIconImage.svg";
import SequentialIconImage from "../../assets/images/SequentialIconImage.svg";
import ListeningIconImage from "../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../assets/images/MathIconImage.svg";
import InstructionIconImage from "../../assets/images/InstructionIconImage.svg";
import ClassroomClimateIconImage from "../../assets/images/ClassroomClimateIconImage.svg";
import LiteracyIconImage from "../../assets/images/LiteracyIconImage.svg";
import AssocCoopIconImage from "../../assets/images/AssocCoopIconImage.svg";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

interface Props {
  push(stuff: {pathname: string, state: object}): void,
  clickedEvent: Types.CalendarEvent,
  teacherList: Array<Types.Teacher>,
  changeTeacher(teacherInfo: Types.Teacher): Types.Teacher,
  deleteAppointment(): void,
  editEvent(): void,
  getName(id: string): string
}

const ToolNames = {
  'TT': 'TransitionTime',
  'CC': 'ClassroomClimate',
  'MI': 'MathInstruction',
  'IN': 'LevelOfInstruction',
  'SE': 'StudentEngagement',
  'LC': 'ListeningToChildren',
  'SA': 'SequentialActivities',
  'LI': 'LiteracyInstruction',
  'AC': 'AssociativeCooperativeInteractions'
}

export default function CalendarEventPopover(props: Props): React.ReactElement {
  const { push, clickedEvent, teacherList, changeTeacher, deleteAppointment, editEvent, getName } = props;
  return (
    <Grid container direction="column" style={{padding: '1em'}}>
      <Grid item style={{paddingBottom: '0.5em'}}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" style={{fontFamily: 'Arimo'}}>
              {moment(new Date(clickedEvent.start)).format('MM/DD/YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{fontFamily: 'Arimo'}}>
              {moment(new Date(clickedEvent.start)).format('h:mm a')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{paddingBottom: '0.5em'}}>
        <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
          {getName(clickedEvent.resource)}
        </Typography>
      </Grid>
      <Grid item style={{paddingBottom: '1em', height: '2em'}}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{fontFamily: 'Arimo', fontWeight: 'bold'}}
            >
              {clickedEvent.title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{height: '4em', paddingBottom: '1em'}}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={9}>
            <Typography>
              {Constants.ToolNames[clickedEvent.type as Types.ToolNamesKey]}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img src={
              clickedEvent.type === 'TT' ? TransitionTimeIconImage
              : clickedEvent.type === 'CC' ? ClassroomClimateIconImage
              : clickedEvent.type === 'MI' ? MathIconImage
              : clickedEvent.type === 'IN' ? InstructionIconImage
              : clickedEvent.type === 'SE' ? EngagementIconImage
              : clickedEvent.type === 'LC' ? ListeningIconImage
              : clickedEvent.type === 'SA' ? SequentialIconImage
              : clickedEvent.type === 'LI' ? LiteracyIconImage
              : AssocCoopIconImage
            } style={{height: '3em', width: '3em'}} />
          </Grid>
        </Grid>
      </Grid>
      {!clickedEvent.appointment ? (
        <Grid item>
          <Button
            variant="contained"
            fullWidth
            onClick={(): void => {
              if (clickedEvent.title === 'Observation') {
                const teacherObject = teacherList.filter(teacher => {
                  return teacher.id === clickedEvent.resource
                })
                changeTeacher(teacherObject[0])
                push({
                  pathname: `/${ToolNames[clickedEvent.type]}Results`,
                  state: {sessionId: clickedEvent.id}
                })
              } else if (clickedEvent.title === 'Action Plan') {
                push({
                  pathname: "/ActionPlan",
                  state: {
                    actionPlanId: clickedEvent.id,
                    teacherId: clickedEvent.resource
                  }
                })
              } else if (clickedEvent.title === 'Conference Plan') {
                push({
                  pathname: "/ConferencePlan",
                  state: {
                    conferencePlanId: clickedEvent.id,
                    teacherId: clickedEvent.resource,
                    sessionId: clickedEvent.conferencePlanSessionId
                  }
                });
              }
            }}
          >
            {clickedEvent.title === 'Observation' ? 'VIEW RESULTS' : clickedEvent.title === 'Action Plan' ? 'VIEW ACTION PLAN' : 'VIEW CONFERENCE PLAN'}
          </Button>
        </Grid>
      ) : (
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Fab
            aria-label="Edit"
            name="Edit"
            size="small"
            onClick={editEvent}
            style={{ backgroundColor: "#F9FE49" }}
          >
            <EditOutlinedIcon style={{ color: "#555555" }} />
          </Fab>
          <Fab
            aria-label="Delete"
            size="small"
            onClick={deleteAppointment}
            style={{ backgroundColor: "#FF3836" }}
          >
            <DeleteForeverIcon style={{ color: "#C9C9C9" }} />
          </Fab>
        </Grid>
      )}
    </Grid>
  )
}