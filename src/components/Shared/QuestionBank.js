 // ----- Schema -----
 // {
 //  'type':            transition type
 //    [                  array of questions
 //      {                  each question
 //       'text': string,     raw question text
 //       'options': Map        multiple choices
 //          [                    maps choice to correctness
 //            [ string: bool ]     true for correct choice, false o/w
 //          ],
 //        'feedback': string   feedback
 //      },
 //      ... more questions
 //    ],
 //   ... rest of types
 // }

const questionBank = {
  'transition':[
    {
      text: "What are the potential benefits of reducing transition time?",
      options: new Map([
        ["More time spent learning", false],
        ["Less bad behavior", false],
        ["Lower engagement in learning", false],
        ["A and B only", true],
        ["A, B, and C", false]
      ]),
      feedback: "The correct answer is D. When children spend time in transition, " +
        "there is automatically less time available for learning activities. " +
        "Moreover, when children are in transition, they are less engaged and " +
        "more likely to exhibit problematic behaviors that require behavior management."
    },
    {
      text: "Some transitions are necessary during the school day.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. Students must have some transition time in " +
        "order to switch from one activity to the next and engage in appropriate routines " +
        "such as hand washing. However, research indicates that reducing transition time " +
        "as much as possible leads to more positive child outcomes."
    },
    {
      text: "How do you know when a transition has ended?",
      options: new Map([
        ["The teacher starts singing a song with a child that has finished washing their hands",
        false],
        ["Children are not talking", false],
        ["The majority of children are engaged in an activity", true],
        ["The majority of children are sitting quietly", false]
      ]),
      feedback: "The correct answer is C. A transition has ended when the majority " +
        "of students are engaged in an activity. It is possible for students to be " +
        "sitting quietly while also being in transition if they are waiting on the " +
        "teacher or materials to begin an activity. Moreover, if a few students are " +
        "in between activities but the rest are participating in an activity, that " +
        "does not count as a transition. Likewise, if a few students have finished " +
        "washing hands or using the restroom and the teacher starts an activity with " +
        "them, the transition does not end until a majority of the students are " +
        "involved in the activity."
    },
    {
      text: "Children are walking from their classroom to the cafeteria for lunch. " +
        "The reason for this transition is:",
      options: new Map([
        ["Classroom routines", false],
        ["Behavior management interruption", false],
        ["Traveling outside the classroom", true],
        ["Other", false]
      ]),
      feedback: "The correct answer is C. When children need to get from their " +
        "classroom to another part of the school or to the playground, " +
        "the reason for their transition is traveling outside the classroom."
    },
    {
      text: "Which of the following is not considered a transition?",
      options: new Map([
        ["Two students are washing their hands while others are waiting on the carpet", false],
        ["Students line up to go the gym", false],
        ["Children raise their hands to answer a teacher's question during book reading", true],
        ["Students are cleaning up after center time / free choice", false]
      ]),
      feedback: "The correct answer is C. if children are raising their hands during book " +
        "reading, they are participating in a learning activity. Students lining up, " +
        "washing hands, waiting on the carpet, and cleaning up after center time are all " +
        "examples of transition time."
    },
    {
      text: "Ten of the 20 students in Ms. Sunshine's class are lining up and the other ten " +
        "students are still engaged in centers. Is this a transition?",
      options: new Map([
        ["Yes, because the class is leaving center time.", false],
        ["No, because he number of students lining up is not yet the majority fo the class.",
        true],
        ["Yes, because the majority of class is not engaged in a learning activity.", false],
        ["More information is needed.", false]
      ]),
      feedback: "The correct answer is B. Once the majority of the students are lining up, then " +
        "it would be considered a transition and you would start the timer in the CQ-Ref tool. " +
        "This example is not considered transition because the students were in centers first " +
        "and less than a majority have lined up. Once 11 students are no longer in centers and " +
        "are lining up, the transition would begin."
    },
    {
      text: "If children are cleaning up materials after an activity in the classroom, " +
        "how would you categorize the reason for that transition?",
      options: new Map([
        ["Classroom routines", true],
        ["Children waiting on teacher or materials", false],
        ["Traveling outside the classroom", false],
        ["Other", false]
      ]),
      feedback: "The correct answer is A. Cleaning up between activities is a regular part " +
        "of the school day and thus would be considered a classroom routine transition."
    },
    {
      text: "The teacher leaves the carpet during a whole group activity to search for a " +
        "read-aloud book in the closet. Is this a transition?",
      options: new Map([
        ["Yes", true],
        ["No", false]
      ]),
      feedback: "The correct answer is Yes. If children are waiting on the teacher or " +
        "materials, they are not engaged in a learning activity."
    },
    {
      text: "If children line up to go to the playground and then the teacher as to take " +
        "a few minutes to prepare materials, first the observer would select ____ and " +
        "then ____ as the reasons for the transition.",
      options: new Map([
        ["Lining up/waiting in line; Classroom routines", false],
        ["Classroom routines; Children waiting on teacher or materials", false],
        ["Children waiting on teacher or materials; Lining up/waiting in line", false],
        ["Lining up/waiting in line; Children waiting on teacher or materials", true]
      ]),
      feedback: "The correct answer is D. Both lining up and waiting on the teacher or " +
        "materials are reasons that children experience transitions. In the above scenario, " +
        "the children first line up and then they have to continue waiting because the " +
        "teacher is preparing materials."
    },
    {
      text: "Which of the following is associated with having high transition time?",
      options: new Map([
        ["Fewer behavior management problems", false],
        ["Less instructional time", true],
        ["More child-directed play", false],
        ["Higher student engagement", false]
      ]),
      feedback: "The correct answer is B. When children spend time in transition, there is " +
        "automatically less time available to engage in learning activities. Students tend to " +
        "exhibit more problem behaviors and lower engagement when they are in transitions."
    }
  ],
  'climate':[
    {
      text: "Experiencing a positive classroom climate is associated with greater _______.",
      options: new Map([
        ["Student engagement in learning", true],
        ["Behavior disapproving", false],
        ["Unoccupied time", false],
        ["Free time", false],
      ]),
      feedback: "The correct answer is A.  When students experience a positive classroom climate, " + 
      "they feel comfortable and are more likely to be engaged in learning activities."
    },
    {
      text: "Which of the following is NOT a component of classroom climate?",
      options: new Map([
        ["General approval", false],
        ["Specific praise", false],
        ["Redirection", false],
        ["Whole Group ", true],
      ]),
      feedback: "The correct answer is D.  Whole group is a common classroom activity, but " + 
      "classroom climate exists regardless of the activity type.  Climate is determined by a " + 
      "combination of the teacher’s tone and the amount of general approvals, specific praise, " + 
      "redirection, and behavior disapprovals that children receive."
    },
    {
      text: "Joey and Sandra are playing a board game.  The teacher comments, " + 
      "“I like the way you two are taking turns!”  This is an example of:",
      options: new Map([
        ["General approval", false],
        ["Specific praise", true],
        ["Redirection", false],
        ["Neutral affect", false],
      ]),
      feedback: "The correct answer is B.  By giving a positive comment which includes details " + 
      "about what the students are saying or doing, the teacher is using specific praise."
    },
    {
      text: "A student is running around the classroom instead of lining up with the other " + 
      "students.  If the teacher says, “Stop that!” it would be considered a _____; whereas " + 
      "if the teacher says, “Sam, get in line with the other students” it is a _____.",
      options: new Map([
        ["Redirection; behavior disapproval", false],
        ["Behavior disapproval; general approval", false],
        ["Behavior disapproval; redirection", true],
        ["Negative tone; behavior disapproval", false],
      ]),
      feedback: "The correct answer is C.  When a teacher tells a child to stop what they " + 
      "are doing without giving an option of what they should do instead, it is a behavior " + 
      "disapproval.  If what they tell the child to do is different from what they are " + 
      "currently doing, it is a redirection."
    },
    {
      text: "The teacher is expressing ______ if she smiles, nods, and conveys curiosity about " + 
      "what a child is doing.",
      options: new Map([
        ["Flat affect", false],
        ["Neutral affect", false],
        ["Preferential treatment", false],
        ["Positive interest", true],
      ]),
      feedback: "The correct answer is D.  When teachers show that they are engaged in what " + 
      "a child is doing or saying, they are showing positive interest."
    },
    {
      text: "The teacher shows a high level of enthusiasm when she smiles and claps as her " + 
      "students sing a song for her.  Her tone would be considered ___.",
      options: new Map([
        ["Positive interest", false],
        ["Excitement", true],
        ["Neutral", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B.  The teacher’s behaviors indicate genuine enthusiasm " + 
      "for her students, so her tone is excitement."
    },
    {
      text: "Students are talking over the teacher as she is trying to read a book to them. " + 
      "An example of a redirection is if she ____.",
      options: new Map([
        ["Stops reading until they quiet down", false],
        ["Keeps reading, but louder", false],
        ["Says, “It’s time to listen now so that you can hear the story.”", true],
        ["Puts them all in time out", false],
      ]),
      feedback: "The correct answer is C.  The teacher redirects students toward a different behavior."
    },
    {
      text: "Although ___ is considered to be positive, ___ is more effective and will give " + 
      "children a better understanding of which behaviors benefit them and their peers.",
      options: new Map([
        ["General approval; specific praise", true],
        ["Specific praise; overall approval", false],
        ["General approval; positive affect", false],
        ["Specific praise; positive affect", false],
      ]),
      feedback: "The correct answer is A.  Behavioral feedback that is specific to what the " + 
      "child is doing or the effort they are putting in is more beneficial than general praise."
    },
    {
      text: "When children internalize the schedule and routines of the classroom, fewer ___ will be needed.",
      options: new Map([
        ["Redirections", true],
        ["Open-ended questions", false],
        ["Activities", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is A.  If children internalize the schedule and routines of " + 
      "the classroom, they know what to expect and what actions to take, so teachers do not need " + 
      "to spend as much time correcting behavior."
    },
    {
      text: "Using behavior disapprovals improves children’s self regulation.",
      options: new Map([
        ["True", false],
        ["False", true],
      ]),
      feedback: "The correct answer is false.  Positive classroom climates are associated with " + 
      "better self regulation for students, but behavior disapprovals do not contribute to a " + 
      "positive classroom climate."
    }
  ],
  'math':[],
  'student':[],
  'level':[],
  'listening':[],
  'sequential':[
    {
      text: "Sequential activities can happen when",
      options: new Map([
        ["Children use classroom objects in a step-by-step way.", false],
        ["Children play a game with rules.", false],
        ["Children act out a pretend play scenario with a recognizable plot and role speech.", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. Sequential activities can occur anytime children follow a " + 
      "logical order or sequence when doing a learning activity."
    },
    {
      text: "Children are dumping plastic insects onto the carpet. What would make this a sequential activity? ",
      options: new Map([
        ["Children make insect noises", false],
        ["Children place insects into groups based on size", false],
        ["Children act out The Grouchy Ladybug book with the insects", false],
        ["B and C", true],
      ]),
      feedback: "The correct answer is D. When children follow a predetermined sequence such as sorting " + 
      "materials based on attributes or enacting a familiar story, they are engaging in sequential activities."
    },
    {
      text: "A teacher can promote children’s participation in sequential activities by all of the following except:",
      options: new Map([
        ["Placing interlocking cubes in the block center", true],
        ["Demonstrating the steps to an activity of game", false],
        ["Supporting children’s drawing of a recognizable image", false],
        ["Encouraging children to take turns", false],
      ]),
      feedback: "The correct answer is A. In order to promote sequential use of materials, the teacher " + 
      "would have to invite children to build something with the interlocking cubes, such as a house or " + 
      "robot,  that would require them to take multiple steps toward a predetermined goal."
    },
    {
      text: "A child pretends to read a book in the library center by turning the pages one-by-one and " + 
      "telling the story aloud to a friend. This is an example of:",
      options: new Map([
        ["Using materials in a step-by-step predictable way", true],
        ["Writing a name or message", false],
        ["Following rules of a game or taking turns", false],
        ["Speaking or acting according to a pretend scenario.", false],
      ]),
      feedback: "The correct answer is A. Stories follow a sequential order which the child is demonstrating " + 
      "when telling the story aloud. The child is not actually reading the book, but knows the story well " + 
      "enough to follow the plot when telling it to the friend. "
    },
    {
      text: "Two children are in the dramatic play center. One child holds a baby doll, and the other one " + 
      "holds a pot on the stove. A teacher can support the children’s engagement in a sequential activity " + 
      "by which of the following:",
      options: new Map([
        ["Suggesting that the baby might be hungry", false],
        ["Asking what they are playing", false],
        ["Encouraging the children to talk about what the baby wants to eat", true],
        ["All of the above", false],
      ]),
      feedback: "The correct answer is D. When children are not yet acting out a recognizable scenario in " + 
      "dramatic play, a teacher can encourage them to do so by asking what they are playing. Teachers can " + 
      "also encourage children to act out specific characters (e.g., a mom or caregiver) and use predictable " + 
      "role speech (e.g., discussing what they will cook for the hungry baby). "
    },
    {
      text: "For a task or activity to be sequential, a child must be:",
      options: new Map([
        ["Playing alone", false],
        ["Following a logical order or sequence", true],
        ["Following a teacher’s directions", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B. An activity can be considered sequential if the child follows a " + 
      "sequence of steps that build on each other towards a predetermined goal."
    },
    {
      text: "A child is making letter-like forms on paper in the art center and says, “This is a note for " + 
      "my mommy.” This is an example of:",
      options: new Map([
        ["Playing a game with rules", false],
        ["A non-sequential activity", false],
        ["Writing names or recognizable messages", true],
        ["Not enough information to choose an answer", false],
      ]),
      feedback: "The correct answer is C. If the child is making random marks without a plan, the activity " + 
      "is non-sequential. However, the child is engaging in emergent writing and the letter-like forms " + 
      "represent a planned message for the child’s mother. Thus the activity would be categorized as writing " + 
      "names or messages."
    },
    {
      text: "Two children begin to play the game Candyland, but they are moving the pieces around the board " + 
      "in a random way. How could a teacher encourage them to play the game in a logical manner?",
      options: new Map([
        ["Encourage them to take turns", false],
        ["Tell them to read the directions", false],
        ["Demonstrate the steps to play the game", false],
        ["All of the above", false],
        ["A and C", true],
      ]),
      feedback: "The correct answer is E. Two strategies that teachers might use to promote sequential " + 
      "activities are encouraging children to take turns or demonstrating the steps of a game.  Board " + 
      "games are challenging for many prekindergarten children, and therefore a teacher often must " + 
      "demonstrate the steps to the game and remind children to take turns as they are learning how to play."
    },
    {
      text: "A child is using pipe cleaners at the art center. Which one of the following is not a sequential task?",
      options: new Map([
        ["Making a triangle with the pipe cleaners", false],
        ["Sliding them across the table", true],
        ["Connecting two to make a necklace", false],
        ["Making the first letter of their name", false],
      ]),
      feedback: "The correct answer is B. In order for a task or activity to be sequential, children " + 
      "must follow a sequence of steps, such as forming the pieces to create a triangle, a necklace, " + 
      "or a letter.  B is not the correct answer because sliding pipe cleaners across the table does " + 
      "not involve clear steps that build on each other."
    },
    {
      text: "Which of the following is an example of a sequential activity with classroom materials?",
      options: new Map([
        ["Children pour water into a funnel several times in a row", false],
        ["Children repeatedly stack two blocks on top of each other then knock them down", false],
        ["Children measure blocks using crayons", true],
        ["All of the above", false],
      ]),
      feedback: "The correct answer is C. Sequential activities occur when children follow a sequence " + 
      "of steps to arrive at a predetermined goal. Repeatedly pouring water into a funnel and stacking " + 
      "blocks require several steps; however, the steps are not leading to a larger learning goal. " + 
      "In contrast, using crayons to measure blocks is an example of using materials in a " + 
      "step-by-step manner that meets a predetermined goal. "
    }
  ],
  'ac':[
    {
      text: "Two children are in the same center with a board game, but they are playing with " + 
      "the pieces independently.  How could a teacher encourage them to interact cooperatively?",
      options: new Map([
        ["Introduce visuals that remind children how to play a game", false],
        ["Explain to children that we take turns during board games and ask who would like to go first", false],
        ["Demonstrate how to move the game pieces on the board ", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. Children may have a difficult time interacting " + 
      "cooperatively by playing a board game if they don’t remember how to play.  If teachers introduce " + 
      "helpful visuals or demonstrate how to play the game, it helps children begin to interact in a " + 
      "cooperative manner.  Moreover, sometimes a teacher may simply initiate the turn-taking required " + 
      "to play the game by asking the children who will go first."
    },
    {
      text: "A teacher is talking to a child who is building a tower with blocks.  This is an example of a(an):",
      options: new Map([
        ["Cooperative interaction", false],
        ["Associative interaction", false],
        ["Not enough information to choose an answer", true],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is C.  In order to know whether this is an associative or " + 
      "cooperative interaction, we need more information about the child’s interaction with " + 
      "the teacher.  For example, if they are talking about what they are building together, " + 
      "the interaction is associative.  If they are alternating who places each block, the " + 
      "interaction is cooperative."
    },
    {
      text: "For an interaction to be associative or cooperative, a child must be:",
      options: new Map([
        ["Interacting with another child", false],
        ["Interacting with a teacher", false],
        ["Talking", false],
        ["A or B", true],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is D.  An interaction can be considered associative or " + 
      "cooperative if the child is interacting with another person, whether it is another " + 
      "student or an adult/teacher."
    },
    {
      text: "Two children are drawing pictures at the art center.  Their interaction would be associative if:",
      options: new Map([
        ["They start moving to the carpet", false],
        ["They start talking about their artwork with each other", true],
        ["They both use the same colors", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B.  An interaction is not considered associative " + 
      "unless the children are talking to each other about a shared activity."
    },
    {
      text: "A teacher can promote associative and cooperative interactions by all of the following EXCEPT:",
      options: new Map([
        ["Participating in children’s play", false],
        ["Encouraging children to spread out across centers", true],
        ["Encouraging children to work together", false],
        ["Helping children find words to communicate", false],
      ]),
      feedback: "The correct answer is B.  In order for an interaction to be associative or " + 
      "cooperative, children need to be interacting with another child(ren) or an adult.  If a " + 
      "teacher encourages children to spread out, they are less likely to be in proximity to " + 
      "another person and are, thus, less likely to be interacting in an associative or cooperative manner."
    },
    {
      text: "If two children are struggling to play a game, the teacher can ___ to help the " + 
      "children have a cooperative interaction.",
      options: new Map([
        ["Demonstrate the game", false],
        ["Model good sportsmanship", false],
        ["Help children communicate (Say, “it’s my turn next”)", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D.  When children are struggling to play a game, it might " + 
      "be because they do not know how to play, have not developed good sportsmanship, or might " + 
      "have a hard time communicating about their play.  Thus, teachers can use specific strategies " +
      "to help promote successful cooperative interactions."
    },
    {
      text: "A teacher is helping a child build a tower with blocks.  They are taking turns " + 
      "placing blocks on top of one another.  This is an example of a(an):",
      options: new Map([
        ["Cooperative interaction", true],
        ["Associative interaction", false],
        ["Not enough information to choose an answer", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is A. When children take turns, they are exhibiting cooperative behavior."
    },
    {
      text: "Associative interactions can happen when:",
      options: new Map([
        ["Children are playing with shared materials", false],
        ["Children are communicating about a task with their peers", false],
        ["Children are constructing an idea together", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D.  Associative interactions are seen when children " + 
      "are playing with shared materials, communicating about a task with others, or " + 
      "constructing an idea with a teacher or child."
    },
    {
      text: "Two children pretending to be a family are in the dramatic play area.  One is " + 
      "pretending to make dinner and says, “Your pizza is ready!”, and the other one sits at " + 
      "a table with a plastic fork and spoon.  These children are ______.",
      options: new Map([
        ["Engaging in an associative interaction", false],
        ["Engaging in a cooperative interaction", false],
        ["Acting out a recognizable scenario", false],
        ["B & C", true],
        ["A & C", false],
      ]),
      feedback: "The correct answer is D.  The children in this scenario are acting out a common " + 
      "scenario (dinnertime) and using role speech. Therefore, this is an example of a cooperative interaction."
    },
    {
      text: "Children can have cooperative interactions regardless of the materials present.  But " + 
      "some materials are particularly helpful in promoting children’s cooperative interactions. One example would be:",
      options: new Map([
        ["Board games", true],
        ["Crayons", false],
        ["Worksheets", false],
        ["Backpacks", false],
      ]),
      feedback: "The correct answer is A.  Although materials like crayons may be present during " + 
      "cooperative interactions, board games are particularly likely to help children initiate " + 
      "cooperative interactions because they require that children have a shared goal, take turns, " + 
      "and share ideas / communicate about their game."
    }
  ]
};

export default questionBank;