import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid";
import GraphHeader from "../../LayoutComponents/GraphLayouts/GraphHeader";
import PieChartLegend from "../../LayoutComponents/GraphLayouts/PieChartLegend";
import * as Constants from "../../../constants/Constants";
import BehaviorResponsesSummaryPie from "./BehaviorResponsesSummaryPie";
import { PieWrapperSummary } from '../../ResultsComponents/ChartWrappers';

interface OwnProps {
  negativeResponses: number
  positiveResponses: number
}

type Props = OwnProps;

const BehaviorResponseSummaryChart: FunctionComponent<Props> = (props) => {

  return (<div>
    <Grid
      justify={'center'}
      direction={'column'}
    >
      <GraphHeader graphTitle={'Classroom Climate'} />
      <PieChartLegend
        slices={[
          {
            color: Constants.ClimateTypeColors.positiveBar,
            label: "Approved of children's behavior.",
          },
          {
            color: Constants.ClimateTypeColors.negativeBar,
            label: "Disapproved of or redirected children's behavior.",
          },
        ]}
        legendTitle={'Compare how often the teacher:'}
      />
      <Grid item style={{ paddingTop: '1em' }}>
        <PieWrapperSummary>
          <BehaviorResponsesSummaryPie
            negativeResponses={props.negativeResponses}
            positiveResponses={props.positiveResponses}
          />
        </PieWrapperSummary>
      </Grid>
    </Grid>
  </div>);
};

export default BehaviorResponseSummaryChart;
