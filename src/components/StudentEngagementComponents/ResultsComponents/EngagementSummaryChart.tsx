import Grid from '@material-ui/core/Grid/Grid'
import PieSummary from './PieSummary'
import * as React from 'react'

import * as Constants from '../../../constants/Constants'
import PieChartLegend from '../../LayoutComponents/GraphLayouts/PieChartLegend'

export default function EngagementSummaryChart(props: {
  offTask: number
  engaged: number
}) {
  return (
    <div>
      <Grid container justify={'center'} direction={'column'}>
        <PieChartLegend
          slices={[
            { color: Constants.Colors.SE, label: 'Engaged' },
            { color: Constants.Colors.RedGraph, label: 'OffTask' },
          ]}
          legendTitle={'Compare how often the students were:'}
        />

        <PieSummary offTask={props.offTask} engaged={props.engaged} />
      </Grid>
    </div>
  )
}
