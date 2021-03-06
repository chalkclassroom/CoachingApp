import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';

interface Props {
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  sessionId: string
  teacherId: string
}

interface State {
  categoryView: string,
  openPanel: string
}

/**
 * data reflection question layout for sequential activities
 * @class SequentialCoachingQuestions
 */
class SequentialCoachingQuestions extends React.Component<Props, State> {
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

  drawingWritingClick = (): void => {
    if (this.state.categoryView !== "drawingAndWriting") {
      this.setState({
        categoryView: "drawingAndWriting",
        openPanel: ''
      })
    }
  }

  gamesClick = (): void => {
    if (this.state.categoryView !== "games") {
      this.setState({
        categoryView: "games",
        openPanel: ''
      })
    }
  }

  teacherSupportClick = (): void => {
    if (this.state.categoryView !== "teacherSupport") {
      this.setState({
        categoryView: "teacherSupport",
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

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const categories = [
      {clickFunction: this.drawingWritingClick, categoryView: 'drawingAndWriting', title: 'Drawing and Writing', questions: Constants.CoachingQuestions.Sequential.DrawingAndWriting},
      {clickFunction: this.gamesClick, categoryView: 'games', title: 'Games and Pretend Play', questions: Constants.CoachingQuestions.Sequential.GamesAndPretendPlay},
      {clickFunction: this.teacherSupportClick, categoryView: 'teacherSupport', title: 'Teacher Support for Sequential Activities', questions: Constants.CoachingQuestions.Sequential.TeacherSupport}
    ];
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
            {categories.map((value, index) => {
              return(
                <Grid item key={index}>
                  <MuiThemeProvider theme={Constants.SequentialTheme}>
                    <Button 
                      onClick={value.clickFunction}
                      variant='contained'
                      style={{
                        width:'9em',
                        height: '9em',
                        backgroundColor: this.state.categoryView === value.categoryView ? Constants.Colors.SA : '#f5f5f5'
                      }}
                    >
                      <Typography style={{color: 'black'}}>
                        {value.title}
                      </Typography>
                    </Button >
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
                    handleAddToPlan={this.props.handleAddToPlan}
                    sessionId={this.props.sessionId}
                    teacherId={this.props.teacherId}
                    magic8={"Sequential Activities"}
                    color={Constants.Colors.SA}
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

export default SequentialCoachingQuestions;