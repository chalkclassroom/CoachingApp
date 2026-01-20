/**
 * Full Seed Script for CHALK Coaching App
 * Populates all Firestore collections with realistic test data
 * Run with: node scripts/seed-full.js
 */

const firebase = require('firebase');

// Firebase config from .env-cmdrc.js (development) - required to initialize SDK before connecting to emulators
const config = {
  apiKey: "AIzaSyAdl6szTzbtdD3iq8VoS86ZsMWSxUFtaJ4",
  authDomain: "chalk-dev-c6a5d.firebaseapp.com",
  projectId: "chalk-dev-c6a5d"
};

firebase.initializeApp(config);

// Connect to emulators
firebase.auth().useEmulator("http://localhost:9099");
firebase.firestore().useEmulator("localhost", 8080);

const auth = firebase.auth();
const db = firebase.firestore();

// Helper to create Firestore timestamp
const timestamp = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return firebase.firestore.Timestamp.fromDate(date);
};

// ============================================
// DATA DEFINITIONS
// ============================================

const sites = [
  { id: 'site-lincoln', name: 'Lincoln Elementary' },
  { id: 'site-washington', name: 'Washington Elementary' },
  { id: 'site-jefferson', name: 'Jefferson Preschool' },
  { id: 'site-roosevelt', name: 'Roosevelt Early Learning Center' }
];

const programs = [
  {
    id: 'program-metro',
    name: 'Metro Early Learning Initiative',
    sites: ['site-lincoln', 'site-washington'],
    leaders: []
  },
  {
    id: 'program-rural',
    name: 'Rural Schools Partnership',
    sites: ['site-jefferson', 'site-roosevelt'],
    leaders: []
  }
];

