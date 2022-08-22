import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import ChildBarDetails from "./ChildBarDetails";
import GraphHeader from "../../LayoutComponents/GraphLayouts/GraphHeader";
import BarChartLegend from "../../LayoutComponents/GraphLayouts/BarChartLegend";
import { BarWrapperDetails } from '../../ResultsComponents/ChartWrappers';

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
        <GraphHeader graphTitle={'Child Behaviors'}/>
        <BarChartLegend questionTextClass={props.questionTextClass} questions={['Which behaviors did children do more often?', "Which behaviors did children do less often?"]}/>
        <BarWrapperDetails>
          <ChildBarDetails
            sequential1={props.sequential1}
            sequential2={props.sequential2}
            sequential3={props.sequential3}
            sequential4={props.sequential4}
            totalVisits={props.totalVisits}
          />
        </BarWrapperDetails>
      </Grid>
    </div>
  );
};

export default ChildDetailsChart;
