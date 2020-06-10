import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Constants from '../../../constants/index';
import Button from '@material-ui/core/Button/Button';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '../../../components/AppBar';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import 'chartjs-plugin-datalabels';
import TrainingVideo from '../../../components/Shared/TrainingVideo.tsx';
import TrainingQuestionnaire from '../../../components/Shared/TrainingQuestionnaire';
import TrainingDashboard from '../../../components/Shared/TrainingDashboard';
import LevelOfInstructionHelpCard
    from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard.tsx';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {createMuiTheme} from '@material-ui/core';

const InstructionTheme = createMuiTheme({
    palette: {
        primary: {
            main: Constants.Colors.LI
        }
    }
});

const styles: object = {
    root: {
        flexGrow: 1,
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflowX: 'hidden',
        overflowY: 'scroll',
        margin: '0',
        padding: '0'
    },
    titleContainer: {
        width: '100%',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    backButton: {
        color: '#333333',
        borderRadius: 3,
        textTransform: 'none'
    },
    main: {
        height: 'auto',
        flexGrow: 1,
        display: 'grid',
        gridTemplateRows: '100%',
        gridTemplateColumns: '25% 75%',
        margin: '2% 5% 2% 5%'
    },
    trainingContentCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '0% 4% 3% 4%',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },

    // iPad Pro 12.9" Landscape
    '@media only screen and (max-width:1366px) and (min-height:800px) and (orientation:landscape)': {
        root: {
            fontSize: '1.5em'
        },
        main: {
            margin: '8% 2% 2% 2%'
        }
    },

    // iPad Pro 12.9" Portrait
    '@media only screen and (max-width:1024px) and (orientation:portrait)': {
        main: {
            height: '100%',
            margin: '2%',
            display: 'flex',
            flexDirection: 'column'
        },
        dashboardContainer: {
            boxShadow: '1px 1px 3px #8C8D91'
        },
        trainingContentCard: {
            flexGrow: 1,
            margin: '5% 0% 2% 0%',
            padding: '8% 2% 3% 2%',
            justifyContent: 'flex-start',
            borderTop: '2px solid #FFA726'
        }
    },

    // iPad-Mini Landscape
    '@media only screen and (max-width:1024px) and (orientation:landscape)': {
        main: {
            margin: '2%'
        }
    },

    // Minor Breakpoint - 900px height
    '@media only screen and (max-width:1024px) and (min-height:900px) and (orientation:portrait)': {
        root: {
            fontSize: '1.5em'
        }
    },

    // Minor Breakpoint - 920px width
    '@media only screen and (max-width:920px) and (orientation:landscape)': {
        main: {
            height: '100%',
            margin: '0% 2% 0% 2%',
            display: 'flex',
            flexDirection: 'column'
        },
        dashboardContainer: {
            boxShadow: '1px 1px 3px #8C8D91'
        },
        trainingContentCard: {
            flexGrow: 1,
            margin: '3% 0% 2% 0%',
            padding: '5% 2% 3% 2%',
            justifyContent: 'flex-start',
            borderTop: '2px solid #FFA726'
        }
    },

    // Mobile Landscape
    '@media only screen and (max-width:600px) and (orientation:landscape)': {
        root: {
            fontSize: '0.7em'
        }
    }
};

const ViewEnum = {
    CONCEPTS: 1,
    DEFINITIONS: 2,
    EXAMPLE: 3,
    DEMONSTRATION: 4,
    TRYIT: 5,
    KNOWLEDGECHECK: 6
};

interface Props {
    classes: Style;
}

interface Style {
    root: string,
    titleContainer: string,
    backButton: string,
    main: string,
    trainingContentCard: string,
    dashboardContainer: string,
}

interface State {
    view: number;
}

/**
 * Level Of Instruction training
 * @class LevelOfInstructionTrainingPage
 */
