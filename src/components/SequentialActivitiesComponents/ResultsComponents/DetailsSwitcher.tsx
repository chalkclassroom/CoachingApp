import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import TeacherDetailsChart from './TeacherDetailsChart'
import ChildDetailsChart from './ChildDetailsChart'

const styles: object = {
  questionText: {
    paddingLeft: '1em',
    lineHeight: '1.2em',
    fontFamily: 'Arimo',
  },
}

interface Props {
  sequential1: number
  sequential2: number
  sequential3: number
  sequential4: number
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
 * Swipe View for Child and Teacher Sequential Activities Bar Charts
 * @class DetailsSwitcher
 * @return {void}
 */
class DetailsSwitcher extends React.Component<Props, {}> {
  static propTypes = {
    sequential1: PropTypes.number.isRequired,
    sequential2: PropTypes.number.isRequired,
    sequential3: PropTypes.number.isRequired,
    sequential4: PropTypes.number.isRequired,
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
            sequential1={this.props.sequential1}
            sequential2={this.props.sequential2}
            sequential3={this.props.sequential3}
            sequential4={this.props.sequential4}
            totalVisits={this.props.totalVisits}
           questionTextClass={classes.questionText}/>
        }
        tabTwoContent={
          <TeacherDetailsChart
            questionTextClass={classes.questionText}
            teacher1={this.props.teacher1}
            teacher2={this.props.teacher2}
            teacher3={this.props.teacher3}
            teacher4={this.props.teacher4}
            totalVisits={this.props.totalVisits}
          />
        }
      />
    )
  }
}

export default withStyles(styles)(DetailsSwitcher)
