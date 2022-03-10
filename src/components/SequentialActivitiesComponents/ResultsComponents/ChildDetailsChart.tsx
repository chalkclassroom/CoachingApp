import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import ChildBarDetails from "./ChildBarDetails";
import ChildDetailsLegend from "./ChildDetailsLegend";
import ChildDetailsHeader from "./ChildDetailsHeader";

interface OwnProps {
  questionTextClass:string
  sequential1: number
  sequential2: number
  sequential3: number
  sequential4: number
  totalVisits: number
}

type Props = OwnProps;

const ChildDetailsChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid justify={"center"} direction={"column"}>
        <ChildDetailsHeader/>
        <ChildDetailsLegend questionTextClass={props.questionTextClass}/>
        <ChildBarDetails
          sequential1={props.sequential1}
          sequential2={props.sequential2}
          sequential3={props.sequential3}
          sequential4={props.sequential4}
          totalVisits={props.totalVisits}
        />
      </Grid>
    </div>
  );
};

export default ChildDetailsChart;