class LevelOfInstructionTrainingPage extends React.Component<Props, State> {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            view: ViewEnum.CONCEPTS
        };
    }

    conceptsClick = () => {
        if (this.state.view !== ViewEnum.CONCEPTS) {
            this.setState({view: ViewEnum.CONCEPTS});
        }
    };

    definitionsClick = () => {
        if (this.state.view !== ViewEnum.DEFINITIONS) {
            this.setState({view: ViewEnum.DEFINITIONS});
        }
    };

    exampleClick = () => {
        if (this.state.view !== ViewEnum.EXAMPLE) {
            this.setState({view: ViewEnum.EXAMPLE});
        }
    };

    demonstrationClick = () => {
        if (this.state.view !== ViewEnum.DEMONSTRATION) {
            this.setState({view: ViewEnum.DEMONSTRATION});
        }
    };

    tryItClick = () => {
        if (this.state.view !== ViewEnum.TRYIT) {
            this.setState({view: ViewEnum.TRYIT});
        }
    };

    knowledgeCheckClick = () => {
        if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
            this.setState({view: ViewEnum.KNOWLEDGECHECK});
        }
    };

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const {classes} = this.props;
        const {view} = this.state;
        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {(firebase: object): React.ReactNode => <AppBar firebase={firebase}/>}
                </FirebaseContext.Consumer>
                <div className={classes.titleContainer}>
                    <Button
                        variant="contained"
                        size="medium"
                        className={classes.backButton}
                        onClick={(): void => {
                            if (this.props.location.state !== undefined) {
                                // came from MyTeachers
                                this.props.history.goBack();
                            } else {
                                this.props.history.replace({
                                    pathname: '/Magic8Menu',
                                    state: {type: 'Training'}
                                });
                            }
                        }}
                    >
                        <ChevronLeftRoundedIcon/>
                        <b>Training Home</b>
                    </Button>
                    <h1 style={{justifySelf: 'center'}}>Training Tool</h1>
                    <Button
                        variant="contained"
                        size="medium"
                        className={classes.backButton}
                        onClick={null}
                        style={{visibility: 'hidden'}}
                    >
                        <ChevronLeftRoundedIcon/>
                        <b>Training Home</b>
                    </Button>
                </div>
                <div className={classes.main}>
                    <div className={classes.dashboardContainer}>
                        <TrainingDashboard
                            ViewEnum={ViewEnum}
                            view={view}
                            Icon={InstructionIconImage}
                            conceptsClick={this.conceptsClick}
                            definitionsClick={this.definitionsClick}
                            exampleClick={this.exampleClick}
                            demonstrationClick={this.demonstrationClick}
                            tryItClick={this.tryItClick}
                            knowledgeCheckClick={this.knowledgeCheckClick}
                            colorTheme={InstructionTheme}
                        />
                    </div>
                    <div className={classes.trainingContentCard}>
                        {view === ViewEnum.CONCEPTS ? (
                            <TrainingVideo
                                videoUrl={
                                    'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Level_of_Instruction_Training_Video.mp4?alt=media&token=32d2fde3-3979-4c5f-9bf4-556a6f2c5e8a'
                                }
                            />
                        ) : view === ViewEnum.DEFINITIONS ? (
                            <LevelOfInstructionHelpCard/>
                        ) : view === ViewEnum.EXAMPLE ? (
                            <div>EXAMPLE</div>
                        ) : view === ViewEnum.DEMONSTRATION ? (
                            <div>
                                <TrainingVideo
                                    videoUrl={
                                        'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/TT_Demo.mp4?alt=media&token=6fd2c698-0b5e-4a88-94d9-c34637a85043'
                                    }
                                />
                            </div>
                        ) : view === ViewEnum.TRYIT ? (
                            <div>TRY IT</div>
                        ) : view === ViewEnum.KNOWLEDGECHECK ? (
                            <TrainingQuestionnaire section={'level'}/>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LevelOfInstructionTrainingPage);