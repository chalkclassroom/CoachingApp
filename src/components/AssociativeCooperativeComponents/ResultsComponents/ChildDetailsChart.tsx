import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar";
import GraphHeader from "../../LayoutComponents/GraphLayouts/GraphHeader";
import { BarWrapperDetails } from '../../ResultsComponents/ChartWrappers';

interface OwnProps {
  questionTextClass: string
  ac1: number
  ac2: number
  ac3: number
  ac4: number
  totalVisits: number
}

type Props = OwnProps;

const ChildDetailsChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid justify={"center"} direction={"column"}>
       <GraphHeader graphTitle={'Child Behaviors'}/>
        <Grid container direction="column" alignItems="center">
          <Grid item style={{width: '100%'}}>
            <Grid container direction="row">
              <Grid item xs={11}>
                <Grid container direction="column" justify="center" style={{height:'100%'}}>
                  <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                    <Typography variant="subtitle1" className={props.questionTextClass}>
                      Were the children engaged in {" "}
                      <span style={{color: "#c5afe7", fontWeight: 'bold'}}>associative interactions</span> {" "}
                      or <span style={{color: "#6f39c4", fontWeight: 'bold'}}>cooperative interactions</span> more often?
                    </Typography>
                  </Grid>
                  <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                    <Typography variant="subtitle1" className={props.questionTextClass}>
                      Which behaviors did children do more often?
                    </Typography>
                  </Grid>
                  <Grid item style={{height:"33%"}}>
                    <Typography variant="subtitle1" className={props.questionTextClass}>
                      Which behaviors did children do less often?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <BarWrapperDetails>
          <ChildBehaviorsDetailsHorizontalBar
            ac1={props.ac1}
            ac2={props.ac2}
            ac3={props.ac3}
            ac4={props.ac4}
            totalVisits={props.totalVisits}
          />
        </BarWrapperDetails>
      </Grid>
    </div>
  );
};

export default ChildDetailsChart;
