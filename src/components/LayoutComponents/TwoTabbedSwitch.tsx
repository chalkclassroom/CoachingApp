import { TabContext, TabPanel } from '@material-ui/lab'
import React, { ReactElement, useState } from 'react'
import TabBarWrapper from './TabBarWrapper'

type TabSwitchProps = {
  tabPosition: 'top' | 'bottom'
  tabOneLabel: string
  tabTwoLabel: string
  tabOneContent: ReactElement
  tabTwoContent: ReactElement
}

export default function TwoTabbedSwitch(props: TabSwitchProps) {
  const {
    tabPosition = 'top',
    tabOneContent,
    tabOneLabel,
    tabTwoContent,
    tabTwoLabel,
  } = props

  const [tabState, setTabState] = useState(0)


  const handleChange = (event: React.SyntheticEvent<{}>, newValue: any) => {
    setTabState(newValue)
  }

  return (
    <TabContext value={tabState.toString()}>
      {tabPosition === 'top' ? (
        <TabBarWrapper
          handleChange={handleChange}
          tabOneLabel={tabOneLabel}
          tabTwoLabel={tabTwoLabel}
          value={tabState}
        />
      ) : null}

      <TabPanel value={'0'}>{tabOneContent}</TabPanel>

      <TabPanel value={'1'}>{tabTwoContent}</TabPanel>
      {tabPosition === 'bottom' ? (
        <TabBarWrapper
          handleChange={handleChange}
          tabOneLabel={tabOneLabel}
          tabTwoLabel={tabTwoLabel}
          value={tabState}
        />
      ) : null}
    </TabContext>
  )
}
