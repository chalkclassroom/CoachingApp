import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ChildDetailsChart from './ChildDetailsChart'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import TeacherDetailsChart from './TeacherDetailsChart'

const styles: object = {
  questionText: {
    paddingLeft: '1em',
    lineHeight: '1.2em',
    fontFamily: 'Arimo',
  },
}

interface Props {
  math1: number
  math2: number
  math3: number
  math4: number
  teacher1: number
  teacher2: number
  teacher3: number
  teacher4: number
  totalVisits: number
  classes: {
    questionText: string
  }
}

/**
 * Swipe View for Child and Teacher Math Activities Bar Charts
 * @class DetailsSwitcher
 * @return {void}
 */
class DetailsSwitcher extends React.Component<Props, {}> {
  static propTypes = {
    math1: PropTypes.number.isRequired,
    math2: PropTypes.number.isRequired,
    math3: PropTypes.number.isRequired,
    math4: PropTypes.number.isRequired,
    teacher1: PropTypes.number.isRequired,
    teacher2: PropTypes.number.isRequired,
    teacher3: PropTypes.number.isRequired,
    teacher4: PropTypes.number.isRequired,
    totalVisits: PropTypes.number.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props
    return (
      <TwoTabbedSwitch
        tabPosition={'bottom'}
        tabOneLabel={'Child'}
        tabTwoLabel={'Teacher'}
        tabOneContent={
          <ChildDetailsChart
            math1={this.props.math1}
            math2={this.props.math2}
            math3={this.props.math3}
            math4={this.props.math4}
            totalVisits={this.props.totalVisits}
            questionTextClass={classes.questionText}
          />
        }
        tabTwoContent={
          <TeacherDetailsChart
            teacher1={this.props.teacher1}
            teacher2={this.props.teacher2}
            teacher3={this.props.teacher3}
            teacher4={this.props.teacher4}
            totalVisits={this.props.totalVisits}
            questionTextClass={classes.questionText}
          />
        }
      />
    )
  }
}

export default withStyles(styles)(DetailsSwitcher)
