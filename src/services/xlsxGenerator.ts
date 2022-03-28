import * as xlsx from 'xlsx'

type ActionPlanXlsxResources = {
  coachFirstName: string
  coachLastName: string
  teacherFirstName: string
  teacherLastName: string
  date: Date
  goalTimeline: Date | null
  benefit: string
  actionStepsArray: Array<{ step: string, person: string, timeline: Date | null }>
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

export const generateActionPlanXlsx = (resources: ActionPlanXlsxResources) => {
  let {
    coachFirstName,
    coachLastName,
    teacherFirstName,
    teacherLastName,
    date,
    goalTimeline,
    benefit,
    actionStepsArray,
    goal
  } = resources

  let wb = xlsx.utils.book_new()

  let headers = [
    'Coach ID',
    'Teacher ID',
    'Date Created',
    'Goal',
    'Goal Date',
    'Benefit for Students',
  ]
  let data = [
    coachFirstName + ' ' + coachLastName,
    teacherFirstName + ' ' + teacherLastName,
    date,
    goal,
    goalTimeline,
    benefit,
  ]

  actionStepsArray.forEach((step, index) => {
    headers.push(`Action Step ${index + 1}`)
    data.push(step.step)
    headers.push(`Person ${index + 1}`)
    data.push(step.person)
    headers.push(`Timeline ${index + 1}`)
    data.push(step.timeline)
  })

  let sheet = xlsx.utils.aoa_to_sheet([headers, data])

  // sets the column widths for each column -- each needs its own object.
  sheet[`!cols`] = Array.from({ length: data.length }).map(_ => {
    return { wch: 12 }
  })

  xlsx.utils.book_append_sheet(wb, sheet, 'Action Plan')
 return wb
}



export const generateConferencePlanXlsx = (resources: ConferencePlanXlsxResources) => {
  let {
    coachFirstName,
    coachLastName,
    teacherFirstName,
    teacherLastName,
    date,
    feedback,
    questions,
    notes
  } = resources

  let headers = [
    'Coach ID',
    'Teacher ID',
    'Date Created',
    'Strengths-Based Feedback',
    'Reflection Questions',
    'Notes'
  ]

  let data = [
    coachFirstName + ' ' + coachLastName,
    teacherFirstName + ' ' + teacherLastName,
    date,
  ]

  let rows =[]
  const maxLength = Math.max(feedback.length, notes.length, questions.length);

  for(let i = 0; i < maxLength; i++) {
    let newRow = Array.from({length: data.length},(_) => '') // blanks number of lines equal to length of data.
    newRow.push(feedback[i]?? '')
    newRow.push(questions[i]?? '')
    newRow.push(notes[i]?? '')
    rows.push(newRow)
  }
  console.log(rows)

  let wb = xlsx.utils.book_new()
 // Concat() to bring the first notes/questions/feedback to the first row.
  let sheet = xlsx.utils.aoa_to_sheet([headers, data.concat(rows[0].slice(data.length)), ...rows.slice(1)])

  // sets the column widths for each column -- each needs its own object. Minimum length of 12, max of length of header string.
  sheet[`!cols`] = Array.from({ length: headers.length }).map((_, i) => {
    return { wch: Math.max(headers[i].length, 12) }
  })

  xlsx.utils.book_append_sheet(wb, sheet, 'Conference Plan')
  return wb

}
