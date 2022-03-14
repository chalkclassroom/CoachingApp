import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";

interface OwnProps {}

type Props = OwnProps;

const TeacherSummaryLegend: FunctionComponent<Props> = (props) => {

  return (
    <><Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
      Compare how often the children were:
    </Typography>
      <Grid container direction="column" alignItems="center">
        <Grid item style={{width: '100%'}}>
          <List>
            <ListItem style={{padding: 0}}>
              <ListItemIcon style={{margin: 0}}>
                <SignalWifi4BarIcon style={{fill: Constants.Colors.AppBar, transform: 'rotate(-45deg)'}} />
              </ListItemIcon>
              <ListItemText primary="Supported children&apos;s sequential activities." />
            </ListItem>
            <ListItem style={{padding: 0}}>
              <ListItemIcon style={{margin: 0}}>
                <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
              </ListItemIcon>
              <ListItemText primary="Was present in the center but did not support sequential activities." />
            </ListItem>
            <ListItem style={{padding: 0}}>
              <ListItemIcon style={{margin: 0}}>
                <SignalWifi4BarIcon style={{fill: '#bababa', transform: 'rotate(-45deg)'}} />
              </ListItemIcon>
              <ListItemText primary="Was not present in the centers observed." />
            </ListItem>
          </List>
        </Grid>
      </Grid></>
  );
};

export default TeacherSummaryLegend;
