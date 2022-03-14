import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";

type PieChartSlice = {
  color: string
  label: string
}

interface OwnProps {
  slices: PieChartSlice[]
  legendTitle: string
}


type Props = OwnProps;

const PieChartLegend: FunctionComponent<Props> = (props) => {

  return (
    <>
      <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
        {props.legendTitle}
      </Typography>
      <Grid container direction="column" alignItems="center">
        <Grid item style={{width: '100%'}}>
          <List>
            {
              props.slices.map(slice => {
                return (<ListItem key={slice.label} style={{padding: 0}}>
                  <ListItemIcon style={{margin: 0}}>
                    <SignalWifi4BarIcon style={{fill: slice.color, transform: 'rotate(-45deg)'}} />
                  </ListItemIcon>
                  <ListItemText primary={slice.label} />
                </ListItem> )
              })
            }
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default PieChartLegend;
