
import * as React from 'react';
import { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ChooseTheme from './ChooseTheme';
import EmailBody from './EmailBody';
import SubjectLine from './SubjectLine';
import RecipientAddress from './RecipientAddress';
import SendButton from './SendButton';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import AttachButton from './AttachButton';
import TemplateDialog from './TemplateDialog';
import DeleteDialog from './DeleteDialog';
import AttachmentDialog from './AttachmentDialog';
import { ThemeOptions, Message, Attachment, SelectOption, TemplateOption, Email } from './MessagingTypes';
import * as CryptoJS from 'crypto-js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ActionPlanForPdf from './ActionPlanForPdf';
import TransitionResultsPdf from './ResultsPdfs/TransitionResultsPdf';
import ClimateResultsPdf from './ResultsPdfs/ClimateResultsPdf';
import MathResultsPdf from './ResultsPdfs/MathResultsPdf';
import InstructionResultsPdf from './ResultsPdfs/InstructionResultsPdf';
import EngagementResultsPdf from './ResultsPdfs/EngagementResultsPdf';
import ListeningResultsPdf from './ResultsPdfs/ListeningResultsPdf';
import SequentialResultsPdf from './ResultsPdfs/SequentialResultsPdf';
import LiteracyResultsPdf from './ResultsPdfs/LiteracyResultsPdf';
import ACResultsPdf from './ResultsPdfs/ACResultsPdf';
import { connect } from 'react-redux';
import * as Types from '../../constants/Types';
import * as Constants from '../../constants/Constants';
import { UserDocument } from '../Firebase/Firebase'

interface NewMessageViewProps {
  firebase: any;
  draft?: Email;
  email: string;
  attachments?: Array<Attachment>;
  updateDrafts?(email: Email): void;
  readOnly?: boolean;
  moveDraftToSent?(email: Email): void;
  setMenuOption(value: React.SetStateAction<"SENT" | "DRAFTS" | "NEW_MESSAGE">): void;
  removeFromDrafts?(emailId: string): void;
  teacherList: Array<Types.Teacher>;
};

interface ResultType {
  summary: boolean,
  details: boolean,
  trends: boolean
}

type ResultTypeKey = keyof ResultType;

type TransitionData = {
  summary: Array<{
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  }> | undefined,
  details: Array<{
    line: number,
    traveling: number,
    waiting: number,
    routines: number,
    behaviorManagement: number,
    other: number,
    total: number
  }> | undefined,
  trends: Array<{
    id: string,
    line: number,
    traveling: number,
    waiting: number,
    routines: number,
    behaviorManagement: number,
    other: number,
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  }> | undefined
}

type ClimateData = {
  summary: {
    toneRating: number
  } | undefined,
  details: {
    specificCount: number,
    nonspecificCount: number,
    disapprovalCount: number,
    redirectionCount: number
  } | undefined,
  trends: Array<{
    dayOfEvent: {value: string},
    positive: number,
    negative: number
  }> | undefined
}

type MathData = {
  childSummary: {
    math: number,
    notMath: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  } | undefined,
  childDetails: {
    math1: number,
    math2: number,
    math3: number,
    math4: number
  } | undefined,
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  } | undefined,
  childTrends: Array<{
    startDate: {value: string},
    math: number,
    notMath: number
  }> | undefined,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    noSupport: number
  }> | undefined
}

type InstructionData = {
  summary: {
    highLevelQuestion: number,
    lowLevelQuestion: number,
    highLevelResponse: number,
    lowLevelResponse: number
  } | undefined,
  details: {
    highLevelQuestion: number,
    lowLevelQuestion: number,
    highLevelResponse: number,
    lowLevelResponse: number
  } | undefined,
  trends: Array<{
    dayOfEvent: {value: string},
    hlq: number,
    hlqResponse: number,
    llq: number,
    llqResponse: number
  }> | undefined
}

type EngagementData = {
  summary: {
    offTask: number,
    engaged: number,
    avgRating: number
  } | undefined,
  details: {
    offTask0: number,
    offTask1: number,
    offTask2: number,
    mildlyEngaged0: number,
    mildlyEngaged1: number,
    mildlyEngaged2: number,
    engaged0: number,
    engaged1: number,
    engaged2: number,
    highlyEngaged0: number,
    highlyEngaged1: number,
    highlyEngaged2: number,
  } | undefined,
  trends: Array<{
    startDate: {value: string},
    average: number
  }> | undefined
}

type ListeningData = {
  summary: {listening: number, notListening: number} | undefined,
  details: {
    listening1: number,
    listening2: number,
    listening3: number,
    listening4: number,
    listening5: number,
    listening6: number
  } | undefined,
  trends: Array<{
    startDate: {value: string},
    listening: number,
    notListening: number
  }> | undefined
}

type SequentialData = {
  childSummary: {
    sequential: number,
    notSequential: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  } | undefined,
  childDetails: {
    sequential1: number,
    sequential2: number,
    sequential3: number,
    sequential4: number
  } | undefined,
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  } | undefined,
  childTrends: Array<{
    startDate: {value: string},
    sequential: number,
    notSequential: number
  }> | undefined,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    noSupport: number
  }> | undefined
}

type LiteracyData = {
  summary: {
    literacy: number,
    noLiteracy: number
  },
  details: {
    literacy1: number,
    literacy2: number,
    literacy3: number,
    literacy4: number,
    literacy5: number,
    literacy6: number,
    literacy7: number,
    literacy8: number,
    literacy9?: number,
    literacy10?: number,
  } | undefined
}

type ACData = {
  childSummary: {
    ac: number,
    noac: number,
    noOpportunity: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  } | undefined,
  childDetails: {
    ac1: number,
    ac2: number,
    ac3: number,
    ac4: number
  } | undefined,
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  } | undefined,
  childTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    noac: number,
    ac: number
  }> | undefined,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    nosupport: number
  }> | undefined
}

/**
 * @return {ReactElement}
 * @param {NewMessageViewProps} props
 */
