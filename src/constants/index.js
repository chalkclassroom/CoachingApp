import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import { red } from "@material-ui/core/es/colors";

// Colors
export const AppBarColor = "#459aeb";
export const TransitionColor = '#094492';
export const ClimateColor = '#0988ec';
export const MathColor = '#e55529';
export const EngagementColor = '#e99c2e';
export const InstructionColor = '#009365';
export const ListeningColor = '#4fd9b3';
export const SequentialColor = '#ffd300';
export const ACColor = '#6f39c4';
export const RedGraphColor = "#ec2409";
export const NotPresentColor = "#bababa";

export const TransitionTypeColors = {
  lineColor: lightGreen[300],
  travelingColor: orange[400],
  waitingColor: deepOrange[400],
  routinesColor: blue[300],
  behaviorManagementColor: red['A200'],
  otherColor: indigo['A200'],
}


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
  'role': 'Research Coordinator',
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
  'job': 'Assistant Professor of Psychology',
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
  'job': 'Deputy Policy Director for Opportunity Insights',
  'affiliation': 'Harvard University'
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

// Coaching Questions
export const CoachingQuestions = {
  'Transition': {
    'LineQuestions': [
      {
        'name': "TransitionPanel1A",
        'title': "Line-up Process",
        'text': [
          "How do you like to transition children from " +
          "where they are in the classroom to the line-up area?",
          "Do you prefer to line them up individually or send them in groups?"
        ]
      },
      {
        'name': "TransitionPanel1B",
        'title': "Child Engagement",
        'text': [
          "Talk about any types of activities that help children transition during the line-up process.",
          "How do you all decide on what transition activities to do with children?"
        ]
      },
      {
        'name': "TransitionPanel1C",
        'title': "Causes for Waiting",
        'text': [
          "Talk about what children do when they get in line. Do they have designated spots to stand on?",
          "Do certain children have more difficulty lining up? What might help them?"
        ]
      }
    ],
    'TravelingQuestions': [
      {
        'name': "TransitionPanel2A",
        'title': "Travel Destinations",
        'text': [
          "Let's think about the transitions that children make outside the classroom. " +
          "What's outside of your control and what do you have some control over?",
          "Example: We have to walk to the playground on the other side of the building, but we could " +
          "get creative about ways to reduce time spent on bathroom breaks in the hallway."
        ]
      },
      {
        'name': "TransitionPanel2B",
        'title': "Practice and Positive Reinforcement",
        'text':  [
          "Talk about how you reinforce children's successes during transitions." +
          "What's the most effective way you encourage them?"
        ]
      },
      {
        'name': "TransitionPanel2C",
        'title': "Revisiting Routines and Expectations",
        'text': [
          "Talk about some of the transition skills children may need to relearn or practice." +
          "What have you been noticing lately about their challenges during " +
          "transitions outside the classroom?"
        ]
      },
      {
        'name': "TransitionPanel2D",
        'title': "Individualized Support",
        'text': [
          "What are some strategies that help children " +
          "with challenging behavior during long transitions outside the classroom?" +
          "What do children with challenging behavior need to be successful? What motivates " +
          "them at other times during the day?"
        ]
      },
      {
        'name': "TransitionPanel2E",
        'title': "Child Engagement",
        'text': [
          "How do you engage children during walks to other parts of the school building " +
          "(e.g., pretending to walk like an animal)?",
          "Since you can't get around walking that way to the playground, talk about " + 
          "strategies you've used in the past to keep the children engaged. What works?"
        ]
      }
    ],
    'WaitingQuestions': [
      {
        'name': "TransitionPanel3A",
        'title': "Preparation of Materials",
        'text': [
          "Talk about the best time of the day that you've found for gathering materials for " +
          "lessons and activities.",
          "Are there challenging times as well?"
        ]
      },
      {
        'name': "TransitionPanel3B",
        'title': "Teacher Teamwork",
        'text': [
          "How do you and your co-teacher help each other with lesson prep and organization? " +
          "In your experience, what systems seem to work best?",
          "If you could try something new around getting ready for a lesson, what would it be?"
        ]
      },
      {
        'name': "TransitionPanel3C",
        'title': "Child Engagement",
        'text': [
          "Talk about the times of the day that you feel the most organized and prepared.",
          "What are the differences in children's behavior when you feel prepared?"
        ]
      },
      {
        'name': "TransitionPanel3D",
        'title': "Classroom Organization",
        'text': [
          "Talk about how the classroom environment and layout affect children's waiting time.",
          "Where are materials for different activities stored and how quickly can children access materials?"
        ]
      }
    ],
    'RoutinesQuestions': [
      {
        'name': "TransitionPanel4A",
        'title': "Types of Routines",
        'text': [
          "Talk about all the different classroom routines that happen each day. " +
          "Which types are more challenging for children? Why might that be?",
          "Are there one or two classroom routines that you want to focus on? " +
          "On a perfect day, what might those routines look like?"
        ]
      },
      {
        'name': "TransitionPanel4B",
        'title': "Classroom Organization",
        'text': [
          "Talk about the relationship between classroom environment/layout and children's transition time.",
          "Do children spend too much time cleaning up materials? What helps them know where to " +
          "put materials? How does the amount of materials affect clean-up time?",
          "What visuals or other strategies help them during classroom routines?"
        ]
      },
      {
        'name': "TransitionPanel4C",
        'title': "Centers",
        'text': [
          "Talk about the routines and systems that help children choose centers " +
          "and move between centers. What's going well this year?",
          "How are children doing with a) choosing their first center, " +
          "b) leaving one center and going to another one, c) sticking with an activity once they begin?"
        ]
      },
      {
        'name': "TransitionPanel4D",
        'title': "Teacher Teamwork",
        'text': [
          "Talk about how you and your co-teacher work together to make transitions go smoothly.",
          "Do you have designated roles for transition times throughout the day?"
        ]
      },
      {
        'name': "TransitionPanel4E",
        'title': "Number of Transitions",
        'text': [
          "If you could get rid of one transition, what would it be? Is there a " +
          "time of day when you feel like you're constantly reminding children where they should be?", 
          "Look at the daily schedule for any transitions that could be changed or removed."
        ]
      }
    ],
    'BehaviorQuestions': [
      {
        'name': "TransitionPanel5A",
        'title': "Communicating Expectations",
        'text': [
          "Talk about the types of strategies (verbal, visual, gesture) you like to use to " +
          "communicate behavior expectations before, during, and/or after transitions?",
          "Do children know where to go and what to do during a transition? How do they know?"
        ]
      },
      {
        'name': "TransitionPanel5B",
        'title': "Individualized Support",
        'text': [
          "Talk about children who might benefit from individualized strategies to help them during transitions.",
          "What has worked in the past? What have you been thinking about trying?"
        ]
      },
      {
        'name': "TransitionPanel5C",
        'title': "Teacher Teamwork",
        'text': [
          "Talk about how you and the co-teacher work together to teach and reinforce behavior " +
          "expectations during transitions. What has worked? What felt less effective?",
          "How do you decide which member of the teaching team leads the different transitions " +
          "across the day?"
        ]
      },
      {
        'name': "TransitionPanel5D",
        'title': "Reinforcing Behaviors",
        'text': [
          "Talk about how you let children know when they do a transition well. " +
          "What are you looking for so that you can give them positive reinforcement?",
          "How do you respond when they don't meet behavior expectations during transitions?"
        ]
      },
      {
        'name': "TransitionPanel5E",
        'title': "Consistency of Routines",
        'text': [
          "Talk about the challenges you and/or children experience during transitions.",
          "Which part of the transition is the most challenging for children? Why might that be?"
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
          'Talk about the types of child behaviors you typically look for and praise.',
          'What effect does your praise have on children and their learning?'
        ]
      },
      {
        'name': 'ClimatePanel1B',
        'title': 'Time of Day',
        'text': [
          'Talk about times during your schedule (whole group, center time, etc.) ' +
          'that you use behavior approving as a strategy for behavior management.',
          'How does it work in your experience?'
        ]
      },
      {
        'name': 'ClimatePanel1C',
        'title': 'Effort and Ability',
        'text': [
          'Talk about the behaviors you look for when you want to praise children\'s behavior.',
          'When do you decide to praise children\'s effort versus their skill level?'
        ]
      },
      {
        'name': 'ClimatePanel1D',
        'title': 'Specific Children',
        'text': [
          'Talk about how you use praise with different children throughout the day.',
          'Are there children that you worry about--those kids who may not seek out attention?'
        ]
      },
      {
        'name': 'ClimatePanel1E',
        'title': 'Challenging Behavior',
        'text': [
          'It\'s sometimes difficult to find moments to praise children with challenging behavior--' +
          'how do you find ways to praise even the smallest accomplishments?',
          'How do you see past challenging behaviors and give all children positive attention?'
        ]
      },
    ],
    'Redirections': [
      {
        'name': 'ClimatePanel2A',
        'title': 'Activity Type',
        'text': [
          'Are there certain activities during which you feel like you\'re redirecting ' +
          'the children more often? Why might that be?',
          'Do you feel like your redirections are over smaller or more serious issues?'
        ]
      },
      {
        'name': 'ClimatePanel2B',
        'title': 'Time of Day',
        'text': [
          'Think about a time of day in which children really know the classroom ' +
          'routines. What strategies did you use to get them to this point?',
          'Talk about how those strategies could help them learn routines during other ' + 
          'times of the day that feel more stressful.'
        ]
      },
      {
        'name': 'ClimatePanel2C',
        'title': 'Revisiting Expectations',
        'text': [
          'Are there any redirections you give to children that you feel are repetitive?',
          'Talk about some strategies you could use before activities that are challenging ' +
          'for children (modeling what you want the children to do, asking them to practice, ' +
          'then giving specific praise, etc.)?'
        ]
      },
      {
        'name': 'ClimatePanel2D',
        'title': 'Specific Children',
        'text': [
          'Talk about children who might benefit from more strategies (like visuals, ' +
          'a buddy system, or small group/1:1 teaching) to help them with behavior expectations.',
          'Do certain children require more redirections than others? What are their challenges?',
          'In your experience, what strategies might suppport them?'
        ]
      },
    ],
    'Disapprovals': [
      {
        'name': 'ClimatePanel3A',
        'title': 'Activity Type',
        'text': [
          'Think about the type of activity when disapprovals are more frequent.',
          'What might be the cause of children\'s behaviors during whole group, small ' +
          'group, or centers that lead to disapprovals?',
        ]
      },
      {
        'name': 'ClimatePanel3B',
        'title': 'Time of Day',
        'text': [
          'Talk about times of day (arrival, after lunch, dismissal, etc.) that are ' +
          'more challenging for children.',
          'What strategies have you used that help children during these times of day?'
        ]
      },
      {
        'name': 'ClimatePanel3C',
        'title': 'Challenging Behavior',
        'text': [
          'We all know of child behaviors that get under our skin and lead to anger and irritation. ' +
          'How can we reframe those behaviors?',
          'Example: You might reframe hitting with "perhaps the child hits frequently because he ' +
          'wants attention from peers but doesn\'t know how to get it any other way."',
          'What can we do to proactively teach children the skills that they need to reduce ' +
          'these behaviors?'
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
          'Which resources are the most helpful for planning math activities?',
          'Which resources are the most helpful for describing what math ' +
          'concepts children are supposed to learn about in preschool?',
        ]
      },
      {
        'name': 'MathPanel1B',
        'title': 'Materials',
        'text': [
          'Talk about the variety of math materials at each center in the classroom.',
          'How do children use math materials--independently, in small groups, ' +
          'with teacher support?'
        ]
      },
      {
        'name': 'MathPanel1C',
        'title': 'Counting Collections',
        'text': [
          'Talk about opportunities that children have for counting collections ' +
          'of objects.', 
          'How does counting different sets of objects help children understand ' +
          'quantity?',
          'How can observing children\'s counting strategies help you as the ' +
          'teacher challenge them to use more advanced strategies?'
        ]
      },
      {
        'name': 'MathPanel1D',
        'title': 'Comparing Quantities',
        'text': [
          'Talk about how children compare two or more collections or sets of objects.',
          'What are some effective methods and activities for getting children to ' + 
          'talk about their comparisons and to use math vocabulary?',
        ]
      },
      {
        'name': 'MathPanel1E',
        'title': 'Connecting Numerals to Counted Objects',
        'text': [
          'What are some activities and materials that help children understand ' +
          'written numerals?'
        ]
      },
    ],
    'MeasurementAndData': [
      {
        'name': 'MathPanel2A',
        'title': 'Size, Length, and Weight',
        'text': [
          'Talk about the different ways children can practice measuring ' +
          'skills in the classroom. Are there materials for measuring ' +
          'size, length, and weight?',
          'How do children use non-standard tools (e.g., cubes, plastic ' +
          'chains, yarn) and standard tools (e.g., rulers, balance scales, ' +
          'measuring cups) to measure materials?',
          'When do children talk most about comparing and measuring things? ' +
          'How can you as the teacher build on their curiosity?'
        ]
      },
      {
        'name': 'MathPanel2B',
        'title': 'Estimating',
        'text': [
          'Talk about the opportunities that children have for estimating ' +
          'measurement (e.g., making an informed guess about an object\'s ' +
          'length or weight).',
          'What activities might motivate children to estimate measurements? ' +
          'Are they curious to see if their estimations are close to ' +
          'measurements using standard tools?'
        ]
      },
      {
        'name': 'MathPanel2C',
        'title': 'Understanding Time',
        'text': [
          'How do children show that they are beginning to understand ' +
          'concepts about time?', 
          'What materials support children\'s thinking about time, such as ' +
          'visual schedules or sand timers? How do you use these?',
        ]
      },
      {
        'name': 'MathPanel2D',
        'title': 'Working with Data',
        'text': [
          'What types of data representations, or graphs (that use physical ' +
          'objects, pictures, and/or symbols) do children interact with ' + 
          'in the classroom?',
          'What kinds of opportunities do children have for coming up with ' + 
          'their own questions, collecting data, and making sense of the data?',
        ]
      }
    ],
    'Patterns': [
      {
        'name': 'MathPanel3A',
        'title': 'Recognizing Patterns',
        'text': [
          'Talk about the different ways that children notice patterns ' +
          'in their school environment (music, clapping, blocks)?',
          'What books in your library might support children\'s pattern ' +
          'recognition?'
        ]
      },
      {
        'name': 'MathPanel3B',
        'title': 'Creating Patterns',
        'text': [
          'What materials encourage children to create their own patterns? ' +
          'How so?',
          'What kinds of support do children need to begin creating patterns?'
        ]
      },
      {
        'name': 'MathPanel3C',
        'title': 'Extending Patterns',
        'text': [
          'What are some strategies for challenging children to extend ' +
          'beyond ABAB patterns, such as translating patterns from one ' +
          'material to another?',
          'What kinds of experiences do children have with "growing ' +
          'patterns," or patterns that grow by a specific amount (e.g., ' +
          'a series of towers that grow by 2 blocks each time)?'
        ]
      },
    ],
    'ShapesAndSpatialReasoning': [
      {
        'name': 'MathPanel4A',
        'title': 'Identifying Shapes',
        'text': [
          'Talk about the ways that children notice and identify shapes ' +
          'using classroom materials.',
          'What are some good activities for helping children understand ' +
          'the unique characteristics of different shapes (e.g., all ' +
          'triangles have 3 sides).'
        ]
      },
      {
        'name': 'MathPanel4B',
        'title': 'Manipulating Shapes',
        'text': [
          'What types of materials encourage children to build and take ' +
          'apart shapes?',
          'What have you noticed about children\'s learning when they ' +
          'construct their own shapes versus when they identify existing ' +
          'shapes?'
        ]
      },
      {
        'name': 'MathPanel4C',
        'title': 'Using Positional Words',
        'text': [
          'Talk about strategies for modeling positional words in your ' +
          'conversations with children.',
          'How might books, physical activities, and giving directions ' +
          'provide opportunities for teaching positional words?'
        ]
      },
      {
        'name': 'MathPanel4D',
        'title': 'Working with Maps',
        'text': [
          'How might children begin to use simple maps (e.g., looking ' +
          'at a map of their playground or classroom)?',
          'What are some ways that maps could be used to enhance ' +
          'children\'s play (e.g., drawing a diagram of a block structure ' +
          'they plan to build)?'
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'MathPanel5A',
        'title': 'Using Math Vocabulary',
        'text': [
          'Talk about the benefits of using math vocabulary during ' +
          'interactions with children.',
          'What types of activities and interactions encourage children ' +
          'to use math vocabulary?'
        ]
      },
      {
        'name': 'MathPanel5B',
        'title': 'Asking Questions About Math',
        'text': [
          'When do you ask questions to check for children\'s understanding? ' +
          'How does it help your teaching?',
          'What kinds of questions help children explain their thinking ' +
          '(e.g., "Why do you think...?") How do they respond?'
        ]
      },
      {
        'name': 'MathPanel5C',
        'title': 'Demonstrating Math Concepts',
        'text': [
          'What math concepts or skills are helpful for you as the teacher ' +
          'to demonstrate or model for children?',
          'What are some important things to consider before demonstrating ' +
          'math to children, including what to say as you model, types of ' +
          'materials, and group size, etc.?'
        ]
      },
      {
        'name': 'MathPanel5D',
        'title': 'Building on Children\'s Play',
        'text': [
          'Talk about the benefits of using children\'s play to teach math ' +
          'concepts.',
          'Think about children\'s favorite center activities and brainstorm ' +
          'ways to highlight math concepts in ways that enriches their play.'
        ]
      },
      {
        'name': 'MathPanel5E',
        'title': 'Planning for Math',
        'text': [
          'Talk about how you plan for math activities. What questions do you ' +
          'think about before teaching (e.g., What do children already know)?',
          'What supports benefit dual language learners? What roles do ' +
          'gesture, physical actions, home language, and family partnerships ' +
          'play in your math instruction?'
        ]
      },
    ],
  },
  'AC': {
    'Associative': [
      {
        'name': 'ACPanel1A',
        'title': 'Organization',
        'text': [
          'Think about the total number of children in the classroom and the number ' + 
          'of centers that are typically open. Are there enough centers open so that ' +
          'children can spread out and participate in meaningful interactions?',
          'Are there too many centers open so that several children end up playing alone?'
        ]
      },
      {
        'name': 'ACPanel1B',
        'title': 'Time in Centers',
        'text': [
          'How does the amount of time children spend in centers affect their ' +
          'engagement in activities?',
          'How often do children switch centers? Do they choose when to switch or do ' + 
          'teachers decide?'
        ]
      },
      {
        'name': 'ACPanel1C',
        'title': 'Materials',
        'text': [
          'What kinds of props are available to children? Are there costumes and toys ' +
          'around the same theme that could encourage children to engage in pretend play ' + 
          'together (e.g., doctor\'s office, restaurant, grocery store).',
          'Are costumes, props, and toys related to read-alouds that children enjoy or that ' +
          'reflect their out of school experiences?',
          'Are there props and toys like cars, road signs, trains, animals, and/or people ' +
          'that might help children talk to each other and create scenarios as they play?',
          'Do children help each other build things? Why or why not?'
        ]
      },
    ],
    'Cooperative' : [
      {
        'name': 'ACPanel2A',
        'title': 'Organization',
        'text': [
          'Think about the total number of children in the classroom and the number ' + 
          'of centers that are typically open. Are there enough centers open so that ' +
          'children can spread out and participate in meaningful interactions?',
          'Are there too many centers open so that several children end up playing alone?'
        ]
      },
      {
        'name': 'ACPanel2B',
        'title': 'Time in Centers',
        'text': [
          'How does the amount of time children spend in centers affect their ' +
          'engagement in activities?',
          'How often do children switch centers? Do they choose when to switch or do ' + 
          'teachers decide?'
        ]
      },
      {
        'name': 'ACPanel2C',
        'title': 'Materials',
        'text': [
          'Talk about the variety of materials that are in each center.',
          'Think about the pretend play themes that children like the most. With the ' + 
          'help of props, how could you encourage them to act out a pretend play scenario ' +
          'using role speech?',
          'Are there manipulatives or games at some centers that encourage children to ' +
          'follow rules and take turns (e.g., rolling a dice or picking and matching cards ' +
          'that are the same)?',
          'When using electronic games, tablets, or computers, how can children ' +
          'be encouraged to cooperate and take turns?',
        ]
      },
    ],
    'TeacherParticipation' : [
      {
        'name': 'ACPanel3A',
        'title': 'Join Children\'s Play',
        'text': [
          'Talk about the ways that you enjoy participating in children\'s play and ' + 
          'activities. Where do you find yourself spending time during centers?',
          'What effect does your paticipation have on children?',
          'What are some effective ways to gracefully enter and exit children\'s play ' +
          'in order to facilitate more complex interactions without stopping it?'
        ]
      },
      {
        'name': 'ACPanel3B',
        'title': 'Extend Thinking',
        'text': [
          'Talk about the kinds of questions that you as the teacher can ask to extend ' +
          'children\'s thinking and promote associative or cooperative interactions.',
          'Example: If children are pretending to set up a restaurant or play family, what ' + 
          'kinds of questions would help children enrich their play (e.g., "How does the '+
          'family work together to take care of the baby?")?',
          'Example: During games, what kinds of questions do you like to ask to challenge ' +
          'children\'s thinking (e.g., "What number do you need to roll to win?")',
          'What other kinds of materials extend children\'s thinking and build on their ' +
          'curiosity (e.g., books with rich vocabulary on topics that interest children)?'
        ]
      },
      {
        'name': 'ACPanel3C',
        'title': 'Model Play and Interpersonal Skills',
        'text': [
          'In your experience, how does modeling the use of manipulatives, games, and props ' +
          'help children get engaged in activities?', 
          'Talk about the ways that you like to demonstrate the skills needed for social ' +
          'learning interactions.',
          'What are some good times of the day and activities for teaching turn-taking, ' +
          'modeling respectful talking and listening skills, or demonstrating good sportsmanship?'
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'ACPanel4A',
        'title': 'Sharing and Interacting',
        'text': [
          'When children are playing independently, what are some of the strategies ' + 
          'you might use to encourage them to share or interact with each other?',
          'What are some of the reasons children are not sharing or interacting' +
          'more often?'
        ]
      },
      {
        'name': 'ACPanel4B',
        'title': 'Communication',
        'text': [
          'What are some effective strategies you use for supporting children\'s ' +
          'ability to communicate with their peers?',
          'In your experience, what are some effective ways to pre-teach social skills ' + 
          'or support children\'s interactins in the moment?',
          'How effective are these strategies with your current students?',
        ]
      },
      {
        'name': 'ACPanel4C',
        'title': 'Problem-Solving',
        'text': [
          'Talk about how children respond to challenges during associative and cooperative ' +
          'interactions. What might they need help with (coping with feelings about losing, ' + 
          'taking turns, sharing materials, learning the underlying concepts or rules of a ' +
          'new game, etc.)?',
          'What are some ways that you can support children before problems arise (e.g., ' +
          'role-playing with puppets, teacher demonstration) and in the moment (e.g., ' +
          'peer buddy systems, teacher praise)?'
        ]
      },
      {
        'name': 'ACPanel4D',
        'title': 'Positive Feedback',
        'text': [
          'Think about how children can be encouraged to interact with each other through ' +
          'positive teacher feedback.', 
          'When you see children sharing, creating something together, or playing a ' +
          'cooperative game, what kinds of feedback would help them continue doing those things?',
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
          'Talk about opportunities that children have for using drawing and ' + 
          'writing mateirals throughout the day.',
          'How are drawing materials like crayons, markers, pencils, and paper ' +
          'distributed around the classroom?'
        ]
      },
      {
        'name': 'SequentialPanel1B',
        'title': 'Drawing',
        'text': [
          'Do children spend more time drawing without a clear purpose or do they ' +
          'more often create a drawing and can explain what the drawing represents?',
          'Talk about a time when children got excited about drawing. ' + 
          'What do you think fostered the excitement?'
        ]
      },
      {
        'name': 'SequentialPanel1C',
        'title': 'Writing',
        'text': [
          'How do teachers help children begin to make letter-like forms, letters, ' +
          'and/or create labels or a message to go with their drawings?', 
          'Talk about how you know children are ready to begin to experiment with writing.',
          'In your experience, what motivates different children to begin to write?',
        ]
      },
    ],
    'GamesAndPretendPlay': [
      {
        'name': 'SequentialPanel2A',
        'title': 'Games',
        'text': [
          'Talk about the variety of materials in the classroom that could be ' + 
          'used in a sequential or step-by-step way.',
          'Talk about the types of manipulatives or games that encourage ' +
          'children to follow rules and take turns.'
        ]
      },
      {
        'name': 'SequentialPanel2B',
        'title': 'Dramatic Play',
        'text': [
          'Talk about the kinds of thematic props that are available to children.',
          'What costumes and toys around the same theme might encourage children ' +
          'to engage in pretend play that has a predictable sequence of events, ' + 
          'like a doctor\'s office, restaurant, or grocery store?'
        ]
      },
      {
        'name': 'SequentialPanel2C',
        'title': 'Puppets and Books',
        'text': [
          'Talk about ways that children might be encouraged to act out a favorite ' +
          'book or nursery rhyme with puppets, materials in the classroom, or simple ' +
          'figures (e.g., craft sticks).',
        ]
      },
    ],
    'TeacherSupport': [
      {
        'name': 'SequentialPanel3A',
        'title': 'Sequential Materials',
        'text': [
          'Talk about what you notice when children do activities or use materials ' + 
          'that have a predetermined sequence of steps that build on each other.',
          'Talk about how often children do activities like looking for puzzle ' +
          'pieces that fit, matching pattern blocks to a pre-made design, or ' +
          'putting story picture cards in order.',
          'If these types of materials are available, but children don\'t play ' +
          'with them very often, what might help them get started?'
        ]
      },
      {
        'name': 'SequentialPanel3B',
        'title': 'Regular Objects',
        'text': [
          'Talk about the ways that children use regular objects in a step-by-step ' +
          'predictable way. For example, do they put blocks in size order from ' +
          'shortest to tallest, sort rocks by color or texture, or create letters ' + 
          'out of play-doh?',
          'What might help children do more sequential activities with everyday objects?'
        ]
      },
      {
        'name': 'SequentialPanel3C',
        'title': 'Demonstrating Sequential Activities',
        'text': [
          'Talk about the benefits of demonstrating the steps of a sequential ' +
          'activity for children.', 
          'What aspects of activities like puzzles or matching cards would be ' +
          'challenging for children in your classroom? What could teachers demonstrate ' +
          'in order to help children be successful?',
          'What time of day or activity setting would be good for teacher ' +
          'demonstrations (small group, centers)?'
        ]
      },
      {
        'name': 'SequentialPanel3D',
        'title': 'Encouraging Dramatic Play',
        'text': [
          'Let\'s talk about the pretend play themes that generate the highest ' + 
          'level of excitement and interest.',
          'Talk about how you help children speak or act in character. How are ' +
          'children encouraged to act out a clear pretend play scene that has a ' +
          'predictable sequence of events?'
        ]
      },
      {
        'name': 'SequentialPanel3E',
        'title': 'Acting Out Books',
        'text': [
          'Talk about ways to encourage children to use books in a sequential way, ' +
          'such as using self-talk to model "reading" a book even when you don\'t ' +
          'know all the words, or acting out a story with puppets.' + 
          'In what areas of the classroom can teachers encourage this type of ' +
          'sequential activity?'
        ]
      },
      {
        'name': 'SequentialPanel3F',
        'title': 'Modeling and Praising Writing',
        'text': [
          'Talk about the different ways that you encourage children to write.',
          'Talk about some effective methods for modeling different reasons for ' + 
          'writing (e.g., making a list on chart paper for what the class needs ' +
          'for recess, instructions for a game the children like to play)?',
          'During centers, how might you sit down with children and begin writing?',
          'Talk about how praise helps children continue writing? How does praising ' +
          'all forms of writing (from scribbling to letter-like forms to emerging ' +
          'spelling) help writers at all stages of development?'
        ]
      },
    ]
  }
}