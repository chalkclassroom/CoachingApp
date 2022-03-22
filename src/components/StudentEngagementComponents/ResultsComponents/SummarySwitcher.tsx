import * as React from 'react'
import * as PropTypes from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import PieSummary from './PieSummary'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import AvgBarSummary from '../../StudentEngagementComponents/ResultsComponents/AvgBarSummary'
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import * as Constants from '../../../constants/Constants'
import EngagementSummaryChart from './EngagementSummaryChart'
import AverageBarLegend from './AverageBarLegend'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'

interface Props {
  offTask: number
  engaged: number
  avgRating: number
}

/**
 * Swipe View for Child and Teacher Sequential Pie Charts
 * @class SummarySwitcher
 * @return {void}
 */
class SummarySwitcher extends React.Component<Props, {}> {
  static propTypes = {
    offTask: PropTypes.number.isRequired,
    engaged: PropTypes.number.isRequired,
    avgRating: PropTypes.number.isRequired,
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <Typography
          variant="h5"
          style={{
            textAlign: 'center',
            fontFamily: 'Arimo',
            paddingTop: '1em',
            paddingBottom: '0.5em',
          }}
        >
          Student Engagement
        </Typography>
        <TwoTabbedSwitch
          tabPosition={'bottom'}
          tabOneLabel={'Proportion'}
          tabTwoLabel={'Average'}
          tabOneContent={
            <EngagementSummaryChart
              offTask={this.props.offTask}
              engaged={this.props.engaged}
            />
          }
          tabTwoContent={
            <Grid container justify={'center'} direction={'column'}>
              <AverageBarLegend avgRating={this.props.avgRating} />
              <AvgBarSummary avgRating={this.props.avgRating} />
            </Grid>
          }
        />
      </div>
    )
  }
}

export default SummarySwitcher
