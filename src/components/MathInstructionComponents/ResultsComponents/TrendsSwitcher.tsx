import * as React from 'react'
import * as PropTypes from 'prop-types'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Grid from '@material-ui/core/Grid/Grid'
import { Line } from 'react-chartjs-2'
import GraphHeader from '../../LayoutComponents/GraphLayouts/GraphHeader'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import { LineWrapperTrends } from '../../ResultsComponents/ChartWrappers'

const ChildBehaviorTrendsOptions = {
  maintainAspectRatio: false,
  showScale: true,
  pointDot: true,
  showLines: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value: number): string {
            return value + '%'
          },
        },
        scaleLabel: {
          display: true,
          labelString: '% of 1-minute Intervals',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'gray',
      fontFamily: 'Arimo',
      align: 'right',
      formatter: function(value: number): string {
        return value + '%'
      },
    },
  },
}

const TeacherBehaviorTrendsOptions = {
  maintainAspectRatio: false,
  showScale: true,
  pointDot: true,
  showLines: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value: number): string {
            return value + '%'
          },
        },
        scaleLabel: {
          display: true,
          labelString: '% of 1-minute Intervals',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'gray',
      align: 'right',
      formatter: function(value: number): string {
        return value + '%'
      },
    },
  },
}

interface Props {
  childData(): {
    labels: Array<Array<string>>
    datasets: Array<{
      label: string
      backgroundColor: string
      borderColor: string
      fill: boolean
      lineTension: number
      data: Array<number>
    }>
  }
  teacherData(): {
    labels: Array<Array<string>>
    datasets: Array<{
      label: string
      backgroundColor: string
      borderColor: string
      fill: boolean
      lineTension: number
      data: Array<number>
    }>
  }
}

/**
 * Swipe View for Child and Teacher Math Trends Graphs
 * @class TrendsSwitcher
 * @return {void}
 */
class TrendsSwitcher extends React.Component<Props, {}> {
  static propTypes = {
    childData: PropTypes.func.isRequired,
    teacherData: PropTypes.func.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <TwoTabbedSwitch
        tabPosition={'bottom'}
        tabOneLabel={'Child'}
        tabTwoLabel={'Teacher'}
        tabTwoContent={
          <div>
            <Grid justify={'center'} direction={'column'}>
              <GraphHeader graphTitle={'Teacher Behaviors'} />
              <LineWrapperTrends>
                <Line
                  data={this.props.teacherData}
                  options={TeacherBehaviorTrendsOptions}
                />
              </LineWrapperTrends>
            </Grid>
          </div>
        }
        tabOneContent={
          <div>
            <Grid justify={'center'} direction={'column'}>
              <GraphHeader graphTitle={'Child Behaviors'} />
              <LineWrapperTrends>
                <Line
                  data={this.props.childData}
                  options={ChildBehaviorTrendsOptions}
                />
              </LineWrapperTrends>
            </Grid>
          </div>
        }
      />
    )
  }
}

export default TrendsSwitcher
