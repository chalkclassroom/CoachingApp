import React, { FunctionComponent } from 'react'
import TeacherPieSummary from './TeacherPieSummary'
import Grid from '@material-ui/core/Grid/Grid'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import PieChartLegend from '../../LayoutComponents/GraphLayouts/PieChartLegend'
import * as Constants from '../../../constants/Constants'
import { PieWrapperSummary } from '../../ResultsComponents/ChartWrappers'

interface OwnProps {
  support: number
  noSupport: number
  noTeacherOpp: number
}

type Props = OwnProps

const TeacherPieSummaryChart: FunctionComponent<Props> = props => {
  return (
    <Grid container justify={'center'} direction={'column'}>
      <GraphHeader graphTitle={'Teacher Behaviors'} />
      <PieChartLegend
        slices={[
          {
            color: Constants.Colors.AppBar,
            label: "Supported children's math learning.",
          },
          {
            color: Constants.Colors.RedGraph,
            label:
              'Was present in the center but did not support math learning.',
          },
          {
            color: '#bababa',
            label: 'Was not present in the centers observed.',
          },
        ]}
        legendTitle={'Compare how often the teacher:'}
      />
      <PieWrapperSummary>
        <TeacherPieSummary
          support={props.support}
          noSupport={props.noSupport}
          noTeacherOpp={props.noTeacherOpp}
        />
      </PieWrapperSummary>
    </Grid>
  )
}

export default TeacherPieSummaryChart
