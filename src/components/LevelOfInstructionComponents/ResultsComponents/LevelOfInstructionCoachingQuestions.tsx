import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';

const InstructionTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.LI
    }
  }
});

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
 * data reflection question layout for instruction
 * @class LevelOfInstructionCoachingQuestions
 */
class LevelOfInstructionCoachingQuestions extends React.Component<Props, State> {
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

  highLevelClick = (): void => {
    if (this.state.categoryView !== "highLevel") {
      this.setState({
        categoryView: "highLevel",
        openPanel: null
      })
    }
  }
  followUpClick = (): void => {
    if (this.state.categoryView !== "followUp") {
      this.setState({
        categoryView: "followUp",
        openPanel: null
      })
    }
  }
  basicSkillsClick = (): void => {
    if (this.state.categoryView !== "basicSkills") {
      this.setState({
        categoryView: "basicSkills",
        openPanel: null
      })
    }
  }

    inferentialInstructionClick = (): void => {
    if (this.state.categoryView !== "inferentialInstruction") {
      this.setState({
        categoryView: "inferentialInstruction",
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
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
                onClick={this.highLevelClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'white'}}>
                  Asking High-Level Questions
                </Typography>
              </Button >
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
                onClick={this.followUpClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'white'}}>
                  Following up on Children’s Responses
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
               onClick={this.basicSkillsClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'white'}}>
                  Building on Basic Skills Instruction
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={InstructionTheme}>
              <Button
                onClick={this.inferentialInstructionClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'white'}}>
                  Inferential Instruction in Content Areas
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "highLevel" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Instruction.highLevel}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={"Level of Instruction"}
              color={Constants.Colors.LI}
            />
          ) : this.state.categoryView === "followUp"  ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Instruction.followUp}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={"Level of Instruction"}
              color={Constants.Colors.LI}
            />
          ) : this.state.categoryView === "basicSkills" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Instruction.basicSkills}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={"Level of Instruction"}
              color={Constants.Colors.LI}
            />
          ) : this.state.categoryView === "inferentialInstruction" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Instruction.inferentialInstruction}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPlan={this.props.addedToPlan}
              handleAddToPlan={this.props.handleAddToPlan}
              sessionId={this.props.sessionId}
              teacherId={this.props.teacherId}
              magic8={"Level of Instruction"}
              color={Constants.Colors.LI}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default LevelOfInstructionCoachingQuestions;