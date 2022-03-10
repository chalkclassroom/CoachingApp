import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import ChildBarDetails from "./ChildBarDetails";
import ChildDetailsHeader from "./ChildDetailsHeader";
import ChildDetailsLegend from "./ChildDetailsLegend";

interface OwnProps {
  math1: number
  math2: number
  math3: number
  math4: number
  totalVisits: number
  questionTextClass: string
}

type Props = OwnProps;

const ChildDetailsChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid justify={"center"} direction={"column"}>
        <ChildDetailsHeader/>
        <ChildDetailsLegend questionTextClass={props.questionTextClass}/>
        <ChildBarDetails
          math1={props.math1}
          math2={props.math2}
          math3={props.math3}
          math4={props.math4}
          totalVisits={props.totalVisits}
        />
      </Grid>
    </div>
  );
};

export default ChildDetailsChart;
