// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, PDFViewer } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

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
  headerContainer: {
    flexDirection: 'row',
    border: '1px solid blue',
    width: '70%'
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

const Pdf: React.FC<Props> = (props: Props) => {
  const {goal, goalTimeline, benefit, actionStepsArray, recipientName} = props;
  return (
    <Document title="attempt">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            {recipientName}&apos;s Action Plan
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.headerContainer}>
            <View style={styles.leftColumn}>
              <Text>Goal: {goal}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text>{goalTimeline.toString()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text>{benefit}</Text>
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