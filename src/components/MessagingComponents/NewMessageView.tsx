import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { renderToStaticMarkup } from 'react-dom/server';
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
// import AlertDialog from './AlertDialog';
// import ChooseActionPlanDialog from './ChooseActionPlanDialog';
import AttachmentDialog from './AttachmentDialog';
import { Alerts, ThemeOptions, Message, Attachment, SelectOption, TemplateOption, Email } from './MessagingTypes';
import * as CryptoJS from 'crypto-js';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ActionPlanForPdf from './ActionPlanForPdf';
import TransitionResultsPdf from './ResultsPdfs/TransitionResultsPdf';
import ClimateResultsPdf from './ResultsPdfs/ClimateResultsPdf';
import MathResultsPdf from './ResultsPdfs/MathResultsPdf';
import ListeningResultsPdf from './ListeningResultsPdf';
import SequentialResultsPdf from './ResultsPdfs/SequentialResultsPdf';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Types from '../../constants/Types';


interface NewMessageViewProps {
  firebase: any;
  // the initial message loaded
  // is a prop as it allows editing drafts to be easier
  // DraftView just modifies two states in the parent component: initialMsg and menuOption
  // and the NewMessageView is loaded with that draft as content
  draft?: Email;
  /* email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailId: string;
  setEmailId: React.Dispatch<React.SetStateAction<string>>;
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  recipient: {value: string, id: string, label: string};
  setRecipient: React.Dispatch<React.SetStateAction<{value: string, id: string, label: string}>> */
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
  summary: {
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  } | undefined,
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
  } | undefined,
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
  } | undefined,
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

/* const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 15% 15% 1fr',
	gridGap: '0.1em',
};

const themeClass = {
  gridColumn: '2 / span 4',
  gridRow: '2 / 2', 
};
const recipientClass = {
		gridColumn: '2 / span 4',
		gridRow: '3 / 3', 
};

const emailbodyClass = {
		gridRow: '4 / span 5',
		gridColumn: '2 / span 4',
};

const submitButtonClass = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
};

const attachButtonClass = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
}; */

