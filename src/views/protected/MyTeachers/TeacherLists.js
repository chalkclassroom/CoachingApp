import React, { Component } from "react";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};


class TeacherPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teacherList: [
        {
          name: "Miss Teacher",
          email: "teacher@school.org",
          school: "Prekay Preschool"
        }
      ],
      isAdding: false,
      isEditing: false,
      isDeleting: false,
      inputName: "",
      inputEmail: "",
      inputSchool: "",
      inputIndex: -1
    };

    this.promptAdd = this.promptAdd.bind(this);
    this.promptEdit = this.promptEdit.bind(this);
    this.promptDelete = this.promptDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputSchool = this.handleInputSchool.bind(this);
    this.confirmAdd = this.confirmAdd.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount = () => {
    // Place code for fetching the TeacherList from Firebase here
  };

  promptAdd = () => {
    this.setState({
      isAdding: true,
      inputName: "",
      inputEmail: "",
      inputSchool: ""
    });
  };

  promptEdit = index => {
    this.setState( prevState => ({
      isEditing: true,
      inputName: prevState.teacherList[index].name,
      inputEmail: prevState.teacherList[index].email,
      inputSchool: prevState.teacherList[index].school,
      inputIndex: index
    }));
    console.log(`inputIndex: ${this.state.inputIndex}`)
  };

  promptDelete = index => {
    this.setState( prevState => ({
        isDeleting: true,
        inputName: prevState.teacherList[index].name,
        inputEmail: prevState.teacherList[index].email,
        inputSchool: prevState.teacherList[index].school,
        inputIndex: index
      }),
      () => console.log(`This is the inputIndex: ${this.state.inputIndex}`)
    );
  };

  closeModal = () => {
    this.setState({
      isAdding: false,
      isEditing: false,
      isDeleting: false,
      inputName: "",
      inputEmail: "",
      inputSchool: "",
      inputIndex: -1
    });
  };

  handleInputName = event => {
    this.setState({
        inputName: event.target.value
      },
      () => console.log(`inputName: ${this.state.inputName}`))
  };

  handleInputEmail = event => {
    this.setState({
        inputEmail: event.target.value
      },
      () => console.log(`inputEmail: ${this.state.inputEmail}`))
  };

  handleInputSchool = event => {
    this.setState({
        inputSchool: event.target.value
      },
      () => console.log(`inputSchool: ${this.state.inputSchool}`))
  };

  confirmAdd = () => {
    // Replace this setState() w/ a push to Firebase
    this.setState( prevState => {
        let temp = prevState.teacherList;
        temp.push({
          name: prevState.inputName,
          email: prevState.inputEmail,
          school: prevState.inputSchool
        });
        return {
          teacherList: temp,
          isAdding: false,
          inputName: "",
          inputEmail: "",
          inputSchool: ""
        };},
      () => console.log(`teacherList: ${this.state.teacherList[this.state.teacherList.length - 1].name}`)
    );
  };

  confirmEdit = () => {
    // Replace this setState() with a push to Firebase
    this.setState( prevState => {
        let temp = prevState.teacherList;
        temp.splice(prevState.inputIndex, 1, {
          name: prevState.inputName,
          email: prevState.inputEmail,
          school: prevState.inputSchool
        });
        return {
          teacherList: temp,
          isEditing: false,
          inputName: "",
          inputEmail: "",
          inputSchool: ""
        };},
      () => console.log(`name: ${this.state.teacherList[0].name}`))
  };

  confirmDelete = () => {
    // Replace this setState() with a request to delete the teacher within Firebase
    this.setState( prevState => {
      let temp = prevState.teacherList;
      temp.splice(prevState.inputIndex, 1);
      return {
        teacherList: temp,
        isDeleting: false,
        inputName: "",
        inputEmail: "",
        inputSchool: ""
      };
    });
  };


  render () {

    const { teacherList, isAdding, isEditing, isDeleting, inputName, inputEmail, inputSchool } = this.state;


    return(
      <div>
        <FirebaseContext.Consumer>
          { firebase => <AppBar firebase={firebase} /> }
        </FirebaseContext.Consumer>
        <div className="content">
          <IconButton aria-label="Add-Button">
            <AddCircleIcon onClick={this.promptAdd} />
          </IconButton>
          <div className="list-wrap">
            <List>
              {teacherList.map((value, index) => (
                <ListItem divider key={index} >
                  <ListItemText primary={value.name}/>
                  <ListItemText primary={value.email}/>
                  <ListItemText primary={value.school}/>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit-Button">
                      <EditIcon onClick={this.promptEdit.bind(this, index)} />
                    </IconButton>
                    <IconButton aria-label="Delete-Button">
                      <DeleteIcon onClick={this.promptDelete.bind(this, index)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
          <Modal
            style={modalStyle}
            aria-labelledby="Add-Modal"
            aria-describedby="This modal prompts a user to add a teacher"
            open={isAdding}
            onClose={this.closeModal}
          >
            <div >
              <form noValidate autoComplete="off">
                <TextField
                  defaultValue="Miss Teacher"
                  id="add-name"
                  label="Add-Name"
                  margin="normal"
                  onChange={event => this.handleInputName(event)}
                  type="text"
                />
                <TextField
                  defaultValue="teacher@school.org"
                  id="add-email"
                  label="Add-Email"
                  margin="normal"
                  onChange={event => this.handleInputEmail(event)}
                  type="text"
                />
                <TextField
                  defaultValue="Prekay Preschool"
                  id="add-school"
                  label="Add-School"
                  margin="normal"
                  onChange={event => this.handleInputSchool(event)}
                  type="text"
                />
                <Button onClick={this.confirmAdd}>
                  Confirm
                </Button>
                <Button onClick={this.closeModal}>
                  Cancel
                </Button>
              </form>
            </div>
          </Modal>
          <Modal
            style={modalStyle}
            aria-labelledby="Edit-Modal"
            aria-describedby="This modal prompts the user to edit a teacher's information"
            open={isEditing}
            onClose={this.closeModal}
          >
            <div>
              <form noValidate autoComplete="off">
                <TextField
                  defaultValue={inputName}
                  id="edit-name"
                  label="Edit-Name"
                  margin="normal"
                  onChange={event => this.handleInputName(event)}
                  type="text"
                />
                <TextField
                  defaultValue={inputEmail}
                  id="edit-email"
                  label="Edit-Email"
                  margin="normal"
                  onChange={event => this.handleInputEmail(event)}
                  type="text"
                />
                <TextField
                  defaultValue={inputSchool}
                  id="edit-school"
                  label="Edit-School"
                  margin="normal"
                  onChange={event => this.handleInputSchool(event)}
                  type="text"
                />
                <Button onClick={this.confirmEdit}>
                  Confirm
                </Button>
                <Button onClick={this.closeModal}>
                  Cancel
                </Button>
              </form>
            </div>
          </Modal>
          <Modal
            style={modalStyle}
            aria-labelledby="Delete-Modal"
            aria-describedby="This modal prompts the user to confirm the deletion of a teacher"
            open={isDeleting}
            onClose={this.closeModal}
          >
            <div>
              <p>
                Are you sure you wish to delete {inputName} from your list of teachers?
              </p>
              <Button onClick={this.confirmDelete}>
                Yes, remove this teacher.
              </Button>
              <Button onClick={this.closeModal}>
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

TeacherPage.contextType = FirebaseContext;
export default TeacherPage;
