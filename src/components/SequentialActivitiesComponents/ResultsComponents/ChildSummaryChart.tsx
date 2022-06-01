import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import * as Constants from '../../../constants/Constants'
import ChildPieSummary from './ChildPieSummary'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import PieChartLegend from '../../LayoutComponents/GraphLayouts/PieChartLegend'

interface OwnProps {
  sequential: number
  notSequential: number
}

type Props = OwnProps

const ChildSummaryChart: FunctionComponent<Props> = props => {
  return (
    <div>
      <Grid container justify={'center'} direction={'column'}>
        <GraphHeader graphTitle={'Child Behaviors'} />
        <PieChartLegend
          slices={[
            { color: Constants.Colors.SA, label: 'Did sequential activities.' },
            {
              color: Constants.Colors.RedGraph,
              label: 'Did non-sequential activities.',
            },
          ]}
          legendTitle={'Compare how often children:'}
        />
        <ChildPieSummary
          sequential={props.sequential}
          notSequential={props.notSequential}
        />
      </Grid>
    </div>
  )
}

export default ChildSummaryChart
