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
  'math':[
    {
      text: "A teacher observes a child in dramatic play placing toy eggs in a basket. " +
      "She says, “Wow, Jaden, you have a big basket of eggs! How many do you have?” " + 
      "Which of the following behaviors did the teacher use?",
      options: new Map([
        ["Asking questions about math concepts", true],
        ["Demonstrating math concepts", false],
        ["Using math vocabulary", false],
        ["A and B only", false]     
       ]),
      feedback: "The correct answer is A. When a teacher asks, “How many do you have?” " +
      "that is considered asking questions about math concepts because it prompts the " +
      "child to use counting skills such as one-to-one correspondence or subitizing."
    },
    {
      text: "A child is playing with blocks and begins to put all the green triangles into " +
      "a pile and the red triangles into a separate pile. What type of math is this child doing?",
      options: new Map([
        ["Measurement and data", false ],
        ["Patterns", false],
        ["Shapes and spatial reasoning", false],
        ["None of the above", true]
      ]),
      feedback: "The correct answer is D. The child is sorting the triangles by color; " +
      "therefore the child is not doing one of the math types listed in the answers. " +
      "If the child had sorted the blocks by shape, placing those with three sides (triangles) " +
      "in one pile and those with four sides (squares) in a separate pile, then the correct type "+
      "of math would be shapes and spatial reasoning."
    },
    {
      text: "Which of the following is NOT an example of the math type counting and number?",
      options: new Map([
        ["Matching a card showing three dots with a card showing the numeral 3",false],
        ["Making a pattern with magnet numbers (1,2,1,2)", true],
        ["Counting all of the letter A’s on a book page", false],        
        ["Singing a counting song like 'Five Little Monkeys'", false]
      ]),
      feedback: "The correct answer is B. Making a pattern with magnet numbers (1,2,1,2) is an "+
      "example of patterning (not counting and number). Whenever a child repeats a sequence of items, "+
      "the child is creating a pattern."
    },
    {
      text: "A child is putting beans on one side of a bucket balance and marbles on the other side. "+
      "The bucket with marbles sinks and the bucket with beans rises. If the child ________________, "+
      "this would be an example of the math type measurement and data.",
      options: new Map([
        ["Counts the beans", false],
        ["Says there are more marbles than beans", false],
        ["Says the marbles are heavier", true],
        ["All of the above", false]
      ]),
      feedback: "The correct answer is C. One way that children engage in the math type measurement "+
      "and data is by comparing objects by weight. The child does this when she observes that the "+
      "marbles in the bucket balance are heavier."
    },
    {
      text: "A child is exploring letter stamps at the writing center. At first he tries out the "+
      "A, C, and S stamps. Then he starts alternating the A and S stamp across the bottom of the "+
      "paper. What type of math is he doing?",
      options: new Map([
        ["Patterns", true],
        ["Shapes and spatial reasoning", false],
        ["Counting and number", false],
        ["Measurement and data", false]
      ]),
      feedback: "The correct answer is A. When children repeat a sequence like A, S, A, S they "+
      "are creating a pattern."
    },
    {
      text: "A teacher is introducing measurement concepts to a small group of children using blocks "+
      "to determine the length of a table. She lines blocks from one edge of the table to the other. "+
      "When she reaches the end of the table, she says, “Hmm, it looks like the table is 16 blocks long "+
      "plus part of a block. So it is more than 16 blocks but less than 17 blocks.” In this scenario, "+
      "the teacher is_______________.?",
      options: new Map([
        ["Demonstrating a math concept", false],
        ["Asking questions about a math concept", false ],
        ["Demonstrating a math concept and using math vocabulary", true],
        ["Asking questions about a math concept and using math vocabulary", false]
      ]),
      feedback: "The correct answer is C. The teacher models, or demonstrates, how to use blocks "+
      "(a non-standard unit of measurement) to figure out the length of the table. In addition, the "+
      "teacher uses math vocabulary including “long”, “more”, and “less” as she demonstrates the "+
      "measurement concepts."
    },
    {
      text: "A teacher reads a book about a bear who picks seven apples every Sunday, then eats one "+
      "per day until he has none left. One child says, “On the next page, he’s going to have four "+
      "left!” This child is showing what type of mathematical thinking?",
      options: new Map([
        ["Measurement and data", false ],
        ["Counting and number", true],       
        ["Shapes and spatial reasoning", false],
        ["All the above", false ]
      ]),
      feedback: "The correct answer is B. The child notices that each time the bear eats an apple, "+
      "it is one less than the amount the bear had before. When the child predicts that the bear " +
      "will have four on the next page, the child shows his knowledge that counting backward is one "+
      "less.",
    },
    {
      text: "A teacher watches a child at the art center play with a handful of pipe cleaners. "+
      "She encourages the child to create something and he builds a house. The teacher asks, "+
      "“What shapes do you see in your house?” The child replies, “It’s just a house!” "+
      "The teacher is ______________; the child is doing this type of math: _______________.",
      options: new Map([
        ["Using math vocabulary; measurement and data",false],
        ["Asking questions about math concepts; shapes and spatial reasoning", false],
        ["Using math vocabulary; shapes and spatial reasoning", false],
        ["Asking questions about math concepts; none", true]
      ]),
      feedback: "The correct answer is D. The teacher is asking questions about math concepts when "+
      "she asks the child about shapes. However, the child does not show that she is thinking about "+
      "a particular math concept when she replies, “It’s just a house!” Therefore, there is no math "+
      "type to identify regarding the child’s behavior."
    },
    {
      text: "A child in the music center listens to a peer create a rhythm on the hand drums "+
      "(one beat slow, three beats fast, ba-da-da-da). The child copies the rhythm (ba-da-da-da) "+
      "with his hands over and over again. This is an example of ________________.",
      options: new Map([
        ["Patterns", true],
        ["Counting and number", false],
        ["Measurement and data", false ],
        ["Shapes and spatial reasoning", false],
      ]),
      feedback: "The correct answer is A. When children create a pattern in their environment, "+
      "whether it is using blocks to make a red-blue-red-blue pattern or hand-clapping to repeat "+
      "a series of beats, this is doing patterns."
    },
    {
      text: "Two children at the blocks center have each connected several train cars together "+
      "to make one long line of trains. One boy says, “Mine is the longest!” The teacher joins their "+
      "play and says, “How do you know your train is longer than Leo’s train? Let’s find out how long "+
      "they are.” The boys eagerly start pointing to their trains one by one and saying, “one, two, "+
      "three, four,” etc. What type(s) of math are the children doing?",
      options: new Map([
        ["Counting and number", false],
        ["Patterns; counting and number", false],
        ["Measurement and data; counting and number", true],
        ["Patterns", false],
      ]),
      feedback: "The correct answer is C. When children compare objects by length to figure "+
      "which is the longest (or longer, shorter, etc.), they are doing measurement and data "+
      "math. Because the boys counted their trains to help them compare lengths, they are "+
      "also engaged in the counting and number type of math."
    }
  ],
  'student':
      [
        {
          text: " Student engagement refers to which of the following: " ,
          options: new Map([
              ["The number of times a student correctly answers teacher questions", false],
              ["The extent to which a student is interested in learning activities", false],
              ["How involved a student is in learning activities", false],
              ["B and C", true],
            ]),
          feedback: "The correct answer is D. Engagement in learning refers to one’s degree of interest, attention, " +
              "curiosity, motivation, or passion related to a learning task."
        },
        {
          text: "  Engagement in learning refers to a student’s degree of _________ related to a learning task. " ,
          options: new Map([
            ["Attention", false],
            ["Motivation", false],
            ["Curiosity", false],
            ["All of the Above", true],
          ]),
          feedback: "The correct answer is D. A student’s engagement level refers to how invested and interested he " +
              "or she is in learning activities or tasks."
        },


        {
          text: " Indicators of off task behavior include: " ,
          options: new Map([
            ["Sitting with materials but staring into space", false],
            ["Challenging behavior like singing loudly during a read aloud", false],
            ["Looking at what other children are doing with little interest", false],
            ["All of the above", true],
          ]),
          feedback: "The correct answer is D. “Off task” behavior refers to the lowest level of engagement in learning" +
              " tasks. Depending on the situation, low engagement may look like engaging in challenging behavior," +
              " a slouched body position, lack of persistence, flat affect, or staring into space."
        },


        {
          text: " Children who are rated as showing high engagement might be: " ,
          options: new Map([
            ["Concentrating and seriously pursuing an activity", true],
            ["Showing some signs of distraction during an activity", false],
            ["Wandering around the classroom to look at different materials", false],
            ["Having a lively, off-topic conversation with a peer while the teacher gives a lesson.", false],
          ]),
          feedback: "The correct answer is A. Highly engaged students do not show signs of distraction and are often " +
              "oblivious to noise and behaviors of other children. They also show persistence and intense concentration" +
              " during learning tasks or lessons. D is incorrect because the children’s conversation, while engaging, " +
              "is off-topic; however, if the conversation were on topic it could be showing high engagement."
        },


        {
          text: " A student at the sand and water table begins to excitedly fill up a bucket with sand, " +
              "then walks over to look at a peer’s new sticker. His level of engagement would be: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", true],
            ["Engaged", false],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is B. Mildly engaged students are often inconsistent in their concentration" +
              " and attention. They tend to seem interested in the activity, but could also " +
              "easily give it up for another activity. "
        },


        {
          text: " When a child volunteers responses, shows an eager expression, or persistently looks at " +
              "learning materials, her level of engagement would be characterized as: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", false],
            ["Engaged", true],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is C. Students who demonstrate engaged behaviors are focused" +
              " and interested in learning tasks. High engagement is characterized by intense focus " +
              "and concentration on learning tasks, even around distracting noises or behaviors. "
        },


        {
          text: " If a student was sitting on the carpet playing with her shoelaces while" +
              " the teacher read a book, her level of engagement would be: " ,
          options: new Map([
            ["Off Task", true],
            ["Mildly Engaged", false],
            ["Engaged", false],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is A. When students exhibit very low interest in " +
              "learning tasks, we refer to this level of engagement as “off task.” " +
              "If the student in this example played with her shoelace for a few seconds, " +
              "and then returned her attention to the read aloud, she would exhibit mild engagement, " +
              "which is characterized by inconsistent attention. "
        },


        {
          text: " A student in the blocks center is building a house. He seems oblivious to his peers next" +
              " to him who are crashing cars and speaking very loudly. His level of engagement is: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", false],
            ["Engaged", false],
            ["Highly Engaged", true],
          ]),
          feedback: "The correct answer is D. This student demonstrates a high level of engagement" +
              " because he is not distracted by his noisy peers and instead remains intensely focused" +
              " on building a structure. "
        },


        {
          text: " Which of the following best characterizes a mildly engaged student? " ,
          options: new Map([
            ["Consistently pays attention while the teacher demonstrates an activity", false],
            ["Looks at what other children are doing with little interest", false],
            ["Looks up now and then to see what others are doing, but then returns to the activity", true],
            ["Seems oblivious to noise and the behaviors of other children", false],
          ]),
          feedback: "The correct answer is C. Mildly engaged students do not show deep interest in learning " +
              "activities. Instead, they pay attention inconsistently and are easily distracted" +
              " from the task at hand."
        },


        {
          text: " Students who are engaged in learning tasks look  _______ at the teacher and learning materials;" +
              " whereas students who are mildly engaged are _________ interested in the teacher’s" +
              " instruction and learning materials. " ,
          options: new Map([
            ["attentively; consistently", false],
            ["consistently; inconsistently", true],
            ["attentively; always", false],
            ["inconsistently; consistently", false],
          ]),
          feedback: "The correct answer is B. Students who are solidly engaged in learning activities or " +
              "lessons are not easily distracted and are consistently attentive. In contrast," +
              " mildly engaged students’ attention wanders"
        },
      ],
  'level':[
    {
      text: "Level of instruction depends on the ________ of interactions between children " +
        "and teachers and the amount of ________ required for children to participate." ,
      options: new Map([
        ["quality; letter knowledge", false],
        ["quality; academic knowledge", false],
        ["richness; abstract thought", true],
        ["richness; self-regulation", false],
      ]),
      feedback: "The correct answer is C. Level of instruction refers to the amount of inference, " + 
        "or high-level thinking, required for children to participate in an interaction with a teacher " +
        "or peers. Level of instruction does not depend on the type of academic content being discussed."
    },
    {
      text: "Children who are interacting with teachers during low-level instruction may do " +
        "all of the following EXCEPT:",
      options: new Map([
        ["Identify letters", false],
        ["Answer high-level questions", true],
        ["Answer low-level questions", false],
        ["Select the correct answer from a set of choices", false],
      ]),
      feedback: "The correct answer is B. Low-level instruction occurs when teachers ask questions " + 
        "with predetermined answers, with the goal of having children learn or recite the correct " +
        "response."
    },
    {
      text: "Which of the following is an example of a high-level question?",
      options: new Map([
        ["Show me the number 5.", false],
        ["Which picture has a triangle in it?", false],
        ["How did you figure that out?", true],
        ["How many will you have if I take 2 away?", false],
      ]),
      feedback: "The correct answer is C. High-level questions do not have predetermined answers. " + 
        "Instead, they require children to draw on reasoning skills as they think about how to respond."
    },
    {
      text: "A teacher holds up four triangles and asks, \"How many triangles do we have now?\" " +
        "Which of the following child responses would you record in the tool?",
      options: new Map([
        ["Five!", false],
        ["I don't know!", false],
        ["Four!", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. In the tool, all child answers are counted. If three " + 
        "children provide answers, all three are counted, even when answers are incorrect."
    },
    {
      text: "The goal of improving level of instruction is to:",
      options: new Map([
        ["Ask only high-level questions", false],
        ["Ask zero low-level questions", false],
        ["Ask more high-level questions and fewer low-level questions", true],
        ["Ask more high-level and more low-level questions", false],
      ]),
      feedback: "The correct answer is C. Some low-level instruction is necessary in preschool, " + 
        "especially because low-level questions often help dual language learners and children with " +
        "language delays enter conversations. However, the goal for improving level of instruction " +
        "is to ask fewer low-level questions overall and ask more high-level questions that " +
        "have more than one possible answer and require abstract thought."
    },
    {
      text: "Level of instruction refers to:",
      options: new Map([
        [
          "The amount of inference, or abstract thought, required for children to participate " +
          "in teacher-child interactions.", 
          true
        ],
        ["The number of conversational turns in teacher-child interactions about academic content.", false],
        ["The amount of time teachers spend on academic content across the day.", false],
        ["The number of correct answers children give in response to teacher questions.", false],
      ]),
      feedback: "The correct answer is A. Level of instruction does not refer to the number " + 
        "of instructional interactions a teacher has with children throughout the day. Instead, level " +
        "of instruction captures the degree to which children engage in deep thinking, such as drawing " +
        "on past experiences or explaining their thinking, when interacting with teachers and peers " +
        "about content."
    },
    {
      text: "A teacher places three cards on the table with images of a snake, a slide, and " +
        "a dog. The teacher asks, \"Which picture starts with /s/?\" This is an example of a " +
        "high-level question.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. Although this question does not have a single " + 
        "predetermined correct answer (there are two possible correct answers), the teacher " +
        "presents a set of choices for the children to consider. Therefore, this question is " +
        "low-level."
    },
    {
      text: "All of the following are examples of high-level questions EXCEPT:",
      options: new Map([
        ["Asking children to explain their thought process", false],
        ["Asking children to identify the correct answer from a set of choices", true],
        ["Asking children to connect academic content with their personal experience", false],
        ["Asking children to make a prediction based on context clues or prior knowledge", false],
      ]),
      feedback: "The correct answer is B. High-level questions do not have one correct answer. " + 
        "Instead, high-level questions have more than one possible answer and require children to " +
        "draw from experiences, background knowledge, and context clues to come up with a response."
    },
    {
      text: "A teacher is discussing the concepts of sinking and floating at the water table " +
        "with a small group of children. As the teacher drops a rock into the water, she says, " +
        "\"I wonder what will happen to this rock when I put it in the water--let's find out.\" " +
        "What kind of question is this?",
      options: new Map([
        ["High-level question", false],
        ["Would not be counted as a question", true],
        ["Low-level question", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B. When teachers ask questions without providing children " + 
        "an opportunity to respond, the questions are not counted. If the teacher had asked, " +
        "\"I wonder what will happen to this rock when I put it in the water,\" and " +
        "encouraged children to explain their thinking, it would have been a high-level question.",
    },
    {
      text: "While some low-level instruction is necessary in preschool, research shows that children " +
        "in classrooms with more high-level instruction do better academically and show improved " +
        "self-regulation.",
      options: new Map([
        ["True", true],
        ["False", false],
      ]),
      feedback: "The correct answer is True. Some low-level instruction is necessary in preschool. " + 
        "However, research shows that young minds also thrive when they have opportunities to think more " +
        "deeply. The goal for improving level of instruction is to provide more of these important " +
        "opportunities to answer high-level questions and engage in conversations that last more than " +
        "two turns."
    },
  ],
  'listening':[
    {
      text: "The Listening to Children practice refers to two important behaviors " +
        "that contribute to a high-quality ________ environment: the amount of " +
        "teacher listening to children and the amount of ________ talk.",
      options: new Map([
        ["academic; teacher", false],
        ["language; teacher", false],
        ["language; child", true],
        ["indoor; child", false]
      ]),
      feedback: "The correct answer is C. The practice of Listening to Children " +
        "refers to two important indicators of a high-quality language environment--" +
        "teachers listening to children and children talking."
    },
    {
      text: "Which of the following is NOT one of the teacher behaviors tracked " +
        "by the observation tool that encourages child talk?",
      options: new Map([
        ["Teaching in small groups", true],
        ["Looking expectantly at children and showing warmth", false],
        ["Asking open-ended questions", false],
        ["Positioning oneself at eye level with children", false]
      ]),
      feedback: "The correct answer is A. Small group instruction might encourage " +
        "child talk if the teacher limited her own contributions and asked " +
        "effective questions. However, teaching in small groups does not automatically " +
        "encourage child talk; the amount of child talk in small groups depends on " +
        "the teacher's skill in fostering child participation."
    },
    {
      text: "Which of the following is an example of an open-ended question to " +
        "encourage child talk?",
      options: new Map([
        ["Tell me what that letter is.", false],
        ["What might happen to Corduroy if Lisa doesn't come back?", true],
        ["How many do you have?", false],
        ["Do we need a square or a rectangle to continue our pattern?", false]
      ]),
      feedback: "The correct answer is B. Open-ended questions or statements invite " +
        "children to respond with longer sentences because there is not one correct " +
        "answer. In this example, children must use their imagination, background " +
        "knowledge, and clues from the text ot produce a unique answer."
    },
    {
      text: "Teachers play an important role in encouraging children to talk to " +
        "each other. Which of the following is NOT an example of promoting peer talk?",
      options: new Map([
        ["Helping children use role speech or talk in character with each other " +
          "during dramatic play", false],
        ["Asking children to talk to their neighbor about a character during a read aloud", false],
        ["Encouraging two children to talk about their building at the blocks center", false],
        ["Asking two children to pass out glues for an art project", true]
      ]),
      feedback: "The correct answer is D. All of the answers except for D are examples " +
        "of promoting peer talk. In contrast, asking children to pass out materials " +
        "might result in one child saying, 'Here,' or 'Glue for you,' but the children " +
        "are not likely to have a multi-turn conversation about a learning activity."
    },
    {
      text: "Listening and ________ children helps teachers expand on children's play " +
        "or talk during an activity. This can increase children's involvement level " +
        "and lead to more child ________.",
      options: new Map([
        ["assessing; talk", false],
        ["assessing; listening", false],
        ["observing; talk", true],
        ["observing; listening", false]
      ]),
      feedback: "The correct answer is C. When teachers take the time to notice " +
        "children's actions and listen to their comments, they are better able to " +
        "respond in ways that expand, or build on children's play or activity. " +
        "Teacher responses encourage children to continue interacting and talking " +
        "with teachers and peers."
    },
    {
      text: "The Listening to Children practice is comprised of two related behaviors:",
      options: new Map([
        ["teacher listening and teacher instructing", false],
        ["teacher listening and child talk", true],
        ["teacher instruction and child listening", false],
        ["teacher instruction and child talking", false]
      ]),
      feedback: "The correct answer is B. The Listening to Children practice refers " +
        "to two indicators of a high-quality language environment--teachers listening " +
        "to children and children talking. Both are important for supporting children's " +
        "learning."
    },
    {
      text: "Which of the following is one of the teacher behaviors tracked by the " +
        "observation tool that encourages child talk?",
      options: new Map([
        ["Teaching in small groups", false],
        ["Giving children classroom jobs", false],
        ["Reading books to children", false],
        ["Looking expectantly at children and showing warmth", true]
      ]),
      feedback: "The correct answer is D. When teachers look expectantly at children " +
        "with a positive expression, their body lanugage shows interest in what children " +
        "say. This may encourage children to start talking or continue talking during " +
        "conversation."
    },
    {
      text: "During a small group lesson, children buidl shapes using rubber bands on " +
        "geoboards. The teacher says, 'Look, Dwayne made a square and Lucy made a " + 
        "traingle. How are their shapes different?' In this scenario, which of the " +
        "following strategies did the teacher use?",
      options: new Map([
        ["Encouraging children to talk to peers", false],
        ["Repeating or clarifying children's comments", false],
        ["Asking open-ended questions", true],
        ["Using questions or comments to expand on children's play or talk", false]
      ]),
      feedback: "The correct answer is C. Open-ended questions do not have one correct " +
        "answer, and they typically encourage children to answer in longer sentences. " +
        "Children can think of several ways that the shapes are different."
    },
    {
      text: "A teacher observes two children in the dramatic play center silently " +
        "taking dishes and food out of the cupboards and placing them on the table. " +
        "She walks over to them and says, 'Louisa, why don't you ask Valerie what she " +
        "wants for breakfast?' What kind of teacher behavior is this?",
      options: new Map([
        ["Encouraging children to talk to peers", true],
        ["Repeating or clarifying children's comments", false],
        ["Being at eye-level with children", false],
        ["Looking expectantly at children and showing warmth", false]
      ]),
      feedback: "The correct answer is A. When teachers facilitate talk between " +
        "children, they provide specific prompts to help children talk to peers or " +
        "solve problems together during activities."
    },
    {
      text: "A teacher observes two children in the dramatic play center silently " +
        "taking dishes and food out of the cupboards and placing them on the table. " +
        "She walks over to them and says, 'Who wants to play pet store with me?' " +
        "This is an example of the teacher using questions or comments to expand on " +
        "children's play or talk.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The teacher's question about the pet store " +
        "is not responsive to what the children are already playing; therefore, her comment " +
        "does not expand, or add to, children's play. If she had said, 'I see you are " +
        "getting ready for dinner. Who is coming to eat?' she would be expanding on " +
        "their play actions."
    }
  ],
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
        ["Encouraging the children to talk about what the baby wants to eat", false],
        ["All of the above", true],
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
  'LIFoundational': [
    // 1: definition of foundational skills
    {
      text: "Foundational skills instruction supports children’s learning about:",
      options: new Map([
        ["Science content", false],
        ["Print concepts", false],
        ["Alphabet knowledge and letter-sound correspondence", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. Foundational skills instruction supports children as they learn that print (i.e., letters and letter patterns) conveys a message and represents our spoken language."
    },
    // 2: phonological awareness
    {
      text: "Phonological awareness is the ability to identify and manipulate parts of spoken language. All of these are examples of phonological awareness EXCEPT:",
      options: new Map([
        ["Identify and create rhymes", false],
        ["Segment words into syllables", false],
        ["Identify written letters", true],
        ["Notice individual sounds, or phonemes, in spoken words", false]
      ]),
      feedback: "The correct answer is C. Phonological awareness refers specifically to the sounds of language, not the written form of language such as letters and words."
    },
    // 3: alphabet knowledge
    {
      text: "Which of the following is an example of a teacher or child focusing on alphabet knowledge?",
      options: new Map([
        ["The teacher says, “What sound do you hear at the beginning of dog?”", false],
        ["A child points to the first letter of their name and says, “K!”", true],
        ["The teacher asks children to count the syllables in “dinosaur.”", false],
        ["The teacher asks children to listen for two words that begin with the /b/ sound.", false]
      ]),
      feedback: "The correct answer is B. When the focus of teacher instruction or a child’s activity is alphabet knowledge, the letter form must be part of the instruction. For example, if the teacher asks children to listen for two words that begin with the /b/ sound, then come identify the letter ‘b’ in the shared reading book, that would include a focus on alphabet knowledge in addition to letter-sound correspondence and phonological awareness."
    },
    // 4: letter-sound correspondence
    {
      text: "Letter-sound correspondence means that individual letters and letter combinations represent sounds.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. When children understand that each letter or combinations of letters (e.g., sh) from the alphabet match specific sounds, they have learned letter-sound correspondence."
    },
    // 5: inventive/conventional spelling
    {
      text: "A child is doing inventive spelling in which of these examples:",
      options: new Map([
        ["A child copies the word “Wednesday” from the morning message.", false],
        ["A child writes ‘M’ next to a drawing of his mother.", true],
        ["A child writes their name.", false],
        ["None of the above.", false]
      ]),
      feedback: "The correct answer is B. Children engage in inventive spelling when they segment a sound in a word, select a letter to represent the sound, and write the selected letter(s) to represent the word."
    },
    // 6: print concepts
    {
      text: "Which of the following is NOT an example of print concepts:",
      options: new Map([
        ["The teacher asks children what words rhyme with “hat.”", true],
        ["The teacher shows children where to start reading on the page.", false],
        ["The teacher asks a child to identify an upper-case letter.", false],
        ["A child counts the words in a sentence.", false]
      ]),
      feedback: "The correct answer is A. Print concepts refers to an understanding that print conveys a message and is organized in predictable ways (e.g., we always read left-to-right; words are separated by spaces)."
    },
    // 7: match spoken words to print
    {
      text: "A child points to the words as he “reads” predictable or familiar nursery rhyme printed on chart paper. Which literacy behavior is this?",
      options: new Map([
        ["Using knowledge of individual sounds (phonemes)", false],
        ["Responding to open-ended questions of prompts about foundational skills", false],
        ["Inventing spellings or generating conventional spellings", false],
        ["Matching spoken words to print", true]
      ]),
      feedback: "The correct answer is D. When children point to printed words as they say them out loud, they show an understanding that print represents spoken language, or that writing can record our speech."
    },
    // 8: open-ended q’s
    {
      text: "Which of the following is an example of an open-ended question about foundational skills?",
      options: new Map([
        ["“Look at these two pictures. Point to the one that begins with /k/.”", false],
        ["I'm thinking about the book we read yesterday. Can you tell me the name of the big red dog that starts with /c/?”", false],
        ["“When I say ‘go’, let’s search the classroom for things that begin with /k/!”", true],
        ["The teacher writes a ‘k’ on the board and asks, “What letter is this?”", false]
      ]),
      feedback: "The correct answer is C. Open-ended questions or prompts have more than one correct answer. They require children to come up with a unique response rather than selecting from a set of choices, such as choosing from a group of pictures or letters."
    },
    // 9: multi modal instruction
    {
      text: "A teacher invites children to trace the letter ‘S’ in a tray of sand. The teacher is focusing on ___________ and using _____________ instruction.",
      options: new Map([
        ["Alphabet knowledge; multimodal ", true],
        ["Alphabet knowledge; vocabulary", false],
        ["Individual sounds; multimodal", false],
        ["Individual sounds; vocabulary", false]
      ]),
      feedback: "The correct answer is A. This activity supports alphabet knowledge and children’s ability to write letters. Asking children to trace letters in sand is an example of multimodal instruction because the children are experiencing the letter’s form through gesture and their sense of touch.  This would not be considered high-level instruction because the task does not involve abstract thought. This would not be considered vocabulary instruction because the teacher is not talking about the meaning of words."
    },
    // 10: realistic reading/writing tasks
    {
      text: "Tracing the letter M on a worksheet is building ________; however, if a child were to write the letter M next to a drawing of their mother, they would be using foundational skills in an activity that focuses on _________.",
      options: new Map([
        ["Alphabet knowledge; a skill out of context", false],
        ["Alphabet knowledge; a realistic writing task", true],
        ["Phonological awareness; a realistic writing task", false],
        ["Phonological awareness; a skill out of context", false]
      ]),
      feedback: "The correct answer is B. Tracing or writing letters on a worksheet is an example of focusing on a skill out of context, or teaching a skill in isolation. In contrast, if a child were to write the letter ‘M’ next to a drawing of their mother, that would be an example of using foundational skills for realistic writing purpose."
    },
    // 11: inventive/conventional spelling
    {
      text: "When a teacher helps children segment the first sound in a word, select a letter to represent the sound, and write the selected letter to represent the word, what foundational skills are they focusing on?",
      options: new Map([
        ["Individual sounds (phonemes)", false],
        ["Inventive spelling", false],
        ["Rhyming, alliteration, and/or syllables", false],
        ["A and B", true]
      ]),
      feedback: "The correct answer is D. When children segment a sound in a word, they are noticing individual sounds, or phonemes. When they match the sound that they isolated to a letter and write that letter down to label a drawing or create a message, they are engaging in inventive spelling."
    },
    // 12: phonological awareness
    {
      text: "Phonological awareness is the ability to:",
      options: new Map([
        ["Identify rhyming words", false],
        ["Identify and manipulate parts of spoken language", false],
        ["Segment words into syllables", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D. Phonological awareness is the ability to notice the sounds of language, including rhyming words, syllables or parts of words, alliteration, and individual sounds in words (phonemes). It also refers to the ability to manipulate sounds, such as creating a new word by replacing the initial sounds in a word with a different sound (e.g. cat becomes bat)."
    },
    // 13: open-ended q’s
    {
      text: "Which of the following is NOT an open-ended question or prompt about foundational skills?",
      options: new Map([
        ["“Let’s think of words that rhyme with big...”", false],
        ["“What sound do you hear at the beginning of ‘sand’?”", true],
        ["“Can you think of words that begin with /s/?”", false],
        ["“What are rhyming words?”", false]
      ]),
      feedback: "The correct answer is B. There is only one correct answer to the question about the sound at the beginning of ‘sand’. The other questions are open-ended because there are many possible correct responses. The children must generate their own response based on their knowledge instead of selecting from a set of choices or identifying the single correct answer."
    },
    // 14: match spoken words to print
    {
      text: "A teacher leads children in reciting a favorite nursery rhyme. This is an example of matching spoken words to print.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. If the teacher pointed to each word of a nursery rhyme that was printed or written on chart paper while reciting it, that would count as matching spoken words to print."
    },
    // 15: multi modal instruction
    {
      text: "A teacher encourages children to stomp their feet as they count syllables in words. This is an example of:",
      options: new Map([
        ["Inventive or conventional spelling", false],
        ["Focusing on individual sounds in words", false],
        ["Matching spoken words to print", false],
        ["None of the above", true]
      ]),
      feedback: "The correct answer is D. This is an example of multi modal instruction (i.e., communicating content through visuals, actions, objects, etc.) with a focus on syllables, which is part of phonological awareness, or the sounds of language."
    },
    // 16: alphabet knowledge
    {
      text: "The teacher asks a child to come identify a capital or uppercase letter in the morning message. Then the teacher asks the child to identify the letter. What is the focus of the instruction?",
      options: new Map([
        ["Alphabet knowledge and inventive spelling", false],
        ["Alphabet knowledge and phonological awareness", false],
        ["Print concepts and alphabet knowledge", true],
        ["Print concepts and inventive spelling", false]
      ]),
      feedback: "The correct answer is C. The child uses their alphabet knowledge to identify the letter and demonstrates an understanding of print concepts when identifying an upper-case letter."
    },
    // 17: realistic reading/writing tasks
    {
      text: "Which of the following is NOT an example of using foundational skills for a realistic reading or writing purpose?",
      options: new Map([
        ["Handwriting practice", true],
        ["Writing a thank you card", false],
        ["Reading the morning message", false],
        ["Labeling a drawing", false]
      ]),
      feedback: "The correct answer is A. Handwriting practice is an example of focusing on foundational skills in isolation, or outside of a real-world reading/writing task."
    },
    // 18: Realistic reading/writing tasks; print concepts
    {
      text: "A teacher reads a big book with children, then asks them to come up and identify the sight word ‘me’. The teacher is focusing on:",
      options: new Map([
        ["Print concepts", false],
        ["Teaching skills during a realistic reading or writing task", false],
        ["Word identification skills", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D. When teachers embed skills instruction within a reading or writing activity that is meaningful to children, such as reading a favorite big book, they have opportunities to focus on several skills at one time."
    },
    // 19: print concepts
    {
      text: "A teacher says, “Stand up if you hear the /d/ sound in these words…” The focus of instruction is:",
      options: new Map([
        ["Rhyming, alliteration, and or/syllables", false],
        ["Individual sounds (phonemes)", true],
        ["Alphabet knowledge", false],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is B. When the teacher asks children to isolate or segment one sound in a spoken word, they are focusing on individual sounds or phonemes."
    },
    // 20: letter-sound correspondence
    {
      text: "Children at the library center work together to sort objects into alphabet tubs by initial sound. They are using their knowledge of:",
      options: new Map([
        ["Letter-sound correspondence", false],
        ["How to match spoken words to print", false],
        ["Individual sounds (phonemes)", false],
        ["A and C", true]
      ]),
      feedback: "The correct answer is D. In order to sort an object by initial sound, a child must be able to identify the first sound in a spoken word and then remember the letter that is associated with that sound to sort it into that specific tub."
    },
  ],
  "LIWriting": [
    // 1 - talks about the content or meaning of the writing/drawing
    {
      text: "Which of the following is NOT an example of talking about the content or meaning of a piece of writing or drawing?",
      options: new Map([
        ["The teacher asks a child what they want to draw about in their journal.", false],
        ["The teacher tells a child that the ‘B’ they wrote is backwards.", true],
        ["A child tells the teacher about a drawing of their brother.", false],
        ["The teacher and a group of children discuss what to add to their list of favorite places in the community.", false]
      ]),
      feedback: "The correct answer is B. When teachers and children talk about the content or meaning of writing and/or drawing, they focus on ideas and what they want to communicate. In contrast, when teachers and children talk about a backwards ‘B’, they are focusing on letter formation and alphabet knowledge."
    },
    // 2 - draws to communicate meaning/makes writing forms
    {
      text: "Which of the following is an example of a child drawing to communicate meaning or making writing forms?",
      options: new Map([
        ["A child tells the teacher that they want to draw a picture for their grandpa during centers.", false],
        ["A child draws an ice cream cone.", false],
        ["A child draws their mom and writes the letter ‘M’.", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. Talking about an idea for drawing is not the same as actively drawing to communicate meaning or making writing forms. If the child were drawing a picture while talking to the teacher about their drawing, that would count."
    },
    // 3 - says aloud the message to be written
    {
      text: "A child looks at their drawing and says, “I’m going to write ‘my mom’ on this.” Which writing behavior is this?",
      options: new Map([
        ["Writes one or more letters in their name", false],
        ["Invents spellings or generates conventional spellings", false],
        ["Says aloud the message to be written", true],
        ["“Reads” the message", false]
      ]),
      feedback: "The correct answer is C. This child made a plan for what they wanted to write and verbalized it, or said it out loud. They have not yet written their name or any other letters."
    },
    // 4 - writes one or more letters in their name/invites children to write name
    {
      text: "A child named Donovan draws a picture of his family at a baseball game and writes ‘DON’ on the top of the paper. He has:",
      options: new Map([
        ["Written one or more letters in his name", true],
        ["Talked with a teacher about the content or meaning of his drawing", false],
        ["“Read” the message", false],
        ["Invented spellings", false]
      ]),
      feedback: "The correct answer is A. Donovan wrote three letters in his name. Therefore, his behavior counts as name writing."
    },
    // 5 - uses knowledge of the alphabet or letter-sound correspondence
    {
      text: "During a whole group interactive writing lesson, the teacher says, “The next word starts with the /b/ sound.” The children reply, “B!” The children are using knowledge of ___________.",
      options: new Map([
        ["Vocabulary", false],
        ["Syllables", false],
        ["The alphabet and/or letter-sound correspondence", true],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is C. When children hear a sound and can match the sound to a specific letter, they are using knowledge of the alphabet and letter-sound correspondence."
    },
    // 6- T supports and C invents spellings or generates conventional spellings
    {
      text: "A child wants to write “me” next to their drawing. The teacher says, “Now you say the word and listen for the sounds you hear!” Which teacher behavior is this?",
      options: new Map([
        ["Inviting children to write their name", false],
        ["Supporting children’s inventive and/or conventional spelling", true],
        ["Talking to children about the content of meaning of the writing/drawing", false],
        ["Writing a meaningful message in front of children", false]
      ]),
      feedback: "The correct answer is B. Teachers support children’s inventive spelling when they prompt children to use their phonological awareness, alphabet knowledge, and letter-sound correspondence skills to write labels. Saying a word out loud will help the child notice the beginning sound and select a letter to represent the sound."
    },
    // 7- T invites/C “reads” the message
    {
      text: "Which of the following is an example of a teacher inviting children to “read” a message?",
      options: new Map([
        ["“Let’s read the morning message. Ready?”", false],
        ["“What did you write?”", false],
        ["“Read that to me!”", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D. Any time a teacher suggests or prompts children to “read” their emergent writing, which can be scribbles, letter-like forms, or invented/conventional spellings, it counts as inviting children to “read” a message. The teacher may also ask children to read a message that the class composed together, like a morning message."
    },
    // 8- T writes a meaningful message in front of children/demonstrates and talks about processes
    {
      text: "A teacher points to the question of the day in front of children (e.g., ‘What animal do you think this is?’), then reads it to them. In this example, the teacher demonstrates and talks about writing processes.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. In this example, the teacher has only written a meaningful message in front of children. If the teacher showed or modeled for children the procedures for writing or the mechanics of writing, such as explaining why they added a question mark at the end, that would count as demonstrating and talking about writing processes."
    },
    // 9- T responds positively to all writing forms
    {
      text: "A teacher points to a child's scribble marks next to their drawing and says, “I see you wrote a message- tell me about it!” This is an example of a teacher responding positively to all writing forms.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. The teacher accepts and celebrates the child’s scribble marks even though the child is not forming conventional letters yet. This child is experimenting with emergent writing forms (e.g., scribbles), which is developmentally appropriate for preschool children."
    },
    // 10- T invites children to write part of a message
    {
      text: "The teacher asks a child to write the letter ‘T’ on a group thank you card the class is writing for their 3rd grade buddies who read to the children on Friday afternoons. This is an example of:",
      options: new Map([
        ["Inviting children to write part of a message", true],
        ["Supporting children’s inventive spelling", false],
        ["Inviting children to “read” the message", false],
        ["Talking to children about the content or meaning of the writing", false]
      ]),
      feedback: "The correct answer is A. A teacher can prompt children to write a message or part of a message in whole group and individual child settings. Teachers can encourage children to “write” at any stage of development (e.g., scribbles, letter-like forms, inventive spelling, etc.). Examples include “Why don’t you write about that on your picture?” and “You should write the words on that!”"
    },
    // 11 - talks about the content or meaning of the writing/drawing
    {
      text: "A teacher sits with a group of children at the writing table during centers. The teacher draws a picture as she describes what she is drawing. She encourages children to draw on her paper and add to the story. Which teacher behavior is this?",
      options: new Map([
        ["Demonstrates and talks about writing processes", false],
        ["Responds positively to all writing forms", false],
        ["Writes a meaningful message in front of children", false],
        ["Talks to children about the content or meaning of the writing/drawing", true]
      ]),
      feedback: "The correct answer is D. The teacher is focusing children’s attention on the content of the drawing. They are generating ideas together as the teacher models how to start a writing project by drawing. If the teacher had added print to the drawing, she would also be writing a meaningful message in front of children."
    },
    // 12 - draws to communicate meaning/makes writing forms
    {
      text: "A child must produce conventional letters in order to get credit for making writing forms.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. Any instance in which children produce emergent writing forms, including scribbles, zig zags, letter-like forms, or conventional letters, counts as ‘making writing forms."
    },
    // 13 - C says aloud the message to be written and T invites children to write part of a message
    {
      text: "All of the following are examples of a teacher inviting children to write part of a message EXCEPT:",
      options: new Map([
        ["Children build a race track in the blocks center. The teacher asks if they want to make signs that say “start” and “finish” with her.", false],
        ["Teacher watches a child drawing and says, “You should write the words on that!”", false],
        ["Teacher encourages children to write their name.", true],
        ["Teacher invites a child to write ‘M’ for Monday in the morning message.", false]
      ]),
      feedback: "The correct answer is C. The Writing observation tool has a separate checklist item for when teachers invite children to write their name. Inviting children to write their name is different from inviting children to write part of a message, which could be written by individual children or composed by a group of children with the teacher (a label, list, note, caption, email, card, etc.)."
    },
    // 14 - writes one or more letters in their name/invites children to write name
    {
      text: "The teacher looks at a child’s paper and says, “I see the ‘S’ for Sammy. What other letters are in your name? The child says, “A” as he writes that letter. The teacher is ________________; the child is ______________________ and _______________________.",
      options: new Map([
        ["Inviting the child to write part of a message; using knowledge of letter-sound correspondence and writing one or more letters in their name", false],
        ["Inviting the child to write part of a message; using knowledge of the alphabet and writing part of a message", false],
        ["Inviting the child to write their name; using knowledge of the alphabet and writing one or more letters in their name", true],
        ["Inviting the child to write their name; using knowledge of letter-sound correspondence and writing part of a message", false]
      ]),
      feedback: "The correct answer is C. Children and teachers often do more than one behavior at a time during writing activities. In this example, the teacher is inviting the child to write their name, and the child is using knowledge of the alphabet as they write their name."
    },
    // 15 - talks about the content or meaning of the writing/drawing
    {
      text: "The teacher joins a few children at the science center as they look at caterpillars. The teacher responds to the children as they talk about the caterpillars (e.g., “I see those little hairs on it’s back, too! I wonder why caterpillars have hair!?”). The teacher then draws some of their observations in the science log and says, “Here, let’s write the words together.” Which type of teacher support for writing is happening?",
      options: new Map([
        ["Responds positively to all writing forms", false],
        ["Invites children to write their name", false],
        ["Invites children to read the message", false],
        ["None of the above", true]
      ]),
      feedback: "The correct answer is D. The teacher is talking about what they could draw and write about in the class science log. The teacher also invites children to write part of a message (e.g., (labeling their observation as a group). However, the children have not started writing yet, so there is no opportunity for the teacher to respond positively to children’s writing forms or to invite them to read the message."
    },
    // 16- T supports and C invents spellings or generates conventional spellings
    {
      text: "A child wants to write “dog” on their paper and asks the teacher if the first letter is K. The teacher replies, “K makes the /k/ sound. Dog begins with D like Dylan.” The teacher is:",
      options: new Map([
        ["Inviting children to read the message", false],
        ["Supporting children’s inventive or conventional spelling", true],
        ["Writing a meaningful message in front of children", false],
        ["Talking to children about the content of meaning of the writing/drawing", false]
      ]),
      feedback: "The correct answer is B. One way that teachers can support children’s inventive spelling skills is to remind them about tools (like an alphabet chart or a friend’s name) in the classroom that can help them remember letter-sound matches."
    },
    // 17- T invites/C “reads” the message
    {
      text: "The lead teacher encourages a child to read a sign they wrote for the new pet store in the dramatic play center to the co-teacher. This is an example of:",
      options: new Map([
        ["Inviting children to “read” a message", true],
        ["Supporting children’s inventive or conventional spelling", false],
        ["Writing a meaningful message in front of children", false],
        ["Demonstrating and talking about writing processes", false]
      ]),
      feedback: "The correct answer is A. The teacher can invite children to “read” their message to various audiences, such as a co-teacher, class visitor, peers, etc."
    },
    // 18- T writes a meaningful message in front of children/demonstrates and talks about processes
    {
      text: "When teachers write a meaningful message in front of children, they model writing for a realistic or authentic purpose. All of the following are examples of this EXCEPT:",
      options: new Map([
        ["Writing a list of what children want to learn about the ocean", false],
        ["Writing the morning message with children’s help", false],
        ["Drawing a web of pictures and words that describe the ocean (sand, waves, seagulls)", false],
        ["Writing the letter of the week on chart paper and inviting children to trace it", true]
      ]),
      feedback: "The correct answer is D. Demonstrating how to write individual letters, while important for teaching the alphabet and letter formation,  is not an example of writing a meaningful message in front of children."
    },
    // 19- T responds positively to all writing forms
    {
      text: "The teacher looks at a child’s drawing with scribbles separated by spaces and says, “I can’t tell what letter that is.” This is an example of a teacher responding positively to all writing forms.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The teacher in this example encourages the child to produce conventional letters and thus discourages the child from using scribbles to experiment with emergent writing forms. A teacher who accepts and celebrates all children’s writing even if it doesn’t look like correctly formed letters might say, “I see you wrote a message- tell me about it!”"
    },
    // 20- Emergent writing definition
    {
      text: "Emergent writing refers to young childrens’ _______________ the writing process. As children engage in meaningful early writing experiences, their understanding of __________________, how to make print forms, and authentic purposes for writing develops.",
      options: new Map([
        ["first attempts at; print conventions", true],
        ["first attempts at; cardinality", false],
        ["mastery of; print conventions", false],
        ["mastery of; cardinality", false]
      ]),
      feedback: "The correct answer is A. Emergent writing refers to the earliest stages of children’s writing development. As children observe and interact with more expert writers (e.g., teachers and peers), they learn about print conventions (e.g., directionality, spaces between words, etc.)."
    }
  ],
  'LIReading': [
    // 1 - Defining and or/discussing vocabulary words
    {
      text: "As the teacher reads a book about the changing seasons, the word “bare” is used to describe a tree. The teacher points to the picture of the tree in the book and says, “Look at these branches. Bare means the tree doesn’t have any leaves.” What behavior is this?",
      options: new Map([
        ["Asking children open-ended questions", false],
        ["Using multimodal instruction", false],
        ["Defining or discussing vocabulary words", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. The teacher explains the word “bare” with a child-friendly definition. The teacher also uses multimodal instruction to teach the meaning of “bare” when they point to the book illustration and draw children’s attention to the branches with no leaves."
    },
    // 2 - Discussing concepts related to a book before, during, and/or after the book reading
    {
      text: "The teacher reads a nonfiction book about creatures that live in shells. During the read aloud, the teacher passes around a snail shell and a hermit crab shell for children to examine and asks them to describe what they notice. Which behavior is NOT featured in this example?",
      options: new Map([
        ["Discussing concepts related to a book before, during, and/or after the book reading", false],
        ["Asking children open-ended questions/prompts", false],
        ["Facilitating discussion of social issues around equity or fairness", true],
        ["Using multimodal instruction", false]
      ]),
      feedback: "The correct answer is C. Exploring facts about animals is not an example of discussing social issues around equity or fairness. Giving children opportunities to talk about and handle real-life animal shells is an example of discussing concepts related to a book and multimodal instruction. Facilitating talk about what children observe when handling the shells is an example of teachers asking open-ended questions or prompts that do not have one correct answer."
    },
    // 3 - Relating the book to children’s experiences inside and/or outside the classroom
    {
      text: "Before reading a book about a young boy who is nervous about being a ring bearer at his mother’s wedding, the teacher asks children if they have ever been to a wedding and what they remember. Which behavior is this?",
      options: new Map([
        ["Using multimodal instruction", false],
        ["Relating the book to children’s experiences inside and/or outside the classroom", true],
        ["Responding to children with follow-up questions and/or comments to extend children’s thinking", false],
        ["Facilitating discussion of social issues around equity or fairness", false]
      ]),
      feedback: "The correct answer is B. The teacher attempts to relate the book to children’s experiences outside the classroom when they ask children to think about a time they attended a wedding. Activating children’s background knowledge will help them engage in and comprehend the content of the book. This is not an example of multimodal instruction because the teacher isn’t using a prop or pointing to a picture in the book to support children’s comprehension."
    },
    // 4 - Encouraging children to make connections to books that reflect their language and/or cultural backgrounds
    {
      text: "Given the large number of students in their classroom whose home language is Spanish, the teacher reads a book that incorporates Spanish words into the text and encourages students to help translate some of the Spanish words for their native English-speaking classmates. This is an example of:",
      options: new Map([
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", true],
        ["Responding to children with follow-up questions and/or comments", false],
        ["Discussing concepts related to a book before, during, and/or after the book reading", false],
        ["Defining or discussing vocabulary words", false]
      ]),
      feedback: "The correct answer is A. The teacher selects a book that reflects their students’ language background and facilitates a discussion about the Spanish words in the text."
    },
    // 5 - Using multimodal instruction to support comprehension and/or word learning
    {
      text: "Which of the following is NOT an example of the teacher using multimodal instruction to  support comprehension or word learning during a book reading?",
      options: new Map([
        ["The teacher asks children to make a frightened face as they talk about a character’s emotions", false],
        ["The teacher shows a video clip of someone playing an African drum called a Dundun before starting a read aloud on instruments", false],
        ["The teacher tells children that frightened means feeling scared", true],
        ["The teacher stands up during the read aloud and pretends to be a tree swaying in the wind to support their understanding of the word “sway”", false]
      ]),
      feedback: "The correct answer is C. Multimodal instruction happens when teachers use different methods to communicate content, such as showing a video clip, acting out a word's meaning, or using nonverbal modes of communication like facial expressions. Explaining a concept using words alone is not an example of multimodal instruction."
    },
    // 6- Asking children open-ended questions/ prompts (e.g., to make predictions or inferences
    {
      text: "The teacher reads a book about a child named Jackson who overcomes their fear of the dark. After the reading the teacher asks, “How does Jackson feel differently at the end of the story compared to how he felt at the beginning?” This is an example of asking children an open-ended question.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. Open-ended questions during book readings often require children to draw conclusions about character emotions, intentions, or motivations based on information that is not clearly stated in the text. Open-ended questions invite children to give multi-word responses and often require children to use their reasoning skills."
    },
    // 7- Responding to children with follow-up questions and/or comments to extend children’s thinking
    {
      text: "During a book reading about children and animals playing in the snow, a child says, “Look! There’s tracks!” The teacher says, “Yes, I see those tracks. They were probably made by a bird because I see three toe tracks pointing forward.” This is an example of:",
      options: new Map([
        ["Responding to children with follow-up questions and/or comments to extend children’s thinking", true],
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", false],
        ["Using multimodal instruction", false],
        ["None", false]
      ]),
      feedback: "The correct answer is A. The teacher responds directly to the content of the child’s statement about the tracks depicted in the book illustration. This is an example of providing an informative comment to support children’s thinking."
    },
    // 8- Encouraging children to retell, reenact, sequence, or summarize a text or part of a text
    {
      text: "During the third repeated reading of \"The Little Red Hen\" fable, the teacher invites groups of children to act out different scenes using finger puppets. Which behavior is this?",
      options: new Map([
        ["Responding to children with follow-up questions and/or comments to extend children’s thinking", false],
        ["Encouraging children to retell, reenact, sequence, or summarize a text or part of a text", true],
        ["Defining and discussing vocabulary words", false],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is B. In this example, the teacher provides opportunities for children to reenact the text with puppets and deepen their understanding of the plot."
    },
    // 9- Facilitating discussion of social issues around equity/fairness
    {
      text: "Which of the following is an example of facilitating discussion of social issues around equity or fairness during a book reading?",
      options: new Map([
        ["Discussing a book about the life cycle of a butterfly", false],
        ["Discussing a character’s feelings about their new sibling", false],
        ["Talking about all the different types of homes people live in across the world", false],
        ["Talking about problems presented in a book about Jackie Robinson, the first African American to play for a Major League Baseball team", true]
      ]),
      feedback: "The correct answer is D. The teacher facilitates a discussion about the problem of segregation during a read aloud about Jackie Robinson and his treatment as the first African American to play for a Major League Baseball team."
    },
    // 10- book reading tool question
    {
      text: "The Book Reading tool was designed to gather information about teacher support for children’s social-emotional development.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The Book Reading tool was designed to gather information about teacher read alouds of various texts that support children’s vocabulary and content knowledge, text comprehension, and speaking/listening skills. While teachers and students may discuss social-emotional topics during book readings, fostering children’s social-emotional development is not the primary focus."
    },
    // 11
    {
      text: "After a book reading about a child who feels frustrated when things don’t go their way, the teacher asks students to turn and talk to a peer about a time they felt frustrated. What behavior is this?",
      options: new Map([
        ["Relating the book to children’s experiences inside and/or outside the classroom", false],
        ["Using multimodal instruction", false],
        ["Defining or discussing vocabulary words", false],
        ["A and C", true]
      ]),
      feedback: "The correct answer is D. The teacher facilitates peer discussion about children’s personal experiences of feeling frustrated. The teacher encourages children to relate to their experiences in order to understand a vocabulary word."
    },
    // 12
    {
      text: "Before a book reading on ocean animals, the teacher asks children to brainstorm things that they want to know about ocean animals and records their questions on chart paper. This is an example of:",
      options: new Map([
        ["Discussing concepts related to a book before, during, and/or after the book reading", true],
        ["Defining or discussing vocabulary words", false],
        ["Facilitating discussion of social issues around equity or fairness", false],
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", false]
      ]),
      feedback: "The correct answer is A. The teacher activates children’s background knowledge by talking about what they want to learn about oceans. This will support their comprehension of new information presented during the book reading."
    },
    // 13
    {
      text: "During a read aloud about exercise and the body, the teacher asks children to think about the different types of exercises they explored the day before and which ones made their heart beat fast like the exercises described in the book. This is an example of relating the book to children’s experiences inside or outside the classroom.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. In this example, the teacher encourages children to relate concepts from the book to their experiences in the classroom."
    },
    // 14
    {
      text: "Through conversations with students’ families, the teacher learned that many of their students celebrate the Mexican holiday Dia de los Muertos. The teacher reads a book about this holiday and encourages students to share their home experiences regarding Dia de los Muertos with classmates. This is an example of:",
      options: new Map([
        ["Facilitating discussion of social issues around equity or fairness", false],
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", false],
        ["Relating the book to children’s experiences inside and/or outside the classroom", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. This book reading about Dia de los Muertos, which connects with children’s cultural and language background, also provides opportunities for children to link the book content to their experiences outside the classroom."
    },
    // 15
    {
      text: "Which of the following is an example of multimodal instruction to support comprehension or word learning during a book reading?",
      options: new Map([
        ["Acting out a word meaning", false],
        ["Playing a song related to the book", false],
        ["Passing around an object related to the book", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D. Multimodal instruction refers to many different strategies that teachers use to communicate content to children that extend beyond verbal input. Multimodal strategies often include pictures, objects, movement, sounds, and other tactile or visual methods."
    },
    // 16
    {
      text: "Which of the following is an open-ended question or prompt that a teacher might ask during a book reading?",
      options: new Map([
        ["Is Peter playing alone or with a friend in the snow?", false],
        ["What color is Peter’s shirt?", false],
        ["Why does Peter feel upset?", true],
        ["What did Peter put on his feet before going outside?", false]
      ]),
      feedback: "The correct answer is C. A common type of open-ended question during book reading is asking children to make inferences, or draw conclusions about information that has not been clearly stated in the text. In this example, the teacher asks children to make an inference about why Peter feels upset. The other questions have one correct answer, which can be found in the text or book illustrations, such as the color of Peter’s shirt."
    },
    // 17
    {
      text: " Before the book reading, the teacher shows children the front cover of the book and says, “Today we’re going to read a book about a boy who goes on a long bus ride with his grandma. Have you ever been on a bus?” This is an example of responding to children with follow-up questions and/or comments to extend children’s thinking.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The teacher asks a question at the beginning of the book reading activity before children have had the opportunity to ask questions or make comments. The teacher’s question about riding a bus is not in response to a child’s comment or question. If a child answered that yes, they had ridden a bus before and the teacher replied, “Tell us more about that!” that constitutes a teacher responding to a child with a follow-up question to extend their thinking."
    },
    // 18
    {
      text: "As the teacher reads a version of the gingerbread man story, they invite children to recall which character the gingerbread man encounters next and place the appropriate felt character on the board. By the end of the story, all of the characters are attached to the felt board in the correct order. This is an example of:",
      options: new Map([
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", false],
        ["Responding to children with follow-up questions and/or comments", false],
        ["Defining or discussing vocabulary words", false],
        ["Encouraging children to retell, reenact, sequence, or summarize a text or part of a text", true]
      ]),
      feedback: "The correct answer is D. The teacher provides children with an opportunity to put the characters from a text in the order in which they appeared. This is an example of a sequencing activity."
    },
    // 19
    {
      text: "The teacher reads a book about a child who is excluded from activities in his neighborhood due to his stutter. The teacher leads a discussion with children about how they would change the story to make it fair for the child. Which behavior is this?",
      options: new Map([
        ["Defining or discussing vocabulary words", false],
        ["Facilitating discussion of social issues around equity or fairness", true],
        ["Using multimodal instruction ", false],
        ["Encouraging children to make connections to books that reflect their language and/or cultural backgrounds", false]
      ]),
      feedback: "The correct answer is B. In this example, the teacher uses a fiction text to discuss topics around fairness."
    },
    // 20
    {
      text: "Which of the following is NOT a behavior included in the Book Reading observation tool?",
      options: new Map([
        ["Asking children to identify letters", true],
        ["Asking open-ended questions", false],
        ["Defining or discussing vocabulary words", false],
        ["Using multimodal instruction", false]
      ]),
      feedback: "The correct answer is A. The Book Reading Observation tool was designed to collect information on teacher strategies that support children’s vocabulary and content knowledge, text comprehension, and speaking/listening skills. While teaching letter knowledge is important, it is not one of the focus behaviors included in the Book Reading tool. The Foundational Skills and Writing tools include teacher support for alphabet knowledge."
    }
  ],
  'LILanguage': [
    // 1 - Discussing, defining, and/or promoting use of advanced vocabulary and concepts
    {
      text: "Which of the following is an example of discussing, defining, or promoting use of advanced vocabulary and concepts?",
      options: new Map([
        ["The teacher asks a child at the writing center to identify the letter S.", false],
        ["The teacher points to a magazine cover at the science center and says, “That’s an orangutan, it’s a type of monkey.”", true],
        ["A teacher and a group of children talk about what they’re going to do after school.", false],
        ["The teacher asks a child to count a set of buttons.", false]
      ]),
      feedback: "The correct answer is B. Teachers use many different strategies to draw children’s attention to vocabulary words. In this example, the teacher uses a picture to teach the word orangutan, and classifies it as a type of monkey."
    },
    // 2 - Encouraging children to tell and/or act out stories from experiences in their lives
    {
      text: "A teacher notices that a child is pretending to make tamales at the dramatic play center. The teacher says, “Is that how your mom makes tamales at home? Tell me what she does next!” Which teacher behavior is this?",
      options: new Map([
        ["Encouraging children to tell and/or act out stories from experiences in their lives", true],
        ["Discussing, defining, or promoting use of advanced vocabulary and concepts", false],
        ["Encouraging children to listen and respond to peer comments/ideas", false],
        ["Repeating or clarifying children’s comments", false]
      ]),
      feedback: "The correct answer is A. When teachers ask children to share about events that happen in their home or community and incorporate these into their play at school, they encourage children to tell and/or act out stories from their lived experiences."
    },
    // 3 - Having a conversation with children about a social-emotional topic
    {
      text: "Which of the following is NOT an example of having a conversation with children about a social-emotional topic?",
      options: new Map([
        ["Asking two children how they could share the blocks", false],
        ["Talking with a child about their feelings using a feelings chart", false],
        ["Having a conversation with a group of children about sorting objects", true],
        ["Having a conversation with a child about how to ask a friend to play", false]
      ]),
      feedback: "The correct answer is C. Social-emotional topics typically include how to solve problems, discussing feelings or emotions, or how to make and keep friends. Talking about sorting objects is focusing on math content. However, if the teacher and children started talking about how to share the objects, that would be considered talking about a social-emotional topic."
    },
    // 4 - Encouraging children to listen and respond to peer comments/ideas
    {
      text: "The teacher encourages a child to ask their classmate for ideas about what to build in the blocks center. What teacher behavior is this?",
      options: new Map([
        ["Asking an open-ended question to encourage conversation", false],
        ["Responding to children with follow-up questions or comments to extend their thinking", false],
        ["Repeating or clarifying children's comments", false],
        ["Encouraging children to listen and respond to peer comments/ideas", true]
      ]),
      feedback: "The correct answer is D. The teacher supports peer communication by prompting children to talk about their shared activity. "
    },
    // 5 - Observing or using questions/prompts in order to enter children’s ongoing play or activity
    {
      text: "Teachers who observe or use questions/prompts in order to enter children’s ongoing play often suggest their own ideas and change the direction of children’s play. ",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. Teachers who watch children or ask open-ended questions to understand what children are doing before entering the play scene build on children’s ideas instead of disrupting or changing the direction of the play."
    },
    // 6- Repeating or clarifying children’s comments
    {
      text: "The teacher asks a child at the dramatic play center what they are making. The child says something about “donuts.” The teacher replies, “Donuts? Are you making donuts for breakfast?” The teacher is _____________________________________.",
      options: new Map([
        ["Defining, discussing, or promoting the use of advanced vocabulary", false],
        ["Asking an open-ended question to encourage conversation", false],
        ["Having a conversation with the child about a social-emotional topic", false],
        ["None of the above", true]
      ]),
      feedback: "The correct answer is D. In this example, the teacher repeats the child’s comment, “donuts,” then follows with a clarifying yes or no question about what the child might be trying to communicate. When using  the language environment observation tool, this teacher behavior would be an example of repeating or clarifying children’s comments."
    },
    // 7- Responding to children with follow-up questions and/or comments to extend their thinking
    {
      text: "A child shows their journal to the teacher and says, “Look at mine!”  Which of the following teacher responses would encourage further conversation?",
      options: new Map([
        ["\"Great job!\"", false],
        ["\"Time to choose a center!\"", false],
        ["\"Wow!  Tell me about your drawing and writing.\"", true],
        ["\"I like the way you wrote your letters!\"", false]
      ]),
      feedback: "The correct answer is C. The teacher uses a prompt that responds to the child’s desire to share their journal. By prompting the child to describe their drawing and writing, the teacher is eliciting more language from the child and continuing the conversation."
    },
    // 8- Asking open-ended questions or prompts to encourage conversation
    {
      text: "Which of the following is an open-ended question or prompt?",
      options: new Map([
        ["Point to the yellow square.", false],
        ["How did you figure that out?", true],
        ["Did you go to grandma’s house yesterday?", false],
        ["Do you want to write an S or T?", false]
      ]),
      feedback: "The correct answer is B. Open-ended questions encourage children to respond with longer sentences and more details than close-ended questions. These questions often involve a wh-word (i.e., what, why, where, how). Open-ended prompts often begin with “tell me about” or “let’s talk about.”"
    },
    // 9- Combine vocab and open-ended
    {
      text: "The teacher watches a child play with a stuffed kangaroo at the science center and says, “You’re putting the baby kangaroo inside the mommy’s pouch. Why do you think the baby kangaroo stays in the pouch?” The teacher is ________________________________ and ______________________.",
      options: new Map([
        ["Repeating or clarifying children’s comments and asking an open-ended question", false],
        ["Repeating or clarifying children’s comments and encouraging children to listen to peer comments", false],
        ["Discussing and defining advanced vocabulary and asking an open-ended question", true],
        ["Discussing and defining advanced vocabulary and encouraging children to listen to peer comments", false]
      ]),
      feedback: "The correct answer is C. Teachers may use two or more strategies during one interaction with children. In this example, the teacher provides information about the vocabulary word pouch as the child plays with the kangaroo toy. The teacher also asks an open-ended question to foster the child’s thinking about the function of a pouch and deepen their vocabulary knowledge."
    },
    // 10- Definition of language environment
    {
      text: "Which of the following is NOT one of the teacher behaviors tracked by the Language Environment observation tool?",
      options: new Map([
        ["Defining advanced vocabulary and concepts ", false],
        ["Teaching letter formation", false],
        ["Responding positively to writing forms", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. The teacher behaviors included in the Language Environment tool support children’s vocabulary knowledge, listening comprehension, and speaking skills."
    },
    // 11 - Discussing, defining, and/or promoting use of advanced vocabulary and concepts
    {
      text: "During a small-group lesson, the teacher asks children to hold different objects and describe how they feel. One child says that their rock feels “smooth.” The teacher asks if anyone else has a smooth object. She also asks them to come up with other words that mean “smooth.” What teacher behavior is this?",
      options: new Map([
        ["Encouraging children to tell and/or act out stories from experiences in their lives", false],
        ["Defining, discussing, or promoting the use of advanced vocabulary", true],
        ["Having a conversation with the child about a social-emotional topic", false],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is B. In this example, the teacher facilitates a discussion with children about vocabulary words that describe texture. In addition, the teacher asks children to generate synonyms for the word “smooth.”"
    },
    // 12 - Encouraging children to tell and/or act out stories from experiences in their lives
    {
      text: "The teacher has asked families to text or email photos showing favorite moments or events from children’s lives outside of school. During small-group time, the teacher puts children in pairs to describe their photos to a peer. This activity ____________________________________.",
      options: new Map([
        ["Teaches children advanced vocabulary and concepts", false],
        ["Encourages children to tell and/or act out stories from experiences in their lives", false],
        ["Encourages children to listen and respond to peers", false],
        ["B and C", true]
      ]),
      feedback: "The correct answer is D. This activity features two main instructional goals. It provides an opportunity for children to tell stories from their personal lives and it supports peer communication."
    },
    // 13 - Having a conversation with children about a social-emotional topic
    {
      text: "The teacher notices that a child is growing frustrated at the writing center. The teacher brings a feelings chart to the table and asks the child to take a deep breath, point to the picture that shows how they feel, and talk about it. What language support strategy is the teacher using?",
      options: new Map([
        ["Encouraging children to listen and respond to their classmates’ comments and ideas", false],
        ["Observing or using questions/prompts in order to enter children’s ongoing play or activity", false],
        ["Having a conversation with children about a social-emotional topic", true],
        ["Repeating or clarifying children’s comments", false]
      ]),
      feedback: "The correct answer is C. A key social-emotional topic in preschool classrooms is recognizing and labeling one’s feelings or emotions. In this example, the teacher supports the child’s ability to understand and talk about their frustration."
    },
    // 14 - Encouraging children to listen and respond to peer comments/ideas
    {
      text: "During a small-group lesson, the teacher models how to ask friends what they are playing, then has pairs of children practice with each other. This is an example of which teacher behavior?",
      options: new Map([
        ["Encouraging children to listen and respond to peer comments/ideas", true],
        ["Repeating or clarifying children’s comments", false],
        ["Responding to children with follow-up questions and/or comments to extend their thinking", false],
        ["Observing or using questions/prompts in order to enter children’s ongoing play or activity", false]
      ]),
      feedback: "The correct answer is A.  One way that teachers can foster peer conversations is by  encouraging children to ask each other questions."
    },
    // 15 - Observing or using questions/prompts in order to enter children’s ongoing play or activity
    {
      text: "A teacher observes two children in the dramatic play center taking dishes and food out of the cupboards and placing them on the table. She walks over to them and says, “Who wants to play pet store with me?”  This is an example of the teacher observing or using questions/prompts in order to enter children’s ongoing play or activity.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The teacher’s question about the pet store is not responsive to what the children are already playing; therefore, the question does not help the teacher enter the children’s ongoing play. If they had said, “I see you are getting ready for dinner--who is coming to eat?” the teacher would be asking a question to enter children’s play without disrupting children’s play."
    },
    // 16- Repeating or clarifying children’s comments
    {
      text: "The teacher observes a child during center time stacking blocks and asks, “What are you building?” The child’s response is quiet, although the teacher thinks they said “tower.” The teacher says, “Tower? Are you building a tower?” What teacher behavior is this?",
      options: new Map([
        ["Defining, discussing, or promoting the use of advanced vocabulary", false],
        ["Repeating or clarifying children’s comments", true],
        ["Asking an open-ended question to encourage conversation", false],
        ["Having a conversation with the child about a social-emotional topic", false]
      ]),
      feedback: "The correct answer is B. In this example, the teacher repeats what they guess is the child’s response, “tower,” then follows with a clarifying question about what the child might be trying to communicate."
    },
    // 17- Responding to children with follow-up questions and/or comments to extend their thinking
    {
      text: "A child at the art center picks up a paint brush and says, “I’m gonna use blue.” Which of the following would be recorded as the teacher responding to the child with a follow-up question or comment to extend the child’s thinking?",
      options: new Map([
        ["\“Okay, that’s a great idea!\”", false],
        ["\"Don’t get paint on the floor, please.\"", false],
        ["\"Do I need to tie your smock?\"", false],
        ["\"Okay, that’s a great idea. Why are you choosing blue?\"", true]
      ]),
      feedback: "The correct answer is D. Only option D includes a follow-up question that prompts the child to express their thinking about their painting. While the first comment is responsive, it does not extend the child’s thinking. Options B and C are managerial comments."
    },
    // 18- Asking open-ended questions or prompts to encourage conversation
    {
      text: "Which of the following is NOT an example of an open-ended question or prompt to encourage conversation?",
      options: new Map([
        ["\"How can we make our building more stable?\"", false],
        ["\"How many buttons do you have?\"", true],
        ["\"Tell me about your painting.\"", false],
        ["\"How did you decide what to paint today?\"", false]
      ]),
      feedback: "The correct answer is B. Open-ended questions or prompts that encourage conversation do not have one correct answer, such as a correct number of buttons. Open-ended questions or prompts typically lead to multi word responses because the child’s answer is not constrained."
    },
    // 19- Combine open-ended and social emotional
    {
      text: "The teacher shows children a picture of their classmate at the bottom of the big slide with a huge grin on their face. The teacher says, “Look, Louis feels proud that he went down the big slide for the first time- he is happy about something he did all by himself!” Then the teacher asks the children when they have felt proud. The teacher is facilitating a conversation about a social-emotional topic and ____________________________.",
      options: new Map([
        ["Repeating or clarifying children’s comments", false],
        ["Observing children or using questions in order to enter children’s ongoing play or activity", false],
        ["Defining and discussing an advanced vocabulary", true],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is C. In addition to facilitating a discussion about feelings, the social-emotional topic, the teacher is defining and discussing an advanced vocabulary term--what it means to feel proud."
    },
    // 20- Definition of language environment
    {
      text: "The Language Environment tool provides information about the quantity and quality of language-building conversations between teachers, children, and peers in preschool classrooms.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. The Language Environment tool captures how often responsive and content-rich conversations occur between teachers,children, and peers."
    },
  ],
  'ac':[
    {
      text: "Two children are in the same center with a board game, but they are playing with " + 
      "the pieces independently.  How could a teacher encourage them to interact cooperatively?",
      options: new Map([
        ["Introduce visuals that remind children how to play a game", false],
        ["Explain to children that we take turns during board games and ask who would like to go first", false],
        ["Demonstrate how to move the game pieces on the board ", false],
        ["All of the above", true]
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
        ["None of the above", false]
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
        ["None of the above", false]
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
        ["Helping children find words to communicate", false]
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
        ["All of the above", true]
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
        ["None of the above", false]
      ]),
      feedback: "The correct answer is A. When children take turns, they are exhibiting cooperative behavior."
    },
    {
      text: "Associative interactions can happen when:",
      options: new Map([
        ["Children are playing with shared materials", false],
        ["Children are communicating about a task with their peers", false],
        ["Children are constructing an idea together", false],
        ["All of the above", true]
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
        ["A & C", false]
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
        ["Backpacks", false]
      ]),
      feedback: "The correct answer is A.  Although materials like crayons may be present during " + 
      "cooperative interactions, board games are particularly likely to help children initiate " + 
      "cooperative interactions because they require that children have a shared goal, take turns, " + 
      "and share ideas / communicate about their game."
    }
  ]
};

export default questionBank;