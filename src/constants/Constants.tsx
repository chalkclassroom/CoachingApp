import * as React from 'react';
import { createTheme } from '@material-ui/core/styles';

import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";

export const ToolNames = {
  'TT': 'Transition Time',
  'CC': 'Classroom Climate',
  'MI': 'Math Instruction',
  'SE': 'Student Engagement',
  'IN': 'Level of Instruction',
  'LC': 'Listening to Children',
  'SA': 'Sequential Activities',
  'LI': 'Literacy Instruction',
  'AC': 'Associative and Cooperative Interactions',
}

export const ToolAbbreviations = {
  'Transition Time' : 'TT',
  'Classroom Climate' : 'CC',
  'Math Instruction' : 'MI',
  'Level of Engagement' : 'SE',
  'Level of Instruction' : 'IN',
  'Listening to Children' : 'LC',
  'Sequential Activities' : 'SA',
  'Literacy Instruction' : 'LI',
  'AC' : 'AC',
}

// Colors
export const Colors = {
  'AppBar': "#459aeb",
  'TT': '#e55529',
  'CC': '#0988ec',
  'MI': '#094492',
  'SE': '#e99c2e',
  'IN': '#009365',
  'LC': '#4fd9b3',
  'SA': '#ffd300',
  'LI': '#C4395A',
  'AC': '#6f39c4',
  'RedGraph': "#ec2409",
  'NotPresent': "#bababa"
}

export const TransparentTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff00'
    }
  }
});

export const TransitionTheme = createTheme({
  palette: {
    primary: {
      main: '#e55529'
    }
  }
});
export const ClimateTheme = createTheme({
  palette: {
    primary: {
      main: '#0988ec'
    }
  }
});
export const MathTheme = createTheme({
  palette: {
    primary: {
      main: '#094492'
    },
    secondary: {
      main: '#000000'
    }
  }
});
export const InstructionTheme = createTheme({
  palette: {
    primary: {
      main: '#009365'
    }
  }
});
export const EngagementTheme = createTheme({
  palette: {
    primary: {
      main: '#e99c2e'
    },
    secondary: {
      main: '#d3d3d3'
    }
  }
});
export const ListeningTheme = createTheme({
  palette: {
    primary: {
      main: '#4fd9b3'
    },
    secondary: {
      main: '#000000'
    }
  }
});
export const SequentialTheme = createTheme({
  palette: {
    primary: {
      main: '#ffd300'
    },
    secondary: {
      main: '#000000'
    }
  }
});
export const LiteracyTheme = createTheme({
  palette: {
    primary: {
      main: '#C4395A'
    }
  }
});
export const ACTheme = createTheme({
  palette: {
    primary: {
      main: '#6f39c4'
    },
    secondary: {
      main: '#000000'
    }
  }
});

export const TransitionTypeColors = {
  lineColor: lightGreen[300],
  travelingColor: orange[400],
  waitingColor: deepOrange[400],
  routinesColor: blue[300],
  behaviorManagementColor: red['A200'],
  otherColor: indigo['A200'],
}

export const UnselectedTransitionTypeColors = {
  lineColor: lightGreen[100],
  travelingColor: orange[100],
  waitingColor: deepOrange[100],
  routinesColor: blue[100],
  behaviorManagementColor: red['A100'],
  otherColor: indigo['A100']
}

export const LineTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.lineColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.lineColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.lineColor
    }
  }
});

export const TravelingTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.travelingColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.travelingColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.travelingColor
    }
  }
});

export const WaitingTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.waitingColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.waitingColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.waitingColor
    }
  }
});

export const RoutinesTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.routinesColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.routinesColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.routinesColor
    }
  }
});

export const BehaviorManagementTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.behaviorManagementColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.behaviorManagementColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.behaviorManagementColor
    }
  }
});

export const OtherTheme = createTheme({
  palette: {
    primary: {
      main: TransitionTypeColors.otherColor
    },
    secondary: {
      main: UnselectedTransitionTypeColors.otherColor
    },
    action: {
      disabledBackground: UnselectedTransitionTypeColors.otherColor
    }
  }
});

export const ClimateTypeColors = {
  specificApproval: '#0988ec',
  nonSpecificApproval: '#094492',
  redirection: '#ffa812',
  disapproval: '#ff7f00',
  positiveBar: '#0966bf',
  negativeBar: '#FF9409'
};

export const CentersFirstHalf = [
  "Blocks",
  "Toys and Games",
  "Technology/\nComputer",
  "Sensory",
  "Math/\nManipulatives",
  "Science and Nature",
];

export const CentersSecondHalf = [
  "Writing",
  "Art",
  "Dramatic Play",
  "Music and Movement",
  "Library",
  "Small Group"
];

export enum LiteracyTypes {
  NONE = '',
  FOUNDATIONAL = 'Foundational',
  WRITING = 'Writing',
  READING = 'Reading',
  LANGUAGE = 'Language'
}

const activitySettingsFoundational = [
  'All',
  'Whole Group Lesson',
  'Small Group Lesson',
  'Morning Meeting',
  'Shared Reading',
  'Shared Writing',
  'Individual Child Activity',
  'Center Time Activities'
];

const activitySettingsWriting = [
  'All',
  'Morning Meeting',
  'Shared Writing',
  'Individual Child Writing',
  'Journals',
  'Writing Center Activities',
  'Center Time Activities',
  'Small Group Lesson'
];

const activitySettingsReading = [
  'All',
  'Fiction',
  'Nonfiction/Informational',
  'Rhyming',
  'Predictable',
  'Poem',
  'Alphabet/Counting',
  'Class-Made Book'
];

const activitySettingsLanguage = [
  'All',
  'Morning Meeting',
  'Whole Group Lesson',
  'Small Group Lesson',
  'Center Time Activities',
  'Mealtime'
];

export const LiteracyActivitySettings = {
  'FoundationalChild': activitySettingsFoundational,
  'FoundationalTeacher': activitySettingsFoundational,
  'WritingChild': activitySettingsWriting,
  'WritingTeacher': activitySettingsWriting,
  'ReadingTeacher': activitySettingsReading,
  'LanguageTeacher': activitySettingsLanguage
};

// Team Members
export const CC = {
  'name': 'Caroline Christopher, Ph.D.',
  'initials': 'CC',
  'role': 'Principal Investigator',
  'description': 'Dr. Christopher is the Principal Investigator on the project. ' + 
  'In 2018, she received a 4-year grant from the National Science Foundation (DRK-12-1813008) to develop ' +
  'a web-based coaching tool that guides instructional leaders to collect objective observation data and ' +
  'then links those data with coaching practices.  Her current and previous research experience has included ' +
  'working collaboratively with community partners to implement data-driven change in classroom practices to ' +
  'promote high-quality early education programs. She is currently a Research Assistant Professor at Vanderbilt University.',
  'link' : 'https://peabody.vanderbilt.edu/bio/caroline-christopher',
  'email' : 'caroline.h.christopher@vanderbilt.edu'
};
export const DM = {
  'name': 'Deanna Meador, M.A.',
  'initials': 'DM',
  'role': 'Innovation Garage Director',
  'description': 'Ms. Meador is the Associate Director of Vanderbilt University’s ' +  
  'Center for Innovation, the Wond’ry, and serves as a content developer and liaison between the education ' + 
  'research team and the Wond’ry interns. Her prior background working with the Peabody Research Office, ' +
  'in-depth knowledge of their data collection measures and methods, as well as technical development and ' + 
  'user interface skills makes for a valuable addition to the project team.',
  'link': 'https://www.vanderbilt.edu/thewondry/person/deanna-meador/'
};
export const KN = {
  'name': 'Katherine Newman, Ph.D.',
  'initials': 'KN',
  'role': 'Research Associate',
  'description': 'Dr. Newman is the Research Coordinator on this project.  She comes to us with both a ' +
  'researcher and a coaching lens as she received her doctorate in Teaching and Learning from Vanderbilt ' +
  'University and has worked as an instructional coach for Metro Nashville Public Schools.  She was previously ' +
  'one of our coaching partners and has classroom experience as a kindergarten and fifth grade teacher, which ' +
  'gives her the ability to understand the perspectives of the end users for this tool. At the same time, she ' +
  'has a rich understanding of empirical research that informs the development of the tool.'
};
export const CS = {
  'name': 'Clare Speer',
  'initials': 'CS',
  'role': 'Software Developer',
  'description': 'Ms. Speer is a Software Developer on this project.  She ' + 
  'contributes significantly to both the research team and to the engineering team with her background ' + 
  'in statistics and programming.  This combination of skills allows her to understand the language ' +
  'of both groups and provides continuity over the course of the project in terms of the programming ' +
  'required to implement the coaching tool’s functionality.'
};



// Project Advisors
export const DF = {
  'name': 'Dale Farran, Ph.D.',
  'role': 'Former Project Affiliate, Early Childhood Content Expert',
  'job': 'Professor of Teaching and Learning',
  'affiliation': 'Vanderbilt University'
};
export const MF = {
  'name': 'Mary Fuhs, Ph.D.',
  'role': 'Director of Pilot Study',
  'job': 'Associate Professor of Psychology',
  'affiliation': 'University of Dayton'
};
export const PM = {
  'name': 'Percival Matthews, Ph.D.',
  'role': 'Advisory Board Member',
  'job': 'Assistant Professor of Educational Psychology',
  'affiliation': 'University of Wisconsin'
};
export const LM = {
  'name': 'Laura Moore, M.P.P.',
  'role': 'Advisory Board Member',
  'job': 'Deputy Director of Education',
  'affiliation': 'Obama Foundation'
};
export const SJW = {
  'name': 'Sandra Jo Wilson, Ph.D.',
  'role': 'Pilot Study Independent Evaluator',
  'job': 'Principal Associate, Social and Economic Policy',
  'affiliation': 'Abt Associates'
};
export const LW = {
  'name': 'Lisa Wiltshire, M.S.',
  'role': 'Advisory Board Member',
  'job': 'Policy Director',
  'affiliation': 'Tennesseans for Quality Early Education'
};
export const JW = {
  'name': 'Jules White, Ph.D.',
  'role': 'Innovation Garage Advisor',
  'job': 'Associate Professor of Computer Science',
  'affiliation': 'Vanderbilt University'
};
export const DS = {
  'name': 'Doug Schmidt, Ph.D.',
  'role': 'Innovation Garage Advisor',
  'job': 'Professor of Computer Science and Computer Engineering',
  'affiliation': 'Vanderbilt University'
};
export const DR = {
  'name': 'Deborah Wells Rowe, Ph.D.',
  'role': 'Early Literacy Expert',
  'job': 'Professor and Chair, Department of Teaching and Learning',
  'affiliation': 'Vanderbilt University'
};


// Centers Observation Checklists
export const Checklist: {
  MI: {
    ChildInstructions: string,
    TeacherInstructions: string,
    ChildBehaviors: Array<JSX.Element>,
    TeacherBehaviors: Array<JSX.Element>
  },
  AC: {
    ChildInstructions: string,
    TeacherInstructions: string,
    ChildBehaviors: Array<JSX.Element>,
    TeacherBehaviors: Array<JSX.Element>
  },
  SA: {
    ChildInstructions: string,
    TeacherInstructions: string,
    ChildBehaviors: Array<JSX.Element>,
    TeacherBehaviors: Array<JSX.Element>
  },
  LC: {
    ChildInstructions?: string,
    TeacherInstructions?: string,
    ChildBehaviors?: Array<JSX.Element>,
    TeacherBehaviors: Array<JSX.Element>
  },
  LI: {
    FoundationalChild: Array<JSX.Element>,
    FoundationalTeacher: Array<JSX.Element>,
    WritingChild: Array<JSX.Element>,
    WritingTeacher: Array<JSX.Element>,
    ReadingTeacher: Array<JSX.Element>,
    LanguageTeacher: Array<JSX.Element>
  }
} = {
  'MI': {
    'ChildInstructions': 'Select the types of math activities children are doing at this center.',
    'TeacherInstructions': 'Select the types of support for math the ' +
      'teacher is providing at this center.',
    'ChildBehaviors': [
      <div key={0}> <b>Counting and Numbers</b> </div>,
      <div key={1}> <b>Shapes and Spatial reasoning</b> </div>,
      <div key={2}> <b>Patterns</b> </div>,
      <div key={3}> <b>Measurement and Data</b> </div>
    ],
    'TeacherBehaviors': [
      <div key={0}> Using <b>math vocabulary</b> </div>,
      <div key={1}> <b>Asking questions</b> about math concepts </div>,
      <div key={2}> <b>Demonstrating</b> math concepts </div>,
      <div key={3}> Helping children use math to <b>problem solve</b> </div>
    ]
  },
  'AC': {
    'ChildInstructions': 'Select all the activities children are doing at this center.',
    'TeacherInstructions': 'Select the types of support for interactions the ' +
      'teacher is providing at this center.',
    'ChildBehaviors': [
      <div key={0}>
        Doing an <b>activity together</b> that DOES NOT have a predetermined sequence
      </div>,
      <div key={2}>
        <b>Playing a game</b> together with <b>formal rules</b>
      </div>,
      <div key={3}>
        Doing an <b>activity together</b> that <b>HAS a predetermined sequence</b>
      </div>
    ],
    'TeacherBehaviors': [
      <div key={0}> <b>Participating</b> in children’s play </div>,
      <div key={1}>
        Asking questions to <b>extend children’s thinking</b> {" "}
        about their shared activity
      </div>,
      <div key={2}>
        <b>Encouraging</b> children to <b>share</b>, <b>work</b>,
        or <b>interact</b> with each other
      </div>,
      <div key={3}>
        Helping children find the <b>words to communicate</b>
      </div>
    ]
  },
  'SA': {
    'ChildInstructions': 'Select all the activities children are doing at this center.',
    'TeacherInstructions': 'Select the types of support for sequential activities the ' +
      'teacher is providing at this center.',
    'ChildBehaviors': [
      <div key={0}>
        Using materials in a{" "}
        <b>step-by-step, predictable way</b>
        </div>,
      <div key={1}>
        <b>Drawing</b> recognizable images or <b>writing</b>{" "}
        names or messages (letters or letter-like forms)
      </div>,
      <div key={2}>
        Playing a game with <b>set rules</b> and/or {" "}
        <b>taking turns</b>
      </div>,
      <div key={3}>
        Speaking or acting according to a{" "}
        <b>pretend scenario</b> that follows a
        predictable plot
      </div>
    ],
    'TeacherBehaviors': [
      <div key={0}>
        <b>Helping</b> children do sequential activities
        with manipulatives or toys
      </div>,
      <div key={1}>
        Supporting children as they <b>draw</b> images
        or <b>write</b> messages
      </div>,
      <div key={2}>
        <b>Demonstrating the steps</b> to an activity
        or game
      </div>,
      <div key={3}>
        Supporting children as they <b>act out</b> 
        {" "} a dramatic play scenario or book
      </div>
    ]
  },
  'LC': {
    'TeacherBehaviors': [
      <div key={0}>At <b>eye-level</b> with children</div>,
      <div key={1}>Looks at children with a <b>positive</b> or <b>interested expression</b> to encourage child talk</div>,
      <div key={2}><b>Repeats</b> or <b>clarifies</b> children&apos;s comments</div>,
      <div key={3}>Asks <b>open-ended questions</b> to encourage conversation</div>,
      <div key={4}><b>Expands on children&apos;s play or talk</b> using questions or comments</div>,
      <div key={5}>Encourages children to <b>talk to peers</b></div>,
    ]
  },
  'LI': {
    'FoundationalChild': [
      <div key={0}>
        Using knowledge of <b>rhyming, alliteration, and/or syllables</b>
      </div>,
      <div key={1}>
        Using knowledge of <b>individual sounds (phonemes)</b>
      </div>,
      <div key={2}>
        Using <b>alphabet knowledge</b> and/or <b>word identification skills</b>
      </div>,
      <div key={3}>
        Using knowledge of <b>letter-sound correspondence</b>
      </div>,
      <div key={4}>
        <b>Inventing spellings or generating conventional spellings</b>
      </div>,
      <div key={5}>
        Using knowledge of <b>print concepts</b>
      </div>,
      <div key={6}>
        <b>Matching spoken words to print</b>
      </div>,
      <div key={7}>
        Using foundational skills for a <b>realistic reading and/or writing purpose</b>
        {" "} (e.g., demonstrating how to write a list)
      </div>,
      <div key={8}>
        <b>Responding to open-ended questions or prompts</b> about foundational skills
      </div>
    ],
    'FoundationalTeacher': [
      <div key={0}>
        Focusing on <b>rhyming, alliteration, and/or syllables</b>
      </div>,
      <div key={1}>
        Focusing on <b>individual sounds (phonemes)</b>
      </div>,
      <div key={2}>
        Focusing on <b>alphabet knowledge</b> and/or <b>word identification skills</b>
      </div>,
      <div key={3}>
        Focusing on <b>letter-sound correspondence</b>
      </div>,
      <div key={4}>
        <b>Supporting children&apos;s inventive spelling</b>
      </div>,
      <div key={5}>
        Focusing on <b>print concepts</b>
      </div>,
      <div key={6}>
        <b>Matching spoken words to print</b>
      </div>,
      <div key={7}>
        Using foundational skills for a <b>realistic reading and/or writing purpose</b>
        {" "} (e.g., demonstrating how to write a list)
      </div>,
      <div key={8}>
        Asking <b>open-ended questions or prompts</b> about foundational skills
      </div>,
      <div key={9}>
        Using <b>multi-modal instruction</b> (e.g., gestures/actions, objects, visuals)
      </div>
    ],
    'WritingChild': [
      <div key={0}>
        <b>Talks about the content or meaning</b> of the writing/drawing
      </div>,
      <div key={1}>
        <b>Draws to communicate meaning</b>
      </div>,
      <div key={2}>
        <b>Makes writing forms</b> (e.g., scribbles, letter-like forms, random letter strings, letters)
      </div>,
      <div key={3}>
        <b>Says aloud the message to be written</b>
      </div>,
      <div key={4}>
        <b>Writes</b> one or more <b>letters in their name</b>
      </div>,
      <div key={5}>
        Uses knowledge of the <b>alphabet and/or letter-sound correspondence</b>
      </div>,
      <div key={6}>
        <b>Invents spellings</b> or generates conventional spellings
      </div>,
      <div key={7}>
        <b>“Reads”</b> the message
      </div>
    ],
    'WritingTeacher': [
      <div key={0}>
        <b>Talks to children about the content or meaning</b> of the writing/drawing
      </div>,
      <div key={1}>
        <b>Invites children to write part of a message</b> (beyond their name)
      </div>,
      <div key={2}>
        <b>Writes a meaningful message</b> in front of children
      </div>,
      <div key={3}>
        <b>Demonstrates and talks about writing processes</b> (e.g., print concepts, handwriting)
      </div>,
      <div key={4}>
        <b>Invites children to write their name</b>
      </div>,
      <div key={5}>
        <b>Responds positively to all writing forms</b> (e.g., child scribbles, letter-like forms, letters)
      </div>,
      <div key={6}>
        Supports children’s <b>inventive and/or conventional spelling</b>
      </div>,
      <div key={7}>
        <b>Invites children to read the message</b> (e.g., “Read what you wrote to me!” or “What does that say?”)
      </div>
    ],
    'ReadingTeacher': [
      <div key={0}>
        <b>Defining and/or discussing vocabulary words</b>
      </div>,
      <div key={1}>
        <b>Discussing concepts related to a text </b> before, during,
        and/or after the book reading
      </div>,
      <div key={2}>
        Encouraging children to <b> retell, reenact, sequence, or summarize a
        text</b> or part of a text
      </div>,
      <div key={3}>
        <b>Relating the book to children&apos;s experiences</b> inside and/or
        outside the classroom
      </div>,
      <div key={4}>
        Encouraging children to <b>make connections to books that reflect
        their language and/or cultural backgrounds</b>
      </div>,
      <div key={5}>
        <b>Asking children open-ended questions/prompts </b> (e.g., to
        make predictions or inferences)
      </div>,
      <div key={6}>
        <b>Responding to children with follow-up questions and/or comments </b> to
        extend children&apos;s thinking
      </div>,
      <div key={7}>
        Encouraging children to <b>listen and respond to peer comments/ideas</b>
      </div>,
      <div key={8}>
        Facilitating discussion of <b>social issues around equity/fairness</b>
      </div>,
      <div key={9}>
        Using <b>multi-modal instruction</b> to support comprehension and/or
        word learning (e.g., props, gestures, sounds, visuals, book illustrations)
      </div>
    ],
    'LanguageTeacher': [
      <div key={0}>
        Discussing, defining, and/or promoting use of <b>advanced vocabulary and concepts</b>
      </div>,
      <div key={1}>
        Having a conversation with children about a <b>social-emotional topic</b>
      </div>,
      <div key={2}>
        Encouraging children to tell and/or act out <b>stories from experiences in their lives</b>
      </div>,
      <div key={3}>
        Encouraging children to <b>listen and respond to peer comments/ideas</b>
      </div>,
      <div key={4}>
        <b>Asking open-ended questions</b> or prompts to encourage conversation
      </div>,
      <div key={5}>
        Observing or using questions/prompts in order to <b>enter children&apos;s ongoing play or activity</b>
      </div>,
      <div key={6}>
        <b>Repeating or clarifying</b> children&apos;s comments
      </div>,
      <div key={7}>
        Responding to children with <b>follow-up questions and/or comments</b> to extend their thinking
      </div>
    ]
  }
}

