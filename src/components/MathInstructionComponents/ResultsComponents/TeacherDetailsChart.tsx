import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import TeacherBarDetails from './TeacherBarDetails'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../../LayoutComponents/GraphLayouts/BarChartLegend'
import { BarWrapperDetails } from '../../ResultsComponents/ChartWrappers'

interface OwnProps {
  teacher1: number
  teacher2: number
  teacher3: number
  teacher4: number
  totalVisits: number
  questionTextClass: string
}

type Props = OwnProps

const TeacherDetailsChart: FunctionComponent<Props> = props => {
  return (
    <div>
      <Grid justify={'center'} direction={'column'}>
        <GraphHeader graphTitle={'Teacher Behaviors'} />
        <BarChartLegend
          questionTextClass={props.questionTextClass}
          questions={[
            'What behaviors did the teacher use during the observation?',
            'Did the teacher do one type of behavior more often than other behaviors?',
            'Did the teacher do one behavior less often than other behaviors?',
          ]}
        />
        <BarWrapperDetails>
          <TeacherBarDetails
            teacher1={props.teacher1}
            teacher2={props.teacher2}
            teacher3={props.teacher3}
            teacher4={props.teacher4}
            totalVisits={props.totalVisits}
          />
        </BarWrapperDetails>
      </Grid>
    </div>
  )
}

export default TeacherDetailsChart
