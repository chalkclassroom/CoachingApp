import TabBar from "@material-ui/core/AppBar";
import {Tab, Tabs} from "@material-ui/core";
import React from "react";
import * as Constants from "../../constants/Constants";

type TabBarWrapperProps = {
  tabOneLabel: string
  tabTwoLabel: string
  value: number
  handleChange: (event: React.SyntheticEvent<{}>, newValue: any) => void
}


export default function TabBarWrapper(props: TabBarWrapperProps) {
  const {tabOneLabel, tabTwoLabel} = props

   return (
     <TabBar
     position={'static'}
     color={'default'}>
    <Tabs
    value={props.value}
    onChange={props.handleChange}
    variant={'fullWidth'}
    textColor={'primary'}
    TabIndicatorProps={{
      style: {
        backgroundColor: Constants.Colors.TT
      }
    }}
    >
      <Tab label={tabOneLabel}/>
      <Tab label={tabTwoLabel}/>
    </Tabs>
  </TabBar>
)
}