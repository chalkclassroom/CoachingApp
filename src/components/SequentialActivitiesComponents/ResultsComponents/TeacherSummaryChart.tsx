import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import * as Constants from '../../../constants/Constants'
import TeacherPieSummary from './TeacherPieSummary'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import PieChartLegend from '../../LayoutComponents/GraphLayouts/PieChartLegend'

interface OwnProps {
  support: number
  noSupport: number
  noTeacherOpp: number
}

type Props = OwnProps

const TeacherSummaryChart: FunctionComponent<Props> = props => {
  return (
    <div>
      <Grid container justify={'center'} direction={'column'}>
        <GraphHeader graphTitle={'Teacher Behaviors'} />
        <PieChartLegend
          slices={[
            {
              color: Constants.Colors.AppBar,
              label: "Supported children's sequential activities.",
            },
            {
              color: Constants.Colors.RedGraph,
              label:
                'Was present in the center but did not support sequential activities.',
            },
            {
              color: '#bababa',
              label: 'Was not present in the centers observed.',
            },
          ]}
          legendTitle={'Compare how often the children were:'}
        />
        <TeacherPieSummary
          support={props.support}
          noSupport={props.noSupport}
          noTeacherOpp={props.noTeacherOpp}
        />
      </Grid>
    </div>
  )
}

export default TeacherSummaryChart
