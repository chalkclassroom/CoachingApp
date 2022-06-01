import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import ChildDetailsChart from './ChildDetailsChart'
import TeacherDetailsChart from './TeacherDetailsChart'

const styles: object = {
  questionText: {
    paddingLeft: '1em',
    lineHeight: '1.2em',
    fontFamily: 'Arimo',
  },
}

interface Props {
  ac1: number
  ac2: number
  ac3: number
  ac4: number
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
 * Swipe View for Child and Teacher Associative&Cooperative Bar Charts
 * @class DetailsSwitcher
 * @return {void}
 */
class DetailsSwitcher extends React.Component<Props, {}> {
  static propTypes = {
    ac1: PropTypes.number.isRequired,
    ac2: PropTypes.number.isRequired,
    ac3: PropTypes.number.isRequired,
    ac4: PropTypes.number.isRequired,
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
            questionTextClass={classes.questionText}
            ac1={this.props.ac1}
            ac2={this.props.ac2}
            ac3={this.props.ac3}
            ac4={this.props.ac4}
            totalVisits={this.props.totalVisits}
          />
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
