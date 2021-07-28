// an enum of all the strings of magic eight
export enum MagicEight {
  TRANS_TIME = 'Transition Time',
  CLASS_CLIMATE = 'Classroom Climate',
  MATH_INSTRUCTION = 'Math Instruction',
  LVL_ENGAGEMENT = 'Level of Engagement',
  LVL_INSTRUCTION = 'Level of Instruction',
  LISTEN_CHILDREN = 'Listening to Children',
  SEQ_ACTIVITIES = 'Sequential Activities',
  AC = 'AC',
};

// an enum of all possible alert states for messaging view
export enum Alerts {
  // when the user hasn't chosen a theme
	NO_INTENT = 'Please choose subject of your email on the left!',
  // when the user hasn't chosen a recipient
  NO_RECIPIENT = 'Please choose the recipient of your email from the box on top!',
  // when the user hasn't written a message
  NO_MESSAGE = 'Please write a message',
  // default initial state
	NO_ERROR = '',
	// firebase returned 200
  EMAIL_SEND_SUCCESS = 'Your email was sent successfully!',
  // firebase returned error on sendEmail
	EMAIL_SEND_FAIL = 'Your email could not be sent. Please retry later!',
  // confirming that the user wishes to send the email
  // unused currently but left in for possible future use
  EMAIL_SEND = 'Are you sure you want to send this message?',
  // confirming that the user wishes to delete the draft
  // unused currently but left in for possible future use
  EMAIL_DELETE = 'Are you sure you want to delete this message?',
  // confirming that the user wished to view the email
  // unused currently but left in for possible future use
  EMAIL_VIEW = 'Are you sure you want to view this message?',
}

// an enum of all the possible menu options in messaging view
export enum MenuOptions {
  SENT = 'Sent',
  DRAFTS = 'Drafts',
  NEW_MESSAGE = 'New Message'
};

export type MenuOptionsKey = keyof typeof MenuOptions;

// an enum of all the possible theme options for an email
export enum ThemeOptions {
  ACTION_PLAN = 'Action Plan',
  FEEDBACK = 'Feedback',
  THANK_YOU = 'Thank You',
  CUSTOM = 'Blank',
};

// interface defining the structure of each message to be sent to firebase
export interface Message {
  // each message has a unique id granted by the firebase
  id: string;
  // from the email address it is being sent
  from: string;
  // to the email address it is being sent
  to: string;
  // subject of the email. currently is by default the theme but
  // is a field so that in the future if the option of custom subject is desired, it is
  // easier
  subject: string;
  // the theme of the message
  theme: ThemeOptions;
  // the text content of the message: required by sendgrid
  textContent: string;
  // the html content of the message: required for styling 
  content: string;
  // boolean for if the message has been delivered or not
  // false implies it should be returned when draft messages are required
  // while true implies should be returned when sent messages are required
  // used a boolean field for this as the list of messages can be stored in just one
  // table instead of multiple in firestore. also, a message cannot have more states
  // than sent or draft.
  delivered: boolean; 
  // to store the list of attachments for each message 
  attachments: Array<{
    content: string,
    filename: string,
    type: string,
    disposition: string
  }> | undefined;
};

// interface defining the structure Select from
// MaterialUI needs
export interface SelectOption {
  value: string | undefined;
  id: string | undefined;
  label: string | undefined;
  firstName: string | undefined;
}

export interface TemplateOption {
  value: string;
  id: string;
  label: string;
}

export interface Email {
  id: string,
  emailContent: string | undefined,
  subject: string | undefined,
  recipientId: string | undefined,
  recipientFirstName: string | undefined,
  recipientName: string | undefined,
  recipientEmail: string | undefined,
  type: string,
  user: string,
  dateCreated?: firebase.firestore.Timestamp,
  dateModified: firebase.firestore.Timestamp,
  // attachments
}

export interface Attachment {
  content: string,
  filename: string,
  type: string,
  disposition: string,
  id: string,
  literacyType?: string,
  teacherId: string,
  actionPlan: boolean,
  result: boolean,
  summary?: boolean,
  details?: boolean,
  trends?: boolean,
  practice?: string,
  date?: Date
}