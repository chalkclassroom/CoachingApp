import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import Typography from '@material-ui/core/Typography/index';


const styles = () => ({
  definitionTitle: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%"
  },
  definitionText: {
    backgroundColor: "#759fe5",
    width: "50%"
  },
  buttonTitle: {
    backgroundColor: "#094492", 
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%"
  },
  lineExamples: {
    backgroundColor: "#AED581",
    width:"20%"
  },
  travelingExamples: {
    backgroundColor: "#FFA726",
    width:"20%"
  },
  waitingExamples: {
    backgroundColor: "#FF7043",
    width:"20%"
  },
  routinesExamples: {
    backgroundColor: "#64B5F6",
    width:"20%"
  },
  behaviorExamples: {
    backgroundColor: "#FF5252",
    width:"20%"
  }
});

function AssocCoopHelpCard(props) {
  const { classes } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell className={classes.definitionTitle}>
           Child Behaviors            
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.definitionText}>
              <strong>
              Associative Interactions              </strong>
            </TableCell>
            <TableCell className={classes.definitionText}>
              <strong>

              Cooperative Interactions
          
              </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
     
      <Table>
        <TableHead>
 
       
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              <strong>Participating in a conversation about a shared activity</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>
              <strong>Engaging in an open-ended activity without clear roles or order</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
              <strong>
              Following formal rules of a game and/or taking turns
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              <strong>Doing an activity together that has a predetermined sequence </strong>
            </TableCell>
 
          </TableRow>
          </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            Talking about what kind of structure to build at blocks
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>
            Pretending to be a family but it’s unclear who is the parent and who is the child; no defined storyline
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
            Following the rules for a memory card game
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
             Pretending to be a customer and server at a restaurant while using role speech (“What would you like to eat?”)
            </TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>

            Talking while making pretend potions together at the sand table
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples} >
                Drawing together at the dry erase board
              </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
            Following a set of rules for an invented game
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
            Completing a pattern block design together
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            ></TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            Talking to a teacher about a book character            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples}
            ></TableCell>
            <TableCell
              padding="checkbox"
              className={classes.waitingExamples}
            >
            Moving cars around the blocks center together
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            ></TableCell>
          </TableRow>
        </TableBody>
      </Table>



      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell className={classes.definitionTitle}>
           Teacher Behaviors            
            </TableCell>

          </TableRow>
        </TableHead>

 
        <TableHead>
 
       
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              <strong>Participating in children’s play</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>
              <strong>
Asking questions to extend children’s thinking about a shared activity
</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
              <strong>

              Encouraging children to share, work, or interact with each other
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              <strong>Helping children find the words to communicate </strong>
            </TableCell>
 
          </TableRow>
          </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            
Talking to children about their play-doh creations

            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>

            Asking children what will happen next during dramatic play
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>

            Demonstrating how to play a new game
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>

            Prompting children to ask peers to play or share a material
            </TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>


            Co-writing a label with a child for his drawing
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples} >

Asking children what shape of blocks they will need to keep their building from falling
              </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>


            Modeling the steps for sharing

            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
            Helping children solve problems during games or other shared activities (Say, “It’s my turn.”)

            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            >
              
              Taking on a role in dramatic play


            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            Asking children what they think a character will do next while reading a book together

           </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples}
            ></TableCell>
            <TableCell
              padding="checkbox"
              className={classes.waitingExamples}
            >
              Giving positive feedback when children share or interact

            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>

            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            ></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell className={classes.definitionTitle}>
           Child Behaviors            
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.definitionText}>
              <strong>
              Associative Interactions              </strong>
            </TableCell>
            <TableCell className={classes.definitionText}>

            Participating in a conversation about a shared activity
            </TableCell>
            <TableCell className={classes.definitionText}>


            Example: Talking about what kind of structure to build at blocks; Making pretend potions together with cups at the sand table; Talking to a teacher about a book character
            </TableCell>
            <TableCell className={classes.definitionText}>


            Engaging in an open-ended activity without clear roles or order
            </TableCell>
            <TableCell className={classes.definitionText}>


            Example: Pretending to be a family but it’s unclear who is the parent or child and the scenario is unclear; Moving cars around the blocks center together
            </TableCell>
            <TableCell className={classes.definitionText}>
              <strong>
              Cooperative Interactions              </strong>
            </TableCell>
            <TableCell className={classes.definitionText}>


            Following formal rules of a game and/or taking turns
</TableCell>
<TableCell className={classes.definitionText}>



Example: Following the rules for a memory card game
</TableCell>
<TableCell className={classes.definitionText}>



Talking about or doing an activity together that has a predetermined sequence 
</TableCell>
<TableCell className={classes.definitionText}>


Example: Pretending to be a customer and server at a restaurant while using role speech (“What would you like to eat?”);
Completing a pattern block design together
</TableCell>

<TableCell className={classes.definitionText}>
              <strong>
              Teacher Behaviors              </strong>
            </TableCell>
            <TableCell className={classes.definitionText}>



            Participating in children’s play
</TableCell>
<TableCell className={classes.definitionText}>




Example: Talking to children about their play-doh creations; Co-writing a label with a child for his drawing; Taking on a role in dramatic play
</TableCell>
<TableCell className={classes.definitionText}>




Asking questions to extend children’s thinking about a shared activity
</TableCell>
<TableCell className={classes.definitionText}>


Example: Asking children what will happen next during dramatic play or what shape of blocks they will need to keep their building from falling


</TableCell>
<TableCell className={classes.definitionText}>



Encouraging children to share, work, or interact with each other


</TableCell>
<TableCell className={classes.definitionText}>



Example: Demonstrating how to play a new game; Teaching children the steps for sharing; giving positive feedback when children share or interact 

</TableCell>
<TableCell className={classes.definitionText}>




Helping children find the words to communicate
</TableCell>
<TableCell className={classes.definitionText}>



Example: Prompting children to ask peers to play or share a material; helping children solve problems during games (Say, “It’s my turn.”)

</TableCell>


          </TableRow>
        </TableBody>
      </Table>








    </div>
  )
}

AssocCoopHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssocCoopHelpCard);
