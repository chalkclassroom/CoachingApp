import * as React from "react";
import * as PropTypes from "prop-types";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Grid from "@material-ui/core/Grid/Grid";
import LiteracyTrendsFoundationalTeacher from './LiteracyTrendsFoundationalTeacher';
import LiteracyTrendsFoundationalChild from './LiteracyTrendsFoundationalChild';
import LiteracyTrendsWriting from './LiteracyTrendsWriting';
import * as Constants from '../../../constants/Constants';
    import {Tab, Tabs} from "@material-ui/core";
import {TabContext, TabPanel} from "@material-ui/lab";
import TabBar from '@material-ui/core/AppBar'
import { withStyles } from "@material-ui/styles";

interface Props {
  type: string,
  teacherData: Array<{
    startDate: string,
    literacy1: number,
    literacy2: number,
    literacy3: number,
    literacy4: number,
    literacy5: number,
    literacy6: number,
    literacy7: number,
    literacy8: number,
    literacy9?: number,
    literacy10?: number,
    total: number,
    activitySetting: string
  }>,
  childData: Array<{
    startDate: string,
    literacy1: number,
    literacy2: number,
    literacy3: number,
    literacy4: number,
    literacy5: number,
    literacy6: number,
    literacy7: number,
    literacy8: number,
    literacy9?: number,
    total: number,
    activitySetting: string
  }>
}

const styles: object = {
  tabBar: {
    fontSize: '1rem',
  },
  tabs: {
    fontSize: 'inherit',
    fontFamily: 'Arimo'
    // color: Constants.Colors.TT
  }
}

/**
 * Swipe View for Child and Teacher Math Trends Graphs
 * @class TrendsTabs
 * @return {void}
 */
class TrendsTabs extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }

  handleChange = (event: React.SyntheticEvent<{}>, newValue: any) => {
    this.setState({currentTab: newValue})
  }

  static propTypes = {
    type: PropTypes.number.isRequired,
    childData: PropTypes.array.isRequired,
    teacherData: PropTypes.array.isRequired
  };


  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
  const {classes} = this.props
    return (
      <TabContext value={this.state.currentTab.toString()}>
        <div style={{
          marginTop: '1.3rem'}}>
        <TabBar
          position={'static'}
          color={'default'}>
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleChange}
            variant={'fullWidth'}
            className={classes.tabBar}
            textColor={'primary'}
            TabIndicatorProps={{
              style: {
                backgroundColor: Constants.Colors.TT
              }
            }}

          >
            <Tab label={'Teacher Behaviors'} className={classes.tabs}/>
            <Tab label={'Child Behaviors'} className={classes.tabs}/>
          </Tabs>
        </TabBar>
        <TabPanel value={'0'}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              {this.props.type === Constants.LiteracyTypes.FOUNDATIONAL ? (
                <LiteracyTrendsFoundationalTeacher
                  teacherData={this.props.teacherData}
                />
              ) : (
                <LiteracyTrendsWriting
                  data={this.props.teacherData}
                  who='Teacher'
                />
              )}
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={'1'}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              {this.props.type === Constants.LiteracyTypes.FOUNDATIONAL ? (
                <LiteracyTrendsFoundationalChild
                  childData={this.props.childData}
                />
              ) : (
                <LiteracyTrendsWriting
                  data={this.props.childData}
                  who='Child'
                />
              )}
            </Grid>
          </div>
        </TabPanel>

      </div></TabContext>
    );
  }
}

export default withStyles(styles)(TrendsTabs);