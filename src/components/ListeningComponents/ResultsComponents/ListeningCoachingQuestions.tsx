import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';

interface Props {
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionId: string
  teacherId: string
}

interface State {
  categoryView: string,
  openPanel: string
}

/**
 * data reflection question layout for listening to children
 * @class ListeningCoachingQuestions
 */
class ListeningCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: ''
    }
  }

  listeningClick = (): void => {
    if (this.state.categoryView !== "listening") {
      this.setState({
        categoryView: "listening",
        openPanel: null
      })
    }
  }

  supportingClick = (): void => {
    if (this.state.categoryView !== "supporting") {
      this.setState({
        categoryView: "supporting",
        openPanel: null
      })
    }
  }

  encouragingClick = (): void => {
    if (this.state.categoryView !== "encouraging") {
      this.setState({
        categoryView: "encouraging",
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
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
            <Grid item>
              <MuiThemeProvider theme={Constants.ListeningTheme}>
                <Button
                  onClick={this.listeningClick}
                  variant="contained"
                  color="primary"
                  style={{width:'8em', height: '8em'}}
                >
                  <Typography style={{color: 'white'}}>
                    Listening to Children
                  </Typography>
                </Button >
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.ListeningTheme}>
                <Button
                  onClick={this.supportingClick}
                  variant="contained"
                  color="primary"
                  style={{width:'8em', height: '8em'}}
                >
                  <Typography style={{color: 'white'}}>
                    Supporting Child Talk
                  </Typography>
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.ListeningTheme}>
                <Button
                  onClick={this.encouragingClick}
                  variant="contained"
                  color="primary"
                  style={{width:'8em', height: '8em'}}
                >
                  <Typography style={{color: 'white'}}>
                    Encouraging Peer Talk
                  </Typography>
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" style={{marginTop: "1vh"}}>
            {this.state.categoryView === "listening" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Listening.Listening}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Listening To Children"}
                color={Constants.Colors.LC}
              />
            ) : this.state.categoryView === "supporting" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Listening.Supporting}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Listening To Children"}
                color={Constants.Colors.LC}
              />
            ) : this.state.categoryView === "encouraging" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Listening.Encouraging}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Listening To Children"}
                color={Constants.Colors.LC}
              />
            ) : <div/>}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ListeningCoachingQuestions;