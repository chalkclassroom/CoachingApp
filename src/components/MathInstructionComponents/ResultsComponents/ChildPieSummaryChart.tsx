import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import ChildPieSummary from './ChildPieSummary'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import PieChartLegend from '../../LayoutComponents/GraphLayouts/PieChartLegend'
import * as Constants from '../../../constants/Constants'

interface OwnProps {
  math: number
  notMath: number
}

type Props = OwnProps

const ChildPieSummaryChart: FunctionComponent<Props> = props => {
  return (
    <div>
      <Grid container justify={'center'} direction={'column'}>
        <GraphHeader graphTitle={'Child Behaviors'} />
        <PieChartLegend
          slices={[
            { color: Constants.Colors.MI, label: 'Did math.' },
            {
              color: Constants.Colors.RedGraph,
              label: 'Did other activities.',
            },
          ]}
          legendTitle={'Compare how often children:'}
        />

        <ChildPieSummary math={props.math} notMath={props.notMath} />
      </Grid>
    </div>
  )
}

export default ChildPieSummaryChart
