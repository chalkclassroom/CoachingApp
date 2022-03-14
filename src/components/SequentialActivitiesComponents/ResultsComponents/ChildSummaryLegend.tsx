import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";

interface OwnProps {}

type Props = OwnProps;

const ChildSummaryLegend: FunctionComponent<Props> = (props) => {

  return (
    <>
      <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
        Compare how often children:
      </Typography>
      <Grid container direction="column" alignItems="center">
        <Grid item style={{width: '100%'}}>
          <List>
            <ListItem style={{padding: 0}}>
              <ListItemIcon style={{margin: 0}}>
                <SignalWifi4BarIcon style={{fill: Constants.Colors.SA, transform: 'rotate(-45deg)'}} />
              </ListItemIcon>
              <ListItemText primary="Did sequential activities." />
            </ListItem>
            <ListItem style={{padding: 0}}>
              <ListItemIcon style={{margin: 0}}>
                <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
              </ListItemIcon>
              <ListItemText primary="Did non-sequential activities." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default ChildSummaryLegend;
