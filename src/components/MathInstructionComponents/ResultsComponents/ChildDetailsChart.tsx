import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import ChildBarDetails from './ChildBarDetails'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../../LayoutComponents/GraphLayouts/BarChartLegend'

interface OwnProps {
  math1: number
  math2: number
  math3: number
  math4: number
  totalVisits: number
  questionTextClass: string
}

type Props = OwnProps

const ChildDetailsChart: FunctionComponent<Props> = props => {
  return (
    <div>
      <Grid container justify={'center'} direction={'column'}>
        <GraphHeader graphTitle={'Child Behaviors'} />
        <BarChartLegend
          questionTextClass={props.questionTextClass}
          questions={[
            'What types of math did children do during the observation?',
            'Did they do one type of math more often than other types?',
            'Did they do one type of math less often than other types?',
          ]}
        />
        <ChildBarDetails
          math1={props.math1}
          math2={props.math2}
          math3={props.math3}
          math4={props.math4}
          totalVisits={props.totalVisits}
        />
      </Grid>
    </div>
  )
}

export default ChildDetailsChart
