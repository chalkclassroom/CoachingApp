import * as React from 'react'
import * as PropTypes from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ChildPieSummary from './ChildPieSummary'
import TeacherPieSummary from './TeacherPieSummary'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import * as Constants from '../../../constants/Constants'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'
import TeacherSummaryChart from './TeacherSummaryChart'
import ChildSummaryChart from "./ChildSummaryChart";

interface Props {
  sequential: number
  notSequential: number
  support: number
  noSupport: number
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Sequential Pie Charts
 * @class SummarySwitcher
 * @return {void}
 */
class SummarySwitcher extends React.Component<Props, {}> {
  static propTypes = {
    sequential: PropTypes.number.isRequired,
    notSequential: PropTypes.number.isRequired,
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
        tabTwoLabel={'Teacher'}
        tabOneLabel={'Child'}
        tabTwoContent={
          <TeacherSummaryChart
            support={this.props.support}
            noSupport={this.props.noSupport}
            noTeacherOpp={this.props.noTeacherOpp}
          />
        }
        tabOneContent={<ChildSummaryChart sequential={this.props.sequential} notSequential={this.props.notSequential}/>}
      />
    )
  }
}

export default SummarySwitcher
