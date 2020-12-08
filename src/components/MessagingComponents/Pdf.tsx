// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, PDFViewer } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  titleText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    border: '1px solid blue',
    width: '70%'
  },
  titleRow: {
    marginTop: 10,
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'center',
  },
  goalColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  goalDateColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  actionStepsContainer: {
    flexDirection: 'row',
    width: '70%'
  },
  step: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-start'
  }
});

interface Props {
  goal: string,
  goalTimeline: Date,
  benefit: string,
  actionStepsArray: Array<{
    step: string,
    materials: string,
    person: string,
    timeline: Date
  }>,
  recipientName: string
}

const ActionStep = ({ company, details, position, date }) => {
  const title = `${company} | ${position}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const Pdf: React.FC<Props> = (props: Props) => {
  const {goal, goalTimeline, benefit, actionStepsArray, recipientName} = props;
  return (
    <Document title="attempt">
      <Page size="A4" style={styles.page}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>
            {recipientName}&apos;s Action Plan
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.headerContainer}>
            <View style={styles.goalColumn}>
              <Text>Goal: {goal}</Text>
            </View>
            {/* <View style={styles.goalDateColumn}>
              <Text>
                {moment(goalTimeline).format('MM/DD/YYYY')}
              </Text>
            </View> */}
          </View>
        </View>
        <View style={styles.section}>
          <View>
            <Text>
              Achieve by: {moment(goalTimeline).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text>{benefit}</Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text>
              Action Step #1
            </Text>
          </View>
          <View>
            <Text>
              Step: {actionStepsArray[0].step}
            </Text>
          </View>
          <View>
            <Text>
              Materials: {actionStepsArray[0].materials}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
          };

          export default Pdf;

/* ReactDOM.render(
  <PDFViewer>{Pdf}</PDFViewer>,
  document.getElementById("root")
); */

/* ReactDOM.render(
  <BlobProvider document={MyDocument}>
    {({ blob, url, loading, error }) => {
      if (blob) {
        return <PSPDFKit blob={blob} />;
      }

      if (error) {
        return error;
      }

      return <div>The PDF is rendering...</div>;
    }}
  </BlobProvider>,
  document.getElementById("root")
); */