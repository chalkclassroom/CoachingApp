import * as React from 'react'
import * as PropTypes from 'prop-types'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import ChildSummaryChart from './ChildSummaryChart'
import TeacherSummaryChart from './TeacherSummaryChart'

interface Props {
  ac: number
  noAc: number
  noChildOpp: number
  support: number
  noSupport: number
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Pie Charts
 * @class SummarySwitcher
 * @return {void}
 */
class SummarySwitcher extends React.Component<Props, {}> {
  static propTypes = {
    ac: PropTypes.number.isRequired,
    noAc: PropTypes.number.isRequired,
    noChildOpp: PropTypes.number.isRequired,
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
          <ChildSummaryChart
            ac={this.props.ac}
            noAc={this.props.noAc}
            noChildOpp={this.props.noChildOpp}
          />
        }
        tabTwoContent={
          <TeacherSummaryChart
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
