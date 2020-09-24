import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  openPanel: string,
}

/**
 * data reflection question layout for classroom climate
 * @class ClimateCoachingQuestions
 */
class ClimateCoachingQuestions extends React.Component<Props, State> {
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

  approvalsClick = (): void => {
    if (this.state.categoryView !== "approvals") {
      this.setState({
        categoryView: "approvals",
        openPanel: ''
      })
    }
  }

  redirectionsClick = (): void => {
    if (this.state.categoryView !== "redirections") {
      this.setState({
        categoryView: "redirections",
        openPanel: ''
      })
    }
  }

  disapprovalsClick = (): void => {
    if (this.state.categoryView !== "disapprovals") {
      this.setState({
        categoryView: "disapprovals",
        openPanel: ''
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

  static propTypes = {
    handleAddToPlan: PropTypes.func.isRequired,
    addedToPlan: PropTypes.array.isRequired,
    sessionId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const categories = [
      {
        clickFunction: this.approvalsClick,
        categoryView: 'approvals',
        title: 'Behavior Approvals',
        questions: Constants.CoachingQuestions.Climate.Approvals
      },
      {
        clickFunction: this.redirectionsClick,
        categoryView: 'redirections',
        title: 'Redirections',
        questions: Constants.CoachingQuestions.Climate.Redirections
      },
      {
        clickFunction: this.disapprovalsClick,
        categoryView: 'disapprovals',
        title: 'Disapprovals',
        questions: Constants.CoachingQuestions.Climate.Disapprovals
      }
    ];
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{marginTop: "1vh"}}
          >
            {categories.map((value, index) => {
              return(
                <Grid item key={index}>
                  <MuiThemeProvider theme={Constants.ClimateTheme}>
                    <Button 
                      onClick={value.clickFunction}
                      variant="contained"
                      color={this.state.categoryView === value.categoryView ? 'primary' : 'default'}
                      style={{width:'9em', height: '9em'}}
                    >
                      <Typography
                        style={{
                          color: this.state.categoryView === value.categoryView ? 'white' : Constants.Colors.CC
                        }}
                      >
                        {value.title}
                      </Typography>
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" style={{marginTop: "1vh"}}>
            {categories.map((value, index) => {
              return(
                this.state.categoryView === value.categoryView ? (
                  <DataQuestions
                    key={index}
                    questions={value.questions}
                    openPanel={this.state.openPanel}
                    handlePanelChange={this.handlePanelChange}
                    addedToPlan={this.props.addedToPlan}
                    handleAddToPlan={this.props.handleAddToPlan}
                    sessionId={this.props.sessionId}
                    teacherId={this.props.teacherId}
                    magic8={'Classroom Climate'}
                    color={Constants.Colors.CC}
                  />
                ) : null
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ClimateCoachingQuestions;
