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
    if (this.state.categoryView !== "highLevelQuestions") {
      this.setState({
        categoryView: "highLevelQuestions",
        openPanel: ''
      })
    }
  }
  lowLevelClick = (): void => {
    if (this.state.categoryView !== "lowLevel") {
      this.setState({
        categoryView: "lowLevel",
        openPanel: ''
      })
    }
  }

  highLevelInstructionClick = (): void => {
    if (this.state.categoryView !== "highLevelInstruction") {
      this.setState({
        categoryView: "highLevelInstruction",
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
      {clickFunction: this.highLevelClick, categoryView: 'highLevelQuestions', title: 'Asking High-Level Questions', questions: Constants.CoachingQuestions.Instruction.highLevelQuestions},
      {clickFunction: this.lowLevelClick, categoryView: 'lowLevel', title: 'Building on Low-Level Instruction', questions: Constants.CoachingQuestions.Instruction.lowLevel},
      {clickFunction: this.highLevelInstructionClick, categoryView: 'highLevelInstruction', title: 'High-Level Instruction in Content Areas', questions: Constants.CoachingQuestions.Instruction.highLevelInstruction}
    ];
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
            {categories.map((value, index) => {
              return(
                <Grid item key={index}>
                  <MuiThemeProvider theme={Constants.InstructionTheme}>
                    <Button 
                      onClick={value.clickFunction}
                      variant="contained"
                      color={this.state.categoryView === value.categoryView ? 'primary' : 'default'}
                      style={{width:'9em', height: '9em'}}
                    >
                      <Typography style={{color: this.state.categoryView === value.categoryView ? 'white' : Constants.Colors.IN}}>
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
                    addedToPlan={this.props.addedToPlan}
                    handleAddToPlan={this.props.handleAddToPlan}
                    sessionId={this.props.sessionId}
                    teacherId={this.props.teacherId}
                    magic8={'Level of Instruction'}
                    color={Constants.Colors.IN}
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

export default LevelOfInstructionCoachingQuestions;