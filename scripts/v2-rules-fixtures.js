const fixtures = {
  users: {
    coach: {
      id: 'v2-coach',
      firstName: 'V2',
      lastName: 'Coach',
      email: 'v2-coach@example.test',
      role: 'coach',
      programId: 'program-alpha',
      programs: ['program-alpha'],
      sites: ['site-north'],
      school: 'site-north'
    },
    teacher: {
      id: 'v2-teacher',
      firstName: 'V2',
      lastName: 'Teacher',
      email: 'v2-teacher@example.test',
      role: 'teacher',
      programId: 'program-alpha',
      programs: ['program-alpha'],
      school: 'site-north'
    },
    admin: {
      id: 'v2-admin',
      firstName: 'V2',
      lastName: 'Admin',
      email: 'v2-admin@example.test',
      role: 'admin',
      programs: [],
      sites: []
    },
    programLeader: {
      id: 'v2-program-leader',
      firstName: 'V2',
      lastName: 'Program Leader',
      email: 'v2-program-leader@example.test',
      role: 'programLeader',
      programId: 'program-alpha',
      programs: ['program-alpha']
    },
    siteLeader: {
      id: 'v2-site-leader',
      firstName: 'V2',
      lastName: 'Site Leader',
      email: 'v2-site-leader@example.test',
      role: 'siteLeader',
      programId: 'program-alpha',
      programs: ['program-alpha'],
      sites: ['site-north'],
      school: 'site-north'
    },
    unrelatedCoach: {
      id: 'v2-unrelated-coach',
      firstName: 'V2',
      lastName: 'Unrelated Coach',
      email: 'v2-unrelated-coach@example.test',
      role: 'coach',
      programId: 'program-beta',
      programs: ['program-beta'],
      sites: ['site-south'],
      school: 'site-south'
    }
  },
  actionPlans: {
    sameProgramActionPlan: {
      id: 'v2-same-program-plan',
      teacher: 'v2-teacher',
      teacherId: 'v2-teacher',
      teacherName: 'V2 Teacher',
      teacherFirstName: 'V2',
      teacherLastName: 'Teacher',
      coachId: 'v2-coach',
      programId: 'program-alpha',
      siteId: 'site-north',
      practice: 'Use wait time after open-ended questions',
      tool: 'Action plan',
      goal: 'Increase child talk time',
      benefit: 'More observable engagement',
      status: 'inProgress',
      dateModified: new Date('2026-06-01T00:00:00.000Z')
    },
    crossProgramActionPlan: {
      id: 'v2-cross-program-plan',
      teacher: 'v2-cross-teacher',
      teacherId: 'v2-cross-teacher',
      teacherName: 'V2 Cross Teacher',
      coachId: 'v2-unrelated-coach',
      programId: 'program-beta',
      siteId: 'site-south',
      practice: 'Cross-program plan',
      tool: 'Action plan',
      goal: 'Should be denied to primary coach',
      benefit: 'Rules no-happy coverage',
      status: 'inProgress',
      dateModified: new Date('2026-06-01T00:00:00.000Z')
    }
  },
  observations: {
    sameProgramObservation: {
      id: 'v2-same-program-observation',
      observedBy: '/user/v2-coach',
      teacher: '/user/v2-teacher',
      type: 'CC',
      start: new Date('2026-06-01T00:00:00.000Z'),
      end: new Date('2026-06-01T00:15:00.000Z'),
      programId: 'program-alpha',
      siteId: 'site-north'
    }
  },
  conferencePlans: {
    sameProgramConferencePlan: {
      id: 'v2-conference-plan',
      sessionId: 'v2-session',
      coach: 'v2-coach',
      teacher: 'v2-teacher',
      teacherName: 'V2 Teacher',
      teacherFirstName: 'V2',
      teacherLastName: 'Teacher',
      tool: 'Classroom Climate',
      dateCreated: new Date('2026-06-01T00:00:00.000Z'),
      dateModified: new Date('2026-06-01T00:00:00.000Z'),
      feedback: ['Start with a strength.'],
      questions: ['What changed after the observation?'],
      addedQuestions: [],
      notes: ['Rules fixture']
    }
  }
}

module.exports = { fixtures }