const NewMessageView: React.FC<NewMessageViewProps> = (props: NewMessageViewProps) => {
  // state to store the message theme
  // const [theme, setTheme] = useState(props.draft.theme);
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
  // state to store the current alert
  const [alertEnum, setAlertEnum] = useState(Alerts.NO_ERROR);
  // state to store the current recipient
  const [recipient, setRecipient] = useState<{value: string | undefined, id: string | undefined, label: string | undefined}>({
    value: '',
    id: '',
    label: ''
  });
  const [recipientName, setRecipientName] = useState("Katherine");
  // ref to get value from EmailBody
	const textRef = useRef();
  // state to store the current list of attachments
  const [actionPlans, setActionPlans] = useState<Array<{
    id: string,
    date: {
      seconds: number,
      nanoseconds: number
    },
    practice: string,
    achieveBy: firebase.firestore.Timestamp
  }>>([]);
  const [noActionPlansMessage, setNoActionPlansMessage] = useState<string>('');
  const [observations, setObservations] = useState<Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>>([]);
  const [noObservationsMessage, setNoObservationsMessage] = useState<string>('');
  const [actionPlanDisplay, setActionPlanDisplay] = useState(false);
  const [subject, setSubject] = useState<string | undefined>('');
  const firebase = props.firebase;
  // const userEmail = firebase.auth.currentUser.email;
  // state to store the current username
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [emailId, setEmailId] = useState('');
  const [attachments, setAttachments] = useState<Array<{
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
    practice?: string
  }>>();
  const [resultsAttachments, setResultsAttachments] = useState<Array<{
    sessionId: string,
    teacherId: string
  }>>();
  const [includeAttachments, setIncludeAttachments] = useState(true);
  const [checkedResults, setCheckedResults] = useState<{[id: string]: {
    summary: boolean,
    details: boolean,
    trends: boolean
  }}>({});
  const [templateDialog, setTemplateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [tool, setTool] = useState('');
  const [apGoal, setApGoal] = useState('');
  const [goalTimeline, setGoalTimeline] = useState<Date>();
  const [benefit, setBenefit] = useState('');
  const [date, setDate] = useState<Date>();
  const [actionSteps, setActionSteps] = useState<Array<{
    step: string,
    person: string,
    timeline: Date
  }>>();
  const [renderActionPlan, setRenderActionPlan] = useState(false);
  const [renderTransitionPdf, setRenderTransitionPdf] = useState(false);
  const [renderClimatePdf, setRenderClimatePdf] = useState(false);
  const [renderMathPdf, setRenderMathPdf] = useState(false);
  const [renderListeningPdf, setRenderListeningPdf] = useState(false);
  const [renderSequentialPdf, setRenderSequentialPdf] = useState(false);
  const [teacherObject, setTeacherObject] = useState<Types.Teacher>();
  const [transition, setTransition] = useState<TransitionData>();
  const [climate, setClimate] = useState<ClimateData>();
  const [math, setMath] = useState<MathData>();
  const [listening, setListening]= useState<ListeningData>();
  const [sequential, setSequential] = useState<SequentialData>();

  // get the user's name
  useEffect(() => {
    if (userName === '') {
      firebase.getCoachFirstName()
        .then((name: string): void => {
          setUserName(name);
        });
    }
    if (props.draft && emailId === '') {
      setEmailId(props.draft.id);
      setEmail(props.draft.emailContent);
      setSubject(props.draft.subject);
      setRecipient({
        value: props.draft.recipientEmail,
        id: props.draft.recipientId,
        label: props.draft.recipientName
      });
    }
  });

  const addActionPlanAttachment = (actionPlanId: string, teacherId: string, title: string): void => {
    const newAttachments = attachments;
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
    if (newAttachments) {
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
    practice: string
  ): void => {
    const newAttachments = attachments;
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
      practice: practice
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
      practice?: string
    }): boolean => element.id === sessionId;
    if (newAttachments) {
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
      console.log('SET ATTACHMENTS', newAttachments);
      setAttachments(newAttachments);
    } else {
      setAttachments([newResultObject]);
    }
  }

  const removeAttachment = (position: number): void => {
    const newAttachments = attachments;
    if (newAttachments) {
      newAttachments.splice(position, 1);
      setAttachments(newAttachments);
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

  const functionForType = (base64string: string, id: string) => {
    return;
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

  const printDocument = async (practice: string | undefined, date: Date, elementId: string, addToAttachmentList: typeof functionForType, id: string): Promise<void> => {
    const input: HTMLElement = document.getElementById(elementId);
    let base64data: string | ArrayBuffer | null = null;
    let newBase64Data = '';
    html2canvas(input, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById(elementId).style.visibility = 'visible';
      },
    }).then((canvas) => {
      console.log('canvas');
    // canvas context
    const context = canvas.getContext("2d");
    // get the current ImageData for the canvas
    const data = context.getImageData(0, 0, canvas.width, canvas.height);
    // store the current globalCompositeOperation
    const compositeOperation = context.globalCompositeOperation;
    // set to draw behind current content
    context.globalCompositeOperation = "destination-over";
    //set background color
    context.fillStyle = "#FFFFFF";
    // draw background/rectangle on entire canvas
    context.fillRect(0,0,canvas.width,canvas.height);

    const tempCanvas = document.createElement("canvas");
    const tCtx = tempCanvas.getContext("2d");

    tempCanvas.width = 1588;
    tempCanvas.height = 2000;

    tCtx.drawImage(canvas,0,0);

    // write on screen
    const imgData2 = tempCanvas.toDataURL("image/png");
    saveAs(imgData2, 'cropped.png');

        const link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.png";
        const imgData = canvas.toDataURL('image/png');
        // console.log('IMGDATA', imgData);
        saveAs(imgData, 'canvas.png');
        // const config1 = {width: 100, height: 100, top: 50, left: 30};
        const imgWidth = 190; 
        const pageHeight = 235;
        // const imgWidth = 190; 
        // const pageHeight = 215;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
        let position = 10;
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        // pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth*0.9, pdfHeight);
        // pdf.addImage(imgData2, 'PNG', 10, 10, 190, 220);
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position - 30, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("download.pdf");
        const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf'});
        const reader = new FileReader();
        reader.readAsDataURL(blobPDF);
        reader.onloadend = function(): void {
          base64data = reader.result;
          // let newBase64Data = '';
          if (base64data) {
            newBase64Data = (base64data as string).replace('data:application/pdf;base64,', '');
          }
          console.log('data is', newBase64Data);
          console.log('practice is', practice);
          console.log('date is', date);
          addToAttachmentList(newBase64Data, id);
        }
      })
  }

  const attachActionPlan = (actionPlanId: string, addToAttachmentList: typeof functionForType): void => {
    firebase.getAPInfo(actionPlanId).then((actionPlanData: {
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
      const newDate = changeDateType(actionPlanData.dateModified);
      setTool(actionPlanData.tool);
      setApGoal(actionPlanData.goal);
      if (actionPlanData.goalTimeline && (typeof actionPlanData.goalTimeline !== 'string')) {
        setGoalTimeline(actionPlanData.goalTimeline.toDate());
      } else {
        setGoalTimeline(new Date());
      }
      setBenefit(actionPlanData.benefit);
      setDate(newDate);
      const newActionStepsArray: Array<{
        step: string,
        person: string,
        timeline: Date
      }> = [];
      props.firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{
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
              new Date(),
          };
        })
      }).then(() => {
        setActionSteps(newActionStepsArray);
      }).then(() => {
        setRenderActionPlan(true);
      }).then(async () => {
        printDocument(actionPlanData.tool, newDate, 'apPdf', addToAttachmentList, actionPlanId);
      }).then(() => {
        setRenderActionPlan(false);
        setTool('');
        setApGoal('');
        setGoalTimeline(undefined);
        setBenefit('');
        setDate(undefined)
        setActionSteps([]);
      })
      .catch(() => {
        console.log('error retrieving action steps');
      });
    })
  }

  const waitFor = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

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
    ClimateData['details'] | undefined,
    ClimateData['trends'] | undefined
  ]> => {
    return Promise.all([
      summary ? props.firebase.fetchAvgToneRating(sessionId).then((rating: number) => {
        const summary = {
          toneRating: rating
        };
        return summary
      }) : null,
      (summary || details) ? props.firebase.fetchBehaviourTypeCount(sessionId).then((details: Array<{
        behaviorResponse: string,
        count: number
      }>) => {
        let specificCount = 0;
        let nonspecificCount = 0;
        let disapprovalCount = 0;
        let redirectionCount = 0;
        details.forEach(behavior => {
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
        return {
          specificCount: specificCount,
          nonspecificCount: nonspecificCount,
          disapprovalCount: disapprovalCount,
          redirectionCount: redirectionCount
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
    MathData['childSummary'] | undefined,
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
      summary ? props.firebase.fetchChildMathSummary(sessionId)
        .then((summary: MathData['childSummary']) => {return summary}) : null,
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
        .then((trends: MathData['childTrends']) => {return trends}) : null
    ])
  }

  const getSequentialData = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined
  ): Promise<[
    SequentialData['childSummary'] | undefined,
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
      summary ? props.firebase.fetchChildSeqSummary(sessionId)
        .then((summary: SequentialData['childSummary']) => {return summary}) : null,
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
        .then((trends: SequentialData['childTrends']) => {return trends}) : null
    ])
  }

  const attachTransitionResult = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined,
    addToAttachmentList: typeof functionForType
  ): void => {
    getTransitionData(sessionId, summary, details, trends).then((data) => {
      return Promise.all([
        setTransition({
          summary: data[0],
          details: data[1],
          trends: data[2]
        }),
        setDate(new Date())
      ])
    })
    .then(() => {
      setRenderTransitionPdf(true);
    }).then(() => {
      setTimeout(()=> {printDocument('Transition Time', new Date(), 'TT', addToAttachmentList, sessionId)}, 10000)
    }).then(() => {
      setTimeout(() => {setRenderTransitionPdf(false)}, 10000);
      setTimeout(() => {setTransition(undefined)}, 10000);
    })
  }

  const attachClimateResult = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined,
    addToAttachmentList: typeof functionForType
  ): void => {
    getClimateData(sessionId, summary, details, trends).then((data) => {
      return Promise.all([
        setClimate({
          summary: data[0],
          details: data[1],
          trends: data[2]
        }),
        setDate(new Date())
      ])
    })
    .then(() => {
      setRenderClimatePdf(true);
    }).then(() => {
      setTimeout(()=> {printDocument('Classroom Climate', new Date(), 'CC', addToAttachmentList, sessionId)}, 10000)
    }).then(() => {
      setTimeout(() => {setRenderClimatePdf(false)}, 10000);
      setTimeout(() => {setClimate(undefined)}, 10000);
    })
  }

  const attachMathResult = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined,
    addToAttachmentList: typeof functionForType
  ): void => {
    getMathData(sessionId, summary, details, trends).then((data) => {
      return Promise.all([
        setMath({
          childSummary: data[0],
          teacherSummary: data[1],
          childDetails: data[2] ? {math1: data[2].math1, math2: data[2].math2, math3: data[2].math3, math4: data[2].math4} : undefined,
          teacherDetails: data[2] ? {teacher1: data[2].teacher1, teacher2: data[2].teacher2, teacher3: data[2].teacher3, teacher4: data[2].teacher4} : undefined,
          childTrends: data[3],
          teacherTrends: data[4]
        }),
        setDate(new Date())
      ])
    })
    .then(() => {
      setRenderMathPdf(true);
    }).then(() => {
      setTimeout(()=> {printDocument('Math Instruction', new Date(), 'MI', addToAttachmentList, sessionId)}, 10000)
    }).then(() => {
      setTimeout(() => {setRenderMathPdf(false)}, 10000);
      setTimeout(() => {setMath(undefined)}, 10000);
    })
  }

  const attachListeningResult = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined,
    addToAttachmentList: typeof functionForType
  ): void => {
    getListeningData(sessionId, summary, details, trends).then((data) => {
      return Promise.all([
        setListening({
          summary: data[0],
          details: data[1],
          trends: data[2]
        }),
        setDate(new Date())
      ])
    })
  .then(() => {
    setRenderListeningPdf(true);
  }).then(() => {
    setTimeout(()=> {printDocument('Listening to Children', new Date(), 'LC', addToAttachmentList, sessionId)}, 10000)
  }).then(() => {
      setTimeout(() => {setRenderListeningPdf(false)}, 10000);
      setTimeout(() => {setListening(undefined)}, 10000);
    })
  }

  const attachSequentialResult = (
    sessionId: string,
    summary: boolean | undefined,
    details: boolean | undefined,
    trends: boolean | undefined,
    addToAttachmentList: typeof functionForType
  ): void => {
    getSequentialData(sessionId, summary, details, trends).then((data) => {
      return Promise.all([
        setSequential({
          childSummary: data[0],
          teacherSummary: data[1],
          childDetails: data[2] ? {sequential1: data[2].sequential1, sequential2: data[2].sequential2, sequential3: data[2].sequential3, sequential4: data[2].sequential4} : undefined,
          teacherDetails: data[2] ? {teacher1: data[2].teacher1, teacher2: data[2].teacher2, teacher3: data[2].teacher3, teacher4: data[2].teacher4} : undefined,
          childTrends: data[3],
          teacherTrends: data[4]
        }),
        setDate(new Date())
      ])
    })
    .then(() => {
      setRenderSequentialPdf(true);
    }).then(() => {
      setTimeout(()=> {printDocument('Sequential Activities', new Date(), 'SA', addToAttachmentList, sessionId)}, 10000)
    }).then(() => {
      setTimeout(() => {setRenderSequentialPdf(false)}, 10000);
      setTimeout(() => {setSequential(undefined)}, 10000);
    })
  }

  const asyncForEach = async (array: Array<{
    content: string,
    filename: string,
    type: string,
    disposition: string,
    id: string,
    teacherId: string,
    actionPlan: boolean,
    result: boolean
  }>, callback: unknown): Promise<void> => {
    for (let index = 0; index < array.length; index++) {
      if (index > 0) {
        setTimeout(() => {callback(array[index], index, array)}, 8000)
      } else {
        await callback(array[index], index, array)
      }
    }
  }

  const attachAll = async (): Promise<void> => {
    setActionPlanDisplay(false);
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
      practice?: string
    }> = [];
    const addToAttachmentList = (base64string: string, id: string): void => {
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
        practice?: string
      }): boolean => element.id === id;
      if (attachments) {
        newAttachments = attachments;
        const index = newAttachments.findIndex(idMatch);
        newAttachments[index].content = base64string;
      }
    }
    if (attachments) {
      await asyncForEach(attachments, async (attachment: {
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
        practice?: string
      }) => {
        // await waitFor(10000);
        if (attachments) {
          if (attachment.actionPlan) {
            attachActionPlan(attachment.id, addToAttachmentList);
          } else if (attachment.result) {
            if (attachment.practice === 'transition') {
              attachTransitionResult(attachment.id, attachment.summary, attachment.details, attachment.trends, addToAttachmentList)
            } else if (attachment.practice === 'climate') {
              attachClimateResult(attachment.id, attachment.summary, attachment.details, attachment.trends, addToAttachmentList)
            } else if (attachment.practice === 'math') {
              attachMathResult(attachment.id, attachment.summary, attachment.details, attachment.trends, addToAttachmentList)
            } else if (attachment.practice === 'listening') {
              attachListeningResult(attachment.id, attachment.summary, attachment.details, attachment.trends, addToAttachmentList)
            } else if (attachment.practice === 'sequential') {
              attachSequentialResult(attachment.id, attachment.summary, attachment.details, attachment.trends, addToAttachmentList)
            }
          }
        }
      })
    }
  }

  const sendMail = async (): Promise<void> => {
    if (recipient === null) {
      setAlertEnum(Alerts.NO_RECIPIENT);	
    } else {
      // console.log('this is attachment being sent', attachments);
      // tries to get the html version of all the action plans
      // doesn't convert to pdf but required so
      /* const sendAttachments = attachments.map((attach: Attachment) => {
        const staticMarkup = renderToStaticMarkup(<ActionPlanForm 
            firebase={props.firebase} 
            actionPlanId={attach.id}
            readOnly={true}
            actionPlanExists={true}
            teacherId={recipient.id}
          />);
        
        // convert staticMarkup to pdf here
        
        // encodes the pdf in a base64 string
        const attachContent: string = btoa(staticMarkup);

        // returns in the format sendgrid requires
        return {
          content: attachContent,
          filename: (attach.type + ' ' + attach.date.toString()),
          type: 'application/pdf',
          disposition: 'attachment',
        }
      }); */

      // create the message object to send to funcSendEmail
      const msg: Message = {
        // id: props.draft.id,
        // from: userEmail,
        // to: (props.draft.to !== '' ? props.draft.to : recipient.value),
        // subject: theme,
        // theme: theme,
        // textContent: textRef.current.textContent,
        // content: textRef.current.innerHTML,
        id: '0000001',
        from: 'chalkcoaching@gmail.com',
        to: 'clare.speer@gmail.com',
        subject: subject ? subject : '',
        theme: ThemeOptions.FEEDBACK,
        // html: textRef.current,
        textContent: 'test',
        content: email ? email : '',
        delivered: false,
        // attachments: sendAttachments,
        /* attachments: [{
          id: 'action plan',
          date: new Date(),
        }] */
        // attachments: includeAttachments ? attachments : undefined
        // attachments: attachments,
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
        // .encrypt('test', firebase.auth.currentUser.uid)
        .toString();
      
      firebase.sendEmail(encryptedMsg)
        .then((res: {data: string}): void => {
          console.log(JSON.stringify(res));
          if(res.data === '200') {
            setAlertEnum(Alerts.EMAIL_SEND_SUCCESS);
          } else {
            setAlertEnum(Alerts.EMAIL_SEND_FAIL);
          }
        })
        .catch((err: Error): void => {
          console.log(JSON.stringify(err));
          setAlertEnum(Alerts.EMAIL_SEND_FAIL);
        });
    }
  };

  /* const removeAttachment = (actionPlanId: string): void => {
    const updatedAttachments = attachments.map((attach: Attachment): Attachment => {
      if (attach.id !== actionPlanId) {
        return attach;
      }
    });
    console.log(updatedAttachments);
    setAttachments(updatedAttachments);
  } */

  /* const thankYou = (name: string | null): JSX.Element => (<div style={{padding: "1em"}}>
  <h4>Hi {name || ""},</h4>
  Thanks for welcoming me into your classroom today. I really enjoyed my visit and look forward to chatting with you soon about CHALK practice.
  <br />
  <br />
  Best wishes,
  <br />
    {userName}
  </div>); */

  const thankYou = 'Hi ' + recipientName + ', \n \n'
  + 'Thanks for welcoming me today in your classroom! '
  + 'I really enjoyed my visit and look forward to '
  + 'chatting with you soon about Transition Time. \n \n'
  + 'Best wishes, \n'
  + 'Clare';

  const custom = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
    <h4>Hi {name || ""},</h4>
  {/* <strong>Create your new message here</strong> */}
  <br />
  <br />
  Best,
  <br />
    {userName}
  </div>;

  /* const feedback = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
    <h4>Hi {name || ""},</h4>
    Thanks for welcoming me today in your classroom! 
    <br />
    It was a joy to see the children so engaged in those small 
    groups when you used cotton balls to teach counting. 
    <br />
    <br />
    Please see below for some notes on great teaching strategies I noticed and why they’re effective for children.
    <br />
    <br />
    Best,
    <br />
    	{userName}
  </div>; */

  const feedback = 'Hi ' + recipientName + ', \n \n'
  + 'Thanks for welcoming me today in your classroom! \n \n'
  + 'It was a joy to see the children so engaged in those small '
  + 'groups when you used cotton balls to teach counting. \n \n'
  + 'Please see below for some notes on great teaching strategies '
  + 'I noticed and why they’re effective for children. \n \n'
  + 'Best, \n'
  + 'Clare';
 
  /* const actionPlan = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
    <h4>Hi {name || ""},</h4>
    Thanks for meeting today and creating this action plan. I think it looks great, and I look forward to working on these goals with you!
    <br />
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    {userName}
  </div>; */

  const actionPlan = 'Hi ' + recipientName + ', \n \n'
    + 'Thanks for meeting today and creating this action plan. '
    + 'I think it looks great, and I look forward to working '
    + 'on these goals with you! \n \n'
    + 'Please reach out with questions or ideas anytime. \n \n'
    + 'Best, \n'
    + 'Clare';

  const greetingText = "Hi " + recipientName;

  const chooseOptions = (): JSX.Element => <div style={{padding: '1em'}}>
	  <h3 style={{fontFamily: 'Arimo'}}>Please choose a recipient for your message.</h3>
  </div>;

  // get the text for EmailBody according to the states set
  /* const getEmailText = (): JSX.Element => {
    // if the theme of the draft matches with the current theme and the textContent is not null
    // it means that the user is editing a draft message and then that is content shown in the email body
    // if (theme === props.draft.theme && props.draft.textContent !== null) {
    if (props.draft.theme) {
      return props.draft.content;
    } else {
      const recipientName = (props.draft.to !== '' ? props.draft.to : (recipient ? recipient.label : ''));
      if (recipientName !== '') {
        if(theme.label === ThemeOptions.THANK_YOU) {
          return thankYou(recipientName);
        } else if (theme.label === ThemeOptions.ACTION_PLAN){
          return actionPlan(recipientName);
        } else if (theme.label === ThemeOptions.FEEDBACK) {
          return feedback(recipientName);
        } else {
          return custom(recipientName);
        }
      } else {
        return chooseOptions();
      }
    }
  }; */

  const removeResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = checkedResults;
    if (newCheckedResults) {
      newCheckedResults[id][type] = false;
    }
    setCheckedResults(newCheckedResults);
  }

  const addResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = checkedResults;
    if (newCheckedResults) {
      newCheckedResults[id][type] = true;
    }
    setCheckedResults(newCheckedResults);
  }

  const recipientSelected = (newRecipient: {value: string, id: string, label: string}): void => {
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
      console.log('aplans', actionPlans)
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
      practice: string
    }>) => {
      setObservations(observations);
      const unchecked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} = {};
      console.log('observations', observations)
      if (observations && observations.length > 0) {
        observations.forEach(result => {
          unchecked[result.id] = {'summary': false, 'details': false, 'trends': false}
        })
      }
      setCheckedResults(unchecked);
      console.log('observations', observations)
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

  const saveEmail = async (
    email?: string,
    subject?: string,
    recipient?: {
      id: string,
      name: string,
      email: string
    },
    emailId?: string
  ): Promise<Email> => {
    return firebase.saveEmail(email, subject, recipient, emailId).then((data: Email) => {
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
      email: string
    },
    emailId?: string
  ): void => {
    saveEmail(email, subject, recipient, emailId).then((email: Email) => {
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
    } else {
      setEmail('')
    }
    setTemplateDialog(false)
  }

  const keepTemplate = (): void => {
    setTemplateDialog(false)
  }

  const handleDelete = (): void => {
    /* setEmail('');
    setRecipient({
      value: '',
      id: '',
      label: ''
    });
    setTheme({
      id: '0',
      value: 'None',
      label: 'None'
    }); */
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
      {renderActionPlan ? (
        <div
          id="apPdf"
          style={{
            backgroundColor: '#ffffff',
            width: '210mm',
            minHeight: '100mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            // display: "none"
            visibility: 'hidden',
            position: 'fixed',
            right: -1000
          }}
        >
          <ActionPlanForPdf
            tool={tool}
            apGoal={apGoal}
            goalTimeline={goalTimeline}
            benefit={benefit}
            date={date}
            actionSteps={actionSteps}
            teacher={teacherObject}
          />
        </div>
      ) : (null)}
      {renderTransitionPdf ? (
        <div
        id="TT"
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
          data={transition}
          date={date}
          teacher={teacherObject}
        />
      </div>
      ) : (null)}
      {renderClimatePdf ? (
        <div
        id="CC"
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
          data={climate}
          date={date}
          teacher={teacherObject}
        />
      </div>
      ) : (null)}
      {renderMathPdf ? (
        <div
        id="MI"
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
          data={math}
          date={date}
          teacher={teacherObject}
        />
      </div>
      ) : (null)}
      {renderListeningPdf ? (
        <div
        id="LC"
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
          data={listening}
          date={date}
          teacher={teacherObject}
        />
      </div>
      ) : (null)}
      {renderSequentialPdf ? (
        <div
        id="SA"
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
          data={sequential}
          date={date}
          teacher={teacherObject}
        />
      </div>
      ) : (null)}
      <Grid container direction="column" justify="flex-start" alignItems="center" style={{width: '100%'}}>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                {/* {props.readOnly ? 'To:' : 'Write a new message to:'} */}
                To:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <RecipientAddress
                selectedOption={recipient}
                setOption={(newOption: SelectOption): void => recipientSelected(newOption)}
                readOnly={props.readOnly}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '0.5em', width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                {/* {props.readOnly ? 'Message template:' : 'Select message template:'} */}
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
                      <SendButton sendMail={(): void => {saveAndSendEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value}, emailId)}}/>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item style={{paddingRight: '1em'}}>
                          <AttachButton 
                            acceptAttachment={(): void => setActionPlanDisplay(true)} 
                            // disabled={theme !== ThemeOptions.ACTION_PLAN || recipient === null}
                          />
                        </Grid>
                        <Grid item style={{paddingRight: '1em'}}>
                          <SaveButton saveEmail={(): void => {saveEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value}, emailId)}} saveDraft={(): void => setActionPlanDisplay(true)} />
                        </Grid>
                        <Grid item>
                          <DeleteButton email={email} onClick={(): void => setDeleteDialog(true)} />
                        </Grid>
                        <AttachmentDialog
                          recipientId={recipient.id}
                          // addAttachment={addAttachment}
                          setIncludeAttachments={(value: boolean): void => {
                            setIncludeAttachments(value)
                          }}
                          attachAll={attachAll}
                          actionPlans={actionPlans}
                          noActionPlansMessage={noActionPlansMessage}
                          addActionPlanAttachment={addActionPlanAttachment}
                          addResultsAttachment={addResultsAttachment}
                          results={observations}
                          checkedResults={checkedResults}
                          addResult={addResult}
                          removeResult={removeResult}
                          noResultsMessage={noObservationsMessage}
                          open={actionPlanDisplay}
                          recipientName={recipient.label}
                          handleClose={(): void => setActionPlanDisplay(false)}
                          handleDelete={(existActionPlan: string): void => {
                            removeAttachment(existActionPlan);
                            setActionPlanDisplay(false);
                          }}
                          attachmentList={attachments}
                          firebase={firebase}
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
  teacherList: Array<Types.Teacher>
} => {
  return {
    teacherList: state.teacherListState.teachers
  };
};

export default compose(connect(
  mapStateToProps,
  null
), NewMessageView);

/* export default connect(
  mapStateToProps,
  null
)(NewMessageView); */