function NewMessageView(props: NewMessageViewProps): React.ReactElement {
  const [theme, setTheme] = useState({
    id: '0',
    value: 'None',
    label: 'None'
  });
  const [newTheme, setNewTheme] = useState({
    id: '0',
    value: 'None',
    label: 'None'
  });
  const [recipient, setRecipient] = useState<{value: string | undefined, id: string | undefined, label: string | undefined, firstName: string | undefined}>({
    value: '',
    id: '',
    label: '',
    firstName: ''
  });
  const [recipientList, setRecipientList] = useState<Array<{
    value: string,
    id: string,
    label: string,
    firstName: string
  }>>([]);
  const [actionPlans, setActionPlans] = useState<Array<{
    id: string,
    date: {
      seconds: number,
      nanoseconds: number
    },
    practice: string,
    achieveBy: firebase.firestore.Timestamp
  }>>([]);
  const [noActionPlansMessage, setNoActionPlansMessage] = useState<string>('Retrieving action plans...');
  const [observations, setObservations] = useState<Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>>([]);
  const [noObservationsMessage, setNoObservationsMessage] = useState<string>('Retrieving results...');
  const [actionPlanDisplay, setActionPlanDisplay] = useState(false);
  const [subject, setSubject] = useState<string | undefined>('');
  const firebase = props.firebase;
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [emailId, setEmailId] = useState('');
  const [attachments, setAttachments] = useState<Array<Attachment>>();
  const [attachDisabled, setAttachDisabled] = useState(true);
  const [checkedResults, setCheckedResults] = useState<{[id: string]: {
      summary: boolean,
      details: boolean,
      trends: boolean
    }}>({});
  const [checkedActionPlans, setCheckedActionPlans] = useState<Array<string>>();
  const [templateDialog, setTemplateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [doneAttaching, setDoneAttaching] = useState(true);
  const [renderActionPlan, setRenderActionPlan] = useState(false);
  const [renderTransitionPdf, setRenderTransitionPdf] = useState(false);
  const [renderClimatePdf, setRenderClimatePdf] = useState(false);
  const [renderMathPdf, setRenderMathPdf] = useState(false);
  const [renderInstructionPdf, setRenderInstructionPdf] = useState(false);
  const [renderEngagementPdf, setRenderEngagementPdf] = useState(false);
  const [renderListeningPdf, setRenderListeningPdf] = useState(false);
  const [renderSequentialPdf, setRenderSequentialPdf] = useState(false);
  const [renderLiteracyPdf, setRenderLiteracyPdf] = useState(false);
  const [renderACPdf, setRenderACPdf] = useState(false);
  const [teacherObject, setTeacherObject] = useState<Types.Teacher>();
  const [transition, setTransition] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: TransitionData['summary'],
    details: TransitionData['details'],
    trends: TransitionData['trends'],
  }>>([]);
  const [climate, setClimate] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: ClimateData['summary'],
    details: ClimateData['details'] & {detailsChecked: boolean} | undefined,
    trends: ClimateData['trends'],
  }>>([]);
  const [math, setMath] = useState<Array<{
    sessionId: string,
    date: Date,
    childSummary: MathData['childSummary'],
    teacherSummary: MathData['teacherSummary'],
    childDetails: MathData['childDetails'],
    teacherDetails: MathData['teacherDetails'],
    childTrends: MathData['childTrends'],
    teacherTrends: MathData['teacherTrends']
  }>>();
  const [instruction, setInstruction] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: InstructionData['summary'],
    details: InstructionData['details'],
    trends: InstructionData['trends'],
  }>>([]);
  const [engagement, setEngagement] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: EngagementData['summary'],
    details: EngagementData['details'],
    trends: EngagementData['trends'],
  }>>([]);
  const [listening, setListening] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: ListeningData['summary'],
    details: ListeningData['details'],
    trends: ListeningData['trends'],
  }>>([]);
  const [sequential, setSequential] = useState<Array<{
    sessionId: string,
    date: Date,
    childSummary: SequentialData['childSummary'],
    teacherSummary: SequentialData['teacherSummary'],
    childDetails: SequentialData['childDetails'],
    teacherDetails: SequentialData['teacherDetails'],
    childTrends: SequentialData['childTrends'],
    teacherTrends: SequentialData['teacherTrends']
  }>>();
  const [literacy, setLiteracy] = useState<Array<{
    sessionId: string,
    date: Date,
    summary: LiteracyData['summary'],
    details: LiteracyData['details']
  }>>();
  const [ac, setAC] = useState<Array<{
    sessionId: string,
    date: Date,
    childSummary: ACData['childSummary'],
    teacherSummary: ACData['teacherSummary'],
    childDetails: ACData['childDetails'],
    teacherDetails: ACData['teacherDetails'],
    childTrends: ACData['childTrends'],
    teacherTrends: ACData['teacherTrends']
  }>>();
  const [actionPlanData, setActionPlanData] = useState<Array<{
    actionPlanId: string,
    tool: string,
    sessionId: string,
    goal: string,
    goalTimeline: Date,
    benefit: string,
    date: Date,
    actionSteps: Array<{step: string, person: string, timeline: Date}>
  }>>();
  const [fetchedActionPlans, setFetchedActionPlans] = useState(false);
  const [fetchedResults, setFetchedResults] = useState(false);

  /**
   * sets email recipient, fetches all their action plans and results
   * @param {object} newRecipient
   */
  const recipientSelected = (newRecipient: {value: string | undefined, id: string | undefined, label: string | undefined, firstName: string | undefined}): void => {
    if (newRecipient.value && newRecipient.id && newRecipient.label && newRecipient.firstName) {
      setRecipient(newRecipient);
      const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
        return obj.id === newRecipient.id
      });
      setTeacherObject(teacherData[0]);
      firebase.getAllTeacherActionPlans(newRecipient.id).then((actionPlans: Array<{
        id: string,
        date: {
          seconds: number,
          nanoseconds: number
        },
        practice: string,
        achieveBy: firebase.firestore.Timestamp
      }>) => {
        setActionPlans(actionPlans);
        setFetchedActionPlans(true);
        if (actionPlans && actionPlans.length > 0) {
          setNoActionPlansMessage('')
        } else {
          setNoActionPlansMessage('You have not created any action plans with ' + newRecipient.label + '.');
        }
      }).catch((error : Error) => {
        console.log('error', error);
        setNoActionPlansMessage('There was an error retrieving ' + newRecipient.label + '\'s action plans.');
      });
      firebase.getAllTeacherObservations(newRecipient.id).then((observations: Array<{
        id: string,
        date: firebase.firestore.Timestamp,
        practice: string,
        literacyType?: string
      }>) => {
        setObservations(observations);
        setFetchedResults(true);
        const unchecked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} = {};
        if (observations && observations.length > 0) {
          observations.forEach(result => {
            unchecked[result.id] = {'summary': false, 'details': false, 'trends': false}
          })
        }
        setCheckedResults(unchecked);
        if (observations && observations.length > 0) {
          setNoObservationsMessage('')
        } else {
          setNoObservationsMessage('You have no observation data for ' + newRecipient.label + '.');
        }
      }).catch((error : Error) => {
        console.log('error', error);
        setNoObservationsMessage('There was an error retrieving ' + newRecipient.label + '\'s results.');
      });
    }
  }

  useEffect(() => {
    if (userName === '') {
      firebase.getCoachFirstName()
        .then((name: string): void => {
          setUserName(name);
        });
      firebase.getCoachLastName()
        .then((lastName: string): void => {
          setUserLastName(lastName)
        })
    }
    if (recipientList.length === 0) {
      const newRecipientList: Array<{value: string, id: string, label: string, firstName: string}> = [];
      props.teacherList.forEach((teacher) => {
        const newTeacher = {
          value: teacher.email,
          id: teacher.id,
          label: (teacher.firstName + ' ' + teacher.lastName),
          firstName: teacher.firstName
        };
        if (newTeacher.id !== 'rJxNhJmzjRZP7xg29Ko6') {
          newRecipientList.push(newTeacher);
        }else{
          newRecipientList.push({ ...newTeacher, value: props.email });
        }
      })
      setRecipientList(newRecipientList)
    }
    // sets states for email content and info if opening a draft
    if (props.draft && emailId === '') {
      setEmailId(props.draft.id);
      setEmail(props.draft.emailContent);
      setSubject(props.draft.subject);
      recipientSelected({
        value: props.draft.recipientEmail ? props.draft.recipientEmail : '',
        id: props.draft.recipientId ? props.draft.recipientId : '',
        label: props.draft.recipientName ? props.draft.recipientName : '',
        firstName: props.draft.recipientFirstName ? props.draft.recipientFirstName : ''
      })
    }
    // sets attachments if viewing a draft or sent email
    if (props.attachments && !attachments) {
      setAttachments(props.attachments);
      const attachedActionPlans = props.attachments.filter(obj => {
        return obj.actionPlan === true
      });
      const attachedActionPlanIds = attachedActionPlans.map(a => a.id);
      setCheckedActionPlans(attachedActionPlanIds);
      const attachedResults = props.attachments.filter(obj => {
        return obj.result === true
      });
      const checked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} = {};
      attachedResults.forEach(result => {
        checked[result.id] = {'summary': false, 'details': false, 'trends': false}
      });
      setCheckedResults(checked);
    }
    // sets doneAttaching state to update buttons when attachments are completed
    if (!doneAttaching && attachments) {
      const attachmentsContent = attachments.map(a => a.content);
      const contentEmpty = attachmentsContent.filter(obj => {
        return obj === ''
      });
      if (contentEmpty.length === 0) {
        setDoneAttaching(true)
      }
    }
    if (((noObservationsMessage === '') && noActionPlansMessage === '')) {
      setAttachDisabled(false)
    }
    if (fetchedActionPlans && fetchedResults) {
      setAttachDisabled(false)
    }
  });

  const addActionPlanAttachment = (actionPlanId: string, teacherId: string, title: string): void => {
    const newAttachments = attachments ? [...attachments] : [];
    const idMatch = (element: {
      content: string,
      filename: string,
      type: string,
      disposition: string,
      id: string,
      teacherId: string,
      actionPlan: boolean,
      result: boolean
    }): boolean => element.id === actionPlanId;
    if (newAttachments.length > 0) {
      const index = newAttachments.findIndex(idMatch);
      if (index !== -1) {
        newAttachments.splice(index, 1);
      } else {
        newAttachments.push({
          content: '',
          filename: title,
          type: 'application/pdf',
          disposition: 'attachment',
          id: actionPlanId,
          teacherId: teacherId,
          actionPlan: true,
          result: false
        });
      }
      setAttachments(newAttachments);
    } else {
      setAttachments([{
        content: '',
        filename: title,
        type: 'application/pdf',
        disposition: 'attachment',
        id: actionPlanId,
        teacherId: teacherId,
        actionPlan: true,
        result: false
      }]);
    }
  }

  const addResultsAttachment = (
    sessionId: string,
    teacherId: string,
    title: string,
    graphType: 'summary' | 'details' | 'trends',
    practice: string,
    date: Date,
    literacyType?: string
  ): void => {
    const newAttachments = attachments ? [...attachments] : [];
    const newResultObject = {
      content: '',
      filename: title,
      type: 'application/pdf',
      disposition: 'attachment',
      id: sessionId,
      teacherId: teacherId,
      actionPlan: false,
      result: true,
      summary: graphType === 'summary' ? true : false,
      details: graphType === 'details' ? true : false,
      trends: graphType === 'trends' ? true : false,
      practice: practice,
      date: date,
      literacyType: literacyType
    };
    const idMatch = (element: {
      content: string,
      filename: string,
      type: string,
      disposition: string,
      id: string,
      teacherId: string,
      actionPlan: boolean,
      result: boolean,
      summary?: boolean,
      details?: boolean,
      trends?: boolean,
      practice?: string,
      date?: Date,
      literacyType?: string
    }): boolean => element.id === sessionId;
    if (newAttachments.length > 0) {
      const index = newAttachments.findIndex(idMatch);
      if (index !== -1) {
        if (graphType === 'summary') {
          if (newAttachments[index].summary) {
            if (!newAttachments[index].details && !newAttachments[index].trends) {
              newAttachments.splice(index, 1);
            } else {
              newAttachments[index].summary = false;
            }
          } else {
            newAttachments[index].summary = true;
          }
        } else if (graphType === 'details') {
          if (newAttachments[index].details) {
            if (!newAttachments[index].summary && !newAttachments[index].trends) {
              newAttachments.splice(index, 1)
            } else {
              newAttachments[index].details = false;
            }
          } else {
            newAttachments[index].details = true;
          }
        } else {
          if (newAttachments[index].trends) {
            if (!newAttachments[index].summary && !newAttachments[index].details) {
              newAttachments.splice(index, 1)
            } else {
              newAttachments[index].trends = false;
            }
          } else {
            newAttachments[index].trends = true;
          }
        }
      } else {
        newAttachments.push(newResultObject);
      }
      setAttachments(newAttachments);
    } else {
      setAttachments([newResultObject]);
    }
  }

  const removeAttachment = (position: number, emailId: string | undefined, attachmentId: string): void => {
    const newAttachments = attachments ? [...attachments] : [];
    if (newAttachments.length > 0) {
      newAttachments.splice(position, 1);
      setAttachments(newAttachments);
    }
    if (emailId) {
      firebase.deleteAttachment(emailId, attachmentId)
    }
  }

  /**
   * @param {Object} date
   * @return {Date}
   */
  const changeDateType = (date: {seconds: number, nanoseconds: number}): Date => {
    const newDate = new Date(0);
    newDate.setUTCSeconds(date.seconds);
    return newDate
  }

  const saveAs = (uri, filename) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      // Firefox requires the link to be in the body
      document.body.appendChild(link);

      // simulate click
      link.click();

      // remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  /**
   * updates attachment in attachments state with content for PDF
   * @param {string} base64string
   * @param {string} id
   */
  const addToAttachmentList = (base64string: string, id: string): void => {
    let newAttachments: Array<{
      content: string,
      filename: string,
      type: string,
      disposition: string,
      id: string,
      teacherId: string,
      actionPlan: boolean,
      result: boolean,
      summary?: boolean,
      details?: boolean,
      trends?: boolean,
      practice?: string,
      literacyType?: string
    }> = [];
    const idMatch = (element: {
      content: string,
      filename: string,
      type: string,
      disposition: string,
      id: string,
      teacherId: string,
      actionPlan: boolean,
      result: boolean,
      summary?: boolean,
      details?: boolean,
      trends?: boolean,
      practice?: string,
      literacyType?: string
    }): boolean => element.id === id;
    if (attachments) {
      newAttachments = [...attachments];
      const index = newAttachments.findIndex(idMatch);
      newAttachments[index].content = base64string;
      setAttachments(newAttachments);
    }
  }

  /**
   * takes screenshot of action plan or results, then creates multipage PDF
   * @param {string | undefined} practice
   * @param {Date} date
   * @param {string} elementId
   * @param {string} id
   */
  const printDocument = async (practice: string | undefined, date: Date, elementId: string, id: string): Promise<void> => {
    const input: HTMLElement = document.getElementById(elementId);
    let base64data: string | ArrayBuffer | null = null;
    let newBase64Data = '';
    html2canvas(input, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById(elementId).style.visibility = 'visible';
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.png";
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const pageHeight = 265;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
      let position = 10;
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // use this for downloading pdf
      pdf.save("download.pdf");
      const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf'});
      const reader = new FileReader();
      reader.readAsDataURL(blobPDF);
      reader.onloadend = function(): void {
        base64data = reader.result;
        if (base64data) {
          newBase64Data = (base64data as string).replace('data:application/pdf;base64,', '');
        }
        addToAttachmentList(newBase64Data, id);
      }
    })
  }

  const getAPData = async (): Promise<Array<{
    actionPlanId: string,
    tool: string,
    sessionId: string,
    goal: string,
    goalTimeline: Date,
    benefit: string,
    date: Date,
    actionSteps: Array<{step: string, person: string, timeline: Date}>
  }>> => {
    const actionPlanData: Array<{
      actionPlanId: string,
      tool: string,
      sessionId: string,
      goal: string,
      goalTimeline: Date,
      benefit: string,
      date: Date,
      actionSteps: Array<{step: string, person: string, timeline: Date}>
    }> = [];
    if (attachments) {
      const attachedActionPlans = attachments.filter(obj => {
        return obj.actionPlan === true
      });
      attachedActionPlans.forEach((actionPlan) => {
        firebase.getAPInfo(actionPlan.id).then((data: {
          sessionId: string,
          goal: string,
          goalTimeline: firebase.firestore.Timestamp,
          benefit: string,
          dateModified: {seconds: number, nanoseconds: number},
          dateCreated: {seconds: number, nanoseconds: number},
          coach: string,
          teacher: string,
          tool: string
        }) => {
          const thisActionPlan = {
            actionPlanId: actionPlan.id,
            tool: data.tool,
            sessionId: data.sessionId,
            goal: data.goal,
            goalTimeline: (data.goalTimeline && (typeof data.goalTimeline !== 'string')) ?
              data.goalTimeline.toDate() : new Date(),
            benefit: data.benefit,
            date: changeDateType(data.dateModified),
            actionSteps: [{step: '', person: '', timeline: new Date()}]
          };
          const newActionStepsArray: Array<{
            step: string,
            person: string,
            timeline: Date
          }> = [];
          props.firebase.getActionSteps(actionPlan.id).then((actionStepsData: Array<{
            step: string,
            person: string,
            timeline: firebase.firestore.Timestamp
          }>) => {
            actionStepsData.forEach((value, index) => {
              newActionStepsArray[index] = {
                step: value.step,
                person: value.person,
                timeline: (value.timeline && (typeof value.timeline !== 'string')) ?
                  value.timeline.toDate() :
                  new Date()
              };
            })
          }).then(() => {
            thisActionPlan.actionSteps = newActionStepsArray;
            setRenderActionPlan(true);
            const copyActionPlanData = [...actionPlanData];
            copyActionPlanData.push(thisActionPlan);
            setActionPlanData(copyActionPlanData);
            printDocument(thisActionPlan.tool, thisActionPlan.date, thisActionPlan.actionPlanId, thisActionPlan.actionPlanId)
          }).then(() => {
            actionPlanData.push(thisActionPlan)
          })
        })
      })
    }
    return actionPlanData
  }

  const getListeningData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
      ListeningData['summary'] | undefined,
      ListeningData['details'] | undefined,
      ListeningData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchListeningSummary(sessionId).then((summary: ListeningData['summary']) => {return summary}) : null,
      details ? props.firebase.fetchListeningDetails(sessionId).then((details: ListeningData['details']) => {return details}) : null,
      trends ? props.firebase.fetchListeningTrend(teacherObject ? teacherObject.id : '').then((trends: ListeningData['trends']) => {return trends}) : null
    ])
  }

  const getTransitionData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
      TransitionData['summary'] | undefined,
      TransitionData['details'] | undefined,
      TransitionData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchTransitionSummary(sessionId).then((summary: Array<{
        total: number,
        sessionTotal: number,
        startDate: {value: string}
      }>) => {return summary}) : null,
      details ? props.firebase.fetchTransitionTypeSummary(sessionId).then((details: Array<{
        line: number,
        traveling: number,
        waiting: number,
        routines: number,
        behaviorManagement: number,
        other: number,
        total: number
      }>) => {return details}) : null,
      trends ? props.firebase.fetchTransitionTrend(teacherObject ? teacherObject.id : '').then((trends: Array<{
        id: string,
        line: number,
        traveling: number,
        waiting: number,
        routines: number,
        behaviorManagement: number,
        other: number,
        total: number,
        sessionTotal: number,
        startDate: {value: string}
      }>) => {return trends}) : null
    ])
  }

  const getClimateData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
      ClimateData['summary'] | undefined,
      ClimateData['details'] & {detailsChecked: boolean} | undefined,
      ClimateData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchAvgToneRating(sessionId).then((rating: number) => {
        const summary = {
          toneRating: rating
        };
        return summary
      }) : null,
      (summary || details) ? props.firebase.fetchBehaviourTypeCount(sessionId).then((detailsData: Array<{
        behaviorResponse: string,
        count: number
      }>) => {
        let specificCount = 0;
        let nonspecificCount = 0;
        let disapprovalCount = 0;
        let redirectionCount = 0;
        detailsData.forEach(behavior => {
          if (behavior.behaviorResponse === "specificapproval") {
            specificCount = behavior.count;
          } else if (behavior.behaviorResponse === "nonspecificapproval") {
            nonspecificCount = behavior.count;
          } else if (behavior.behaviorResponse === "disapproval") {
            disapprovalCount = behavior.count;
          } else if (behavior.behaviorResponse === "redirection") {
            redirectionCount = behavior.count;
          }
        });
        const detailsChecked = details;
        return {
          specificCount: specificCount,
          nonspecificCount: nonspecificCount,
          disapprovalCount: disapprovalCount,
          redirectionCount: redirectionCount,
          // so that checking summary but not details does not render both in PDF
          detailsChecked: detailsChecked ? true : false
        }
      }) : null,
      trends ? props.firebase.fetchBehaviourTrend(teacherObject ? teacherObject.id : '').then((trends: Array<{
        dayOfEvent: {value: string},
        positive: number,
        negative: number
      }>) => {return trends}) : null
    ])
  }

  const getMathData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
    MathData['childSummary'],
      MathData['teacherSummary'] | undefined,
      {
        math1: number,
        math2: number,
        math3: number,
        math4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      } | undefined,
      MathData['childTrends'] | undefined,
      MathData['teacherTrends'] | undefined
  ]> => {
    return Promise.all([
      props.firebase.fetchChildMathSummary(sessionId)
        .then((summary: MathData['childSummary']) => {return summary}),
      summary ? props.firebase.fetchTeacherMathSummary(sessionId)
        .then((summary: MathData['teacherSummary']) => {return summary}) : null,
      details ? props.firebase.fetchMathDetails(sessionId).then((details: {
        math1: number,
        math2: number,
        math3: number,
        math4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      }) => {return details}) : null,
      trends ? props.firebase.fetchChildMathTrend(teacherObject ? teacherObject.id : '')
        .then((trends: MathData['childTrends']) => {return trends}) : null,
      trends ? props.firebase.fetchTeacherMathTrend(teacherObject ? teacherObject.id : '')
        .then((trends: MathData['teacherTrends']) => {return trends}) : null
    ])
  }

  const getInstructionData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
      InstructionData['summary'] | undefined,
      InstructionData['details'] | undefined,
      InstructionData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchInstructionTypeCount(sessionId).then((details: Array<{
        instructionType: string,
        count: number
      }>) => {
        let highLevelQuestion = 0;
        let lowLevelQuestion = 0;
        let highLevelResponse = 0;
        let lowLevelResponse = 0;
        details.forEach(instruction => {
          if (instruction.instructionType === "specificSkill" || instruction.instructionType === "llqResponse") {
            lowLevelResponse = instruction.count;
          } else if (instruction.instructionType === "lowLevel" || instruction.instructionType === "llq") {
            lowLevelQuestion = instruction.count;
          } else if (instruction.instructionType === "highLevel" || instruction.instructionType === "hlq") {
            highLevelQuestion = instruction.count;
          } else if (instruction.instructionType === "followUp" || instruction.instructionType === "hlqResponse") {
            highLevelResponse = instruction.count;
          }
        });
        return {
          highLevelQuestion: highLevelQuestion,
          lowLevelQuestion: lowLevelQuestion,
          highLevelResponse: highLevelResponse,
          lowLevelResponse: lowLevelResponse
        }
      }) : null,
      details ? props.firebase.fetchInstructionTypeCount(sessionId).then((details: Array<{
        instructionType: string,
        count: number
      }>) => {
        let highLevelQuestion = 0;
        let lowLevelQuestion = 0;
        let highLevelResponse = 0;
        let lowLevelResponse = 0;
        details.forEach(instruction => {
          if (instruction.instructionType === "specificSkill" || instruction.instructionType === "llqResponse") {
            lowLevelResponse = instruction.count;
          } else if (instruction.instructionType === "lowLevel" || instruction.instructionType === "llq") {
            lowLevelQuestion = instruction.count;
          } else if (instruction.instructionType === "highLevel" || instruction.instructionType === "hlq") {
            highLevelQuestion = instruction.count;
          } else if (instruction.instructionType === "followUp" || instruction.instructionType === "hlqResponse") {
            highLevelResponse = instruction.count;
          }
        });
        return {
          highLevelQuestion: highLevelQuestion,
          lowLevelQuestion: lowLevelQuestion,
          highLevelResponse: highLevelResponse,
          lowLevelResponse: lowLevelResponse
        }
      }) : null,
      trends ? props.firebase.fetchInstructionTrend(teacherObject ? teacherObject.id : '').then((trends: Array<{
        dayOfEvent: {value: string},
        hlq: number,
        hlqResponse: number,
        llq: number,
        llqResponse: number
      }>) => {return trends}) : null
    ])
  }

  const getEngagementData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
      {
        offTask: number,
        engaged: number
      } | undefined,
      {
        average: number
      } | undefined,
      EngagementData['details'] | undefined,
      EngagementData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchEngagementPieSummary(sessionId).then((summary: {
        offTask: number,
        engaged: number
      }) => {return summary}) : null,
      summary ? props.firebase.fetchEngagementAvgSummary(sessionId).then((summary: {average: number}) => {return summary}) : null,
      details ? props.firebase.fetchEngagementDetails(sessionId).then((details: EngagementData['details']) => {return details}) : null,
      trends ? props.firebase.fetchEngagementTrend(teacherObject ? teacherObject.id : '').then((trends: EngagementData['trends']) => {return trends}) : null
    ])
  }

  const getSequentialData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
    SequentialData['childSummary'],
      SequentialData['teacherSummary'] | undefined,
      {
        sequential1: number,
        sequential2: number,
        sequential3: number,
        sequential4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      } | undefined,
      SequentialData['childTrends'] | undefined,
      SequentialData['teacherTrends'] | undefined
  ]> => {
    return Promise.all([
      props.firebase.fetchChildSeqSummary(sessionId)
        .then((summary: SequentialData['childSummary']) => {return summary}),
      summary ? props.firebase.fetchTeacherSeqSummary(sessionId)
        .then((summary: SequentialData['teacherSummary']) => {return summary}) : null,
      details ? props.firebase.fetchSeqDetails(sessionId).then((details: {
        sequential1: number,
        sequential2: number,
        sequential3: number,
        sequential4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      }) => {return details}) : null,
      trends ? props.firebase.fetchChildSeqTrend(teacherObject ? teacherObject.id : '')
        .then((trends: SequentialData['childTrends']) => {return trends}) : null,
      trends ? props.firebase.fetchTeacherSeqTrend(teacherObject ? teacherObject.id : '')
        .then((trends: SequentialData['teacherTrends']) => {return trends}) : null
    ])
  }

  const getLiteracyData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    type: string
  ): Promise<[
    LiteracyData['summary'],
      LiteracyData['details'] | undefined
  ]> => {
    let literacyType = '';
    let who = '';
    if (type === 'FoundationalTeacher') {
      literacyType = Constants.LiteracyTypes.FOUNDATIONAL;
      who = 'Teacher'
    } else if (type === 'FoundationalChild') {
      literacyType = Constants.LiteracyTypes.FOUNDATIONAL;
      who = 'Child'
    } else if (type === 'WritingTeacher') {
      literacyType = Constants.LiteracyTypes.WRITING;
      who = 'Teacher'
    } else if (type === 'WritingChild') {
      literacyType = Constants.LiteracyTypes.WRITING;
      who = 'Child'
    } else if (type === 'ReadingTeacher') {
      literacyType = Constants.LiteracyTypes.READING;
      who = 'Teacher'
    } else if (type === 'LanguageTeacher') {
      literacyType = Constants.LiteracyTypes.LANGUAGE;
      who = 'Teacher'
    }
    return Promise.all([
      summary ? props.firebase.fetchLiteracySummary(sessionId, literacyType, who).then((summary: LiteracyData['summary']) => {
        return summary}) : null,
      details ? ((type === 'FoundationalTeacher' || type === 'FoundationalChild') ? (
        props.firebase.fetchLiteracyDetailsFoundational(sessionId, who)
          .then((details: LiteracyData['details']) => {return details})
      ) : (type === 'WritingTeacher' || type === 'WritingChild') ? (
        props.firebase.fetchLiteracyDetailsWriting(sessionId, who)
          .then((details: LiteracyData['details']) => {return details})
      ) : (type === 'ReadingTeacher' || type === 'ReadingChild') ? (
        props.firebase.fetchLiteracyDetailsReading(sessionId, who)
          .then((details: LiteracyData['details']) => {return details})
      ) : (
        props.firebase.fetchLiteracyDetailsLanguage(sessionId, who)
          .then((details: LiteracyData['details']) => {return details})
      )) : (
        null
      )
    ])
  }

  const getACData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
    ACData['childSummary'],
      ACData['teacherSummary'] | undefined,
      {
        ac1: number,
        ac2: number,
        ac3: number,
        ac4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      } | undefined,
      ACData['childTrends'] | undefined,
      ACData['teacherTrends'] | undefined
  ]> => {
    return Promise.all([
      props.firebase.fetchChildACSummary(sessionId)
        .then((summary: ACData['childSummary']) => {
          return summary
        }),
      summary ? props.firebase.fetchTeacherACSummary(sessionId)
        .then((summary: ACData['teacherSummary']) => {return summary}) : null,
      details ? props.firebase.fetchACDetails(sessionId).then((details: {
        ac1: number,
        ac2: number,
        ac3: number,
        ac4: number,
        teacher1: number,
        teacher2: number,
        teacher3: number,
        teacher4: number
      }) => {return details}) : null,
      trends ? props.firebase.fetchChildACTrend(teacherObject ? teacherObject.id : '')
        .then((trends: ACData['childTrends']) => {return trends}) : null,
      trends ? props.firebase.fetchTeacherACTrend(teacherObject ? teacherObject.id : '')
        .then((trends: ACData['teacherTrends']) => {
          return trends
        }) : null
    ])
  }

  const attachTransitionResult = async (
    transitionResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: TransitionData['summary'],
    details: TransitionData['details'],
    trends: TransitionData['trends'],
    date: Date
  }> | void> => {
    const transitionData: Array<{
      sessionId: string,
      summary: TransitionData['summary'],
      details: TransitionData['details'],
      trends: TransitionData['trends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getTransitionData(result.id, result.summary, result.details, result.trends).then((data) => {
        transitionData.push({
          sessionId: result.id,
          summary: data[0],
          details: data[1],
          trends: data[2],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (transitionResults.length > 0) {
      const getDataForAll = Promise.all(transitionResults.map(getData))
      getDataForAll.then(() => {
        setTransition(transitionData);
        setRenderTransitionPdf(true);
        return transitionData
      })
    } else {
      return;
    }
  }

  const attachClimateResult = async (
    climateResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: ClimateData['summary'],
    details: ClimateData['details'] & {detailsChecked: boolean} | undefined,
    trends: ClimateData['trends'],
    date: Date
  }> | void> => {
    const climateData: Array<{
      sessionId: string,
      summary: ClimateData['summary'],
      details: ClimateData['details'] & {detailsChecked: boolean} | undefined,
      trends: ClimateData['trends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getClimateData(result.id, result.summary, result.details, result.trends).then((data) => {
        climateData.push({
          sessionId: result.id,
          summary: data[0],
          details: data[1],
          trends: data[2],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (climateResults.length > 0) {
      const getDataForAll = Promise.all(climateResults.map(getData))
      getDataForAll.then(() => {
        setClimate(climateData);
        setRenderClimatePdf(true);
        return climateData
      })
    } else {
      return;
    }
  }

  const attachMathResult = async (
    mathResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    childSummary: MathData['childSummary'],
    teacherSummary: MathData['teacherSummary'],
    childDetails: MathData['childDetails'],
    teacherDetails: MathData['teacherDetails'],
    childTrends: MathData['childTrends'],
    teacherTrends: MathData['teacherTrends'],
    date: Date
  }> | void> => {
    const mathData: Array<{
      sessionId: string,
      childSummary: MathData['childSummary'],
      teacherSummary: MathData['teacherSummary'],
      childDetails: MathData['childDetails'],
      teacherDetails: MathData['teacherDetails'],
      childTrends: MathData['childTrends'],
      teacherTrends: MathData['teacherTrends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getMathData(result.id, result.summary, result.details, result.trends).then((data) => {
        mathData.push({
          sessionId: result.id,
          childSummary: data[0],
          teacherSummary: data[1],
          childDetails: data[2] ? {math1: data[2].math1, math2: data[2].math2, math3: data[2].math3, math4: data[2].math4} : undefined,
          teacherDetails: data[2] ? {teacher1: data[2].teacher1, teacher2: data[2].teacher2, teacher3: data[2].teacher3, teacher4: data[2].teacher4} : undefined,
          childTrends: data[3],
          teacherTrends: data[4],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (mathResults.length > 0) {
      const getDataForAll = Promise.all(mathResults.map(getData))
      getDataForAll.then(() => {
        setMath(mathData);
        setRenderMathPdf(true);
        return mathData
      })
    } else {
      return;
    }
  }

  const attachInstructionResult = async (
    instructionResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: InstructionData['summary'],
    details: InstructionData['details'],
    trends: InstructionData['trends'],
    date: Date
  }> | void> => {
    const instructionData: Array<{
      sessionId: string,
      summary: InstructionData['summary'],
      details: InstructionData['details'],
      trends: InstructionData['trends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getInstructionData(result.id, result.summary, result.details, result.trends).then((data) => {
        instructionData.push({
          sessionId: result.id,
          summary: data[0],
          details: data[1],
          trends: data[2],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (instructionResults.length > 0) {
      const getDataForAll = Promise.all(instructionResults.map(getData))
      getDataForAll.then(() => {
        setInstruction(instructionData);
        setRenderInstructionPdf(true);
        return instructionData
      })
    } else {
      return;
    }
  }

  const attachEngagementResult = async (
    engagementResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: EngagementData['summary'],
    details: EngagementData['details'],
    trends: EngagementData['trends'],
    date: Date
  }> | void> => {
    const engagementData: Array<{
      sessionId: string,
      summary: EngagementData['summary'],
      details: EngagementData['details'],
      trends: EngagementData['trends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getEngagementData(result.id, result.summary, result.details, result.trends).then((data) => {
        engagementData.push({
          sessionId: result.id,
          summary: data[0] && data[1] ? {
            offTask: data[0].offTask,
            engaged: data[0].engaged,
            avgRating: data[1].average
          } : undefined,
          details: data[2],
          trends: data[3],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (engagementResults.length > 0) {
      const getDataForAll = Promise.all(engagementResults.map(getData))
      getDataForAll.then(() => {
        setEngagement(engagementData);
        setRenderEngagementPdf(true);
        return engagementData
      })
    } else {
      return;
    }
  }

  const attachListeningResult = async (
    listeningResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: ListeningData['summary'],
    details: ListeningData['details'],
    trends: ListeningData['trends'],
    date: Date
  }> | void> => {
    const listeningData: Array<{
      sessionId: string,
      summary: ListeningData['summary'],
      details: ListeningData['details'],
      trends: ListeningData['trends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getListeningData(result.id, result.summary, result.details, result.trends).then((data) => {
        listeningData.push({
          sessionId: result.id,
          summary: data[0],
          details: data[1],
          trends: data[2],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (listeningResults.length > 0) {
      const getDataForAll = Promise.all(listeningResults.map(getData))
      getDataForAll.then(() => {
        setListening(listeningData);
        setRenderListeningPdf(true);
        return listeningData
      })
    } else {
      return;
    }
  }

  const attachSequentialResult = async (
    sequentialResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    childSummary: SequentialData['childSummary'],
    teacherSummary: SequentialData['teacherSummary'],
    childDetails: SequentialData['childDetails'],
    teacherDetails: SequentialData['teacherDetails'],
    childTrends: SequentialData['childTrends'],
    teacherTrends: SequentialData['teacherTrends'],
    date: Date
  }> | void> => {
    const sequentialData: Array<{
      sessionId: string,
      childSummary: SequentialData['childSummary'],
      teacherSummary: SequentialData['teacherSummary'],
      childDetails: SequentialData['childDetails'],
      teacherDetails: SequentialData['teacherDetails'],
      childTrends: SequentialData['childTrends'],
      teacherTrends: SequentialData['teacherTrends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getSequentialData(result.id, result.summary, result.details, result.trends).then((data) => {
        sequentialData.push({
          sessionId: result.id,
          childSummary: data[0],
          teacherSummary: data[1],
          childDetails: data[2] ? {sequential1: data[2].sequential1, sequential2: data[2].sequential2, sequential3: data[2].sequential3, sequential4: data[2].sequential4} : undefined,
          teacherDetails: data[2] ? {teacher1: data[2].teacher1, teacher2: data[2].teacher2, teacher3: data[2].teacher3, teacher4: data[2].teacher4} : undefined,
          childTrends: data[3],
          teacherTrends: data[4],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (sequentialResults.length > 0) {
      const getDataForAll = Promise.all(sequentialResults.map(getData))
      getDataForAll.then(() => {
        setSequential(sequentialData);
        setRenderSequentialPdf(true);
        return sequentialData
      })
    } else {
      return;
    }
  }

  const attachLiteracyResult = async (
    literacyResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    summary: LiteracyData['summary'],
    details: LiteracyData['details'] | undefined,
    date: Date,
    type: string
  }> | void> => {
    const literacyData: Array<{
      sessionId: string,
      summary: LiteracyData['summary'],
      details: LiteracyData['details'] | undefined,
      date: Date,
      type: string
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getLiteracyData(result.id, result.summary, result.details, result.literacyType).then((data) => {
        literacyData.push({
          sessionId: result.id,
          summary: data[0],
          details: data[1],
          date: result.date? result.date : new Date(),
          type: result.literacyType as Constants.LiteracyTypes,
        })
      })
    };
    if (literacyResults.length > 0) {
      const getDataForAll = Promise.all(literacyResults.map(getData))
      getDataForAll.then(() => {
        setLiteracy(literacyData);
        setRenderLiteracyPdf(true);
        return literacyData
      })
    } else {
      return;
    }
  }

  const attachACResult = async (
    acResults: Array<Attachment>
  ): Promise<Array<{
    sessionId: string,
    childSummary: ACData['childSummary'],
    teacherSummary: ACData['teacherSummary'],
    childDetails: ACData['childDetails'],
    teacherDetails: ACData['teacherDetails'],
    childTrends: ACData['childTrends'],
    teacherTrends: ACData['teacherTrends'],
    date: Date
  }> | void> => {
    const acData: Array<{
      sessionId: string,
      childSummary: ACData['childSummary'],
      teacherSummary: ACData['teacherSummary'],
      childDetails: ACData['childDetails'],
      teacherDetails: ACData['teacherDetails'],
      childTrends: ACData['childTrends'],
      teacherTrends: ACData['teacherTrends'],
      date: Date
    }> = [];
    const getData = function (result: Attachment): Promise<void> {
      return getACData(result.id, result.summary, result.details, result.trends).then((data) => {
        acData.push({
          sessionId: result.id,
          childSummary: data[0],
          teacherSummary: data[1],
          childDetails: data[2] ? {ac1: data[2].ac1, ac2: data[2].ac2, ac3: data[2].ac3, ac4: data[2].ac4} : undefined,
          teacherDetails: data[2] ? {teacher1: data[2].teacher1, teacher2: data[2].teacher2, teacher3: data[2].teacher3, teacher4: data[2].teacher4} : undefined,
          childTrends: data[3],
          teacherTrends: data[4],
          date: result.date? result.date : new Date()
        })
      })
    };
    if (acResults.length > 0) {
      const getDataForAll = Promise.all(acResults.map(getData))
      getDataForAll.then(() => {
        setAC(acData);
        setRenderACPdf(true);
        return acData
      })
    } else {
      return;
    }
  }

  const getResultsData = async (): Promise<void> => {
    if (attachments) {
      const attachedResults = attachments.filter(obj => {
        return obj.result === true
      });
      const transitionResults = attachedResults.filter(obj => {
        return obj.practice === 'Transition Time'
      });
      const climateResults = attachedResults.filter(obj => {
        return obj.practice === 'Classroom Climate'
      });
      const mathResults = attachedResults.filter(obj => {
        return obj.practice === 'Math Instruction'
      });
      const instructionResults = attachedResults.filter(obj => {
        return obj.practice === 'Level of Instruction'
      });
      const engagementResults = attachedResults.filter(obj => {
        return obj.practice === 'Student Engagement'
      });
      const listeningResults = attachedResults.filter(obj => {
        return obj.practice === 'Listening to Children'
      });
      const sequentialResults = attachedResults.filter(obj => {
        return obj.practice === 'Sequential Activities'
      });
      const literacyResults = attachedResults.filter(obj => {
        return obj.practice === 'Literacy Instruction'
      })
      const acResults = attachedResults.filter(obj => {
        return obj.practice === 'Associative and Cooperative'
      });
      if (transitionResults.length > 0) {
        attachTransitionResult(transitionResults)
      }
      if (climateResults.length > 0) {
        attachClimateResult(climateResults)
      }
      if (mathResults.length > 0) {
        attachMathResult(mathResults)
      }
      if (instructionResults.length > 0) {
        attachInstructionResult(instructionResults)
      }
      if (engagementResults.length > 0) {
        attachEngagementResult(engagementResults)
      }
      if (listeningResults.length > 0) {
        attachListeningResult(listeningResults)
      }
      if (sequentialResults.length > 0) {
        attachSequentialResult(sequentialResults)
      }
      if (literacyResults.length > 0) {
        attachLiteracyResult(literacyResults)
      }
      if (acResults.length > 0) {
        attachACResult(acResults)
      }
    }
  }

  const attachAll = async (): Promise<void> => {
    setActionPlanDisplay(false);
    if (attachments) {
      setDoneAttaching(false);
      getAPData().then(() => {
        setRenderActionPlan(true);
      });
      getResultsData();
    }
  }

  const sendMail = async (): Promise<void> => {
    if (recipient === null) {
      return;
    } else {
      // create the message object to send to funcSendEmail
      const msg: Message = {
        id: '0000001',
        from: 'chalkcoaching@gmail.com',
        to: recipient.value,
        subject: subject ? subject : '',
        theme: ThemeOptions.FEEDBACK,
        textContent: 'test',
        content: email ? email : '',
        delivered: false,
        attachments: attachments ? (attachments.map(function(item) { return {
          'content': item['content'],
          'filename': item['filename'],
          'type': item['type'],
          'disposition': item['disposition'],
        }; })) : (undefined)
      };

      // encrypted with the user's uid from firebase
      const encryptedMsg = CryptoJS.AES
        .encrypt(JSON.stringify(msg), firebase.auth.currentUser.uid)
        .toString();

      firebase.sendEmail(encryptedMsg)
        .then((res: {data: string}): void => {
          console.log(JSON.stringify(res));
        })
        .catch((err: Error): void => {
          console.log(JSON.stringify(err));
        });
    }
  };

  const thankYou = 'Hi ' + recipient.firstName + ', \n \n'
    + 'Thanks for welcoming me today in your classroom! '
    + 'I really enjoyed my visit and look forward to '
    + 'chatting with you soon about Transition Time. \n \n'
    + 'Best wishes, \n';

  const feedback = 'Hi ' + recipient.firstName + ', \n \n'
    + 'Thanks for welcoming me today in your classroom! \n \n'
    + 'It was a joy to see the children so engaged in those small '
    + 'groups when you used cotton balls to teach counting. \n \n'
    + 'Please see below for some notes on great teaching strategies '
    + 'I noticed and why they’re effective for children. \n \n'
    + 'Best, \n';

  const actionPlan = 'Hi ' + recipient.firstName + ', \n \n'
    + 'Thanks for meeting today and creating this action plan. '
    + 'I think it looks great, and I look forward to working '
    + 'on these goals with you! \n \n'
    + 'Please reach out with questions or ideas anytime. \n \n'
    + 'Best, \n';

  const chalkPracticeSelection = `Hi ${recipient.firstName},

Please fill out this quick survey and let me know your thoughts on CHALK coaching.

Which CHALK practices would you like to focus on or learn about next? (Bold or type your top 3.)

 - Reducing Transition Time
 - Classroom Climate
 - Math Instruction
 - Level of Instruction
 - Student Engagement
 - Listening to Children
 - Sequential Activities
 - Literacy Instruction
 - Associative and Cooperative Interactions

Please share any additional comments about why you chose these practices or questions you have about CHALK coaching in general.

Thank you!

Visit https://chalkcoaching.com/Training for more information about each practice!
`

  const removeResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = {...checkedResults};
    if (newCheckedResults) {
      newCheckedResults[id][type] = false;
    }
    setCheckedResults(newCheckedResults);
  }

  const addResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = {...checkedResults};
    if (newCheckedResults[id]) {
      newCheckedResults[id][type] = true;
    } else {
      if (type === 'summary') {
        newCheckedResults[id] = {summary: true, details: false, trends: false}
      } else if (type === 'details') {
        newCheckedResults[id] = {summary: false, details: true, trends: false}
      } else {
        newCheckedResults[id] = {summary: false, details: false, trends: true}
      }
    }
    setCheckedResults(newCheckedResults);
  }

  const removeActionPlan = (id: string): void => {
    const newCheckedActionPlans = checkedActionPlans ? [...checkedActionPlans] : [];
    const index = newCheckedActionPlans.indexOf(id);
    newCheckedActionPlans.splice(index, 1);
    setCheckedActionPlans(newCheckedActionPlans);
  }

  const addActionPlan = (id: string): void => {
    const newCheckedActionPlans = checkedActionPlans ? [...checkedActionPlans] : [];
    newCheckedActionPlans.push(id);
    setCheckedActionPlans(newCheckedActionPlans);
  }

  const saveEmail = async (
    email?: string,
    subject?: string,
    recipient?: {
      id: string,
      name: string,
      email: string,
      firstName: string
    },
    emailId?: string,
    attachments?: Array<Attachment>
  ): Promise<Email> => {
    return firebase.saveEmail(email, subject, recipient, emailId).then((data: Email) => {
      if (attachments) {
        attachments.forEach((attachment) => {
          firebase.saveAttachment(data.id, attachment)
        })
      }
      props.updateDrafts(data);
      setEmailId(data.id);
      return data;
    });
  };

  const saveAndSendEmail = (
    email?: string,
    subject?: string,
    recipient?: {
      id: string,
      name: string,
      email: string,
      firstName: string
    },
    emailId?: string,
    attachments?: Array<Attachment>
  ): void => {
    saveEmail(email, subject, recipient, emailId, attachments).then((email: Email) => {
      sendMail().then(() => {
        firebase.changeDraftToSent(email.id);
        if (props.moveDraftToSent) {
          props.moveDraftToSent(email)
        }
        props.setMenuOption('SENT');
      })
    })
  };

  const changeTemplate = (chosenTheme: TemplateOption): void => {
    setTheme(chosenTheme);
    if (chosenTheme.value === 'Action Plan') {
      setEmail(actionPlan)
    } else if (chosenTheme.value === 'Feedback') {
      setEmail(feedback)
    } else if (chosenTheme.value === 'Thank You') {
      setEmail(thankYou)
    } else if (chosenTheme.value === 'CHALK Practice Selection') {
      setEmail(chalkPracticeSelection)
    }else {
      setEmail('')
    }
    setTemplateDialog(false)
  }

  const keepTemplate = (): void => {
    setTemplateDialog(false)
  }

  /**
   * called when user closes attachment dialog (rather than attaching)
   * removes unattached checked action plans and results
   */
  const handleClose= (): void => {
    if (attachments) {
      const attachmentsWithContent = attachments.filter(obj => {
        return obj.content !== ''
      });
      const attachmentsWithoutContent = attachments.filter(obj => {
        return obj.content === ''
      });
      const newCheckedResults = {...checkedResults};
      const newCheckedActionPlans = checkedActionPlans ? [...checkedActionPlans] : [];
      attachmentsWithoutContent.forEach((attachment) => {
        if (attachment.result && newCheckedResults) {
          delete newCheckedResults[attachment.id]
          setCheckedResults(newCheckedResults);
        }
      })
      const attachmentsIds = attachmentsWithContent.map(a => a.id);
      const attachedActionPlans = newCheckedActionPlans.filter(actionPlanId => {
        return attachmentsIds.includes(actionPlanId)
      });
      setCheckedActionPlans(attachedActionPlans)
      if (attachmentsWithContent.length === 0) {
        setAttachments([])
      } else {
        setAttachments(attachmentsWithContent)
      }
    }
    setActionPlanDisplay(false)
  };

  const handleDelete = (): void => {
    props.setMenuOption('SENT');
    setDeleteDialog(false);
    if (emailId) {
      firebase.deleteEmail(emailId);
      if (props.removeFromDrafts) {
        props.removeFromDrafts(emailId);
      }
    }
  }

  return (
    <div style={{width: '100%', overflowY: 'auto'}}>
      <TemplateDialog
        open={templateDialog}
        handleYes={(): void => {changeTemplate(newTheme)}}
        handleNo={keepTemplate}
      />
      <DeleteDialog
        open={deleteDialog}
        handleYes={(): void => handleDelete()}
        handleNo={(): void => setDeleteDialog(false)}
      />
      {renderActionPlan && actionPlanData ? (
        actionPlanData.map((actionPlan, index) => {
          return (
            <div
              key={index}
              id={actionPlan.actionPlanId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '290mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <ActionPlanForPdf
                tool={actionPlan.tool}
                apGoal={actionPlan.goal}
                goalTimeline={actionPlan.goalTimeline}
                benefit={actionPlan.benefit}
                date={actionPlan.date}
                actionSteps={actionPlan.actionSteps}
                teacher={teacherObject}
                coachName={userName + ' ' + userLastName}
              />
            </div>
          )
        })
      ) : (null)}
      {renderTransitionPdf && transition ? (
        transition.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <TransitionResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={transition[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderClimatePdf && climate ? (
        climate.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <ClimateResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={climate[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
       ) : (null)}
      {renderMathPdf && math ? (
        math.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <MathResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={math[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderInstructionPdf && instruction ? (
        instruction.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <InstructionResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={instruction[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderEngagementPdf && engagement ? (
        engagement.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <EngagementResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={engagement[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderListeningPdf && listening ? (
        listening.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <ListeningResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={listening[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderSequentialPdf && sequential ? (
        sequential.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <SequentialResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={sequential[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      {renderLiteracyPdf && literacy ? (
        literacy.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <LiteracyResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={literacy[index]}
                date={result.date}
                teacher={teacherObject}
                
              />
            </div>
          )
        })
      ) : (null)}
      {renderACPdf && ac ? (
        ac.map((result, index) => {
          return (
            <div
              key={index}
              id={result.sessionId}
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '100mm',
                marginLeft: 'auto',
                marginRight: 'auto',
                visibility: 'hidden',
                position: 'fixed',
                right: -1000
              }}
            >
              <ACResultsPdf
                printDocument={printDocument}
                id={result.sessionId}
                data={ac[index]}
                date={result.date}
                teacher={teacherObject}
              />
            </div>
          )
        })
      ) : (null)}
      <Grid container direction="column" justify="flex-start" alignItems="center" style={{width: '100%'}}>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                To:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <RecipientAddress
                selectedOption={recipient}
                recipientList={recipientList}
                setOption={(newOption: SelectOption): void => recipientSelected(newOption)}
                readOnly={props.readOnly || (attachments && attachments.length>0)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '0.5em', width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                Template:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ChooseTheme
                selectedOption={theme}
                setOption={(chosenTheme: TemplateOption): void => {
                  if (chosenTheme !== theme) {
                    setNewTheme(chosenTheme);
                    if (email === '' || undefined) {
                      changeTemplate(chosenTheme);
                    } else {
                      setTemplateDialog(true);
                    }
                  }
                }}
                readOnly={props.readOnly}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%', height: '75%', paddingTop: '1em'}}>
          <Paper style={{backgroundColor: '#d8ecff', height: '100%', padding: '1em'}}>
            <Grid container direction="column" justify={props.readOnly? 'space-around' : 'space-between'} style={{height: '100%'}}>
              <Grid item>
                <Grid container direction='row' justify='flex-start'>
                  <SubjectLine subject={subject} setSubject={setSubject} readOnly={props.readOnly} />
                </Grid>
              </Grid>
              <Grid item style={{width: '100%', height: '50vh', paddingTop: '1em', paddingBottom: '1em'}}>
                <EmailBody
                  email={email}
                  emailId={emailId}
                  setEmail={setEmail}
                  attachments={attachments}
                  handleDelete={removeAttachment}
                  readOnly={props.readOnly}
                />
              </Grid>
              {props.readOnly ? (null) : (
                <Grid item>
                  <Grid container direction="row" justify="space-between" style={{width: '100%'}}>
                    <Grid item>
                      <SendButton
                        disabled={attachDisabled || !doneAttaching}
                        sendMail={(): void => {saveAndSendEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value, firstName: recipient.firstName}, emailId, attachments)}}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item style={{paddingRight: '1em'}}>
                          <AttachButton 
                            acceptAttachment={(): void => setActionPlanDisplay(true)} 
                            disabled={attachDisabled || !doneAttaching}
                          />
                        </Grid>
                        <Grid item style={{paddingRight: '1em'}}>
                          <SaveButton
                            disabled={!doneAttaching}
                            saveEmail={(): void => {saveEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value, firstName: recipient.firstName}, emailId, attachments)}}
                            saveDraft={(): void => setActionPlanDisplay(true)}
                          />
                        </Grid>
                        <Grid item>
                          <DeleteButton email={email} onClick={(): void => setDeleteDialog(true)} />
                        </Grid>
                        <AttachmentDialog
                          recipientId={recipient.id}
                          attachAll={attachAll}
                          actionPlans={actionPlans}
                          noActionPlansMessage={noActionPlansMessage}
                          addActionPlanAttachment={addActionPlanAttachment}
                          addResultsAttachment={addResultsAttachment}
                          results={observations}
                          checkedResults={checkedResults}
                          checkedActionPlans={checkedActionPlans}
                          addResult={addResult}
                          removeResult={removeResult}
                          addActionPlan={addActionPlan}
                          removeActionPlan={removeActionPlan}
                          noResultsMessage={noObservationsMessage}
                          open={actionPlanDisplay}
                          recipientName={recipient.label}
                          handleClose={handleClose}
                          firebase={firebase}
                          coachName={userName + ' ' + userLastName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

NewMessageView.propTypes = {
  updateDrafts: PropTypes.func.isRequired,
  moveDraftToSent: PropTypes.func.isRequired,
  setMenuOption: PropTypes.func.isRequired,
  removeFromDrafts: PropTypes.func.isRequired
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherList: Array<Types.Teacher>,
  email: string
} => {
  return {
    teacherList: state.teacherListState.teachers,
    email: state.coachState.user.email
  };
};

export default connect(mapStateToProps)(NewMessageView);