// Coaching Questions
export const CoachingQuestions = {
  'Transition': {
    'LineQuestions': [
      {
        'name': "TransitionPanel1A",
        'title': "Line-up Process",
        'text': [
          {
            "id": "jWowLhAuCzkmZ78o9k7WU",
            "label": "How do you like to transition children from " +
            "where they are in the classroom to the line-up area?"
          },
          {
            "id": "WANNryO-v0sV0d8Pa9NIW",
            "label": "Do you prefer to line them up individually or send them in groups?"
          }
        ]
      },
      {
        'name': "TransitionPanel1B",
        'title': "Child Engagement",
        'text': [
          {
            "id": "uxbqrhwnQ8WfEdV1qCQCm",
            "label": "Talk about any types of activities that help children transition during the line-up process."
          },
          {
            "id": "GuOaC7NLjtDIbHaqY9bFJ",
            "label": "How do you all decide on what transition activities to do with children?"
          }
        ]
      },
      {
        'name': "TransitionPanel1C",
        'title': "Causes for Waiting",
        'text': [
          {
            "id": "fC82MI_luHqoevrtrotJO",
            "label": "Talk about what children do when they get in line. Do they have designated spots to stand on?"
          },
          {
            "id": "rQC36BU4k4RtoVJ8baRPF",
            "label": "Do certain children have more difficulty lining up? What might help them?"
          }
        ]
      }
    ],
    'TravelingQuestions': [
      {
        'name': "TransitionPanel2A",
        'title': "Travel Destinations",
        'text': [
          {
            "id": "rAub1z0yh_1IVLl9XhvE8",
            "label": "Let's think about the transitions that children make outside the classroom. " +
            "What's outside of your control and what do you have some control over?"
          },
          {
            "id": "-M61KSZNY-4si5VjkKmAh",
            "label": "Example: We have to walk to the playground on the other side of the building, but we could " +
            "get creative about ways to reduce time spent on bathroom breaks in the hallway."
          }
        ]
      },
      {
        'name': "TransitionPanel2B",
        'title': "Practice and Positive Reinforcement",
        'text':  [
          {
            "id": "7cDrozXGnOQNSEjvxSWIn",
            "label": "Talk about how you reinforce children's successes during transitions." +
            "What's the most effective way you encourage them?"
          }
        ]
      },
      {
        'name': "TransitionPanel2C",
        'title': "Revisiting Routines and Expectations",
        'text': [
          {
            "id": "bsEZ1RNM0MbFr8BsxKNDh",
            "label": "Talk about some of the transition skills children may need to relearn or practice." +
            "What have you been noticing lately about their challenges during " +
            "transitions outside the classroom?"
          }
        ]
      },
      {
        'name': "TransitionPanel2D",
        'title': "Individualized Support",
        'text': [
          {
            "id": "5hs7-6WF9biN2eZ4R4fOh",
            "label": "What are some strategies that help children " +
            "with challenging behavior during long transitions outside the classroom?" +
            "What do children with challenging behavior need to be successful? What motivates " +
            "them at other times during the day?"
          }
        ]
      },
      {
        'name': "TransitionPanel2E",
        'title': "Child Engagement",
        'text': [
          {
            "id": "bQeNty8zsUYmS7rlUhYvD",
            "label": "How do you engage children during walks to other parts of the school building " +
            "(e.g., pretending to walk like an animal)?"
          },
          {
            "id": "IbGzHTXteycOMsXheKcpY",
            "label": "Since you can't get around walking that way to the playground, talk about " + 
            "strategies you've used in the past to keep the children engaged. What works?"
          }
        ]
      }
    ],
    'WaitingQuestions': [
      {
        'name': "TransitionPanel3A",
        'title': "Preparation of Materials",
        'text': [
          {
            "id": "LBWUJ1_kQEnlGdxKQM_jx",
            "label": "Talk about the best time of the day that you've found for gathering materials for " +
            "lessons and activities."
          },
          {
            "id": "P-8zyTbq0cbFS0V5o7PMg",
            "label": "Are there challenging times as well?"
          }
        ]
      },
      {
        'name': "TransitionPanel3B",
        'title': "Teacher Teamwork",
        'text': [
          {
            "id": "VDPSZvDpitCWQdgFerzkB",
            "label": "How do you and your co-teacher help each other with lesson prep and organization? " +
            "In your experience, what systems seem to work best?"
          },
          {
            "id": "U17EEzz9p-sPN5fDIPDrp",
            "label": "If you could try something new around getting ready for a lesson, what would it be?"
          }
        ]
      },
      {
        'name': "TransitionPanel3C",
        'title': "Child Engagement",
        'text': [
          {
            "id": "QVdzDaRTNimxrOdERQTvt",
            "label": "Talk about the times of the day that you feel the most organized and prepared."
          },
          {
            "id": "v-mKJETl5UhoQZPi8-MCo",
            "label": "What are the differences in children's behavior when you feel prepared?"
          }
        ]
      },
      {
        'name': "TransitionPanel3D",
        'title': "Classroom Organization",
        'text': [
          {
            "id": "drG7csZVm09sUo4-P2stY",
            "label": "Talk about how the classroom environment and layout affect children's waiting time."
          },
          {
            "id": "nKqYCsA_YjlCr9n2McIeU",
            "label": "Where are materials for different activities stored and how quickly can children access materials?"
          }
        ]
      }
    ],
    'RoutinesQuestions': [
      {
        'name': "TransitionPanel4A",
        'title': "Types of Routines",
        'text': [
          {
            "id": "DvIcMFHXMrsxtbgQms0Es",
            "label": "Talk about all the different classroom routines that happen each day. " +
            "Which types are more challenging for children? Why might that be?"
          },
          {
            "id": "qkdLmS-DW79SFPTGgq1w9",
            "label": "Are there one or two classroom routines that you want to focus on? " +
            "On a perfect day, what might those routines look like?"
          }
        ]
      },
      {
        'name': "TransitionPanel4B",
        'title': "Classroom Organization",
        'text': [
          {
            "id": "6SZdYsnK9srB2lW_prcGZ",
            "label": "Talk about the relationship between classroom environment/layout and children's transition time."
          },
          {
            "id": "yuXbBb3UyxI64cTgCgFet",
            "label": "Do children spend too much time cleaning up materials? What helps them know where to " +
            "put materials? How does the amount of materials affect clean-up time?"
          },
          {
            "id": "D2hZgTi-qRVYtnciilGn8",
            "label": "What visuals or other strategies help them during classroom routines?"
          }
        ]
      },
      {
        'name': "TransitionPanel4C",
        'title': "Centers",
        'text': [
          {
            "id": "dv1VpBd6LhZLW7EFO7YiY",
            "label": "Talk about the routines and systems that help children choose centers " +
            "and move between centers. What's going well this year?"
          },
          {
            "id": "uLRcfgy5upr1SBY8-8FT-",
            "label": "How are children doing with a) choosing their first center, " +
            "b) leaving one center and going to another one, c) sticking with an activity once they begin?"
          }
        ]
      },
      {
        'name': "TransitionPanel4D",
        'title': "Teacher Teamwork",
        'text': [
          {
            "id": "FvJOc9-PNSvRfWVZgMrNB",
            "label": "Talk about how you and your co-teacher work together to make transitions go smoothly."
          },
          {
            "id": "PfWocjOMG4zQ17CEL_kB2",
            "label": "Do you have designated roles for transition times throughout the day?"
          }
        ]
      },
      {
        'name': "TransitionPanel4E",
        'title': "Number of Transitions",
        'text': [
          {
            "id": "rpJaZDeMHm7RpjRuDMHzP",
            "label": "If you could get rid of one transition, what would it be? Is there a " +
            "time of day when you feel like you're constantly reminding children where they should be?"
          }, 
          {
            "id": "RLJH7mKJ341-BHcUYH4vE",
            "label": "Look at the daily schedule for any transitions that could be changed or removed."
          }
        ]
      }
    ],
    'BehaviorQuestions': [
      {
        'name': "TransitionPanel5A",
        'title': "Communicating Expectations",
        'text': [
          {
            "id": "XyS1jeKZnjSUY8ApjQPst",
            "label": "Talk about the types of strategies (verbal, visual, gesture) you like to use to " +
            "communicate behavior expectations before, during, and/or after transitions?"
          },
          {
            "id": "Mi9R05RGHOk9HNwlVvsh9",
            "label": "Do children know where to go and what to do during a transition? How do they know?"
          }
        ]
      },
      {
        'name': "TransitionPanel5B",
        'title': "Individualized Support",
        'text': [
          {
            "id": "aVJGW524prP4OI-InLFg7",
            "label": "Talk about children who might benefit from individualized strategies to help them during transitions."
          },
          {
            "id": "48radvMvwHJWYw-peTP0N",
            "label": "What has worked in the past? What have you been thinking about trying?"
          }
        ]
      },
      {
        'name': "TransitionPanel5C",
        'title': "Teacher Teamwork",
        'text': [
          {
            "id": "FyoovmhXjjs66u2_yLJYU",
            "label": "Talk about how you and the co-teacher work together to teach and reinforce behavior " +
            "expectations during transitions. What has worked? What felt less effective?"
          },
          {
            "id": "DwWFgx_YQYqGEsr_RB5UU",
            "label": "How do you decide which member of the teaching team leads the different transitions " +
            "across the day?"
          }
        ]
      },
      {
        'name': "TransitionPanel5D",
        'title': "Reinforcing Behaviors",
        'text': [
          {
            "id": "t73xHJR-9TLbPZI6rzq-s",
            "label": "Talk about how you let children know when they do a transition well. " +
            "What are you looking for so that you can give them positive reinforcement?"
          },
          {
            "id": "WJZ1wuHGu65FvoxaeME4L",
            "label": "How do you respond when they don't meet behavior expectations during transitions?"
          }
        ]
      },
      {
        'name': "TransitionPanel5E",
        'title': "Consistency of Routines",
        'text': [
          {
            "id": "ACr4p6f5D-iaa4CfXJ8WO",
            "label": "Talk about the challenges you and/or children experience during transitions."
          },
          {
            "id": "DB4B5iQHOv7eey7w6nPzd",
            "label": "Which part of the transition is the most challenging for children? Why might that be?"
          }
        ]
      }
    ]
  },
  'Climate': {
    'Approvals': [
      {
        'name': 'ClimatePanel1A',
        'title': 'Positive Reinforcement',
        'text': [
          {
            "id": "kpxMugaz4KnX3byd0h_r9",
            "label": 'Talk about the types of child behaviors you typically look for and praise.'
          },
          {
            "id": "QhpYbfCgYsUbRBizFT7Ii",
            "label": 'What effect does your praise have on children and their learning?'
          }
        ]
      },
      {
        'name': 'ClimatePanel1B',
        'title': 'Time of Day',
        'text': [
          {
            "id": "lrbepZmdy3MH2YeYL2CpA",
            "label": 'Talk about times during your schedule (whole group, center time, etc.) ' +
            'that you use behavior approving as a strategy for behavior management.'
          },
          {
            "id": "eRnowpdXFEUiDHSxVKnqI",
            "label": 'How does it work in your experience?'
          }
        ]
      },
      {
        'name': 'ClimatePanel1C',
        'title': 'Effort and Ability',
        'text': [
          {
            "id": "0S2c2Bcy737SeYNtBc-1i",
            "label": 'Talk about the behaviors you look for when you want to praise children\'s behavior.'
          },
          {
            "id": "y4Lf77AcD_0IGt2tofFiB",
            "label": 'When do you decide to praise children\'s effort versus their skill level?'
          }
        ]
      },
      {
        'name': 'ClimatePanel1D',
        'title': 'Specific Children',
        'text': [
          {
            "id": "j6_WTzPdQmKoLKyNIQveS",
            "label": 'Talk about how you use praise with different children throughout the day.'
          },
          {
            "id": "0RpoJ6l0WUeoscSTlc2j_",
            "label": 'Are there children that you worry about--those kids who may not seek out attention?'
          }
        ]
      },
      {
        'name': 'ClimatePanel1E',
        'title': 'Challenging Behavior',
        'text': [
          {
            "id": "JAuTjuCuPrK3d2Qu3fv2l",
            "label": 'It\'s sometimes difficult to find moments to praise children with challenging behavior--' +
            'how do you find ways to praise even the smallest accomplishments?'
          },
          {
            "id": "bcC6nRVd0D_ReztVMlnC7",
            "label": 'How do you see past challenging behaviors and give all children positive attention?'
          }
        ]
      },
    ],
    'Redirections': [
      {
        'name': 'ClimatePanel2A',
        'title': 'Activity Type',
        'text': [
          {
            "id": "-cho6Qrwd-18gvxFfLwsy",
            "label": 'Are there certain activities during which you feel like you\'re redirecting ' +
            'the children more often? Why might that be?'
          },
          {
            "id": "wNC0x2T6SFcuag0J5MUEi",
            "label": 'Do you feel like your redirections are over smaller or more serious issues?'
          }
        ]
      },
      {
        'name': 'ClimatePanel2B',
        'title': 'Time of Day',
        'text': [
          {
            "id": "LltpG6ekvfFyQeVbglrob",
            "label": 'Think about a time of day in which children really know the classroom ' +
            'routines. What strategies did you use to get them to this point?'
          },
          {
            "id": "j8K8c30FxHKHM3CNIVDFD",
            "label": 'Talk about how those strategies could help them learn routines during other ' + 
            'times of the day that feel more stressful.'
          }
        ]
      },
      {
        'name': 'ClimatePanel2C',
        'title': 'Revisiting Expectations',
        'text': [
          {
            "id": "mb-Rmc0q7xDAzQS0ZtqF3",
            "label": 'Are there any redirections you give to children that you feel are repetitive?'
          },
          {
            "id": "ProcvwjTu5Kf0ECnHDKXX",
            "label": 'Talk about some strategies you could use before activities that are challenging ' +
            'for children (modeling what you want the children to do, asking them to practice, ' +
            'then giving specific praise, etc.)?'
          }
        ]
      },
      {
        'name': 'ClimatePanel2D',
        'title': 'Specific Children',
        'text': [
          {
            "id": "JLJvZNOCfq8-Ls7GBjqfU",
            "label": 'Talk about children who might benefit from more strategies (like visuals, ' +
            'a buddy system, or small group/1:1 teaching) to help them with behavior expectations.'
          },
          {
            "id": "Beh-6FgUpOCaErualb9OL",
            "label": 'Do certain children require more redirections than others? What are their challenges?'
          },
          {
            "id": "KQPNplDFn3vMJqmtlHvay",
            "label": 'In your experience, what strategies might suppport them?'
          }
        ]
      },
    ],
    'Disapprovals': [
      {
        'name': 'ClimatePanel3A',
        'title': 'Activity Type',
        'text': [
          {
            "id": "iWHS48g5Zgsv9SKKoj026",
            "label": 'Think about the type of activity when disapprovals are more frequent.'
          },
          {
            "id": "hfOKbWbT5c02wK8kL71F_",
            "label": 'What might be the cause of children\'s behaviors during whole group, small ' +
            'group, or centers that lead to disapprovals?'
          },
        ]
      },
      {
        'name': 'ClimatePanel3B',
        'title': 'Time of Day',
        'text': [
          {
            "id": "-OPZ_D4GcYSXCLB9FCKZu",
            "label": 'Talk about times of day (arrival, after lunch, dismissal, etc.) that are ' +
            'more challenging for children.'
          },
          {
            "id": "8hFK4F2TSRICR6Ru99IYa",
            "label": 'What strategies have you used that help children during these times of day?'
          }
        ]
      },
      {
        'name': 'ClimatePanel3C',
        'title': 'Challenging Behavior',
        'text': [
          {
            "id": "Zx1Ndmx90L6aLPHs6QXf1",
            "label": 'We all know of child behaviors that get under our skin and lead to anger and irritation. ' +
            'How can we reframe those behaviors?'
          },
          {
            "id": "sQdNmbQGrwZrpz8gjFhrs",
            "label": 'Example: You might reframe hitting with "perhaps the child hits frequently because he ' +
            'wants attention from peers but doesn\'t know how to get it any other way."'
          },
          {
            "id": "fZ76jySrNZllrl-DLqb7L",
            "label": 'What can we do to proactively teach children the skills that they need to reduce ' +
            'these behaviors?'
          }
        ]
      },
    ]
  },
  'Math' : {
    'CountingAndNumbers': [
      {
        'name': 'MathPanel1A',
        'title': 'Math Curriculum and Standards',
        'text': [
          {
            "id": "abMk1TDGJG2dV7v1EU0Ln",
            "label": 'Which resources are the most helpful for planning math activities?'
          },
          {
            "id": "JRANF-5LrGbeUgWSbZdy-",
            "label": 'Which resources are the most helpful for describing what math ' +
            'concepts children are supposed to learn about in preschool?'
          },
        ]
      },
      {
        'name': 'MathPanel1B',
        'title': 'Materials',
        'text': [
          {
            "id": "bA4YAoMAXHbZR0eKtJlH2",
            "label": 'Talk about the variety of math materials at each center in the classroom.'
          },
          {
            "id": "KMGs8RgWzf6fccdpXJWFp",
            "label": 'How do children use math materials--independently, in small groups, ' +
            'with teacher support?'
          }
        ]
      },
      {
        'name': 'MathPanel1C',
        'title': 'Counting Collections',
        'text': [
          {
            "id": "7s7HKk5vH-g-QRZoLjX7k",
            "label": 'Talk about opportunities that children have for counting collections ' +
            'of objects.'
          }, 
          {
            "id": "q6k5tVQBchIAu2FRTGycg",
            "label": 'How does counting different sets of objects help children understand ' +
            'quantity?'
          },
          {
            "id": "e9LaTqft_FHrRRA-H1JTR",
            "label": 'How can observing children\'s counting strategies help you as the ' +
            'teacher challenge them to use more advanced strategies?'
          }
        ]
      },
      {
        'name': 'MathPanel1D',
        'title': 'Comparing Quantities',
        'text': [
          {
            "id": "cLpTQG6VLfpUqbqnvheFm",
            "label": 'Talk about how children compare two or more collections or sets of objects.'
          },
          {
            "id": "4mFCnvSmDeTGrFHjxUKTx",
            "label": 'What are some effective methods and activities for getting children to ' + 
            'talk about their comparisons and to use math vocabulary?'
          },
        ]
      },
      {
        'name': 'MathPanel1E',
        'title': 'Connecting Numerals to Counted Objects',
        'text': [
          {
            "id": "o1f_ljQJUyNqWbyQG8GHL",
            "label": 'What are some activities and materials that help children understand ' +
            'written numerals?'
          }
        ]
      },
    ],
    'MeasurementAndData': [
      {
        'name': 'MathPanel2A',
        'title': 'Size, Length, and Weight',
        'text': [
          {
            "id": "5wquVFyEiGkcaf6Q1TulR",
            "label": 'Talk about the different ways children can practice measuring ' +
            'skills in the classroom. Are there materials for measuring ' +
            'size, length, and weight?'
          },
          {
            "id": "atbxGT-OmhSPdQxiQ6_8m",
            "label": 'How do children use non-standard tools (e.g., cubes, plastic ' +
            'chains, yarn) and standard tools (e.g., rulers, balance scales, ' +
            'measuring cups) to measure materials?'
          },
          {
            "id": "a8plHA3YhjLX_G8HGL3af",
            "label": 'When do children talk most about comparing and measuring things? ' +
            'How can you as the teacher build on their curiosity?'
          }
        ]
      },
      {
        'name': 'MathPanel2B',
        'title': 'Estimating',
        'text': [
          {
            "id": "ocFwbMtPKdOhib6wdrB7b",
            "label": 'Talk about the opportunities that children have for estimating ' +
            'measurement (e.g., making an informed guess about an object\'s ' +
            'length or weight).'
          },
          {
            "id": "q2gDB6CooIlbWBqVyrZl0",
            "label": 'What activities might motivate children to estimate measurements? ' +
            'Are they curious to see if their estimations are close to ' +
            'measurements using standard tools?'
          }
        ]
      },
      {
        'name': 'MathPanel2C',
        'title': 'Understanding Time',
        'text': [
          {
            "id": "9JCFhQy2g2evfUdm1hrlY",
            "label": 'How do children show that they are beginning to understand ' +
            'concepts about time?'
          }, 
          {
            "id": "YGbQLwA1xVE7NGEXZqtcX",
            "label": 'What materials support children\'s thinking about time, such as ' +
            'visual schedules or sand timers? How do you use these?'
          },
        ]
      },
      {
        'name': 'MathPanel2D',
        'title': 'Working with Data',
        'text': [
          {
            "id": "mjqe07TyHO5Hye4JWWLWS",
            "label": 'What types of data representations, or graphs (that use physical ' +
            'objects, pictures, and/or symbols) do children interact with ' + 
            'in the classroom?'
          },
          {
            "id": "SDAzxfkcDAPqDg-F8zpYo",
            "label": 'What kinds of opportunities do children have for coming up with ' + 
            'their own questions, collecting data, and making sense of the data?'
          },
        ]
      }
    ],
    'Patterns': [
      {
        'name': 'MathPanel3A',
        'title': 'Recognizing Patterns',
        'text': [
          {
            "id": "nkavRHZgIJcbH3X_h0DYR",
            "label": 'Talk about the different ways that children notice patterns ' +
            'in their school environment (music, clapping, blocks)?'
          },
          {
            "id": "0Ib4mkAGJQJJ0AzC1Kan0",
            "label": 'What books in your library might support children\'s pattern ' +
            'recognition?'
          }
        ]
      },
      {
        'name': 'MathPanel3B',
        'title': 'Creating Patterns',
        'text': [
          {
            "id": "eod2xaTaUM0gAcp8ALW8W",
            "label": 'What materials encourage children to create their own patterns? ' +
            'How so?'
          },
          {
            "id": "CzjXNhr3Trgq2BYI83SFu",
            "label": 'What kinds of support do children need to begin creating patterns?'
          }
        ]
      },
      {
        'name': 'MathPanel3C',
        'title': 'Extending Patterns',
        'text': [
          {
            "id": "lTT4iAatTEZwsUCWqIedq",
            "label": 'What are some strategies for challenging children to extend ' +
            'beyond ABAB patterns, such as translating patterns from one ' +
            'material to another?'
          },
          {
            "id": "Y1ul16Bt7q8pC5050h1n1",
            "label": 'What kinds of experiences do children have with "growing ' +
            'patterns," or patterns that grow by a specific amount (e.g., ' +
            'a series of towers that grow by 2 blocks each time)?'
          }
        ]
      },
    ],
    'ShapesAndSpatialReasoning': [
      {
        'name': 'MathPanel4A',
        'title': 'Identifying Shapes',
        'text': [
          {
            "id": "mllBm20OYAANmQji5Qduy",
            "label": 'Talk about the ways that children notice and identify shapes ' +
            'using classroom materials.'
          },
          {
            "id": "IWzzI6F8PV0Si7qkP9Gpt",
            "label": 'What are some good activities for helping children understand ' +
            'the unique characteristics of different shapes (e.g., all ' +
            'triangles have 3 sides).'
          }
        ]
      },
      {
        'name': 'MathPanel4B',
        'title': 'Manipulating Shapes',
        'text': [
          {
            "id": "PygSehZG9Hanbpl5Oj7QT",
            "label": 'What types of materials encourage children to build and take ' +
            'apart shapes?'
          },
          {
            "id": "b5Yx2B7vUpV_08FJb09h-",
            "label": 'What have you noticed about children\'s learning when they ' +
            'construct their own shapes versus when they identify existing ' +
            'shapes?'
          }
        ]
      },
      {
        'name': 'MathPanel4C',
        'title': 'Using Positional Words',
        'text': [
          {
            "id": "Kru5n21amk3z4LhvBdwu0",
            "label": 'Talk about strategies for modeling positional words in your ' +
            'conversations with children.'
          },
          {
            "id": "gWPyJCqvZaNFlzqettg2v",
            "label": 'How might books, physical activities, and giving directions ' +
            'provide opportunities for teaching positional words?'
          }
        ]
      },
      {
        'name': 'MathPanel4D',
        'title': 'Working with Maps',
        'text': [
          {
            "id": "rqQkAPx6lqle5hLVFvyiG",
            "label": 'How might children begin to use simple maps (e.g., looking ' +
            'at a map of their playground or classroom)?'
          },
          {
            "id": "Y7m8cWs6m-3K-5bCdfQSA",
            "label": 'What are some ways that maps could be used to enhance ' +
            'children\'s play (e.g., drawing a diagram of a block structure ' +
            'they plan to build)?'
          }
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'MathPanel5A',
        'title': 'Using Math Vocabulary',
        'text': [
          {
            "id": "gA6qJjdhRBwr7M-AyFM9S",
            "label": 'Talk about the benefits of using math vocabulary during ' +
            'interactions with children.'
          },
          {
            "id": "tT5p2LUL6_5kIqkyMpa_n",
            "label": 'What types of activities and interactions encourage children ' +
            'to use math vocabulary?'
          }
        ]
      },
      {
        'name': 'MathPanel5B',
        'title': 'Asking Questions About Math',
        'text': [
          {
            "id": "XpMQq8xBd_8MY2NDFgYdP",
            "label": 'When do you ask questions to check for children\'s understanding? ' +
            'How does it help your teaching?'
          },
          {
            "id": "us07STYfkLdTEs-H-3RNU",
            "label": 'What kinds of questions help children explain their thinking ' +
            '(e.g., "Why do you think...?") How do they respond?'
          }
        ]
      },
      {
        'name': 'MathPanel5C',
        'title': 'Demonstrating Math Concepts',
        'text': [
          {
            "id": "_3pNILYHUfjddcQYDcglF",
            "label": 'What math concepts or skills are helpful for you as the teacher ' +
            'to demonstrate or model for children?'
          },
          {
            "id": "KjCYIOTk9xoSe-_cJfgmE",
            "label": 'What are some important things to consider before demonstrating ' +
            'math to children, including what to say as you model, types of ' +
            'materials, and group size, etc.?'
          }
        ]
      },
      {
        'name': 'MathPanel5D',
        'title': 'Building on Children\'s Play',
        'text': [
          {
            "id": "Gy14-yTtQUxmmx-iR5h6E",
            "label": 'Talk about the benefits of using children\'s play to teach math ' +
            'concepts.'
          },
          {
            "id": "5ZjgSJBh4LxyTB6E1aNRI",
            "label": 'Think about children\'s favorite center activities and brainstorm ' +
            'ways to highlight math concepts in ways that enriches their play.'
          }
        ]
      },
      {
        'name': 'MathPanel5E',
        'title': 'Planning for Math',
        'text': [
          {
            "id": "6ci_qAEf-QTerwbIqTs9f",
            "label": 'Talk about how you plan for math activities. What questions do you ' +
            'think about before teaching (e.g., What do children already know)?'
          },
          {
            "id": "DQwgI1WIdttkRIeFGmmsr",
            "label": 'What supports benefit dual language learners? What roles do ' +
            'gesture, physical actions, home language, and family partnerships ' +
            'play in your math instruction?'
          }
        ]
      },
    ],
  },
  'Instruction' : {
    'highLevelQuestions': [
      {
        'name': 'InstructionPanel1A',
        'title': 'Explain Thinking',
        'text': [
          {
            "id": "tKYIOdqp0g7VDjXUGQMkr",
            "label": 'Talk about the opportunities your students have to explain their thinking.'
          },
          {
            "id": "8UbfQ2u-W0ciBzl1K2uQM",
            "label": 'What supports help your students who struggle at first when ' +
            'responding to how and why questions?'
          },
        ]
      },
      {
        'name': 'InstructionPanel1B',
        'title': 'Make a Prediction',
        'text': [
          {
            "id": "AlpZXMybv7KXWcpnamV-M",
            "label": 'What types of activities give children in your classroom opportunities ' +
            'to make predictions?'
          },
          {
            "id": "95k7zm-tz37jY3uQloKim",
            "label": 'Let’s think about the children’s favorite units - ' +
            'what could they make predictions about using context clues or prior knowledge?'
          }
        ]
      },
      {
        'name': 'InstructionPanel1C',
        'title': 'Connecting Content to Experience',
        'text': [
          {
            "id": "nq0dPjWkc5oCLr8z6fJ-3",
            "label": 'When do your students tend to make connections between academic content and ' +
            'their lives?  During book reading, center time, or science, etc.?'
          }, 
          {
            "id": "CfFS-cz-etosFZaL27gkC",
            "label": 'Talk about the kinds of connections or comparisons to personal experience ' +
            'that might deepen their understanding of the academic content.'
          }
        ]
      },
      {
        'name': 'InstructionPanel1D',
        'title': 'Reflect on Activities',
        'text': [
          {
            "id": "0iL5b2T6hz6MClOw0aI4D",
            "label": 'Talk about ways you could build in time for children to reflect on parts of activities or lessons.'
          },
          {
            "id": "LZhAjUci8eiCzu_WiTlvp",
            "label": 'Which lessons or center activities would go well with asking children to reflect? Why ' + 
            'might that be?'
          },
        ]
      },
    ],
    /* 'followUp': [
      {
        'name': 'InstructionPanel2A',
        'title': 'Ask Follow-up Questions',
        'text': [
          'Talk about how you decide what follow-up questions to ask children.',
          'What kinds of hints do you give children when they have trouble ' +
          'responding to high-level questions?',
          'Talk about how you use wait time after asking a question. What are barriers to using ' +
          'wait time?'
        ]
      },
      {
        'name': 'InstructionPanel2B',
        'title': 'Expand on Children’s Ideas',
        'text': [
          'What helps you decide how to expand on children’s responses?', 
          'Talk about how your learning goals for children influence ' +
          'your conversations.',
          'What do you notice when you let children guide the conversation?'
        ]
      },
      {
        'name': 'InstructionPanel2C',
        'title': 'Listen to Children',
        'text': [
          'Talk about times during the day when you are able to have more lengthy conversations ' +
          'with children.', 
          'Talk about common obstacles to having multiple back-and-forth exchanges with ' +
          'children and about some initial solutions that might help.',
        ]
      },
    
    ], */
    'lowLevel': [
      {
        'name': 'InstructionPanel2A',
        'title': 'Encouraging Student Participation',
        'text': [
          {
            "id": "vLzEcxrV8O_-CjmugCldt",
            "label": 'How do dual-language learners and/or children with language delays in your ' + 
            'classroom benefit from low-level questions that have 1 or 2 - word answers?'
          },
          {
            "id": "RrMDqMhCf1-KRpEVA_CXQ",
            "label": 'Talk about the successes you have had using low-level questions to help children ' +
            'participate in a conversation.'
          },    
          {
              "id": "xpaVuKlud0aRCagkQrKHN",
              "label": 'Over time, how do children in your classroom develop in their participation? ' +
            'Talk about how you as the teacher support their ability to participate.'
            } 
        ]
      },
      {
        'name': 'InstructionPanel2B',
        'title': 'Making a Bridge between Low- and High-Level Questions',
        'text': [
          {
            "id": "Vi8tmfbOdggT3OHYk3SE3",
            "label": 'Talk about how you have used low-level questions as a springboard for asking ' +
            'high-level questions.'
          },
          {
            "id": "cexZG0pvjjy-P0-IGM5KS",
            "label": 'How do you plan questions to ask?  Is there a mix of question types?'
          },
          {
              "id": "kaAD4gBNBCzArY14ul7am",
              "label": 'Talk about how your students respond differently to low versus high-level questions.'
            }
        ]
      },
      {
        'name': 'InstructionPanel2C',
        'title': 'Building on Specific Skills',
        'text': [
          {
            "id": "vtrFnurvhrwZaumaZFqRc",
            "label": 'Once children have learned a skill like the name and sound of a letter or how to ' +
            'count objects, talk about how you get them to think more deeply about the concept?'
          },
        ]
      },
    ],
    'highLevelInstruction': [
      {
        'name': 'InstructionPanel3A',
        'title': 'Math',
        'text': [
          {
            "id": "3ypBuMk5EhIbn0U7HYo1p",
            "label": 'Talk about how your students think differently when answering low-level questions ' +
            'like, "How many erasers do you have?" and high-level questions like, "Tell me what ' +
            'you mean when you say the groups of erasers are the same."'
          },
          {
            "id": "sh-KS8XlaS6BCxi9CsjRs",
            "label": 'What have you noticed about your students’ responses and actions when you ' +
            'ask high-level math questions? '
          }  
        ]
      },
      {
        'name': 'InstructionPanel3B',
        'title': 'Science and Discovery',
        'text': [
          {
            "id": "nNW5FjbBZ9LvLTRWsdJU_",
            "label": 'Talk about how you integrate science into other activities (e.g. read-alouds, ' +
            'morning meeting, centers, etc.).'
          },
          {
            "id": "EJdwLoXnQptSJvHRWV4c4",
            "label": 'Talk about how you build on your students’ natural curiosity about science ' +
            'topics. What kinds of questions do you tend to ask?'
          },
          {
            "id": "4keUWaFDJnU_qwQWaup2E",
            "label": 'Once your students have learned a science fact (food decomposes over time), ' +
            'how might you encourage them to think inferentially (why do some conditions ' +
            'speed up or slow down decomposition)?'
          }
        ]
      },
      {
        'name': 'InstructionPanel3C',
        'title': 'Book Reading',
        'text': [
          {
            "id": "jNdCgytC1a2_hwB1Ujmml",
            "label": 'Talk about where you like to focus your questions during ' +
            'story time- on the plot, character feelings and motivations, ' +
            'vocabulary, making predictions, etc.?'
          },
          {
            "id": "rBnajBA96j7xWO-eDA1Lq",
            "label": 'What kinds of questions would require children in your classroom to make ' +
            'inferences instead of retelling the story?'
          },
          {
            "id": "arDMMG-5sun8_u08XJRID",
            "label": 'Talk about how children think differently when answering low-level questions like, ' +
            '"What did the hen do with the bread?" and high-level questions like, ' +
            '"If you were the little red hen, what would you have done with the bread? Why?"'
          }
        ]
      },
      {
        'name': 'InstructionPanel3D',
        'title': 'Vocabulary',
        'text': [
          {
            "id": "hj3QdQiYByG47E2o1ZLx1",
            "label": 'Talk about how you select words to teach. What strategies in your classroom ' +
            'help children learn new words?'
          },
          {
            "id": "Yt90VmXn92zM8UqTaEkk6",
            "label": 'After children in your classroom learn a new word, talk about how you get them to ' +
            'think more deeply about the word. Is it similar to other words they know? Can they ' +
            'act the word out?'
          },
          {
            "id": "GvYLOvKcx92x1010T0Ldg",
            "label": 'When children first learn a new word, they may not be able to use it yet. Talk ' +
            'about activities or questions that help children in your classroom use words in ' +
            'conversation.'
          }
        ]
      },
      {
        'name': 'InstructionPanel3E',
        'title': ' Writing',
        'text': [
          {
            "id": "zRpft1-fpcLn2fvUCvOpV",
            "label": 'Talk about opportunities your students have for composing their own messages.'
          },         
          {
            "id": "WwY0gWluXeU-8yNFx2Ypz",
            "label": 'Talk about how you encourage your students to write for real-world reasons ' +
            'like taking a pizza order, making a zoo diagram in the blocks center, ' +
            'or making observations at the science center.'
          }
        ]
      },
    ],
  },
  'Listening': {
    'Listening': [
      {
        'name': 'ListeningPanel1A',
        'title': 'Teacher Positions',
        'text': [
          {
            "id": "kmTDmahNFQ15hzwRiuadN",
            "label": 'Talk about how you position your body when interacting with children.'
          },
          {
            "id": "pGRYCrO3k0cWacf4CNEQR",
            "label": 'Talk about how you balance your time between interacting with children, ' +
            'monitoring children, and/or doing managerial tasks during centers, ' +
            'small groups, or mealtimes.'
          }
        ]
      },
      {
        'name': 'ListeningPanel1B',
        'title': 'Interest in Child Talk',
        'text': [
          {
            "id": "7Fu16HxmZGhJF-ZzRUGt4",
            "label": 'Talk about how you show children that you are interested in what ' +
            'they say (with facial expressions, smiling, nodding, etc.).'
          },
          {
            "id": "C_lninrAxdwjccV2U958D",
            "label": 'What do you notice happening when adults give children wait time, ' +
            'or time to respond, during conversations?'
          }
        ]
      }
    ],
    'Supporting': [
      {
        'name': 'ListeningPanel2A',
        'title': 'Repeating and Clarifying Child Comments',
        'text': [
          {
            "id": "RYge_v0Xs2OL_MB51-TXf",
            "label": 'What do you notice about children\'s responses or behaviors when you ' +
            'repeat what they say? Are there certain activities when you find yourself ' +
            'repeating children\'s comments more?'
          },
          {
            "id": "eif2KBEizTtIyo_bOlDeG",
            "label": 'When do you notice yourself clarifying children\'s comments? How does it ' +
            'help sustain the conversation?'
          }
        ]
      },
      {
        'name': 'ListeningPanel2B',
        'title': 'Asking Open-Ended Questions',
        'text': [
          {
            "id": "aVeWLKDiRgBplXWOTtdYl",
            "label": 'When do you find time to have conversations with children?'
          },
          {
            "id": "V3gxouNFbsy2CGRuTPZ7R",
            "label": 'Talk about topics that children enjoy discussing. How do you know?'
          },
          {
            "id": "8ukja0p7uS495PWvRE356",
            "label": 'What do you notice happening when you ask children open-ended questions ' +
            'that don\'t have one-word answers?'
          }
        ]
      },
      {
        'name': 'ListeningPanel2C',
        'title': 'Expanding on Child Talk and Play',
        'text': [
          {
            "id": "EF9F7o0RkW-piIcK3JXQd",
            "label": 'Talk about when you find time to observe children and follow their lead.'
          },
          {
            "id": "w-M-3KkqSBBoqLHrlWdA0",
            "label": 'What are effective strategies for building on children\'s play and getting ' +
            'children to talk about their play?'
          },
          {
            "id": "W_d4PY7-76X_RugwyTHEc",
            "label": 'For children who talk less than their peers, how do you get them to open up?'
          }
        ]
      }
    ],
    'Encouraging': [
      {
        'name': 'ListeningPanel3A',
        'title': 'Peer Talk During Play',
        'text': [
          {
            "id": "ar8QMQBT0XcGaHeknWWIn",
            "label": 'Talk about effective strategies you use to promote children\'s communication ' +
            'with each other during play.'
          },
          {
            "id": "8tskuE2zBiodVxcY25hMi",
            "label": 'Talk about how you help children use role speech with each other during ' +
            'pretend play.'
          },
          {
            "id": "IVEqaJNeSdSsNo8hhJttb",
            "label": 'As children play with blocks or games, what strategies encourage them to ' +
            'share ideas and create together?'
          }
        ]
      },
      {
        'name': 'ListeningPanel3B',
        'title': 'Solving Problems',
        'text': [
          {
            "id": "1Ri0-5lmsdKnKS5vMlft0",
            "label": 'What verbal strategies do children use for solving problems like deciding ' +
            'what to play, sharing, taking turns, etc.?'
          },
          {
            "id": "DPRE9k4Z9PtWXFITDcFki",
            "label": 'Talk about how you teach problem-solving to children.'
          }
        ]
      }
    ]
  },
  'AC': {
    'Associative': [
      {
        'name': 'ACPanel1A',
        'title': 'Organization',
        'text': [
          {
            "id": "AR8gyltnSNFEfUSWMHvKv",
            "label": 'Think about the total number of children in the classroom and the number ' + 
            'of centers that are typically open. Are there enough centers open so that ' +
            'children can spread out and participate in meaningful interactions?'
          },
          {
            "id": "XlYO7YKDV5BKPteP9DrlE",
            "label": 'Are there too many centers open so that several children end up playing alone?'
          }
        ]
      },
      {
        'name': 'ACPanel1B',
        'title': 'Time in Centers',
        'text': [
          {
            "id": "ti12q9grNlG3re3Ig_plj",
            "label": 'How does the amount of time children spend in centers affect their ' +
            'engagement in activities?'
          },
          {
            "id": "TXGMssxp144THyTYKxPd3",
            "label": 'How often do children switch centers? Do they choose when to switch or do ' + 
            'teachers decide?'
          }
        ]
      },
      {
        'name': 'ACPanel1C',
        'title': 'Materials',
        'text': [
          {
            "id": "FeKSsn546KBNkgNHtN_-X",
            "label": 'What kinds of props are available to children? Are there costumes and toys ' +
            'around the same theme that could encourage children to engage in pretend play ' + 
            'together (e.g., doctor\'s office, restaurant, grocery store).'
          },
          {
            "id": "OgjXX8nA7OJZhqkF_Z9XX",
            "label": 'Are costumes, props, and toys related to read-alouds that children enjoy or that ' +
            'reflect their out of school experiences?'
          },
          {
            "id": "At1WLouHQ8JeL6wZ688w0",
            "label": 'Are there props and toys like cars, road signs, trains, animals, and/or people ' +
            'that might help children talk to each other and create scenarios as they play?'
          },
          {
            "id": "8lsIIguDOZ7DLX3O93z6C",
            "label": 'Do children help each other build things? Why or why not?'
          }
        ]
      },
    ],
    'Cooperative' : [
      {
        'name': 'ACPanel2A',
        'title': 'Organization',
        'text': [
          {
            "id": "ccm46-RtP7WbRywjZH_ON",
            "label": 'Think about the total number of children in the classroom and the number ' + 
            'of centers that are typically open. Are there enough centers open so that ' +
            'children can spread out and participate in meaningful interactions?'
          },
          {
            "id": "FXNi9eCqUgEIGUq0IJq2F",
            "label": 'Are there too many centers open so that several children end up playing alone?'
          }
        ]
      },
      {
        'name': 'ACPanel2B',
        'title': 'Time in Centers',
        'text': [
          {
            "id": "EkuMzuwOW0YuXikjzVB3s",
            "label": 'How does the amount of time children spend in centers affect their ' +
            'engagement in activities?'
          },
          {
            "id": "SwJjpo3UyoxNgEt8dzqlj",
            "label": 'How often do children switch centers? Do they choose when to switch or do ' + 
            'teachers decide?'
          }
        ]
      },
      {
        'name': 'ACPanel2C',
        'title': 'Materials',
        'text': [
          {
            "id": "7Se_JIMbtn-TWek_qeV47",
            "label": 'Talk about the variety of materials that are in each center.'
          },
          {
            "id": "MgoW9bIt3gti7DnwVtGH-",
            "label": 'Think about the pretend play themes that children like the most. With the ' + 
            'help of props, how could you encourage them to act out a pretend play scenario ' +
            'using role speech?'
          },
          {
            "id": "xUMEir-VRA9Xgxr2LEU42",
            "label": 'Are there manipulatives or games at some centers that encourage children to ' +
            'follow rules and take turns (e.g., rolling a dice or picking and matching cards ' +
            'that are the same)?'
          },
          {
            "id": "u7NMqyR11DY0QZz8SHclB",
            "label": 'When using electronic games, tablets, or computers, how can children ' +
            'be encouraged to cooperate and take turns?'
          },
        ]
      },
    ],
    'TeacherParticipation' : [
      {
        'name': 'ACPanel3A',
        'title': 'Join Children\'s Play',
        'text': [
          {
            "id": "FoM8gsHvwFC-ML6WXk6o-",
            "label": 'Talk about the ways that you enjoy participating in children\'s play and ' + 
            'activities. Where do you find yourself spending time during centers?'
          },
          {
            "id": "_ba5Bxn6ScNG0EqnRckrf",
            "label": 'What effect does your paticipation have on children?'
          },
          {
            "id": "gOseJsWcaE7iJb1kumKR8",
            "label": 'What are some effective ways to gracefully enter and exit children\'s play ' +
            'in order to facilitate more complex interactions without stopping it?'
          }
        ]
      },
      {
        'name': 'ACPanel3B',
        'title': 'Extend Thinking',
        'text': [
          {
            "id": "ohwxrJ8TcBsmTMM_y7fqn",
            "label": 'Talk about the kinds of questions that you as the teacher can ask to extend ' +
            'children\'s thinking and promote associative or cooperative interactions.'
          },
          {
            "id": "7Zxu4uy6IAw4xRYPyPI-f",
            "label": 'Example: If children are pretending to set up a restaurant or play family, what ' + 
            'kinds of questions would help children enrich their play (e.g., "How does the '+
            'family work together to take care of the baby?")?'
          },
          {
            "id": "P2N_J_VBriybK-KRPFNb-",
            "label": 'Example: During games, what kinds of questions do you like to ask to challenge ' +
            'children\'s thinking (e.g., "What number do you need to roll to win?")'
          },
          {
            "id": "l9BwvmBzfLw2taJxqZYiU",
            "label": 'What other kinds of materials extend children\'s thinking and build on their ' +
            'curiosity (e.g., books with rich vocabulary on topics that interest children)?'
          }
        ]
      },
      {
        'name': 'ACPanel3C',
        'title': 'Model Play and Interpersonal Skills',
        'text': [
          {
            "id": "TnNob5a2jB8iA7V_AWQi5",
            "label": 'In your experience, how does modeling the use of manipulatives, games, and props ' +
            'help children get engaged in activities?'
          }, 
          {
            "id": "nmOoFw5oa5WqcN390Njdo",
            "label": 'Talk about the ways that you like to demonstrate the skills needed for social ' +
            'learning interactions.'
          },
          {
            "id": "BK1mDC1t-Py7qgZmd1YqH",
            "label": 'What are some good times of the day and activities for teaching turn-taking, ' +
            'modeling respectful talking and listening skills, or demonstrating good sportsmanship?'
          }
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'ACPanel4A',
        'title': 'Sharing and Interacting',
        'text': [
          {
            "id": "HbuBLVL7ylPfP3PEU7aDf",
            "label": 'When children are playing independently, what are some of the strategies ' + 
            'you might use to encourage them to share or interact with each other?'
          },
          {
            "id": "R93K_lkdfnljXI_Fysxq6",
            "label": 'What are some of the reasons children are not sharing or interacting' +
            'more often?'
          }
        ]
      },
      {
        'name': 'ACPanel4B',
        'title': 'Communication',
        'text': [
          {
            "id": "vWmfBzGfHKHfEIN25BLlq",
            "label": 'What are some effective strategies you use for supporting children\'s ' +
            'ability to communicate with their peers?'
          },
          {
            "id": "CHAch9CNZKFpDzMn7k3-9",
            "label": 'In your experience, what are some effective ways to pre-teach social skills ' + 
            'or support children\'s interactins in the moment?'
          },
          {
            "id": "tS79dXcUGEcmRGHbhFXyM",
            "label": 'How effective are these strategies with your current students?'
          },
        ]
      },
      {
        'name': 'ACPanel4C',
        'title': 'Problem-Solving',
        'text': [
          {
            "id": "ZQ64VqSLteLmZq0xVneaR",
            "label": 'Talk about how children respond to challenges during associative and cooperative ' +
            'interactions. What might they need help with (coping with feelings about losing, ' + 
            'taking turns, sharing materials, learning the underlying concepts or rules of a ' +
            'new game, etc.)?'
          },
          {
            "id": "eOEoVBdu0JVCYeNebm0zL",
            "label": 'What are some ways that you can support children before problems arise (e.g., ' +
            'role-playing with puppets, teacher demonstration) and in the moment (e.g., ' +
            'peer buddy systems, teacher praise)?'
          }
        ]
      },
      {
        'name': 'ACPanel4D',
        'title': 'Positive Feedback',
        'text': [
          {
            "id": "MgbAv7lVB8Orl2xm7w6m3",
            "label": 'Think about how children can be encouraged to interact with each other through ' +
            'positive teacher feedback.'
          }, 
          {
            "id": "M8Cw9Prw9kofmoDFI2sGZ",
            "label": 'When you see children sharing, creating something together, or playing a ' +
            'cooperative game, what kinds of feedback would help them continue doing those things?'
          },
        ]
      },
    ]
  },
  'Sequential' : {
    'DrawingAndWriting': [
      {
        'name': 'SequentialPanel1A',
        'title': 'Materials',
        'text': [
          {
            "id": "FcjHx5fQdWsAg-hrRr5Kb",
            "label": 'Talk about opportunities that children have for using drawing and ' + 
            'writing mateirals throughout the day.'
          },
          {
            "id": "tk5Hc6t3gOEPtWh8AS_Tk",
            "label": 'How are drawing materials like crayons, markers, pencils, and paper ' +
            'distributed around the classroom?'
          }
        ]
      },
      {
        'name': 'SequentialPanel1B',
        'title': 'Drawing',
        'text': [
          {
            "id": "rfgeo5votVdz3sYaBK5VV",
            "label": 'Do children spend more time drawing without a clear purpose or do they ' +
            'more often create a drawing and can explain what the drawing represents?'
          },
          {
            "id": "-ugq-InSWQRDtmaupluri",
            "label": 'Talk about a time when children got excited about drawing. ' + 
            'What do you think fostered the excitement?'
          }
        ]
      },
      {
        'name': 'SequentialPanel1C',
        'title': 'Writing',
        'text': [
          {
            "id": "uW7_tOfSKa6h8DglTt5jF",
            "label": 'How do teachers help children begin to make letter-like forms, letters, ' +
            'and/or create labels or a message to go with their drawings?'
          }, 
          {
            "id": "5C40U_8hnGnUHEhNfdxSC",
            "label": 'Talk about how you know children are ready to begin to experiment with writing.'
          },
          {
            "id": "mGZf_6YgRSMNuR2BcczSK",
            "label": 'In your experience, what motivates different children to begin to write?'
          },
        ]
      },
    ],
    'GamesAndPretendPlay': [
      {
        'name': 'SequentialPanel2A',
        'title': 'Games',
        'text': [
          {
            "id": "35bmDrs_4ekDbyaq5cfgj",
            "label": 'Talk about the variety of materials in the classroom that could be ' + 
            'used in a sequential or step-by-step way.'
          },
          {
            "id": "bc77s_i9pMM_Ira4SvAdH",
            "label": 'Talk about the types of manipulatives or games that encourage ' +
            'children to follow rules and take turns.'
          }
        ]
      },
      {
        'name': 'SequentialPanel2B',
        'title': 'Dramatic Play',
        'text': [
          {
            "id": "Nnrqn-PBIb5AbCXPptJdq",
            "label": 'Talk about the kinds of thematic props that are available to children.'
          },
          {
            "id": "VRRztigIIqTSaVABF4ynv",
            "label": 'What costumes and toys around the same theme might encourage children ' +
            'to engage in pretend play that has a predictable sequence of events, ' + 
            'like a doctor\'s office, restaurant, or grocery store?'
          }
        ]
      },
      {
        'name': 'SequentialPanel2C',
        'title': 'Puppets and Books',
        'text': [
          {
            "id": "by3n4IrRmJWAUcr8r3RGr",
            "label": 'Talk about ways that children might be encouraged to act out a favorite ' +
            'book or nursery rhyme with puppets, materials in the classroom, or simple ' +
            'figures (e.g., craft sticks).'
          },
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'SequentialPanel3A',
        'title': 'Sequential Materials',
        'text': [
          {
            "id": "-P-omqO26GKKzwaXlXV0B",
            "label": 'Talk about what you notice when children do activities or use materials ' + 
            'that have a predetermined sequence of steps that build on each other.'
          },
          {
            "id": "z88YvmBvwrsMLDCoADKHF",
            "label": 'Talk about how often children do activities like looking for puzzle ' +
            'pieces that fit, matching pattern blocks to a pre-made design, or ' +
            'putting story picture cards in order.'
          },
          {
            "id": "NTkGN2MrTBGtD-2dMl6Mt",
            "label": 'If these types of materials are available, but children don\'t play ' +
            'with them very often, what might help them get started?'
          }
        ]
      },
      {
        'name': 'SequentialPanel3B',
        'title': 'Regular Objects',
        'text': [
          {
            "id": "Miht2CTN6EjrXxRPyJQZR",
            "label": 'Talk about the ways that children use regular objects in a step-by-step ' +
            'predictable way. For example, do they put blocks in size order from ' +
            'shortest to tallest, sort rocks by color or texture, or create letters ' + 
            'out of play-doh?'
          },
          {
            "id": "1RIolrhJThh9ZuU8bOGjq",
            "label": 'What might help children do more sequential activities with everyday objects?'
          }
        ]
      },
      {
        'name': 'SequentialPanel3C',
        'title': 'Demonstrating Sequential Activities',
        'text': [
          {
            "id": "t_nfQUASjlOpG1sXwiMU9",
            "label": 'Talk about the benefits of demonstrating the steps of a sequential ' +
            'activity for children.'
          }, 
          {
            "id": "JHtFk-3K6-scP4T9l2a62",
            "label": 'What aspects of activities like puzzles or matching cards would be ' +
            'challenging for children in your classroom? What could teachers demonstrate ' +
            'in order to help children be successful?'
          },
          {
            "id": "NGQ4biXbQAKyZP7riv9Hz",
            "label": 'What time of day or activity setting would be good for teacher ' +
            'demonstrations (small group, centers)?'
          }
        ]
      },
      {
        'name': 'SequentialPanel3D',
        'title': 'Encouraging Dramatic Play',
        'text': [
          {
            "id": "qodvIvLe87NbxgXKedLWB",
            "label": 'Let\'s talk about the pretend play themes that generate the highest ' + 
            'level of excitement and interest.'
          },
          {
            "id": "2CYf2Na7Xo5kad2oJd98c",
            "label": 'Talk about how you help children speak or act in character. How are ' +
            'children encouraged to act out a clear pretend play scene that has a ' +
            'predictable sequence of events?'
          }
        ]
      },
      {
        'name': 'SequentialPanel3E',
        'title': 'Acting Out Books',
        'text': [
          {
            "id": "Ai2o4taMXmxh0baNTS6Zq",
            "label": 'Talk about ways to encourage children to use books in a sequential way, ' +
            'such as using self-talk to model "reading" a book even when you don\'t ' +
            'know all the words, or acting out a story with puppets.' + 
            'In what areas of the classroom can teachers encourage this type of ' +
            'sequential activity?'
          }
        ]
      },
      {
        'name': 'SequentialPanel3F',
        'title': 'Modeling and Praising Writing',
        'text': [
          {
            "id": "4Moo6o_IhqMqVyOB5xNcI",
            "label": 'Talk about the different ways that you encourage children to write.'
          },
          {
            "id": "L_JluJyHv-Cs6Wtqx4x1N",
            "label": 'Talk about some effective methods for modeling different reasons for ' + 
            'writing (e.g., making a list on chart paper for what the class needs ' +
            'for recess, instructions for a game the children like to play)?'
          },
          {
            "id": "yLdU6PgXg7VDypHtnJGC8",
            "label": 'During centers, how might you sit down with children and begin writing?'
          },
          {
            "id": "CuuQio_JYideuLk5Gux-g",
            "label": 'Talk about how praise helps children continue writing? How does praising ' +
            'all forms of writing (from scribbling to letter-like forms to emerging ' +
            'spelling) help writers at all stages of development?'
          }
        ]
      },
    ]
  },
  'Engagement' : {
    'OffTask': [
      {
        'name': 'EngagementPanel1A',
        'title': 'Responding to Off Task Behavior',
        'text': [
          {
            "id": "2sH-QHCBovT2eqc5gKYSC",
            "label": 'Talk about how you re-engage children when they are off task. '
          },
          {
            "id": "vXL0ZdvfLDwE-2OymOpj2",
            "label": 'What have you noticed about the reasons for your students’ off task behavior? '
          },
          {
            "id": "zFpPd5jU864vqAuoo5L2i",
            "label": 'In your experience, what strategies address students’ off-task behavior that '+
            'is due to social-emotional needs?'
          },
        ]
      },
      {
        'name': 'EngagementPanel1B',
        'title': 'Preventing Off Task Behavior',
        'text': [
          {
            "id": "NE7uxDxvosF0ErL7Cv_-X",
            "label": 'Talk about your students’ opportunities '+
            'to move, sing, dance, and generally use their energy throughout the day.'
          },
          {
            "id": "Xryo6SsqIzvjnx0mTHi-W",
            "label": 'Talk about the time of day that children your students engage '+
            'in off task behavior most often. Why might that be?'
          },
        ]
      },
    ],
    'MildEngagement': [
      {
        'name': 'EngagementPanel2A',
        'title': 'Increasing Child Involvement',
        'text': [
          {
            "id": "cdygqgHtqbMFm2Yxt8g8-",
            "label": 'Talk about the variety of materials in the classroom that could be ' +
            'used in a sequential or step-by-step way.'
          },
          {
            "id": "iHay22ub2MTBv2dUliYvw",
            "label": 'Talk about the types of manipulatives or games that encourage ' +
            'children to follow rules and take turns.'
          }
        ]
      },
      {
        'name': 'EngagementPanel2B',
        'title': 'Using Different Modalities',
        'text': [
          {
            "id": "4FUTfAN7mEXAE48gXq-jo",
            "label": 'Talk about the different modalities you use to share information ' +
            'with your students during an activity (auditory, visual, movement, etc.)'
          },
          {
            "id": "opD0tvQapAvWtEngTLIAz",
            "label": 'What do you notice about your students’ engagement when lessons incorporate different modalities?'
          },
        ]
      },
      {
        'name': 'EngagementPanel2C',
        'title': 'Presenting Materials',
        'text': [
          {
            "id": "lkIhj_dPOP3XSvefw3L6R",
            "label": 'Talk about how you present materials to children in your classroom. For example, do you ask children' +
            ' to explore materials first, teach them how to interact with materials, etc.? '
          },
          {
            "id": "Uu5tjrQBybg-ISiMCeAW0",
            "label": 'How does modeling what you can do with materials improve children’s engagement?'
          },
          {
            "id": "lJtJbUWPp_16_DoVML2k8",
            "label": 'Talk about how you rotate materials throughout the year to maintain children’s engagement.'
          },
        ]
      },
    ],
    'HighEngagement': [
      {
        'name': 'EngagementPanel3A',
        'title': 'Building on Child Engagement',
        'text': [
          {
            "id": "VANex7YCH8O_hGsyCwCLZ",
            "label": 'When your students are playing independently, talk about strategies ' +
            'you use to encourage them to share or interact with each other.'
          },
          {
            "id": "wT8T2_i6SH5bOelLuqrrn",
            "label": 'Talk about opportunities your students have for playing cooperative games with each other. '
          },
          {
            "id": "vDrCbarOdMq2H-RXVpdE6",
            "label": 'Talk about how building on your students’ interests ' +
            'and home experiences might lead to higher engagement in learning activities.'
          }
        ]
      },
      {
        'name': 'EngagementPanel3B',
        'title': 'Fostering Child Independence',
        'text': [
          {
            "id": "6kzZybD0V9lqIVh8wQkEb",
            "label": 'Talk about opportunities children have for exploring materials independently. '
          },
          {
            "id": "dZpow02NnHKXBDMrL4XvF",
            "label": 'Talk about how you encourage children to lead parts of lessons or transitions.'
          }
        ]
      },
      {
        'name': 'EngagementPanel3C',
        'title': 'Active Learning',
        'text': [
          {
            "id": "_zk212DdHoKaOYXWJC6FY",
            "label": 'Talk about children’s opportunities for investigating and exploring  ' +
            'materials.'
          },
          {
            "id": "zTctlcCI5Ro3Ef2QUL0JX",
            "label": 'What do you notice about how children in your classroom interact with new materials during activities? ' +
            'Do they take turns, share, or do they each get to use some of the new materials--how does ' +
            'this affect their engagement?'
          }
        ]
      }
    ]
  },
  'Literacy': {
    'Foundational': {
      'Phonological Awareness (Sounds of Language)': [
        {
          'name': 'Panel1A',
          'title': 'Rhyming',
          'text': [
            {
              "id": "xQKvKP1r-OB3aSbcPH-cf",
              "label": 'What are effective strategies for teaching rhyming concepts to children in your classroom?'
            },
            {
              "id": "HTU10nibXJsnv61myfC5J",
              "label": 'What have you noticed about your students’ development of rhyming skills over time? What supports students in moving from noticing rhyming words to producing rhyming words independently?'
            },
            {
              "id": "baOygGVDoqNZG_gtBrODC",
              "label": 'Talk about how you incorporate rhyming into classroom activities such as shared reading, games, center activities, music and movement, or transitions.'
            }
          ]
        },
        {
          'name': 'Panel1B',
          'title': 'Alliteration',
          'text': [
            {
              "id": "HQfnUSqPX40hdjvPnPhnu",
              "label": 'What are effective strategies for teaching children in your classroom to notice and understand alliteration?'
            },
            {
              "id": "QJ18ZZw3t1zui9LMhnkHS",
              "label": 'Talk about how you focus on alliteration during classroom activities such as shared reading, games, center activities, music and movement, or transitions.'
            }
          ]
        },
        {
          'name': 'Panel1C',
          'title': 'Syllables',
          'text': [
            {
              "id": "WpmL6BMcG6INOu42Fv9hH",
              "label": 'What are effective strategies for teaching children in your classroom to notice and count syllables?'
            },
            {
              "id": "sB11ajX0J2JEK3mfsnR-X",
              "label": 'Talk about how you use familiar words, games, music, and or movement to teach syllables. What has been effective?'
            }
          ]
        },
        {
          'name': 'Panel1D',
          'title': 'Individual Sounds (Phonemes)',
          'text': [
            {
              "id": "ehAsSw3YoQs3L7eDUIKdx",
              "label": 'How do you decide which sound(s) to teach during an activity?'
            },
            {
              "id": "WMTJ1FkzSKlUGi41mZZZv",
              "label": 'What strategies and materials support your students’ learning about individual sounds in spoken words (drawing their attention to your mouth as you make sounds, games, picture cards, using classmate names, etc.)?'
            },
            {
              "id": "0G1mv3TrmaSuVjxG7KhZB",
              "label": 'Talk about how you support children as they develop more complex phonemic awareness skills (e.g., repeating sounds, segmenting or isolating beginning/ending sounds; substituting sounds, comparing beginning sounds).'
            },
            {
              "id": "6CHbMwn45XDjDFpARMyBC",
              "label": 'How do you scaffold your students’ ability to answer questions about sounds (e.g., modeling the activity first, elongating initial sounds for children, pointing to your mouth, etc.)?'
            }
          ]
        }
      ],
      'Alphabetic Principle and Print Concepts': [
        {
          'name': 'Panel2A',
          'title': 'Alphabet Knowledge and Word Identification Skills',
          'text': [
            {
              "id": "nVgtoZQKHe-bcGpkHVj_d",
              "label": 'How do you decide which letter(s) to teach during an activity?'
            },
            {
              "id": "qCwjVNTRYr_aF_AUjS4Jw",
              "label": 'Talk about how you draw children’s attention to letters through names, visuals, play, games, music and movement, etc.'
            },
            {
              "id": "lLCHK9SjCKGMeZJme62Ar",
              "label": 'What are effective strategies for teaching your students letter formation or letter writing?'
            }
          ]
        },
        {
          'name': 'Panel2B',
          'title': 'Letter-sound Correspondence',
          'text': [
            {
              "id": "qmr3YX8IvkjArGvarPJpA",
              "label": 'Talk about how you teach or show your students that letters in written words are related to sound in spoken words (e.g., focusing on children’s names, shared reading, shared and interactive writing).'
            },
            {
              "id": "LjoPJtfHSWwoXdKjtL67z",
              "label": 'How do you decide which letters and sounds to teach during an activity?'
            },
            {
              "id": "42KEYONWbbuSqJ6tQnVLD",
              "label": 'What materials, activities, and/or lessons support your students’ learning of letter-sound correspondence?'
            }
          ]
        },
        {
          'name': 'Panel2C',
          'title': 'Inventive Spelling',
          'text': [
            {
              "id": "3nXq5KZsunR93dmfzLKGR",
              "label": 'Talk about the ways that you encourage children in your class to invent spellings.'
            },
            {
              "id": "XnZj1x-pqJL0FAkwhnlqX",
              "label": 'How do you plan for a variety of supports for inventive spelling, such as modeling through shared writing, inviting children to write with you (i.e., interactive writing), and scaffolding individual children as they draw and write? What works for your students?'
            },
            {
              "id": "Pvk0ZXRQyWY1C4a0FlszR",
              "label": 'What have you noticed about specific activities or purposes for writing that motivate your students to experiment with inventive spelling?'
            },
            {
              "id": "CA51NMidKz_Inksxt2B2q",
              "label": 'How do you match your scaffolding to your students’ emergent writing stage of development?'
            }
          ]
        },
        {
          'name': 'Panel2D',
          'title': 'Print Concepts',
          'text': [
            {
              "id": "hFPrhAS99UqJkr7rxxFiF",
              "label": 'How do you decide which print concept(s) to focus on during an activity or lesson?'
            },
            {
              "id": "nMlJNK5jMdIjYAhXrc585",
              "label": 'Talk about how you use print around the classroom and print materials from your students’ homes and/or community to draw their attention to print concepts.'
            }
          ]
        },
        {
          'name': 'Panel2E',
          'title': 'Matching Spoken Words to Print',
          'text': [
            {
              "id": "UABALPCQQbLFkCiesz_0p",
              "label": 'Talk about how you show or model for your students that print represents our spoken words.'
            },
            {
              "id": "o8z6lHbiggIhbWWLYc7DX",
              "label": 'What are effective strategies for encouraging your students to match spoken words to print (e.g., inviting them to “read” the morning message, environmental print, or their own emergent writing)?'
            }
          ]
        }
      ],
      'Realistic Reading and Writing': [
        {
          'name': 'Panel3A',
          'title': 'Reading',
          'text': [
            {
              "id": "xkvpLUza6bjfOggMC35l5",
              "label": 'What types of realistic, meaningful, or authentic reading activities or tasks do you enjoy doing with your students? Which foundational skills do you teach during these activities?'
            },
            {
              "id": "IjdZNWPIY5UNf9Gm4i4Ru",
              "label": 'How do you invite your students to use their knowledge of foundational skills during realistic reading activities (e.g., discussing print concepts while “reading” the morning message, the daily schedule, a recipe, favorite song lyrics, etc.)?'
            }
          ]
        },
        {
          'name': 'Panel3B',
          'title': 'Writing',
          'text': [
            {
              "id": "3mLGsSdE1YRtrCAb6MMDS",
              "label": 'What types of realistic, meaningful, or authentic writing tasks do you enjoy doing with your students?'
            },
            {
              "id": "3A04UG0oGT1rrcHx3mogf",
              "label": 'Which foundational skills do you teach while writing with or in front of students?'
            },
            {
              "id": "4g2aPblcFiWWRu30db9O4",
              "label": 'How do you invite your students to use their knowledge of foundational skills during realistic writing activities (e.g., discussing letter-sound correspondence while co-writing the morning message or a class book)?'
            }
          ]
        },
        {
          'name': 'Panel3C',
          'title': 'Reading and Writing for an Audience',
          'text': [
            {
              "id": "Pazb0n48VBYd7ijURCJWh",
              "label": 'What opportunities do your students have to read or write for an audience?'
            },
            {
              "id": "q8QHljvOYZZ0NcuDtsV85",
              "label": 'Talk about the different ways your students can read and/or write for an audience (eg., peers, teachers, school personnel, family, via email, online publishing and sharing, etc.).'
            }
          ]
        },
        {
          'name': 'Panel3D',
          'title': 'Home and Community Literacy Connections',
          'text': [
            {
              "id": "GybbgbIL8GPdTx9-aOXf4",
              "label": 'Talk about how you connect reading or writing in the classroom to your students’ personal experiences or interests (e.g., writing captions for family/community photos)?'
            },
            {
              "id": "BieVZBqCXwsoGM8WrTvS7",
              "label": 'How might you build on the reading or writing events valued in your students’ homes or communities? Talk about effective strategies for learning from families.'
            }
          ]
        }
      ],
      'Assessment and Planning for Instruction': [
        {
          'name': 'Panel4A',
          'title': 'Assessing Foundational Skills',
          'text': [
            {
              "id": "EDlC1Sq9MMhca61y5Hbp6",
              "label": 'What assessments do you find useful for learning about your students’ foundational skills?'
            },
            {
              "id": "7_TBsQF9BAXWFV56noZdD",
              "label": 'How do you decide when and how frequently during the year to use assessments?'
            },
            {
              "id": "il6JGyy_h9i6W_-wyWvEg",
              "label": 'How does assessment data help you meet individual students where they are in their skill development?'
            }
          ]
        },
        {
          'name': 'Panel4B',
          'title': 'Observing Foundational Skills in Action',
          'text': [
            {
              "id": "MvO-V3a32Pzi8LuLR57r2",
              "label": 'Talk about how you use informal observations of your students’ foundational skills development.'
            },
            {
              "id": "uoNKpY_QzBsxzv6wLxgJQ",
              "label": 'What questions guide your observations of students? (e.g., What does the student know about print? What evidence is there that letter-sound correspondence is developing?)'
            }
          ]
        },
        {
          'name': 'Panel4C',
          'title': 'Unit Planning',
          'text': [
            {
              "id": "kO2ROjZah3J6gIkTwQrLp",
              "label": 'How do you use assessment or observation data to guide your long-term planning?'
            },
            {
              "id": "x_3V-SZ0Bg-4uzGP0ohLj",
              "label": 'Talk about how you decide what type of activities to do over time. For example, how do you think about when or how often to do different types of activities over the course of a unit (e.g. shared reading or writing; journals, morning message)?'
            },
            {
              "id": "J_GgV3EAewCo7wJc_H29h",
              "label": 'What are your thoughts on teaching skills in the context of a meaningful or realistic reading/writing activity versus teaching skills outside of that context?'
            }
          ]
        },
        {
          'name': 'Panel4D',
          'title': 'Activity and Lesson Planning',
          'text': [
            {
              "id": "Izw4Ii5X_KZSspX447bJp",
              "label": 'What is important for you when planning an activity or lesson on foundational skills? Do you start with a learning goal, a group of skills to teach, a specific activity that children enjoy, etc.?'
            },
            {
              "id": "CjCdJzmPb56zm6RDQLFrI",
              "label": 'How do you pace your instruction and students’ participation during a lesson or activity?'
            },
            {
              "id": "jl3f7hB9jjE5F1LWoD8af",
              "label": 'Talk about when and how you group students for small group instruction. What informs your decisions (e.g, assessment data or informal observation)?'
            }
          ]
        }
      ],
      'Teacher Support for Foundational Skills': [
        {
          'name': 'Panel5A',
          'title': 'Open-ended Questions and Prompts',
          'text': [
            {
              "id": "Wnd8HP0PxC_TUG6Sdn6v7",
              "label": 'Talk about the balance of open-ended and closed-ended questions you ask about foundational skills during lessons or activities.'
            },
            {
              "id": "HQAir17E7b0T-jXaNNnCx",
              "label": 'What do you notice happening when you ask children open-ended questions that don’t have one correct answer?'
            }
          ]
        },
        {
          'name': 'Panel5B',
          'title': 'Multimodal Instruction',
          'text': [
            {
              "id": "aIGINuy891Z_E_O570ZHO",
              "label": 'What materials, visuals, or objects support your teaching and student engagement?'
            },
            {
              "id": "IWDHD2t_P9a4xizC4IjSi",
              "label": 'Talk about effective strategies you have discovered for using music and/or movement/actions to teach foundational skills and engage students.'
            }
          ]
        },
        {
          'name': 'Panel5C',
          'title': 'Modeling and Think Alouds',
          'text': [
            {
              "id": "HcUNWIyetWYfBB5KQjrTs",
              "label": 'What types of modeling and/or think alouds about foundational skills do you provide for your students during lessons and activities?'
            },
            {
              "id": "-4yGGxh-6bA0iZrv529Gq",
              "label": 'How do you plan for what to model and talk about based on what your students already know and challenge them to move in new directions?'
            }
          ]
        },
        {
          'name': 'Panel5D',
          'title': 'Using Scaffolding to Guide Participation',
          'text': [
            {
              "id": "WDkHXOcc2Ps324lpTr1TL",
              "label": 'Talk about how you support students who are unable to answer questions during a lesson or engage in an activity at first.'
            },
            {
              "id": "w77NL-2LaZhyq-y7Qqj-h",
              "label": 'What are effective cues or hints for scaffolding your student’s ability to answer questions or complete a task? Do you use visuals or objects, rephrase the question to make it less difficult to answer, etc.?'
            }
          ]
        },
        {
          'name': 'Panel5E',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "Nq3yNYxE_A3K5NXOoNTeY",
              "label": 'What have you noticed about strategies (e.g., visuals, movement) that support your dual language learner students when teaching foundational skills?'
            },
            {
              "id": "MOTBcHn-2Drb86YzXYmPf",
              "label": 'Talk about how you make connections between English and your students’ home language(s) so that you can leverage each student’s existing knowledge? (For example, if the students’ home language has some of the same sounds as English, teachers may start instruction with those phonemes for rhyme or beginning sound activities because the students are already familiar with those sounds.)'
            }
          ]
        },
        {
          'name': 'Panel5F',
          'title': 'Inclusive Teaching Practices',
          'text': [
            {
              "id": "zL5ZFFpTOYYT7hhXzml04",
              "label": 'What accommodations support all of your students’ participation in foundational skills activities (e.g., a variety of materials to support participation for students with fine motor delays; visuals and games that don’t require verbalizations for students with speech delays)?'
            },
            {
              "id": "MNezVi0WMEFUcTvKvsCSN",
              "label": 'What are some ways in which you scaffold peer interactions (e.g., modeling interactions, engaging children in scripted dramatic play of interactions, using props, creating intentional groupings such as pairing stronger students with those who need more support, varying groupings, etc.)?'
            }
          ]
        }
      ]
    },
    'Writing': {
      'Focus on Meaning': [
        {
          'name': 'Panel1A',
          'title': 'Writing in Front of Children',
          'text': [
            {
              "id": "by4E_ZO2JG7w29UUJldef",
              "label": 'In what activity settings do children observe you writing- large group, small group, learning centers, etc.?'
            },
            {
              "id": "vFR9xe3QSa_VLI_f3x7SX",
              "label": 'Talk about what you notice your students learning from observing you write for a meaningful or realistic purpose.'
            }
          ]
        },
        {
          'name': 'Panel1B',
          'title': 'Conversations about Content and Meaning',
          'text': [
            {
              "id": "XeCgoApesuVCxEVkMBzdJ",
              "label": 'How do you create opportunities for children to talk about their ideas for writing or have conversations that may lead to a writing project (e.g., talking about objects or experiences at centers; building from a favorite read aloud)?'
            },
            {
              "id": "0ZC_uYqVayGoiJgqVpAP8",
              "label": 'When do you talk with individual or small groups of children about the meaning of their ongoing drawing and/or writing?'
            },
            {
              "id": "DJa6i4N_DGM8hjgJ8fqIb",
              "label": 'Talk about kinds of questions or comments you use to encourage children to talk about their drawing/writing, continue adding details, and/or expand their ideas.'
            }
          ]
        },
        {
          'name': 'Panel1C',
          'title': 'Child Drawing',
          'text': [
            {
              "id": "mpFDz0CpD_CKRPkx4AU-3",
              "label": 'When throughout the day do children draw to communicate a message or convey meaning? What do they like to draw?'
            },
            {
              "id": "0MKtK7ZW9u91uAc0BsSdO",
              "label": 'Do you ever include drawings to communicate messages as part of your own writing?'
            },
            {
              "id": "xEO6Mn3LGufWvwHD7e4HT",
              "label": 'Talk about effective strategies for encouraging children who are hesitant to draw and/or write.'
            }
          ]
        },
        {
          'name': 'Panel1D',
          'title': 'Saying Aloud the Message to be Written',
          'text': [
            {
              "id": "j5zxF0podhG9fzhPq1WK5",
              "label": 'Talk about the benefits of asking individual students to say aloud the message that they want to “write,” or to say aloud the message that the teacher and children are writing together during a whole group activity.'
            },
            {
              "id": "Vyrzax-Js8pb75SG4qn3b",
              "label": 'What strategies do you like to use when saying the message out loud with children, like drawing a line for each word in the message?'
            }
          ]
        },
        {
          'name': 'Panel1E',
          'title': 'Balancing the Instructional Focus',
          'text': [
            {
              "id": "idd3I8tYq9Wf44dHEwvwr",
              "label": 'What was the most important focus of this lesson or this kind of activity?'
            },
            {
              "id": "C0us_p403h6ftPvU-lgZm",
              "label": 'How do you decide when to focus on meaning and when to focus on print processes during writing events or activities?'
            },
            {
              "id": "IoqzcjVbrJ4IjAIlqcNdR",
              "label": 'Talk about how you balance the dual aims of talking about ideas/having language-building conversations and focusing on print (e.g., letters, sounds, print concepts) in one lesson.'
            }
          ]
        }
      ],
      'Focus on Print Processes': [
        {
          'name': 'Panel2A',
          'title': 'Inviting Children to Write Messages',
          'text': [
            {
              "id": "grhj2P4-7zaVCcJvd8zRV",
              "label": 'How often do you invite children to write each day? Do all children receive these invitations? How do you know?'
            },
            {
              "id": "vuV8cu-MnXBuButnWzcpw",
              "label": 'What do you do to help children launch or begin their writing after an invitation?'
            },
            {
              "id": "Gz_uWOyzw-ppSViV9wXFQ",
              "label": 'What kinds of suggestions help children experiment with writing? How does sharing the writing support your students (e.g., “I’ll write the P, then you can write the next letter”)?'
            },
            {
              "id": "VBel3FT6TeWn_XoIgmyz1",
              "label": 'How do you arrange materials in front of children in ways that suggest what they can do with paper and other writing/drawing materials?'
            }
          ]
        },
        {
          'name': 'Panel2B',
          'title': 'Emergent Writing Forms',
          'text': [
            {
              "id": "5x9TlwYfOE5QuFqrKRoYh",
              "label": 'What types of writing forms are your students currently making (e.g., scribbles, zig zags, letter-like forms, conventional letters)?'
            },
            {
              "id": "C3xQp8Ef1pZrS0g4TMK0D",
              "label": 'What do you do to show children that you value all the kinds of writing forms/marks they make?'
            },
            {
              "id": "iJ8XVYFXc2KMZUa5dTt1k",
              "label": 'How do you respond when children say they can\'t write?'
            }
          ]
        },
        {
          'name': 'Panel2C',
          'title': 'Name Writing and Handwriting ',
          'text': [
            {
              "id": "HAo_99ivgESa5tjeqkm1A",
              "label": 'Talk about how you create opportunities for name-writing throughout the day.'
            },
            {
              "id": "dm5vo3cxx6igaahJWni1F",
              "label": 'What have you noticed about how children use information from writing their name when they write other messages?'
            },
            {
              "id": "DllJ6GbTrR_hf_Z3h4XhD",
              "label": 'How do you support children’s beginning handwriting skills/letter formation?'
            },
            {
              "id": "I6v6FlcTNd8wY_E3mShnZ",
              "label": 'How do you balance your teaching of letter formation and accepting all kinds of writing and letters that your students make?'
            }
          ]
        },
        {
          'name': 'Panel2D',
          'title': 'Print Concepts',
          'text': [
            {
              "id": "qBWH9uUc_bs5jJ3AssOBl",
              "label": 'What print concepts do you like to focus on during writing lessons or activities?'
            },
            {
              "id": "2-Nu6XlY82laEaZMX8xXe",
              "label": 'How do you go about choosing specific print concepts based on your students’ various levels of understanding?'
            }
          ]
        },
        {
          'name': 'Panel2E',
          'title': 'Inventive Spelling',
          'text': [
            {
              "id": "IjMQLKysUXiLD_dRQCC5U",
              "label": 'Talk about when you model or show your students how to do inventive spelling.'
            },
            {
              "id": "LkfvthV40EdRkBg5kBu3v",
              "label": 'What are effective strategies or activities for inviting children to invent spellings with your help (e.g., stretch out words, listen for sounds, choose letters, etc.)? When do you like to do this- whole group interactive writing time, journal or center time, etc.?'
            },
            {
              "id": "0JGbM1s2a4drZdeaT8oPx",
              "label": 'How do you gauge when to start fading some of your support, so that children are trying that part on their own? (e.g., letting the child say the word out loud and identify sounds he hears, instead of doing that for the child)'
            },
            {
              "id": "HqiZDriBR8lBeFoSylwB2",
              "label": 'How do you decide about the complexity of the spelling you can support? (e.g., How many sounds are in the word? How many words do you focus on in a longer message?)'
            }
          ]
        },
        {
          'name': 'Panel2F',
          'title': 'Balancing the Instructional Focus',
          'text': [
            {
              "id": "nR6S9MFHD4wL46UJaisPM",
              "label": 'How do you decide when to focus on meaning and when to focus on print processes during writing events or activities?'
            },
            {
              "id": "g3sI34dhZnEVDq1YVfgQj",
              "label": 'Talk about how you balance the dual aims of talking about ideas/having language-building conversations and focusing on print (e.g., letters, sounds, print concepts) in one lesson.'
            }
          ]
        }
      ],
      'Meaningful Writing Activities': [
        {
          'name': 'Panel3A',
          'title': 'Selecting a Writing Activity and Learning Objectives',
          'text': [
            {
              "id": "3PEfPozJ5ThVpLjJQEv8o",
              "label": 'What type of writing event or activity was happening during this observation? Talk about why you chose this type of activity for your students.'
            },
            {
              "id": "vpOTdPYjjg9D6OkiUaRTr",
              "label": 'What learning objectives or goals did you have in mind when planning this lesson or activity?'
            },
            {
              "id": "cYkEpIzZR4OzJEgErs8eC",
              "label": 'How did you pace your instruction and/or student participation throughout the activity?'
            }
          ]
        },
        {
          'name': 'Panel3B',
          'title': 'Writing During Play or Center Time',
          'text': [
            {
              "id": "mquEpxRkcumV2Xb6hquNl",
              "label": 'How did you arrange your time in learning centers to support writing? Do you circulate about the room to quickly confer with children who are writing or to suggest ways to write?  Do you sit down with children at a center and write with them for some period of time?'
            },
            {
              "id": "GSQhVu9R9qq5qu8wobrLg",
              "label": 'How did you interact with children in ways to support their ongoing writing or to suggest ways they might incorporate writing into their ongoing play activities?'
            },
            {
              "id": "ZbsmTAW-ShLj7GzZ5_NC9",
              "label": 'What have you noticed about your students’ motivation or engagement when their writing is part of play or child-initiated center activities (e.g., taking orders at a restaurant, making signs for a zoo at blocks, writing song lyrics, etc.)?'
            }
          ]
        },
        {
          'name': 'Panel3C',
          'title': 'Writing Alongside Children',
          'text': [
            {
              "id": "T6-fGPdxhh-Hd5yGydtiQ",
              "label": 'Talk about opportunities you have for writing alongside individual or small groups of children.'
            },
            {
              "id": "ZrgaRkrvH8kkAGyo1ys9t",
              "label": 'What do you notice happening when you start your own writing project at a center where your students can see you writing and join you? How do your students respond?'
            }
          ]
        },
        {
          'name': 'Panel3D',
          'title': 'Dictation',
          'text': [
            {
              "id": "YsVPPzNeMXAJBoducObdJ",
              "label": 'When do you choose to write FOR a child by taking dictation? When is it important to take dictation for children?'
            },
            {
              "id": "dxEQT3athgjQ4Dt94ukF7",
              "label": 'When do you encourage children to use their own “kid writing” to compose their message?'
            },
            {
              "id": "MXAtkCWo82Sn797nar1gn",
              "label": 'How do you balance dictation and inviting children to do the writing/make writing forms?'
            }
          ]
        },
        {
          'name': 'Panel3E',
          'title': 'Purposes for Writing',
          'text': [
            {
              "id": "5o92eH0p9qa7TXhNWSxHE",
              "label": 'What was the purpose of today’s writing activity? Why did you choose this type of writing for your students?'
            },
            {
              "id": "wI-GXk1FEUstcyEsVAsqx",
              "label": 'Talk about all of the realistic, meaningful, or authentic purposes for writing that your students have experienced in the classroom.'
            },
            {
              "id": "v7aBgBAVfVe1fsv3occjM",
              "label": 'What have you noticed about the reasons for writing that motivate your students most? What excites or engages them?'
            }
          ]
        },
        {
          'name': 'Panel3F',
          'title': 'Writing for an Audience',
          'text': [
            {
              "id": "NUsF2G_2D7vuGUXJPbINu",
              "label": 'How did you support children to share their writing with peers in the classroom?'
            },
            {
              "id": "diG3iOL94REkjiDgc-Xwl",
              "label": 'How did you support children in sharing their writing with family members and others outside of the classroom?'
            }
          ]
        }
      ],
      'Assessment and Planning for Instruction': [
        {
          'name': 'Panel4A',
          'title': 'Observing Children as They Write',
          'text': [
            {
              "id": "URw1Cr6tN8Untuoc-ArPb",
              "label": 'Talk about what you look for or assess as you observe children’s writing (e.g., knowledge about functions/purposes for writing, formats or genres, ideas and content that are expressed in writing, letters and sounds, punctuation, processes of getting ideas on paper, etc.)'
            },
            {
              "id": "WckTXkIu1rqGu1o_P6TW_",
              "label": 'How do you track your students’ progress over time? What is useful to you about anecdotal notes and/or collecting writing samples?'
            }
          ]
        },
        {
          'name': 'Panel4B',
          'title': 'Collecting Writing Samples',
          'text': [
            {
              "id": "KVS7onxi2DzBUcXBcFM6R",
              "label": 'What types of writing samples do you collect from your students?'
            },
            {
              "id": "zGlh8q035zqV_uMqomY_k",
              "label": 'Talk about the types of prompts you use to collect more formal writing samples. For example, teachers can leave the choice up to the student (e.g., “Let’s think and talk about things we like to do.”) or provide a more teacher-directed prompt that incorporates choice and connects to student interest (e.g., “Think about what you have learned about pets during our pet study.”)'
            }
          ]
        },
        {
          'name': 'Panel4C',
          'title': 'Unit Planning',
          'text': [
            {
              "id": "EmTT9V7yk3TWUyzwcWo83",
              "label": 'How do you use assessment or observation data to guide your long-term planning?'
            },
            {
              "id": "3drGFFsE607ou6CHl8HlS",
              "label": 'Talk about how you decide what type of activities to do over time to encourage writing. For example, how do you think about when or how often to do different types of writing activities over the course of a unit (e.g. shared writing; journals, interactive morning message)?'
            }
          ]
        },
        {
          'name': 'Panel4D',
          'title': 'Activity and Lesson Planning',
          'text': [
            {
              "id": "LmTe2_aNKDJMi4a5LbR2P",
              "label": 'What learning objectives or goals did you have in mind when planning this lesson or activity?'
            },
            {
              "id": "FG-G7HaXEUop6QooV3e53",
              "label": 'How do you pace your instruction and students’ participation during a lesson or activity?'
            },
            {
              "id": "wq3ixOBCkVwV6jnbTnu2u",
              "label": 'Talk about when and how you group students for small group instruction. What data do you use?'
            }
          ]
        },
        {
          'name': 'Panel4E',
          'title': 'Integrating Foundational Skills Instruction in Writing',
          'text': [
            {
              "id": "5ZL1SXj5yw8JegJ_6ijcx",
              "label": 'How do you integrate instruction on foundational skills like letter-sounds into writing activities?'
            },
            {
              "id": "zvyJgN8KWX1yj5ZThah9d",
              "label": 'What are your thoughts on teaching foundational skills in the context of a meaningful or realistic writing activity versus teaching skills like letter formation or letter-sound correspondence outside of that context?'
            },
            {
              "id": "rj9sD20pLaPu5fgqroYpG",
              "label": 'In your experience, what are the advantages and disadvantages of each context (meaningful writing activity vs. teaching skills in isolation)?'
            }
          ]
        },
        {
          'name': 'Panel4F',
          'title': 'Home and Community Literacy Connections',
          'text': [
            {
              "id": "xHSbXl-XqxBkksiHRt5TP",
              "label": 'Talk about how you connect writing in the classroom to your students’ personal experiences or interests (e.g., writing captions for family/community photos)?'
            },
            {
              "id": "OUqItKN9a6MPprjYsmSkK",
              "label": 'How might you build on the writing events or purposes valued in your students’ homes or communities? Talk about effective strategies for learning from families.'
            }
          ]
        }
      ],
      'Teacher Support for Writing': [
        {
          'name': 'Panel5A',
          'title': 'Demonstrating and Talking about Writing',
          'text': [
            {
              "id": "BGi8QDPDJccTwJU0jXLC2",
              "label": 'What aspects of print or writing processes do you explicitly draw your students’ attention to when demonstrating and talking about writing?'
            },
            {
              "id": "64oBR8pSRL5kJP7d7n2Sh",
              "label": 'How do you decide what to talk about or think aloud about when you demonstrate or model writing in front of your students? How do your demonstrations connect to what your students already know and challenge them to develop new understandings?'
            }
          ]
        },
        {
          'name': 'Panel5B',
          'title': 'Responding to Children’s Drawing/Writing',
          'text': [
            {
              "id": "21FzLCssTcY4iYL1GF1dj",
              "label": 'How does responding positively to all writing forms affect your students?'
            },
            {
              "id": "cgVN_3NFm8hJor-S1OMtl",
              "label": 'Talk about effective strategies that encourage your students to think of themselves as writers and keep making progress towards conventional letter formation?'
            },
            {
              "id": "jI63J-XW9cYlosk-RhBne",
              "label": 'Talk about kinds of questions or comments you use to encourage children to talk about their drawing/writing, continue adding details, and/or expand their ideas.'
            }
          ]
        },
        {
          'name': 'Panel5C',
          'title': 'Scaffolding Inventive Spelling',
          'text': [
            {
              "id": "608l5uEWyvC1ZW-VVZ2FU",
              "label": 'Talk about how you know when specific students are ready to begin to invent spellings? (With the caveat that all children benefit from watching teachers model inventive spelling!)'
            },
            {
              "id": "d8tRMWRyrkHMprP1_bip8",
              "label": 'How do you choose a word to spell with a student? For example, do you guide them to choose words with identifiable initial consonants? Or select a word that is important to them or their overall message?'
            },
            {
              "id": "yYJhyqG5xQlFL_UTPxPY6",
              "label": 'How do you support students in segmenting the sounds in the spoken word?'
            },
            {
              "id": "9xav-I_3oRx_1LNiEaiJ1",
              "label": 'How do you respond when your student chooses a letter that could make the sound but it’s not the correct choice (e.g., the child chooses S to spell “city.”)? (This actually shows that they can correctly match the sound to a letter even if it’s not the conventional spelling of the word!)'
            },
            {
              "id": "f-3DZtpgVKA1Cj5GhzgSa",
              "label": 'How do you support students who choose a letter that seems completely incorrect? For example, give the child two choices, one of which is the correct letter (“Is it T like tiger? or S like snake?”) or link the letter they are looking for to a classmate’s name (Is it M like Milany?)'
            }
          ]
        },
        {
          'name': 'Panel5D',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "AYSI39MD5pDuDt7Vq4rto",
              "label": 'How do you adapt your strategies to support dual language learners (e.g., encouraging students to produce a short phrase to write that is as close as possible to their oral English, etc.)?'
            },
            {
              "id": "v0FNnCVA9v6RUP1hheJhM",
              "label": 'Talk about how you encourage your students to write in their home language when it has the same letters and some of the same sounds as English.'
            },
            {
              "id": "QZs89gUY8-JA7mNnL7T45",
              "label": 'What do you do when a child wants to write a word in a language you do not speak?  What strategies do you personally have? What other resources do you draw on?'
            }
          ]
        },
        {
          'name': 'Panel5E',
          'title': 'Inclusive Teaching Practices',
          'text': [
            {
              "id": "7hgzaIs_Q11TM4DZav_jT",
              "label": 'Talk about how you ensure that all children, regardless of their language or fine-motor/writing skills, can create a story or message to share? What materials (photo/video, digital tools) or strategies (e.g, dictation, peer collaboration) have you found to be effective?'
            },
            {
              "id": "dxucgTff7nt6hKpGgpFKu",
              "label": 'What accommodations support all of your students’ participation in writing or composing activities (e.g., teacher dictation, a variety of materials to support writing for students with fine motor delays; visuals and assistive technology that support participation of students with speech delays)?'
            }
          ]
        }
      ]
    },
    'Reading': {
      'Vocabulary': [
        {
          'name': 'Panel1A',
          'title': 'Selecting and Defining Vocabulary Words',
          'text': [
            {
              "id": "H2NWSeuZokokhwU15i_kD",
              "label": 'How do you select words to define during book readings? Are they important for understanding concepts, the plot, or character’s feelings, etc.?'
            },
            {
              "id": "M8yk6SfAB-MPBKMfgE-A2",
              "label": 'Talk about how you define words in kid-friendly terms.'
            },
            {
              "id": "-umiwtyx0CyWgMOA4GW3Z",
              "label": 'How does your teaching of vocabulary words change over repeated readings of the book? (e.g., Do you define the word during the first reading, then ask children to define or discuss it during the second or third readings?)'
            }
          ]
        },
        {
          'name': 'Panel1B',
          'title': 'Discussing Vocabulary Words',
          'text': [
            {
              "id": "obuMTGaeUR3AoIFCDUqmP",
              "label": 'How do you encourage your students to talk about words? Do you ask them to compare words, or come up with their own examples of a word? (Tell us about a time when you felt timid? or What is another word for timid?)'
            },
            {
              "id": "yDlAujttSFxA0Pm82qrdG",
              "label": 'Talk about how you plan small group or center-time activities after book readings that provide time for discussions about new vocabulary words.'
            }
          ]
        },
        {
          'name': 'Panel1C',
          'title': 'Promoting Children’s Use of Vocabulary Words',
          'text': [
            {
              "id": "lNlkfaHDwbh3CKcvlKNUb",
              "label": 'When children first learn a new word, they may not be able to use it yet. Talk about how you support children in using words during book reading and throughout the day.'
            },
            {
              "id": "d0M8tOKn2VNQPIqspjDO3",
              "label": 'How do you arrange learning centers to support students’ use of words? Do you add props or signs depicting vocabulary words to the science center or dramatic play? Do you guide the conversation or children’s play in ways that new vocabulary words will be used or discussed?'
            }
          ]
        },
        {
          'name': 'Panel1D',
          'title': 'Multimodal Instruction',
          'text': [
            {
              "id": "VTD5qNg3JgrfS3F6hs_hs",
              "label": 'How do you teach the meaning of words with the help of multimodal strategies, like pointing to pictures in the book, using a gesture or action, sharing objects, showing visuals or short videos, acting words out, etc.?'
            },
            {
              "id": "eQWBUDcxm4bAaIoRWA7Di",
              "label": 'Talk about how you involve your students in multimodal instruction. Do you encourage them to act out words, copy your gestures, or use objects that relate to vocabulary words?'
            }
          ]
        },
        {
          'name': 'Panel1E',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "mXLnE6QFRHNZkjbcqtdVb",
              "label": 'Talk about how you connect vocabulary words with children’s home languages. Are there cognates, or similar words, in English and their home language (e.g., family and familia)?'
            },
            {
              "id": "a1pn-0GmVEAaQLRcnzv5E",
              "label": 'How do you use brief peer activities (like turn and talk/act out) to support dual language learners’ word learning during book readings?'
            },
            {
              "id": "y40ur3FEIH0gGf5ZU45tL",
              "label": 'Talk about how you choose words to teach when considering that certain word sets can be confusing to young dual language learners. (For example, words with similar parts like expect/ inspect and antonyms like big/little, hot/cold.)'
            }
          ]
        },
        {
          'name': 'Panel1F',
          'title': 'Inclusive Teaching Practices',
          'text': [
            {
              "id": "OUyjbWxm466uW5lTwVkzW",
              "label": 'How do you adapt your teaching strategies to support children with language delays or children who use American Sign Language (ASL)?  What strategies do you personally have? What other resources do you draw on?'
            },
            {
              "id": "UVxjdYOv6Lvyq_Cd55nY6",
              "label": 'How do you select books and vocabulary words that reflect the interests and background knowledge of your students?'
            },
            {
              "id": "amTi13UD3UktsDJEsa4Y5",
              "label": 'In your experience, what are effective ways to collaborate with other teachers, like inclusion aides, speech therapists, or exceptional education teachers, to ensure they are aligning with your instructional goals and approaches?'
            }
          ]
        }
      ],
      'Listening Comprehension': [
        {
          'name': 'Panel2A',
          'title': 'Discussing Concepts Related to the Text',
          'text': [
            {
              "id": "xIQgoMmxU8-ZV94G6h0mJ",
              "label": 'How do you support your students’ understanding of new or challenging concepts presented in a book? What strategies do you like to use?'
            },
            {
              "id": "HhPbIiUvPlAiqkb5hVHsK",
              "label": 'Talk about how you activate and build on your students’ background knowledge to help them comprehend concepts in a book (a new word or idea, the plot, character motivations)?'
            }
          ]
        },
        {
          'name': 'Panel2B',
          'title': 'Retelling, Summarizing, and Sequencing',
          'text': [
            {
              "id": "7r-vBgbEevfJmp18HX_gu",
              "label": 'How do you support your students in retelling the story in a book or information from a text using their own words? What kinds of props or visual aids do you like to use?'
            },
            {
              "id": "UpcafkdUpmQd-LzQNJ96V",
              "label": 'When or how often during the book reading event do you focus on retelling or understanding the text?'
            },
            {
              "id": "_859YBNahbDBlS6mExNL7",
              "label": 'In your experience, what kinds of activities support children in sequencing events from a book into the correct order?'
            },
            {
              "id": "kwxJfd6UT75DddvYU9lKW",
              "label": 'When you read a nonfiction or informational text, what kinds of concepts do you like to sequence with your students (e.g., life cycles, science processes)?'
            }
          ]
        },
        {
          'name': 'Panel2C',
          'title': 'Reenacting or Dramatizing Stories',
          'text': [
            {
              "id": "pnQo4-XMOie9ZJ8iR2L30",
              "label": 'Talk about when you create opportunities for students to act out stories or book scenes.'
            },
            {
              "id": "9svF-nhvyIdDpygI-SJKI",
              "label": 'How do you balance reading the book and supporting students in acting out parts of the story?'
            },
            {
              "id": "Wo7DoT5_5xXR7PaxDhxMN",
              "label": 'What materials make acting out stories or scenes engaging and fun for your students (like music, props, visuals, or puppets)?'
            },
            {
              "id": "M-U400tfPmJHLaOK8giw3",
              "label": 'How do you encourage your students to use language from the read aloud as they dramatize it?'
            }
          ]
        },
        {
          'name': 'Panel2D',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "N6X2SgSVPrEcCgoKQLcQI",
              "label": 'For dual language learners who have emerging English skills, how do you support their listening comprehension? Do you use visuals, objects, multimedia like video clips, etc.?'
            },
            {
              "id": "gR48I2wv4nHV5IrA2KH0O",
              "label": 'How do you use connections to your students’ home languages to support their listening comprehension? How does your access to books that include translations or incorporate non-English words into the text help you make these connections?'
            }
          ]
        },
        {
          'name': 'Panel1E',
          'title': 'Inclusive Teaching Practices',
          'text': [
            {
              "id": "ydtlAQ0abR8QoqBdzEaEh",
              "label": 'How do you support all children in retelling or acting out stories? In your experience, what works- peer buddies, pictures to sequence for children with language delays, pre-recorded lines from the book for children to play, one child talks while another acts out a scene?'
            },
            {
              "id": "GBc2EXAISeuKI8dr7I1i2",
              "label": 'Talk about how you choose stories for retelling that reflect children’s home experiences.'
            }
          ]
        }
      ],
      'Connections to Children\'s Experiences': [
        {
          'name': 'Panel3A',
          'title': 'Selecting Texts',
          'text': [
            {
              "id": "C8Ia2nkDxcgq35r-vAltM",
              "label": 'How do you learn about your students’ language and cultural backgrounds?  Do you own or have access to books, folktales, song lyrics, poetry, oral stories, etc., that reflect the backgrounds of your students?'
            },
            {
              "id": "ziDMikUHK3aiSouJOTD8I",
              "label": 'Talk about how you integrate books that reflect your students’ background and life experiences into your units or curricular materials.'
            }
          ]
        },
        {
          'name': 'Panel3B',
          'title': 'Connecting to Children\'s Language and Cultural Backgrounds',
          'text': [
            {
              "id": "XMKoGpESTXYKlj9meIuSx",
              "label": 'Talk about how you start discussions that link book themes to your students\' language and cultural backgrounds? (What does this make you think about? How does your family…? What’s special about…?)'
            },
            {
              "id": "VQ1Dk_p3cux_KCMuCJlFP",
              "label": 'How do you gather artifacts, pictures, music, or other related things that enrich book readings that are connected to children’s backgrounds? How do you partner with families or community resources to make this happen?'
            }
          ]
        },
        {
          'name': 'Panel3C',
          'title': 'Relating to Children\'s Experiences',
          'text': [
            {
              "id": "CD7Q7RxlS-uSTIwdADo1o",
              "label": 'How do you show your students that you value stories about their home life or community happenings that connect to themes or parts of a book you’re reading?'
            },
            {
              "id": "k3LrphF9WXm4qGgR8QEZv",
              "label": 'How do you support students in making connections between classroom activities and book readings? Talk about how you plan classroom experiences that relate to book readings in your curriculum or unit plans.'
            }
          ]
        },
        {
          'name': 'Panel3D',
          'title': 'Discussing Equity and Fairness',
          'text': [
            {
              "id": "wVBOta5c8M_akYplt7SH-",
              "label": 'What are some ways that young children in your classroom can begin to think about equity and fairness? (Identify an unfair situation in a book or ask students to talk about a similar situation from their experience that seems unfair.)'
            },
            {
              "id": "_lJMjcdSV6hnt34nVN4we",
              "label": 'How do you support conversations and activities around power and fairness that are reflected in your students’ community (around  gender, race, religion, nationality, disability, the environment, or other social-political topics)?'
            },
            {
              "id": "h8MUB61RNPdOgkVJi6AeG",
              "label": 'How do you use books that show examples of activism or advocacy to serve as models for students?'
            },
            {
              "id": "0t-NRRL5Kc4ygRAZKYodh",
              "label": 'How might your students do activities around a book that empowers them to take action? (Act out or draw a more fair or equitable ending to a story, or from a different character\'s perspective? Encourage children to ask questions about differences they notice in a book or illustration?)'
            }
          ]
        }
      ],
      'Speaking and Listening Skills': [
        {
          'name': 'Panel4A',
          'title': 'Asking Open-Ended Questions',
          'text': [
            {
              "id": "73isnfCURPiLOuMRUyfQn",
              "label": 'What types of open-ended questions do you like to ask your students during book readings? Do you ask children to predict what might happen next, or use their imagination to expand on story events?'
            },
            {
              "id": "wCdv30OLOZjOslpaCW4W3",
              "label": 'When do you ask your students to make inferences, or think about events or character emotions/motivations based on information that is not directly stated in the book?'
            },
            {
              "id": "3lhq1yzR6TpQqRo01x_Y7",
              "label": 'Do you think of high-level questions in the moment or do you tend to plan them out ahead of time? How do you remind yourself about the questions you want to ask students during a book reading?'
            }
          ]
        },
        {
          'name': 'Panel4B',
          'title': 'Responding to Children',
          'text': [
            {
              "id": "oWzoGiiCAKxu4T6z-X3Bs",
              "label": 'Talk about how you respond to students’ comments during book reading to support their thinking. Do you ask a follow-up question, or give them more information on the topic with a comment?'
            },
            {
              "id": "2QApBnXeOD1TCv22eabND",
              "label": 'Given the limited time you can keep children seated for a book reading, how do you manage children’s commentary and their desire for conversation?'
            },
            {
              "id": "Czs0js5YR9T8tBLZdiDbn",
              "label": 'Do you typically read books during whole group? When might you use small group time for discussing books and responding to your students\' comments and interests?'
            }
          ]
        },
        {
          'name': 'Panel4C',
          'title': 'Encouraging Peer Talk',
          'text': [
            {
              "id": "GVqoHDbE2WBrL45tltlnS",
              "label": 'How do you support children to engage with ideas offered by their peers? (“What do others think about that?” or “Tell us what you are thinking.” or “Do you want to choose a friend to answer your question?”)'
            },
            {
              "id": "vkHVjap5kJT9MqwE4IsUP",
              "label": 'How do you support children’s ability to ask for and respond to each other’s feedback? (e.g., having students practice and use sentence stems like “I like what you said about.... ”Tell me more!” or  “Why do you think that?”)'
            },
            {
              "id": "QGVjUb1C-N6TaPssqUTg3",
              "label": 'Talk about how you pace the book reading and peer talk strategies so that all your students remain engaged and participate.'
            }
          ]
        }
      ],
      'Assessment and Planning for Instruction': [
        {
          'name': 'Panel5A',
          'title': 'Assessing Vocabulary Knowledge',
          'text': [
            {
              "id": "95NYQYM4Lf90kTgWOcWa4",
              "label": 'What strategies or tools do you use to track your students’ vocabulary learning? Do you ask them to identify a picture that represents a vocabulary word? Do you ask children to tell you about a word (What is a habitat? Or Tell me about a habitat.)'
            },
            {
              "id": "HrYUJ6PBxxgvcqH3QwN5H",
              "label": 'How might you keep track of when and how your students are using new vocabulary words during centers or activities throughout the day? What formative assessment tools do you like to use- anecdotal notes, post-it notes in a folder, paper checklist?'
            }
          ]
        },
        {
          'name': 'Panel5B',
          'title': 'Assessing Listening Comprehension',
          'text': [
            {
              "id": "Em7ooVEL6WB1QnHaU0nCn",
              "label": 'Talk about how you assess your students’ ability to listen and understand books that they hear? (Do you keep track of how often they answer questions during a book reading?)'
            },
            {
              "id": "sDiBjS5YC9qw1qur_3bQg",
              "label": 'How do you plan for small group or one-on-one conversations with students about books- during center time or small groups? In your experience, what settings are best for observing your students’ listening comprehension?'
            }
          ]
        },
        {
          'name': 'Panel5C',
          'title': 'Planning for Book Reading',
          'text': [
            {
              "id": "VzAV8-BoEDV_rzAr46BT9",
              "label": 'What learning objectives or goals did you have in mind when planning this book reading?'
            },
            {
              "id": "ol11Z9sj_5iMqzb6PTTnZ",
              "label": 'How long was this book reading session? How does this time compare to your typical book reading?'
            },
            {
              "id": "CMg6PdVaF50AOdAVETze5",
              "label": 'How did you pace your instruction and students’ participation during this book reading? Is there anything you would change during the next book reading?'
            }
          ]
        },
        {
          'name': 'Panel5D',
          'title': 'Repeated Readings',
          'text': [
            {
              "id": "H9H8lzr3s-rfAeiyLAVru",
              "label": 'Was this book reading part of repeated book readings- was it the first, second, third, etc.? How is that going?'
            },
            {
              "id": "_PJDvDf4IaxSpCh1R3Qrg",
              "label": 'How do you decide what to focus on in each repeated book reading? What do you tend to prioritize in your teaching?'
            },
            {
              "id": "E__j5u5arNgz9_MAtI3Ed",
              "label": 'How do you respond or adapt when children get frustrated by repeated readings?'
            }
          ]
        },
        {
          'name': 'Panel5E',
          'title': 'Different Genres and Text Types',
          'text': [
            {
              "id": "OQF3eHRNnx9uvGR4nidld",
              "label": 'What types of books or texts do you and your students enjoy- fiction, nonfiction/informational, class-made books, web-based texts, etc.?'
            },
            {
              "id": "1h07SRTt4Jr1bApXwreGD",
              "label": 'How do you balance the types of texts that you read over the course of a unit or school year? What types of books do you think are important to share with your students? Why?'
            }
          ]
        },
        {
          'name': 'Panel5F',
          'title': 'Home and Community Literacy Connections',
          'text': [
            {
              "id": "X4RupWD8eutSqL-oVGTmU",
              "label": 'Talk about how you create texts that connect to your students’ personal experiences or interests. (Translate a favorite nursery rhyme or song into students’ home language using internet resources or parent translation. Families record a story or song that the teacher transcribes on big paper, reads to children, and has the children illustrate.)'
            },
            {
              "id": "j3KGPmOdPoRcy5o_H3rlL",
              "label": 'How do you invite family and community members into the classroom to share their expertise and enjoyment of texts? How do you take advantage of technology to invite families and community members into the classroom?'
            }
          ]
        }
      ]
    },
    'Language': {
      'Discussing Vocabulary and Concepts': [
        {
          'name': 'Panel1A',
          'title': 'Props and Objects',
          'text': [
            {
              "id": "MRMpp9EbKnAmNHOUcd_9k",
              "label": 'How do you use props or objects to start conversations with your students about vocabulary words or concepts?'
            },
            {
              "id": "6cQuCA_1b-XPYY2-UYwv1",
              "label": 'How can you use objects or artifacts valued in children’s homes and communities to build on their vocabulary knowledge?'
            },
            {
              "id": "d2VxqQERQUd44KcgrZf2e",
              "label": 'In what activity settings do you have conversations with children about props or objects that support their word learning- large group, small group, learning centers, etc.?'
            }
          ]
        },
        {
          'name': 'Panel1B',
          'title': 'Defining Vocabulary Words',
          'text': [
            {
              "id": "BtwCa50_vBM2x2EnMudBE",
              "label": 'How do you decide what words to define for your students during small group or center-time activities? (Do you decide what words to focus on based on students’ play/activity in the moment? Do you plan activities that focus on specific vocabulary words connected to the curriculum, etc.?)'
            },
            {
              "id": "OX54SJMECpgt76YscC722",
              "label": 'Talk about how you define words in kid-friendly terms.'
            },
            {
              "id": "XwWL8AkjzovMZqsBgB_1x",
              "label": 'How do you teach the meaning of words with the help of multimodal strategies, like pointing to pictures in a book or magazine, using a gesture or action, sharing objects, showing visuals or short videos, acting words out, etc.?'
            }
          ]
        },
        {
          'name': 'Panel1C',
          'title': 'Discussing Vocabulary Words',
          'text': [
            {
              "id": "RIakGYjvJ9PuDBeKRxY-4",
              "label": 'How do you encourage your students to talk about words? Do you ask them to compare words, or come up with their own examples of a word? (Tell us about a time when you felt timid? or What is another word for timid?)'
            },
            {
              "id": "hYtHq8Lib_BaoMoXTj0jk",
              "label": 'In your experience, what can teachers do to foster word-consciousness, or awareness of words, in their classrooms? (Does everyone cheer when a classmate uses a new word? Do students ask about the meaning of new or unknown words?)'
            }
          ]
        },
        {
          'name': 'Panel1D',
          'title': 'Promoting Children’s Use of Vocabulary Words',
          'text': [
            {
              "id": "bsFY9gi6Bmg6TL2vIqu4O",
              "label": 'When children first learn a new word, they may not be able to use it yet. Talk about how you support children in using words throughout the day.'
            },
            {
              "id": "OH5Ghu-abWi8Ph7dlJvoR",
              "label": 'How do you arrange learning centers to support students’ use of words? Do you add props or signs depicting vocabulary words to the science center or dramatic play? Do you guide the conversation or children’s play in ways that new vocabulary words will be used or discussed?'
            }
          ]
        },
        {
          'name': 'Panel1E',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "0lE6laMRZdrsGh0-8ewB3",
              "label": 'Talk about how you connect vocabulary words with children’s home languages. Are there cognates, or similar words, in English and their home language (e.g., family and familia)?'
            },
            {
              "id": "5ilcfz2GcjV--GtlQxzz4",
              "label": 'Talk about how you choose words to teach when considering that certain word sets can be confusing to young dual language learners. (For example, words with similar parts like expect/inspect and antonyms like big/little, hot/cold.)'
            },
            {
              "id": "HLTig8ELCx4ru4CRfDiQh",
              "label": 'How do you show children that you value their ideas and vocabulary development rather than their grammatical correctness?'
            }
          ]
        },
        {
          'name': 'Panel1F',
          'title': 'Inclusive Teaching Practices',
          'text': [
            {
              "id": "wEmcSttD69oHvVsu2jpQu",
              "label": 'How do you adapt your teaching strategies to support children with language delays or children who use American Sign Language (ASL)?  What strategies do you personally have? What other resources do you draw on?'
            },
            {
              "id": "T-1PKf9uvzMbHsd5eQy8-",
              "label": 'How do you select vocabulary words and materials that reflect the interests and background knowledge of your students?'
            },
            {
              "id": "X6EinlFCZ5Cfym1MK-yOB",
              "label": 'In your experience, what are effective ways to collaborate with other teachers, like inclusion aides, speech therapists, or exceptional education teachers, to ensure they are aligning with your instructional goals and approaches?'
            }
          ]
        }
      ],
      'Talking about Social-Emotional Topics': [
        {
          'name': 'Panel2A',
          'title': 'Modeling Talk about Social-Emotional Topics',
          'text': [
            {
              "id": "EIzM7HyNrbNW7xWk77lyn",
              "label": 'How and when do you model for your students how to talk about emotions or solve problems?'
            },
            {
              "id": "0tySKE8XaWUeZSCCCdEih",
              "label": 'How do you use supporting materials like puppets, videos, scripted stories, or strategies like role-playing, when you act out how to talk about emotions or solve problems?'
            }
          ]
        },
        {
          'name': 'Panel2B',
          'title': 'Facilitating Cooperative Learning Activities',
          'text': [
            {
              "id": "x0TDWQCVjxcegu8m3XOqV",
              "label": 'What steps do you take to set the stage for cooperative learning activities that require children to communicate about taking turns, how to play, or solving problems?'
            },
            {
              "id": "AC60CT0ElQIft6BR_eUt6",
              "label": 'In your experience, what toys, games, or materials increase your students’ opportunities for talking to each other?'
            }
          ]
        },
        {
          'name': 'Panel2C',
          'title': 'Discussing Feelings and Emotions',
          'text': [
            {
              "id": "S5qwTy866xF85DEdSvius",
              "label": 'How do you like to teach vocabulary words that help children describe their feelings? When during the day do you talk about feelings- during planned lessons, spontaneous interactions?'
            },
            {
              "id": "cR-PKttJOA-shEzuKxG0H",
              "label": 'What multimodal strategies (like music, games, or feelings charts) support your students’ ability to label or describe their emotions and feelings?'
            }
          ]
        },
        {
          'name': 'Panel2D',
          'title': 'Problem-Solving Conversations',
          'text': [
            {
              "id": "nR3gx_QHSHGBKJJ0-shlA",
              "label": 'How do you plan activities that will give your students opportunities to talk about and solve problems? (activities that require sharing, taking turns, etc.)'
            },
            {
              "id": "khIyBOxpj1CR4_rOIusxv",
              "label": 'What materials support your students’ problem-solving conversations, like solution cards or visuals that are individualized for specific students?'
            },
            {
              "id": "FkQfHzTaXQk-KYQHelw7O",
              "label": 'Talk about how you anticipate problems around the classroom and proactively support your students in talking about potential solutions.'
            }
          ]
        },
        {
          'name': 'Panel1E',
          'title': 'Inclusive Teacher Practices',
          'text': [
            {
              "id": "55vpLIvGiKOnQAaAhKRyX",
              "label": 'What types of strategies do you use to support the communication and play skills of children with exceptional needs, like role-play, peer partners, buddy systems or positive reinforcement?'
            },
            {
              "id": "P9HO0w1O9XCPv4YGfzNic",
              "label": 'How do you support all of your students’ ability to a) recognize and b) begin to talk about their feelings and emotions? What materials, visuals, and modeling strategies do you find to be effective?'
            }
          ]
        }
      ],
      'Encouraging Children to Talk': [
        {
          'name': 'Panel3A',
          'title': 'Encouraging Children to Tell Stories',
          'text': [
            {
              "id": "08VlXMZPhAUXrcGNSD5Q9",
              "label": 'When during the day do you notice students telling or acting out stories about their experiences?'
            },
            {
              "id": "a3FGMupsS75quMaj81tv3",
              "label": 'How do you support children to share more or add more details when they talk about or tell stories about their lives? What kinds of questions are effective, in your experience?'
            },
            {
              "id": "pdLDIlHnKTg_CfAeM5pXh",
              "label": 'How do you support your students in retelling favorite stories, books, or fairy tales?'
            }
          ]
        },
        {
          'name': 'Panel3B',
          'title': 'Supporting Peer Conversations',
          'text': [
            {
              "id": "d4iz5R_Gorekk-5sRG1VY",
              "label": 'In your experience, what types of small-group activities lead to more peer conversations? (games, interviews on a fun topic, shared storytelling, guess my object, pretend play, etc.)'
            },
            {
              "id": "DMkmJjrr5dV1PJa0XWrbj",
              "label": 'How do you provide opportunities for children to ask each other questions? How can you model children asking each other questions?  (i.e., having students practice and use sentence stems like “I like what you said about....”, ”Tell me more!” or  “Why do you think that?”)'
            }
          ]
        },
        {
          'name': 'Panel3C',
          'title': 'Asking Open-Ended Questions',
          'text': [
            {
              "id": "AE0_5hPtoh7tOeM-H_72g",
              "label": 'What topics do your students enjoy discussing?'
            },
            {
              "id": "W-frjFfSsUTtawiO1XHmM",
              "label": 'What kinds of open-ended questions spark a conversation between you and your students?'
            },
            {
              "id": "7BKLc3hr00rKo1FYeAmnR",
              "label": 'What do you notice happening when you ask children open-ended questions that don\'t have one-word answers?'
            }
          ]
        },
        {
          'name': 'Panel3D',
          'title': 'Getting to Know Your Communication Style',
          'text': [
            {
              "id": "twQEpTPAXfpT4_8LmKr_6",
              "label": 'Since learning about our own conversation styles can help us better connect with our students, how would you describe your unique style of conversation? In what types of situations do you feel more or less talkative?'
            },
            {
              "id": "aIU6ppcdxy0PsBAy73IMm",
              "label": 'How does your communication style compare to the style of your culturally and linguistically diverse students?'
            },
            {
              "id": "eapFCgqnCno_ecxncZlBf",
              "label": 'How is your home language tradition similar to, or different from, the academic talk used most often in schools?'
            }
          ]
        },
        {
          'name': 'Panel3E',
          'title': 'Culturally Diverse Communication Styles',
          'text': [
            {
              "id": "A64yY6_B9z0KgNxLj7joi",
              "label": 'Given cultural differences in how people have conversations, what strategies do you use to get to know your students’ home language experiences and traditions? (informal conversations at drop-off/pick-up; parent-teacher conferences or home visits; a survey about how students talk at home, etc.?)'
            },
            {
              "id": "RpY_Zi0O1T3y1HNb7GDcd",
              "label": 'How do you show children that you value their home language or dialect? How do you let them know it is okay to speak one language or dialect at school and another language at home (i.e, code-switching)?'
            }
          ]
        },
        {
          'name': 'Panel3F',
          'title': 'Dual Language Learners',
          'text': [
            {
              "id": "YaExFew94vdQ1EhwiYrv1",
              "label": 'In your experience, what materials encourage dual language learners to talk and participate during conversations- objects, pictures, gestures, actions?'
            },
            {
              "id": "Qv1LEt7v0pqo3_aI_xBuY",
              "label": 'How do you create an environment in your classroom that welcomes students’ use of their home languages and encourages all students to be curious about and respect different languages?'
            }
          ]
        }
      ],
      'Responding to Children': [
        {
          'name': 'Panel4A',
          'title': 'Supporting Teacher Reflection on Language',
          'text': [
            {
              "id": "n6j7E5pUIKFEv7Rv7merY",
              "label": 'What tools would you find useful for reflecting on your language and conversations with children? (Short audio or video recordings? Coach notes and transcription of your teacher-child conversations during a specific activity?)'
            }
          ]
        },
        {
          'name': 'Panel4B',
          'title': 'Repeating and Clarifying Child Comments',
          'text': [
            {
              "id": "ISdDHV2_oKVhMgUGU4BqX",
              "label": 'What have you noticed happening when you repeat what your students say? (A child says, “red,” and the teacher replies, “red...what’s red?”)'
            },
            {
              "id": "LUntGmjDNZS-TMp0VBvKQ",
              "label": 'How does clarifying children\'s comments extend the back-and-forth of the conversation? (Coaches may have specific examples of this happening in their notes from the observation to support teacher reflection.)'
            },
            {
              "id": "EYWXYAR7ha6XrT6BlP7Ry",
              "label": 'Talk about how you respond to children when you need more information to understand what they’re trying to communicate? (A child says, “money,” and the teacher replies, “Should I give you money for the groceries?” Coaches may have specific examples of conversations in their notes from the observation to support teacher reflection.'
            }
          ]
        },
        {
          'name': 'Panel4C',
          'title': 'Entering Children’s Ongoing Play',
          'text': [
            {
              "id": "ow9Az8XtfFmu6AqVmN_B_",
              "label": 'Talk about when you plan for time to observe children and follow their lead.'
            },
            {
              "id": "Zi7PT8F8eaLiiyPqH7fzw",
              "label": 'Talk about how you ask your students questions about what they are playing or doing before you enter their activity so that you can build on their ideas.'
            }
          ]
        },
        {
          'name': 'Panel4D',
          'title': 'Actively Listening to Children',
          'text': [
            {
              "id": "YRPcdFHc8srlfX1IiWiiB",
              "label": 'Talk about how you show children that you are interested in what they say (with facial expressions, smiling, nodding, etc.)'
            },
            {
              "id": "exyDykZywL-m6Ynr6IhZA",
              "label": 'How do you remember or remind yourself to give students wait time, or time to respond, during conversations?'
            }
          ]
        },
        {
          'name': 'Panel4E',
          'title': 'Responding with Follow-up Questions',
          'text': [
            {
              "id": "bTjzs8rkJWDwwjk5fAu4g",
              "label": 'What types of questions do you like to ask your students to keep the conversation going and support their thinking? (Informing questions that begin with who/when/what/where; Analyzing questions that begin with how or why; Brainstorming questions that begin with what if, etc.?)'
            },
            {
              "id": "bFZ1RzdLQPQRf8wKzcR22",
              "label": 'How or when do you use informative comments to support your students\' thinking during conversations?'
            }
          ]
        }
      ],
      'Assessment and Planning for Conversations': [
        {
          'name': 'Panel5A',
          'title': 'Observing Children’s Language Skills',
          'text': [
            {
              "id": "t5F9-ystnHIRvvV2lgHEB",
              "label": 'How do you keep track of when and how your students are using new vocabulary words during centers or activities throughout the day? What formative assessment tools do you like to use- anecdotal notes, post-it notes in a folder, paper checklist?'
            },
            {
              "id": "C3iXxCt-zvjsBgpRujPVL",
              "label": 'What do you notice about your students\' language use?  For example, what types of activities or content motivates them to talk, and how are those factors different for each student? Talk about how you collect and organize this type of information.'
            }
          ]
        },
        {
          'name': 'Panel5B',
          'title': 'Tracking Teacher-Child Conversations',
          'text': [
            {
              "id": "CvXH6CMR5Uuk2sYl-XJ2h",
              "label": 'What tools are helpful for keeping track of how often you have meaningful conversations with children throughout the week (like checklists, calendars, or notebooks)?'
            },
            {
              "id": "apcLXkRjk7tW1aQ5KF_68",
              "label": 'How do you keep track of which centers you visit and how long you stay at each? What do you notice about centers that lead to the most interesting or sustained conversations with your students?'
            }
          ]
        },
        {
          'name': 'Panel5C',
          'title': 'Monitoring Peer Conversation Progress',
          'text': [
            {
              "id": "G-68x44pcl4TQAAt4FgBL",
              "label": 'How do you plan to monitor your students’ peer conversations over time? Do you select  a few children to observe each day during child-led activities like centers or small groups that don’t require adult facilitation?'
            },
            {
              "id": "ILtyPj3zXoeLBG8GDRulR",
              "label": 'What do you watch for as you observe how your students work and play with their peers? (Does the student start conversations with other children or a special friend? Does the student attempt to talk to children who are different from them? For how long? About what?)'
            }
          ]
        },
        {
          'name': 'Panel5D',
          'title': 'Planning Teacher-Child Conversations',
          'text': [
            {
              "id": "_CnFfD6CMM4r_2b0AnPrd",
              "label": 'What steps do you take to plan for interactions that build on your students’ interests and encourage them to talk and engage with you?'
            },
            {
              "id": "HD-7gy7E-eGDSZPvJcjR5",
              "label": 'How do you plan to have one-on-one conversations with each of your students throughout the week?'
            },
            {
              "id": "lCB_kGnyz3Qyda88zs1Qu",
              "label": 'What materials help you engage in conversations with your students who are culturally and linguistically diverse or with your students who do not typically start conversations with others?'
            }
          ]
        },
        {
          'name': 'Panel5E',
          'title': 'Planning Small-Group Peer Conversations',
          'text': [
            {
              "id": "SOVgR-uCsBO_Z5z7mtyra",
              "label": 'What steps do you take to plan for children to have peer conversations during small group or center time?'
            },
            {
              "id": "uifOYHbmaeEyxfsAWHeHC",
              "label": 'What types of literacy, math, science, or social-emotional development activities do you use to foster small-group conversations? What learning objectives guide your planning of the conversation?'
            },
            {
              "id": "4MjrRnbr33fsYdl2KB7Du",
              "label": 'Talk about how you choose open-ended questions to ask children during small-group activities.'
            }
          ]
        },
        {
          'name': 'Panel5F',
          'title': 'Culturally and Linguistically Diverse Students',
          'text': [
            {
              "id": "8xkaRUIejkxXv_H246BL7",
              "label": 'How do you meet the needs of culturally and linguistically diverse students who are quiet during conversations? (Learn a few key words from the child’s home language, teach them to peers, and encourage their use around the classroom? If possible, pair them with another child who speaks their home language to prevent feelings of isolation until their English skills become stronger, then encourage them to pretend play with peers?)'
            }
          ]
        }
      ]
    }
  }
}