const users = [
  // Admin
  {
    email: "admin@chalk.local",
    password: "admin123",
    data: {
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      school: "CHALK Admin Office",
      phone: "555-0001",
      notes: "",
      archived: false,
      programs: [],
      sites: [],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  // Program Leaders
  {
    email: "leader1@chalk.local",
    password: "leader123",
    data: {
      firstName: "Patricia",
      lastName: "Martinez",
      role: "programLeader",
      school: "District Office",
      phone: "555-0002",
      notes: "Metro program coordinator",
      archived: false,
      programs: ['program-metro'],
      sites: [],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  {
    email: "leader2@chalk.local",
    password: "leader123",
    data: {
      firstName: "Robert",
      lastName: "Thompson",
      role: "programLeader",
      school: "Rural District Office",
      phone: "555-0003",
      notes: "Rural program coordinator",
      archived: false,
      programs: ['program-rural'],
      sites: [],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  // Site Leaders
  {
    email: "siteleader1@chalk.local",
    password: "site123",
    data: {
      firstName: "Jennifer",
      lastName: "Wilson",
      role: "siteLeader",
      school: "Lincoln Elementary",
      phone: "555-0010",
      notes: "Lincoln site lead",
      archived: false,
      programs: [],
      sites: ['site-lincoln'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3, 4, 5]
    }
  },
  {
    email: "siteleader2@chalk.local",
    password: "site123",
    data: {
      firstName: "David",
      lastName: "Anderson",
      role: "siteLeader",
      school: "Washington Elementary",
      phone: "555-0011",
      notes: "Washington site lead",
      archived: false,
      programs: [],
      sites: ['site-washington'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3, 4, 5]
    }
  },
  // Coaches
  {
    email: "coach1@chalk.local",
    password: "coach123",
    data: {
      firstName: "Maria",
      lastName: "Garcia",
      role: "coach",
      school: "Lincoln Elementary",
      phone: "555-0020",
      notes: "Experienced literacy coach",
      archived: false,
      programs: [],
      sites: ['site-lincoln'],
      favouriteQuestions: ['What strategies worked well today?', 'How did the children respond?'],
      playedVideos: ['video-1', 'video-2'],
      unlocked: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  {
    email: "coach2@chalk.local",
    password: "coach123",
    data: {
      firstName: "John",
      lastName: "Smith",
      role: "coach",
      school: "Washington Elementary",
      phone: "555-0021",
      notes: "Math instruction specialist",
      archived: false,
      programs: [],
      sites: ['site-washington'],
      favouriteQuestions: ['What math concepts did you cover?'],
      playedVideos: ['video-3'],
      unlocked: [1, 2, 3, 4, 5, 6]
    }
  },
  {
    email: "coach3@chalk.local",
    password: "coach123",
    data: {
      firstName: "Lisa",
      lastName: "Chen",
      role: "coach",
      school: "Jefferson Preschool",
      phone: "555-0022",
      notes: "Early childhood specialist",
      archived: false,
      programs: [],
      sites: ['site-jefferson'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: [1, 2, 3]
    }
  },
  // Teachers
  {
    email: "teacher1@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Sarah",
      lastName: "Johnson",
      role: "teacher",
      school: "Lincoln Elementary",
      phone: "555-0030",
      notes: "Pre-K teacher, Room 101",
      archived: false,
      programs: [],
      sites: ['site-lincoln'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  },
  {
    email: "teacher2@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Michael",
      lastName: "Brown",
      role: "teacher",
      school: "Lincoln Elementary",
      phone: "555-0031",
      notes: "Kindergarten teacher, Room 102",
      archived: false,
      programs: [],
      sites: ['site-lincoln'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  },
  {
    email: "teacher3@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Emily",
      lastName: "Davis",
      role: "teacher",
      school: "Washington Elementary",
      phone: "555-0032",
      notes: "Pre-K teacher, Room 201",
      archived: false,
      programs: [],
      sites: ['site-washington'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  },
  {
    email: "teacher4@chalk.local",
    password: "teacher123",
    data: {
      firstName: "James",
      lastName: "Miller",
      role: "teacher",
      school: "Washington Elementary",
      phone: "555-0033",
      notes: "Kindergarten teacher, Room 202",
      archived: false,
      programs: [],
      sites: ['site-washington'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  },
  {
    email: "teacher5@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Amanda",
      lastName: "Taylor",
      role: "teacher",
      school: "Jefferson Preschool",
      phone: "555-0034",
      notes: "Toddler room teacher",
      archived: false,
      programs: [],
      sites: ['site-jefferson'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  },
  {
    email: "teacher6@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Christopher",
      lastName: "White",
      role: "teacher",
      school: "Roosevelt Early Learning Center",
      phone: "555-0035",
      notes: "3-year-old classroom",
      archived: true, // Archived teacher for testing
      programs: [],
      sites: ['site-roosevelt'],
      favouriteQuestions: [],
      playedVideos: [],
      unlocked: []
    }
  }
];

// Observation types with their tool codes
const observationTypes = [
  { code: 'TT', name: 'Transition Time' },
  { code: 'CC', name: 'Classroom Climate' },
  { code: 'MI', name: 'Math Instruction' },
  { code: 'SE', name: 'Student Engagement' },
  { code: 'IN', name: 'Level of Instruction' },
  { code: 'LC', name: 'Listening to Children' },
  { code: 'SA', name: 'Sequential Activities' },
  { code: 'LI', name: 'Literacy Instruction' },
  { code: 'AC', name: 'Associative Cooperative' }
];

// Store created user IDs
const userIds = {};

// ============================================
// SEED FUNCTIONS
// ============================================

async function seedSites(adminUid) {
  console.log('\n--- Seeding Sites ---');
  for (const site of sites) {
    await db.collection('sites').doc(site.id).set({
      id: site.id,
      name: site.name,
      programs: []
    });
    console.log(`Created site: ${site.name}`);
  }
}

async function seedPrograms() {
  console.log('\n--- Seeding Programs ---');
  for (const program of programs) {
    await db.collection('programs').doc(program.id).set({
      id: program.id,
      name: program.name,
      sites: program.sites,
      leaders: program.leaders
    });

    // Update sites with program reference
    for (const siteId of program.sites) {
      await db.collection('sites').doc(siteId).update({
        programs: firebase.firestore.FieldValue.arrayUnion(program.id)
      });
    }
    console.log(`Created program: ${program.name}`);
  }
}

async function seedUsersExceptAdmin() {
  console.log('\n--- Seeding Users ---');

  // Filter out admin since already created
  const nonAdminUsers = users.filter(u => u.data.role !== 'admin');

  for (const user of nonAdminUsers) {
    try {
      // Create auth user
      const userCredential = await auth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = userCredential.user.uid;
      userIds[user.email] = uid;

      // Create Firestore document
      await db.collection('users').doc(uid).set({
        ...user.data,
        id: uid,
        email: user.email
      });
      console.log(`Created user: ${user.data.firstName} ${user.data.lastName} (${user.data.role})`);

      await auth.signOut();
    } catch (error) {
      console.error(`Error creating ${user.email}:`, error.message);
    }
  }

  // Sign in as admin to create Practice Teacher and update programs
  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  // Create Practice Teacher (special ID)
  await db.collection('users').doc('rJxNhJmzjRZP7xg29Ko6').set({
    id: 'rJxNhJmzjRZP7xg29Ko6',
    firstName: 'Practice',
    lastName: 'Teacher',
    email: 'practice@teacher.edu',
    role: 'teacher',
    school: 'Elum Entaree School',
    phone: '012-345-6789',
    notes: 'Practice teacher for new coaches',
    archived: false,
    programs: [],
    sites: [],
    favouriteQuestions: [],
    playedVideos: [],
    unlocked: []
  });
  console.log('Created Practice Teacher');

  // Update program leaders
  await db.collection('programs').doc('program-metro').update({
    leaders: [userIds['leader1@chalk.local']]
  });
  await db.collection('programs').doc('program-rural').update({
    leaders: [userIds['leader2@chalk.local']]
  });

  await auth.signOut();
}

async function seedPartners() {
  console.log('\n--- Seeding Coach-Teacher Partnerships ---');

  // Login as admin to have write access
  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  // Coach 1 (Maria) -> Teachers 1 & 2 (Lincoln)
  const coach1Id = userIds['coach1@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];
  const teacher2Id = userIds['teacher2@chalk.local'];

  await db.collection('users').doc(coach1Id).collection('partners').doc(teacher1Id).set({});
  await db.collection('users').doc(coach1Id).collection('partners').doc(teacher2Id).set({});
  await db.collection('users').doc(coach1Id).collection('partners').doc('rJxNhJmzjRZP7xg29Ko6').set({});
  console.log('Coach Maria Garcia assigned to: Sarah Johnson, Michael Brown, Practice Teacher');

  // Coach 2 (John) -> Teachers 3 & 4 (Washington)
  const coach2Id = userIds['coach2@chalk.local'];
  const teacher3Id = userIds['teacher3@chalk.local'];
  const teacher4Id = userIds['teacher4@chalk.local'];

  await db.collection('users').doc(coach2Id).collection('partners').doc(teacher3Id).set({});
  await db.collection('users').doc(coach2Id).collection('partners').doc(teacher4Id).set({});
  await db.collection('users').doc(coach2Id).collection('partners').doc('rJxNhJmzjRZP7xg29Ko6').set({});
  console.log('Coach John Smith assigned to: Emily Davis, James Miller, Practice Teacher');

  // Coach 3 (Lisa) -> Teacher 5 (Jefferson)
  const coach3Id = userIds['coach3@chalk.local'];
  const teacher5Id = userIds['teacher5@chalk.local'];

  await db.collection('users').doc(coach3Id).collection('partners').doc(teacher5Id).set({});
  await db.collection('users').doc(coach3Id).collection('partners').doc('rJxNhJmzjRZP7xg29Ko6').set({});
  console.log('Coach Lisa Chen assigned to: Amanda Taylor, Practice Teacher');

  await auth.signOut();
}

async function seedObservations() {
  console.log('\n--- Seeding Observations ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];
  const teacher2Id = userIds['teacher2@chalk.local'];
  const coach2Id = userIds['coach2@chalk.local'];
  const teacher3Id = userIds['teacher3@chalk.local'];

  const observations = [
    // Coach 1 observations
    { coach: coach1Id, teacher: teacher1Id, type: 'TT', daysAgo: 2, completed: true },
    { coach: coach1Id, teacher: teacher1Id, type: 'CC', daysAgo: 5, completed: true },
    { coach: coach1Id, teacher: teacher1Id, type: 'MI', daysAgo: 10, completed: true },
    { coach: coach1Id, teacher: teacher2Id, type: 'SE', daysAgo: 3, completed: true },
    { coach: coach1Id, teacher: teacher2Id, type: 'IN', daysAgo: 7, completed: true },
    { coach: coach1Id, teacher: teacher1Id, type: 'LC', daysAgo: 14, completed: true },
    // Coach 2 observations
    { coach: coach2Id, teacher: teacher3Id, type: 'SA', daysAgo: 1, completed: true },
    { coach: coach2Id, teacher: teacher3Id, type: 'LI', daysAgo: 4, completed: true },
    { coach: coach2Id, teacher: teacher3Id, type: 'AC', daysAgo: 8, completed: true },
    // Incomplete observation
    { coach: coach1Id, teacher: teacher1Id, type: 'TT', daysAgo: 0, completed: false }
  ];

  for (const obs of observations) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - obs.daysAgo);
    startDate.setHours(9, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 20);

    const obsRef = db.collection('observations').doc();
    await obsRef.set({
      id: obsRef.id,
      observedBy: `/user/${obs.coach}`,
      teacher: `/user/${obs.teacher}`,
      type: obs.type,
      start: firebase.firestore.Timestamp.fromDate(startDate),
      end: firebase.firestore.Timestamp.fromDate(endDate),
      completed: obs.completed,
      timezone: 'America/Chicago',
      activitySetting: null,
      checklist: null,
      lastClickTime: firebase.firestore.Timestamp.fromDate(endDate),
      timedOut: false
    });

    // Add some entries
    for (let i = 0; i < 5; i++) {
      const entryTime = new Date(startDate);
      entryTime.setMinutes(entryTime.getMinutes() + (i * 4));

      await obsRef.collection('entries').add({
        Timestamp: firebase.firestore.Timestamp.fromDate(entryTime),
        value: Math.floor(Math.random() * 5) + 1
      });
    }

    // Add a note
    await obsRef.collection('notes').add({
      Note: 'Good engagement observed during this activity.',
      Timestamp: firebase.firestore.Timestamp.fromDate(startDate)
    });

    const typeName = observationTypes.find(t => t.code === obs.type)?.name || obs.type;
    console.log(`Created ${obs.completed ? 'completed' : 'in-progress'} observation: ${typeName}`);
  }

  await auth.signOut();
}

async function seedActionPlans() {
  console.log('\n--- Seeding Action Plans ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];
  const teacher2Id = userIds['teacher2@chalk.local'];

  const actionPlans = [
    {
      coach: coach1Id,
      teacher: teacher1Id,
      tool: 'TT',
      goal: 'Reduce transition time between activities to under 3 minutes',
      goalTimeline: '4 weeks',
      benefit: 'More instructional time and smoother classroom flow',
      status: 'Active',
      daysAgo: 7
    },
    {
      coach: coach1Id,
      teacher: teacher1Id,
      tool: 'CC',
      goal: 'Increase positive behavior reinforcement',
      goalTimeline: '6 weeks',
      benefit: 'Better classroom climate and student engagement',
      status: 'Active',
      daysAgo: 14
    },
    {
      coach: coach1Id,
      teacher: teacher2Id,
      tool: 'SE',
      goal: 'Implement student engagement strategies during circle time',
      goalTimeline: '3 weeks',
      benefit: 'Higher participation rates',
      status: 'Maintenance',
      daysAgo: 30
    }
  ];

  for (let i = 0; i < actionPlans.length; i++) {
    const plan = actionPlans[i];
    const planRef = db.collection('actionPlans').doc();

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - plan.daysAgo);

    await planRef.set({
      id: planRef.id,
      coach: plan.coach,
      teacher: plan.teacher,
      tool: plan.tool,
      goal: plan.goal,
      goalTimeline: plan.goalTimeline,
      benefit: plan.benefit,
      status: plan.status,
      planNum: i + 1,
      dateCreated: firebase.firestore.Timestamp.fromDate(createdDate),
      dateModified: firebase.firestore.Timestamp.fromDate(new Date())
    });

    // Add action steps
    const steps = [
      { step: 'Review current transition procedures', person: 'Teacher' },
      { step: 'Introduce visual timer', person: 'Coach' },
      { step: 'Practice new routine with students', person: 'Teacher' },
      { step: 'Observe and provide feedback', person: 'Coach' }
    ];

    for (let j = 0; j < steps.length; j++) {
      await planRef.collection('actionSteps').doc(j.toString()).set({
        step: steps[j].step,
        person: steps[j].person,
        timeline: null
      });
    }

    console.log(`Created action plan: ${plan.goal.substring(0, 40)}...`);
  }

  await auth.signOut();
}

async function seedConferencePlans() {
  console.log('\n--- Seeding Conference Plans ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];

  // Get an observation to link
  const obsSnapshot = await db.collection('observations')
    .where('observedBy', '==', `/user/${coach1Id}`)
    .where('completed', '==', true)
    .limit(1)
    .get();

  if (!obsSnapshot.empty) {
    const obsId = obsSnapshot.docs[0].id;

    const confRef = db.collection('conferencePlans').doc();
    await confRef.set({
      id: confRef.id,
      sessionId: obsId,
      coach: coach1Id,
      teacher: teacher1Id,
      tool: 'TT',
      dateCreated: timestamp(5),
      dateModified: timestamp(0),
      feedback: [
        'Great job using the visual timer today!',
        'Students responded well to the countdown.'
      ],
      questions: [
        'How did you feel about the transition?',
        'What would you do differently next time?'
      ],
      addedQuestions: [],
      notes: ['Consider adding a transition song']
    });
    console.log('Created conference plan');
  }

  await auth.signOut();
}

async function seedAppointments() {
  console.log('\n--- Seeding Appointments ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];
  const coach2Id = userIds['coach2@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];
  const teacher3Id = userIds['teacher3@chalk.local'];

  const appointments = [
    // Upcoming appointments
    { coach: coach1Id, teacher: teacher1Id, tool: 'MI', daysFromNow: 2, completed: false },
    { coach: coach1Id, teacher: teacher1Id, tool: 'SE', daysFromNow: 5, completed: false },
    { coach: coach2Id, teacher: teacher3Id, tool: 'LC', daysFromNow: 3, completed: false },
    // Past appointments
    { coach: coach1Id, teacher: teacher1Id, tool: 'TT', daysFromNow: -3, completed: true },
    { coach: coach1Id, teacher: teacher1Id, tool: 'CC', daysFromNow: -7, completed: true }
  ];

  for (const apt of appointments) {
    const aptDate = new Date();
    aptDate.setDate(aptDate.getDate() + apt.daysFromNow);
    aptDate.setHours(10, 0, 0, 0);

    await db.collection('appointments').add({
      coach: apt.coach,
      teacherID: apt.teacher,
      tool: apt.tool,
      type: 'observation',
      date: firebase.firestore.Timestamp.fromDate(aptDate),
      completed: apt.completed,
      removed: false
    });

    const typeName = observationTypes.find(t => t.code === apt.tool)?.name || apt.tool;
    console.log(`Created appointment: ${typeName} (${apt.daysFromNow >= 0 ? 'upcoming' : 'past'})`);
  }

  await auth.signOut();
}

async function seedEmails() {
  console.log('\n--- Seeding Email Drafts ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];
  const teacher1Id = userIds['teacher1@chalk.local'];

  const emails = [
    {
      from: 'coach1@chalk.local',
      to: 'teacher1@chalk.local',
      subject: 'Follow-up from our Transition Time observation',
      emailContent: 'Hi Sarah,\n\nThank you for allowing me to observe your classroom today...',
      type: 'draft',
      user: coach1Id,
      recipientId: teacher1Id,
      recipientFirstName: 'Sarah',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'teacher1@chalk.local'
    },
    {
      from: 'coach1@chalk.local',
      to: 'teacher1@chalk.local',
      subject: 'Great progress on classroom climate!',
      emailContent: 'Hi Sarah,\n\nI wanted to share some positive observations from this week...',
      type: 'sent',
      user: coach1Id,
      recipientId: teacher1Id,
      recipientFirstName: 'Sarah',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'teacher1@chalk.local'
    }
  ];

  for (const email of emails) {
    const emailRef = db.collection('emails').doc();
    await emailRef.set({
      id: emailRef.id,
      ...email,
      dateCreated: timestamp(3),
      dateModified: timestamp(0)
    });
    console.log(`Created email (${email.type}): ${email.subject}`);
  }

  await auth.signOut();
}

async function seedTrainingProgress() {
  console.log('\n--- Seeding Training Progress ---');

  await auth.signInWithEmailAndPassword('admin@chalk.local', 'admin123');

  const coach1Id = userIds['coach1@chalk.local'];

  // Literacy training progress
  await db.collection('users').doc(coach1Id).collection('training').doc('LI').set({
    conceptsFoundational: true,
    conceptsWriting: true,
    conceptsReading: true,
    conceptsLanguage: false,
    definitionsFoundational: true,
    definitionsWriting: true,
    definitionsReading: false,
    definitionsLanguage: false,
    demoFoundational: true,
    demoWriting: false,
    demoReading: false,
    demoLanguage: false,
    knowledgeCheckFoundational: true,
    knowledgeCheckWriting: false,
    knowledgeCheckReading: false,
    knowledgeCheckLanguage: false
  });
  console.log('Created training progress for Coach 1');

  // Knowledge check responses
  const responses = [
    { type: 'foundational', questionIndex: 0, answerIndex: 2, isCorrect: true },
    { type: 'foundational', questionIndex: 1, answerIndex: 1, isCorrect: true },
    { type: 'foundational', questionIndex: 2, answerIndex: 0, isCorrect: false },
    { type: 'writing', questionIndex: 0, answerIndex: 3, isCorrect: true }
  ];

  for (const resp of responses) {
    await db.collection('knowledgeChecks').add({
      timestamp: timestamp(Math.floor(Math.random() * 14)),
      answeredBy: coach1Id,
      type: resp.type,
      questionIndex: resp.questionIndex,
      answerIndex: resp.answerIndex,
      isCorrect: resp.isCorrect
    });
  }
  console.log('Created knowledge check responses');

  await auth.signOut();
}

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function seed() {
  console.log('='.repeat(50));
  console.log('CHALK Coaching - Full Database Seed');
  console.log('='.repeat(50));

  try {
    // First create admin user to have authentication for writes
    console.log('\n--- Creating Admin User First ---');
    const adminUser = users.find(u => u.data.role === 'admin');
    const adminCred = await auth.createUserWithEmailAndPassword(adminUser.email, adminUser.password);
    const adminUid = adminCred.user.uid;
    userIds[adminUser.email] = adminUid;

    await db.collection('users').doc(adminUid).set({
      ...adminUser.data,
      id: adminUid,
      email: adminUser.email
    });
    console.log(`Created admin: ${adminUser.data.firstName} ${adminUser.data.lastName}`);

    // Now we're signed in as admin - continue with other seeds
    await seedSites(adminUid);
    await seedPrograms();

    // Sign out before creating other users
    await auth.signOut();
    await seedUsersExceptAdmin();

    await seedPartners();
    await seedObservations();
    await seedActionPlans();
    await seedConferencePlans();
    await seedAppointments();
    await seedEmails();
    await seedTrainingProgress();

    console.log('\n' + '='.repeat(50));
    console.log('SEED COMPLETE!');
    console.log('='.repeat(50));
    console.log('\nTest Accounts:');
    console.log('  Admin:          admin@chalk.local / admin123');
    console.log('  Program Leader: leader1@chalk.local / leader123');
    console.log('  Site Leader:    siteleader1@chalk.local / site123');
    console.log('  Coach:          coach1@chalk.local / coach123');
    console.log('  Teacher:        teacher1@chalk.local / teacher123');
    console.log('\nView data at: http://localhost:4000');
    console.log('App running at: http://localhost:8081');

  } catch (error) {
    console.error('Seed failed:', error);
  }

  process.exit(0);
}

seed();
