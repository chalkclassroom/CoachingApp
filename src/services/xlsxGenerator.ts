import * as xlsx from 'xlsx'

type ActionPlanXlsxResources = {
  coachId: string
  teacherId: string
  dateModified: Date | null
  goalTimeline: Date | null
  benefit: string
  tool: string
  steps: Array<{ step: string; person: string; timeline: Date | null }>
  goal: string
}

type ConferencePlanXlsxResources = {
  coachFirstName: string
  coachLastName: string
  teacherFirstName: string
  teacherLastName: string
  date: Date
  feedback: Array<string>
  questions: Array<string>
  notes: Array<string>
}

const convertDate = (date: Date | null) =>{
  if( date instanceof Date) {
    return date.toLocaleDateString()
  }
  return ''
}

const maxSteps = (resources: ActionPlanXlsxResources[]) => {
  return resources
    .map(resource => resource.steps.length)
    .reduce((prev, cur) => Math.max(prev, cur), -Infinity)
}

const createActionPlanHeaders = (resources: ActionPlanXlsxResources[]) => {
  let headers = [
    'Coach ID',
    'Teacher ID',
    'Date Modified',
    'Tool',
    'Goal',
    'Goal Date',
    'Benefit for Students',
  ]
 // Adds the  required headers for the largest group of Action Plan steps
  let steps = maxSteps(resources)
    let questions = []
    for(let i = 0; i < steps; i++) {
      questions.push(`Action Step ${i + 1}`)
      questions.push(`Person ${i + 1}`)
      questions.push(`Timeline ${i + 1}`)
    }
  return headers.concat(questions)
}

const createActionPlanRow = (actionPlan: ActionPlanXlsxResources): string[] => {
  let { coachId, teacherId, dateModified, goal, goalTimeline, benefit, steps, tool } = actionPlan
  let data = [
    coachId,
    teacherId,
    convertDate(dateModified),
    tool,
    goal,
   convertDate(goalTimeline),
    benefit,
  ]
  steps.forEach((step) => {
    data.push(step.step)
    data.push(step.person)
    data.push(convertDate(step.timeline))
  })
  return data
}

export const generateActionPlanXlsx = (
  resources: ActionPlanXlsxResources[]
) => {
  let wb = xlsx.utils.book_new()
  const baseRows = [createActionPlanHeaders(resources)]
  const rows = baseRows.concat(resources.map(actionPlan =>createActionPlanRow(actionPlan)))

  let sheet = xlsx.utils.aoa_to_sheet(rows)
  // sets the column widths for each column -- each needs its own object.
  sheet[`!cols`] = Array.from({ length: rows[0].length }).map(_ => {
    return { wch: 12 }
  })
  xlsx.utils.book_append_sheet(wb, sheet, 'Action Plan')
  return wb
}

export const generateConferencePlanXlsx = (
  resources: ConferencePlanXlsxResources
) => {
  let {
    coachFirstName,
    coachLastName,
    teacherFirstName,
    teacherLastName,
    date,
    feedback,
    questions,
    notes,
  } = resources

  let headers = [
    'Coach ID',
    'Teacher ID',
    'Date Created',
    'Strengths-Based Feedback',
    'Reflection Questions',
    'Notes',
  ]

  let data = [
    coachFirstName + ' ' + coachLastName,
    teacherFirstName + ' ' + teacherLastName,
    date,
  ]

  let rows = []
  const maxLength = Math.max(feedback.length, notes.length, questions.length)

  for (let i = 0; i < maxLength; i++) {
    let newRow = Array.from({ length: data.length }, _ => '') // blanks number of lines equal to length of data.
    newRow.push(feedback[i] ?? '')
    newRow.push(questions[i] ?? '')
    newRow.push(notes[i] ?? '')
    rows.push(newRow)
  }
  console.log(rows)

  let wb = xlsx.utils.book_new()
  // Concat() to bring the first notes/questions/feedback to the first row.
  let sheet = xlsx.utils.aoa_to_sheet([
    headers,
    data.concat(rows[0].slice(data.length)),
    ...rows.slice(1),
  ])

  // sets the column widths for each column -- each needs its own object. Minimum length of 12, max of length of header string.
  sheet[`!cols`] = Array.from({ length: headers.length }).map((_, i) => {
    return { wch: Math.max(headers[i].length, 12) }
  })

  xlsx.utils.book_append_sheet(wb, sheet, 'Conference Plan')
  return wb
}
