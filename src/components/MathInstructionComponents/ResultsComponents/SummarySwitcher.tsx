import * as React from 'react'
import * as PropTypes from 'prop-types'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import ChildPieSummaryChart from './ChildPieSummaryChart'

import TeacherPieSummaryChart from './TeacherPieSummaryChart'

interface Props {
  math: number
  notMath: number
  support: number
  noSupport: number
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Math Pie Charts
 * @class SummarySwitcher
 * @return {void}
 */
class SummarySwitcher extends React.Component<Props, {}> {
  static propTypes = {
    math: PropTypes.number.isRequired,
    notMath: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired,
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
        tabOneContent={
          <ChildPieSummaryChart
            math={this.props.math}
            notMath={this.props.notMath}
          />
        }
        tabTwoContent={
          <TeacherPieSummaryChart
            support={this.props.support}
            noSupport={this.props.noSupport}
            noTeacherOpp={this.props.noTeacherOpp}
          />
        }
      />
    )
  }
}

export default SummarySwitcher
