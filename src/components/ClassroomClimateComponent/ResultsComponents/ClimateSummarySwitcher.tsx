import * as React from 'react'
import * as PropTypes from 'prop-types'
import AverageTone from './AverageTone'

import SummaryGraph from '../../Shared/SummaryGraph'
import BehaviorResponseSummaryChart from './BehaviorResponseSummaryChart'
import TwoTabbedSwitch from '../../LayoutComponents/TwoTabbedSwitch'

interface Props {
  negativeResponses: number
  positiveResponses: number
  averageToneRating: number
  tabPanelHeight: string
}

/**
 * @class ClimateSummarySwitcher
 */
class ClimateSummarySwitcher extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)
  }

  static propTypes = {
    negativeResponses: PropTypes.number.isRequired,
    positiveResponses: PropTypes.number.isRequired,
    averageToneRating: PropTypes.number,
    tabPanelHeight: PropTypes.string
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {

    return (
      <TwoTabbedSwitch
        tabPosition={'bottom'}
        tabOneLabel={'Behavior'}
        tabOneContent={
          <BehaviorResponseSummaryChart
            height={this.props.tabPanelHeight}
            positiveResponses={this.props.positiveResponses}
            negativeResponses={this.props.negativeResponses}
          />
        }
        tabTwoLabel={'Tone'}
        tabTwoContent={<SummaryGraph height={this.props.tabPanelHeight} graphTitle={'Average Tone'} graph={<AverageTone averageToneRating={this.props.averageToneRating}/>} />}

      />
    )
  }
}

export default ClimateSummarySwitcher
