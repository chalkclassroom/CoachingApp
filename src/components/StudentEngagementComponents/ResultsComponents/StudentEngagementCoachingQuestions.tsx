import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';

const EngagementTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SE
    }
  }
});

interface Props {
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionId: string
  teacherId: string,
  magic8: string
}

interface State {
  categoryView: string,
  openPanel: string
}

/**
 * data reflection question layout for Student Engagement
 * @class StudentEngagementCoachingQuestions
 */
class StudentEngagementCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: '',
    }
  }

  offTaskBehaviorClick = (): void => {
    if (this.state.categoryView !== "offTaskBehavior") {
      this.setState({
        categoryView: "offTaskBehavior",
        openPanel: null
      })
    }
  }

  mildEngagementClick = (): void => {
    if (this.state.categoryView !== "mildEngagement") {
      this.setState({
        categoryView: "mildEngagement",
        openPanel: null
      })
    }
  }

  highEngagementClick = (): void => {
    if (this.state.categoryView !== "highEngagement") {
      this.setState({
        categoryView: "highEngagement",
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
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return(
      <Grid container direction="column">
        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
          <Grid item>
            <MuiThemeProvider theme={EngagementTheme}>
              <Button
                onClick={this.offTaskBehaviorClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography>
                  Off Task Behavior
                </Typography>
              </Button >
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={EngagementTheme}>
              <Button
                onClick={this.mildEngagementClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography style={{color: 'black'}}>
                 Mild Engagement
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={EngagementTheme}>
              <Button
                onClick={this.highEngagementClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography>
                  High Engagement
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "offTaskBehavior" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Engagement.OffTask}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={this.props.magic8}
              color={Constants.Colors.SE}
            />
          ) : this.state.categoryView === "mildEngagement" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Engagement.MildEngagement}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={this.props.magic8}
              color={Constants.Colors.SE}
            />
          ) : this.state.categoryView === "highEngagement" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Engagement.HighEngagement}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={this.props.magic8}
              color={Constants.Colors.SE}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default StudentEngagementCoachingQuestions;