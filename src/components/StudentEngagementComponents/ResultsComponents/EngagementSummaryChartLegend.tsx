import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";

interface OwnProps {}

type Props = OwnProps;

const EngagementSummaryChartLegend: FunctionComponent<Props> = (props) => {

  return (<Grid container direction="column" alignItems="center">
    <Grid item style={{width: '100%'}}>
      <List>
        <ListItem style={{padding: 0}}>
          <ListItemIcon style={{margin: 0}}>
            <SignalWifi4BarIcon style={{fill: Constants.Colors.SE, transform: 'rotate(-45deg)'}} />
          </ListItemIcon>
          <ListItemText primary="Engaged" />
        </ListItem>
        <ListItem style={{padding: 0}}>
          <ListItemIcon style={{margin: 0}}>
            <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
          </ListItemIcon>
          <ListItemText primary="Off Task" />
        </ListItem>
      </List>
    </Grid>
  </Grid>);
};

export default EngagementSummaryChartLegend;
