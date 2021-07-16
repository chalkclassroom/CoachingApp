import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Grid from "@material-ui/core/Grid/Grid";
import LiteracyTrendsFoundationalTeacher from './LiteracyTrendsFoundationalTeacher';
import LiteracyTrendsFoundationalChild from './LiteracyTrendsFoundationalChild';
import LiteracyTrendsWriting from './LiteracyTrendsWriting';
import * as Constants from '../../../constants/Constants';

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

/**
 * Swipe View for Child and Teacher Math Trends Graphs
 * @class TrendsSlider
 * @return {void}
 */
class TrendsSlider extends React.Component<Props, {}> {

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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
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
      </Slider>
    );
  }
}

export default TrendsSlider;