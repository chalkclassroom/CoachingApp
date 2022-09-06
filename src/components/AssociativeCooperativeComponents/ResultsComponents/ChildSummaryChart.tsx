import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import * as Constants from "../../../constants/Constants";
import ChildBehaviorsPie from "./ChildBehaviorsPie";
import GraphHeader from "../../LayoutComponents/GraphLayouts/GraphHeader";
import PieChartLegend from "../../LayoutComponents/GraphLayouts/PieChartLegend";
import { PieWrapperSummary } from '../../ResultsComponents/ChartWrappers';

interface OwnProps {
  ac: number
  noAc: number
  noChildOpp: number
}

type Props = OwnProps;

const ChildSummaryChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid container justify={"center"} direction={"column"}>
        <GraphHeader graphTitle={'Child Behaviors'}/>
        <PieChartLegend slices={[
          {color:Constants.Colors.AC,
          label:"Engaged in associative and cooperative interactions."},
          {color: Constants.Colors.RedGraph,
          label: "Played in the same area but did not interact."},
          {color: '#bababa', label: "Played alone (had no opportunity for interaction)."}
        ]} legendTitle={'Compare how often the children:'}/>
        <PieWrapperSummary>
          <ChildBehaviorsPie
            ac={props.ac}
            noAc={props.noAc}
            noChildOpp={props.noChildOpp}
          />
        </PieWrapperSummary>
      </Grid>
    </div>
  );
};

export default ChildSummaryChart;
