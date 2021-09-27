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
  teacherId: string,
  literacyType: Constants.LiteracyTypes
}

interface State {
  categoryView: number,
  openPanel: string
}

const LiteracyCategories = {
  'Foundational': [
    'Phonological Awareness (Sounds of Language)',
    'Alphabetic Principle and Print Concepts',
    'Realistic Reading and Writing',
    'Assessment and Planning for Instruction',
    'Teacher Support for Foundational Skills'
  ],
  'Writing': [
    'Focus on Meaning',
    'Focus on Print Processes',
    'Meaningful Writing Activities',
    'Assessment and Planning for Instruction',
    'Teacher Support for Writing'
  ],
  'Reading': [
    'Vocabulary',
    'Listening Comprehension',
    'Connections to Children\'s Experiences',
    'Speaking and Listening Skills',
    'Assessment and Planning for Instruction'
  ],
  'Language': [
    'Discussing Vocabulary and Concepts',
    'Talking about Social-Emotional Topics',
    'Encouraging Children to Talk',
    'Responding to Children',
    'Assessment and Planning for Conversations'
  ]
};

type LiteracyFoundationalKey = 
  'Phonological Awareness (Sounds of Language)' |
  'Alphabetic Principle and Print Concepts' |
  'Realistic Reading and Writing' |
  'Assessment and Planning for Instruction' |
  'Teacher Support for Foundational Skills'

type LiteracyWritingKey = 
  'Focus on Meaning' |
  'Focus on Print Processes' |
  'Meaningful Writing Activities' |
  'Assessment and Planning for Instruction' |
  'Teacher Support for Writing'

type LiteracyReadingKey = 
  'Vocabulary' |
  'Listening Comprehension' |
  'Connections to Children\'s Experiences' |
  'Speaking and Listening Skills' |
  'Assessment and Planning for Instruction'

type LiteracyLanguageKey = 
  'Discussing Vocabulary and Concepts' |
  'Talking about Social-Emotional Topics' |
  'Encouraging Children to Talk' |
  'Responding to Children' |
  'Assessment and Planning for Conversations'

/**
 * data reflection question layout for listening to children
 * @class LiteracyCoachingQuestions
 */
class LiteracyCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: 0,
      openPanel: ''
    }
  }

  categoryClick = (category: number) => {
    if (this.state.categoryView !== category) {
      this.setState({
        categoryView: category,
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
    return(
      <div>
        {this.props.literacyType === '' ? (
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
                {LiteracyCategories[this.props.literacyType].map((value, index) => {
                  return(
                    <Grid item key={index}>
                      <MuiThemeProvider theme={Constants.ListeningTheme}>
                        <Button 
                          onClick={(): void => this.categoryClick(index+1)}
                          variant="contained"
                          style={{
                            width:'9em',
                            height: '9em',
                            backgroundColor: this.state.categoryView === index+1 ? Constants.Colors.LI : '#f5f5f5',
                            textTransform: 'none'
                          }}
                        >
                          <Typography style={{color: this.state.categoryView === index+1 ? 'white' : 'black'}}>
                            {value}
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
                {LiteracyCategories[this.props.literacyType].map((value, index) => {
                  const key = Object.keys(value)[0];
                  return(
                    this.state.categoryView === index+1 ? (
                      <DataQuestions
                        key={index}
                        questions={Constants.CoachingQuestions.Literacy[this.props.literacyType][value as LiteracyFoundationalKey & LiteracyWritingKey & LiteracyReadingKey & LiteracyLanguageKey]}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        handleAddToPlan={this.props.handleAddToPlan}
                        sessionId={this.props.sessionId}
                        teacherId={this.props.teacherId}
                        magic8={"Literacy Instruction"}
                        color={Constants.Colors.LI}
                      />
                    ) : null
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        ) : (null)}
      </div>
    );
  }
}

export default LiteracyCoachingQuestions;