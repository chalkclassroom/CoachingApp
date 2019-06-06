import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
});

var FontAwesome = require("react-fontawesome");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const useStyles=makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  list: {
    width: "100%",
    height: "500",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    fontSize: 14
  },
  iconButton: {
    padding: 20
  },
  input: {
    marginLeft: 10,
    flex: 1
  },
  pos: {
    marginBottom: 12
  },
  fab: {
    margin: theme.spacing.unit
  },

}));

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [dialog, setOpenDialog] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    email: "Controlled",
    school: "11"
  });

  const addIcon = React.createRef();


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
    // props.queryItem('name', 1111)
  };

  const closeModel = () => {
    setOpen(false);
    props.addItem(JSON.parse(JSON.stringify(values)));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editItem = (e) => {
    handleClickOpen();
  };

  const deleteItem = (e) => {
    props.deleteItem(e.target.dataset.index);
  };

  function handleClickOpen(e) {
    let arr = JSON.parse(e.target.dataset.arr);
    localStorage.setItem("name", arr.name);
    values.name = arr.name;
    values.school = arr.school;
    values.email = arr.email;
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
  }

  const chkEdit = () => {
    setOpenDialog(true);
  };

  // confirm editing
  const handleDialogChk = () => {
    props.editItem(localStorage.getItem("name"), values);
    setOpenForm(false);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenForm(false);
  };

  const openSearch = () => {
    setSearch(true);
    values.email = "";
    values.name = "";
    addIcon.current.style.display = "none";
  };

  const closeSearch = () => {
    setSearch(false);
    addIcon.current.style.display = "block";
  };

  const startSearch = () => {
    if (values.name.trim().length != 0) {
      props.queryItem("name", values.name.trim());
    } else {
      props.queryItem("email", values.email.trim());
    }
    setSearch(false);
    addIcon.current.style.display = "block";
  };

  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>

        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="navbar">
          <FontAwesome name="bars"/>
        </div>
        <div className="content">
          <div className="search">
            <FontAwesome onClick={openSearch} name="search" className="search-icon"/>
            <input onBlur="" className="search-input" type="text"/>
            <span className="add-wrap" ref={addIcon}>
            <FontAwesome onClick={handleOpen} name="bars" className="add-icon"/>
          </span>
          </div>
          <div className="list-wrap">
            <List>
              {props.defaultList.map((value, index) => (
                <ListItem key={index} button>
                  <ListItemText primary={value.name}/>
                  <ListItemText primary={value.email}/>
                  <ListItemText primary={value.school}/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <FontAwesome name="bars" className="add-icon" onClick={handleClickOpen} data-index={index}
                                   data-arr={JSON.stringify(value)}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon onClick={deleteItem} data-index={index}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={closeModel}
          >
            <div style={modalStyle} className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <Box>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={values.school}
                    onChange={handleChange("school")}
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box onClick={closeModel}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Primary
                  </Button>
                </Box>
              </form>
            </div>
          </Modal>
          <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                value={values.name}
                margin="dense"
                id="name"
                label="nameEdit"
                type="text"
                onChange={handleChange("name")}
                fullWidth
              />
              <TextField
                autoFocus
                value={values.email}
                onChange={handleChange("email")}
                margin="dense"
                id="email"
                label="emailEdit"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                onChange={handleChange("school")}
                value={values.school}
                margin="dense"
                id="name"
                label="schoolEdit"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={chkEdit} color="primary">
                confirm editing
              </Button>
              <Button onClick={handleCloseForm} color="primary">
                cancel editing
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={dialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                confirm again if edit or not
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogChk} color="primary">
                confirm
              </Button>
              <Button onClick={handleDialogClose} color="primary" autoFocus>
                cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={search}
            onClose={closeSearch}
          >
            <div style={modalStyle} className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="standard-name"
                  label="Name"
                  className={classes.textField}
                  value={values.name}
                  onChange={handleChange("name")}
                  margin="normal"
                  autoFocus
                />
                <TextField
                  id="standard-uncontrolled"
                  label="Uncontrolled"
                  defaultValue="foo"
                  value={values.email}
                  className={classes.textField}
                  onChange={handleChange("email")}
                  margin="normal"
                />
                <Box>
                  <Button onClick={startSearch} color="primary">
                    search
                  </Button>
                </Box>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

class TeacherLists extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultList: [
        {
          name: 1,
          email: 2,
          school: 3
        },
        {
          name: "aaa",
          email: "bb",
          school: 3333
        }, {
          name: 111,
          email: 2,
          school: 3
        }
      ],
      allList: []
    };
  }

  componentWillMount() {
    this.setState((state) => ({
      allList: [...state.defaultList]
    }));
  }

  editItem = (key, value) => {
    let index = this.state.defaultList.findIndex(item => item.name === key);
    let newArr = [...this.state.defaultList];
    newArr[index] = value;
    this.setState({
      defaultList: newArr
    });
  };

  queryItem = (key, value) => {
    let list = [...this.state.defaultList];
    let newArr = [];
    for (var i = 0; i < list.length; i++) {
      if (("" + list[i][key]).indexOf(value) != -1) {
        newArr.push(list[i]);
      }
    }
    this.setState({
      defaultList: newArr,
      allList: list
    });
  };

  deleteItem = (index) => {
    let arr = [...this.state.defaultList];
    arr.splice(index, 1);
    this.setState({
      defaultList: arr
    });
  };

  addItem = (value) => {
    this.setState((state) => ({
      defaultList: [...this.state.defaultList, value]
    }));
  };

  render() {
    let { defaultList, allList } = this.state;
    return (

      <SimpleModal
        allList={allList}
        editItem={this.editItem}
        defaultList={defaultList}
        deleteItem={this.deleteItem}
        addItem={this.addItem}
        queryItem={this.queryItem}
      />

    );
  }
}

TeacherLists.propTypes = {
  classes: PropTypes.object.isRequired
};

TeacherLists.contextType = FirebaseContext;
export default TeacherLists;


