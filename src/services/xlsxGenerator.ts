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
