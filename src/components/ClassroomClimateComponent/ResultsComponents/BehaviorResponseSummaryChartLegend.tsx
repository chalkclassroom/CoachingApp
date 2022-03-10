import Grid from "@material-ui/core/Grid";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";
import * as React from "react";


export default function BehaviorResponseSummaryChartLegend() {
  return (<Grid container direction="column" alignItems="center">
    <Grid item style={{width: '100%'}}>
      <List>
        <ListItem style={{padding: 0}}>
          <ListItemIcon style={{margin: 0}}>
            <SignalWifi4BarIcon style={{fill: Constants.ClimateTypeColors.positiveBar, transform: 'rotate(-45deg)'}} />
          </ListItemIcon>
          <ListItemText primary="Approved of children&apos;s behavior." />
        </ListItem>
        <ListItem style={{padding: 0}}>
          <ListItemIcon style={{margin: 0}}>
            <SignalWifi4BarIcon style={{fill: Constants.ClimateTypeColors.negativeBar, transform: 'rotate(-45deg)'}} />
          </ListItemIcon>
          <ListItemText primary="Disapproved of or redirected children&apos;s behavior." />
        </ListItem>
      </List>
    </Grid>
  </Grid>)
}