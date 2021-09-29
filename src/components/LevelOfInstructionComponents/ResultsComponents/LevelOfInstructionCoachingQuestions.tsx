import * as React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DataQuestions from '../../ResultsComponents/DataQuestions'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as Constants from '../../../constants/Constants'
import { FirebaseContext } from '../../Firebase'

interface Props {
    handleAddToPlan(
        panelTitle: string,
        index: number,
        question: string,
        sessionId: string,
        teacherId: string,
        magic8: string
    ): void
    sessionId: string
    teacherId: string
}

interface State {
    categoryView: string
    openPanel: string
    faq: array
}

/**
 * data reflection question layout for instruction
 * @class LevelOfInstructionCoachingQuestions
 */
class LevelOfInstructionCoachingQuestions extends React.Component<
    Props,
    State
> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)

        this.state = {
            categoryView: '',
            openPanel: '',
            faq: [],
        }
    }

    highLevelClick = (): void => {
        if (this.state.categoryView !== 'highLevelQuestions') {
            this.setState({
                categoryView: 'highLevelQuestions',
                openPanel: '',
            })
        }
    }
    lowLevelClick = (): void => {
        if (this.state.categoryView !== 'lowLevel') {
            this.setState({
                categoryView: 'lowLevel',
                openPanel: '',
            })
        }
    }

    highLevelInstructionClick = (): void => {
        if (this.state.categoryView !== 'highLevelInstruction') {
            this.setState({
                categoryView: 'highLevelInstruction',
                openPanel: '',
            })
        }
    }

    faqSupportClick = (): void => {
        if (this.state.categoryView !== 'FAQ') {
            this.setState({
                categoryView: 'FAQ',
                openPanel: '',
            })
        }
    }

    /**
     * @param {string} panel
     */
    static propTypes = {
        handleAddToPlan: PropTypes.func.isRequired,
        sessionId: PropTypes.string.isRequired,
        teacherId: PropTypes.string.isRequired,
    }

    static contextType = FirebaseContext

    /**
     * @param {string} panel
     */
    handlePanelChange = (panel: string): void => {
        if (this.state.openPanel === panel) {
            this.setState({ openPanel: '' })
        } else {
            this.setState({ openPanel: panel })
        }
    }

    // eslint-disable-next-line require-jsdoc
    async faqQuestions(): void {
        const sequentialQuestions = [
            ...Constants.CoachingQuestions.Instruction.highLevelQuestions,
            ...Constants.CoachingQuestions.Instruction.lowLevel,
            ...Constants.CoachingQuestions.Instruction.highLevelInstruction,
        ]
        const questions = [].concat(
            ...sequentialQuestions.map(
                sequentialQuestion => sequentialQuestion.text
            )
        )

        const user = await this.context.getUserInformation()

        const faq = [
            {
                name: 'FAQ',
                title: 'FAQ',
                text: questions.filter(question =>
                    user.favouriteQuestions.includes(question.id)
                ),
            },
        ]

        this.setState({ faq })
    }

    /** lifecycle method invoked after component mounts */
    async componentDidMount(): void {
        this.faqQuestions()
    }

    // eslint-disable-next-line require-jsdoc
    componentDidUpdate(_, prevState) {
        if (
            prevState.categoryView !== 'FAQ' &&
            'FAQ' === this.state.categoryView
        ) {
            this.faqQuestions()
        }
    }

    /**
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const categories = [
            {
                clickFunction: this.highLevelClick,
                categoryView: 'highLevelQuestions',
                title: 'Asking High-Level Questions',
                questions:
                    Constants.CoachingQuestions.Instruction.highLevelQuestions,
            },
            {
                clickFunction: this.lowLevelClick,
                categoryView: 'lowLevel',
                title: 'Building on Low-Level Instruction',
                questions: Constants.CoachingQuestions.Instruction.lowLevel,
            },
            {
                clickFunction: this.highLevelInstructionClick,
                categoryView: 'highLevelInstruction',
                title: 'High-Level Instruction in Content Areas',
                questions:
                    Constants.CoachingQuestions.Instruction
                        .highLevelInstruction,
            },
            {
                clickFunction: this.faqSupportClick,
                categoryView: 'FAQ',
                title: 'FAQ',
                questions: this.state.faq,
            },
        ]
        return (
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        style={{ marginTop: '1vh' }}
                    >
                        {categories.map((value, index) => {
                            return (
                                <Grid item key={index}>
                                    <MuiThemeProvider
                                        theme={Constants.InstructionTheme}
                                    >
                                        <Button
                                            onClick={value.clickFunction}
                                            variant="contained"
                                            color={
                                                this.state.categoryView ===
                                                value.categoryView
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            style={{
                                                width: '9em',
                                                height: '9em',
                                                textTransform: 'none',
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    color:
                                                        this.state
                                                            .categoryView ===
                                                        value.categoryView
                                                            ? 'white'
                                                            : Constants.Colors
                                                                  .IN,
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
                    <Grid
                        container
                        direction="column"
                        style={{ marginTop: '1vh' }}
                    >
                        {categories.map((value, index) => {
                            return this.state.categoryView ===
                                value.categoryView ? (
                                <DataQuestions
                                    key={index}
                                    questions={value.questions}
                                    openPanel={this.state.openPanel}
                                    handlePanelChange={this.handlePanelChange}
                                    handleAddToPlan={this.props.handleAddToPlan}
                                    sessionId={this.props.sessionId}
                                    teacherId={this.props.teacherId}
                                    magic8={'Level of Instruction'}
                                    color={Constants.Colors.IN}
                                />
                            ) : null
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default LevelOfInstructionCoachingQuestions
