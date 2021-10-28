import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import DataQuestions from '../../ResultsComponents/DataQuestions'
import * as Constants from '../../../constants/Constants'
import QuestionBox from './QuestionBox.tsx'
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
    literacyType: Constants.LiteracyTypes
}

interface State {
    categoryView: number
    openPanel: string
}

const LiteracyCategories = {
    Foundational: [
        'Phonological Awareness (Sounds of Language)',
        'Alphabetic Principle and Print Concepts',
        'Realistic Reading and Writing',
        'Assessment and Planning for Instruction',
        'Teacher Support for Foundational Skills',
        'Favorite Questions'
    ],
    Writing: [
        'Focus on Meaning',
        'Focus on Print Processes',
        'Meaningful Writing Activities',
        'Assessment and Planning for Instruction',
        'Teacher Support for Writing',
        'Favorite Questions'
    ],
    Reading: [
        'Vocabulary',
        'Listening Comprehension',
        "Connections to Children's Experiences",
        'Speaking and Listening Skills',
        'Assessment and Planning for Instruction',
        'Favorite Questions'
    ],
    Language: [
        'Discussing Vocabulary and Concepts',
        'Talking about Social-Emotional Topics',
        'Encouraging Children to Talk',
        'Responding to Children',
        'Assessment and Planning for Conversations',
        'Favorite Questions'
    ],
}

type LiteracyFoundationalKey =
    | 'Phonological Awareness (Sounds of Language)'
    | 'Alphabetic Principle and Print Concepts'
    | 'Realistic Reading and Writing'
    | 'Assessment and Planning for Instruction'
    | 'Teacher Support for Foundational Skills'
    | 'Favorite Questions'

type LiteracyWritingKey =
    | 'Focus on Meaning'
    | 'Focus on Print Processes'
    | 'Meaningful Writing Activities'
    | 'Assessment and Planning for Instruction'
    | 'Teacher Support for Writing'
    | 'Favorite Questions'

type LiteracyReadingKey =
    | 'Vocabulary'
    | 'Listening Comprehension'
    | "Connections to Children's Experiences"
    | 'Speaking and Listening Skills'
    | 'Assessment and Planning for Instruction'
    | 'Favorite Questions'

type LiteracyLanguageKey =
    | 'Discussing Vocabulary and Concepts'
    | 'Talking about Social-Emotional Topics'
    | 'Encouraging Children to Talk'
    | 'Responding to Children'
    | 'Assessment and Planning for Conversations'
    | 'Favorite Questions'

/**
 * data reflection question layout for listening to children
 * @class LiteracyCoachingQuestions
 */
class LiteracyCoachingQuestions extends React.Component<Props, State> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)

        this.state = {
            categoryView: 0,
            openPanel: '',
            user: {},
        }
    }

    static contextType = FirebaseContext

    // eslint-disable-next-line require-jsdoc
    async setUserInformation(): void {
        this.setState({
            user: await this.context.getUserInformation(),
        })
    }

        /** lifecycle method invoked after component mounts */
    async componentDidMount(): void {
        this.setUserInformation()
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    categoryClick = (category: number) => {
        if (this.state.categoryView !== category) {
            this.setState({
                categoryView: category,
                openPanel: '',
            })
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getQuestions = (value: string) => {
        if (value === "Favorite Questions") {
            this.setUserInformation();
            const allQuestions = Object.values(
                Constants.CoachingQuestions.Literacy[this.props.literacyType]
            ).flatMap((x) => x);
            const flatAllQuestions = allQuestions.flatMap(
                (questions) => questions.text
            );
            const favouriteQuestions = flatAllQuestions.filter((question) =>
                this.state.user?.favouriteQuestions.includes(question.id)
            );
    
            return [
                {
                    name: "Favorite Questions",
                    title: "Favorite Questions",
                    text: favouriteQuestions,
                },
            ];
        }
    
        return Constants.CoachingQuestions.Literacy[this.props.literacyType][
            value as LiteracyFoundationalKey &
                LiteracyWritingKey &
                LiteracyReadingKey &
                LiteracyLanguageKey
        ];
    };

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

    /**
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        return (
            <div>
                {this.props.literacyType !== '' ? (
                    <Grid container direction="column">
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                style={{ marginTop: '1vh' }}
                            >
                                {LiteracyCategories[
                                    this.props.literacyType
                                ].map((value, index) => {
                                    return (
                                        <QuestionBox
                                            key={index}
                                            index={index}
                                            value={value}
                                            categoryClick={this.categoryClick}
                                            categoryView={this.state.categoryView}
                                        />
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
                                {LiteracyCategories[
                                    this.props.literacyType
                                ].map((value, index) => {
                                    return this.state.categoryView ===
                                        index + 1 ? (
                                        <DataQuestions
                                            key={index}
                                            questions={this.getQuestions(value)}
                                            openPanel={this.state.openPanel}
                                            handlePanelChange={
                                                this.handlePanelChange
                                            }
                                            handleAddToPlan={
                                                this.props.handleAddToPlan
                                            }
                                            sessionId={this.props.sessionId}
                                            teacherId={this.props.teacherId}
                                            magic8={'Literacy Instruction'}
                                            color={Constants.Colors.LI}
                                        />
                                    ) : null
                                    
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}
            </div>
        )
    }
}

export default LiteracyCoachingQuestions
