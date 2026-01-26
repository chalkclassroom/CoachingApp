/**
 * Seed script for local Firebase emulators
 * Run with: node scripts/seed-local.js
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

const users = [
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
      archived: false
    }
  },
  {
    email: "leader@chalk.local",
    password: "leader123",
    data: {
      firstName: "Program",
      lastName: "Leader",
      role: "programLeader",
      school: "District Office",
      phone: "555-0002",
      notes: "",
      archived: false
    }
  },
  {
    email: "site@chalk.local",
    password: "site123",
    data: {
      firstName: "Site",
      lastName: "Leader",
      role: "siteLeader",
      school: "Lincoln Elementary",
      phone: "555-0003",
      notes: "",
      archived: false
    }
  },
  {
    email: "coach1@chalk.local",
    password: "coach123",
    data: {
      firstName: "Maria",
      lastName: "Garcia",
      role: "coach",
      school: "Lincoln Elementary",
      phone: "555-0010",
      notes: "",
      archived: false
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
      phone: "555-0011",
      notes: "",
      archived: false
    }
  },
  {
    email: "teacher1@chalk.local",
    password: "teacher123",
    data: {
      firstName: "Sarah",
      lastName: "Johnson",
      role: "teacher",
      school: "Lincoln Elementary",
      phone: "555-0020",
      notes: "",
      archived: false
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
      phone: "555-0021",
      notes: "",
      archived: false
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
      phone: "555-0022",
      notes: "",
      archived: false
    }
  }
];

async function seed() {
  console.log("=== Seeding Firebase Emulators ===\n");

  for (const user of users) {
    try {
      // Create auth user
      const userCredential = await auth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = userCredential.user.uid;
      console.log(`Created auth: ${user.email} (${uid})`);

      // Create Firestore document
      await db.collection('users').doc(uid).set({
        ...user.data,
        id: uid,
        email: user.email
      });
      console.log(`Created doc:  ${user.data.firstName} ${user.data.lastName} (${user.data.role})`);

      // Sign out before creating next user
      await auth.signOut();
    } catch (error) {
      console.error(`Error creating ${user.email}:`, error.message);
    }
  }

  // Create Practice Teacher (special ID used by app)
  console.log("\nCreating Practice Teacher...");
  try {
    // Need to be signed in to write
    await auth.signInWithEmailAndPassword("admin@chalk.local", "admin123");

    await db.collection('users').doc('rJxNhJmzjRZP7xg29Ko6').set({
      id: 'rJxNhJmzjRZP7xg29Ko6',
      firstName: 'Practice',
      lastName: 'Teacher',
      email: 'practice@teacher.edu',
      role: 'teacher',
      school: 'Elum Entaree School',
      phone: '012-345-6789',
      notes: 'Notes are a useful place to put highlights or reminders!',
      archived: false
    });
    console.log("Created Practice Teacher");

    await auth.signOut();
  } catch (error) {
    console.error("Error creating Practice Teacher:", error.message);
  }

  console.log("\n=== Seed Complete ===");
  console.log("\nTest accounts:");
  console.log("  Admin:          admin@chalk.local / admin123");
  console.log("  Program Leader: leader@chalk.local / leader123");
  console.log("  Site Leader:    site@chalk.local / site123");
  console.log("  Coach 1:        coach1@chalk.local / coach123");
  console.log("  Coach 2:        coach2@chalk.local / coach123");
  console.log("  Teacher 1:      teacher1@chalk.local / teacher123");
  console.log("  Teacher 2:      teacher2@chalk.local / teacher123");
  console.log("  Teacher 3:      teacher3@chalk.local / teacher123");
  console.log("\nView data at: http://localhost:4000");

  process.exit(0);
}

seed().catch(console.error);
