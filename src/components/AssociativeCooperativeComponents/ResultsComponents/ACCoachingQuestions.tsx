import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { withStyles } from "@material-ui/core/styles";
import * as Constants from '../../../constants';

const styles: object = {
  categoryView: {

  }
}

interface Props {
  classes: {
    categoryView: string
  }
}

interface State {
  categoryView: string,
  openPanel: string,
  addedToPrep: Array<string>
}

/**
 * data reflection question layout for associative & cooperative
 * @class ACCoachingQuestions
 */
class ACCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: '',
      addedToPrep: []
    }
  }

  associativeClick = (): void => {
    if (this.state.categoryView !== "associative") {
      this.setState({
        categoryView: "associative",
        openPanel: null
      })
    }
  }

  cooperativeClick = (): void => {
    if (this.state.categoryView !== "cooperative") {
      this.setState({
        categoryView: "cooperative",
        openPanel: null
      })
    }
  }

  teacherParticipationClick = (): void => {
    if (this.state.categoryView !== "teacherParticipation") {
      this.setState({
        categoryView: "teacherParticipation",
        openPanel: null
      })
    }
  }

  teacherSupportClick = (): void => {
    if (this.state.categoryView !== "teacherSupport") {
      this.setState({
        categoryView: "teacherSupport",
        openPanel: null
      })
    }
  }

  /**
   * @param {string} panel
   */
  handlePanelChange = (panel: string): void => {
    if (this.state.openPanel === panel) {
      this.setState({ openPanel: '' });
    } else {
      this.setState({ openPanel: panel });
    }
  };

  /**
   * @param {string} panel
   */
  handleAddToPlan = (panel: string): void => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({ addedToPrep: [...this.state.addedToPrep, panel] });
    }
  };

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
          <Grid item>
            <Button 
              // style={this.state.categoryView === "line" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor}
              onClick={this.associativeClick}
            >
              <Typography>
                Associative Interactions
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              // style={this.state.categoryView === "traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor}
              onClick={this.cooperativeClick}
            >
              <Typography>
                Cooperative Interactions
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={this.teacherParticipationClick}
            >
              <Typography>
                Teacher Participation in Activities
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={this.teacherSupportClick}
            >
              <Typography>
                Teacher Support for Child Interactions
              </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: ".5vh", fontFamily: "Arimo"}}>
          <Grid
            item xs={2}
          >
            Behavior Approvals
          </Grid>
          <Grid
            item xs={2}
          >
            Redirections
          </Grid>
          <Grid
            item xs={2}
          >
            Disapprovals
          </Grid>
        </Grid> */}
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "associative" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.Associative}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
            />
          ) : this.state.categoryView === "cooperative" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.Cooperative}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
            />
          ) : this.state.categoryView === "teacherParticipation" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.TeacherParticipation}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
            />
          ) : this.state.categoryView === "teacherSupport" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Climate.Disapprovals}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ACCoachingQuestions);