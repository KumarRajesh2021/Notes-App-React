import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocalStorage from "../../Utils/localStorage";
import { useStateValue } from "../../statemanagement";
import { useStyles } from "./styles";
import CustomSnackbar from "./Snackbar";

function CreateNote() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    id: 0,
    category: "",
    notebook: "",
    message: "",
    title: ""
  });
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  /**
   * handle change inputs
   **/
  function handleChange(name, event) {
    setState({
      ...state,
      [name]: event.target.value,
      id: new Date().getTime()
    });
  }

  /**
   * Add notes inside of localStorage and context api
   **/
  function addToNotes() {
    //note book is not set, so set the Note in "Note" object
    if (state.notebook === "") {
      const allNodes = LocalStorage.getNotes();
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        setOpenSnackbar(false);
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.setNotes(JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
      } else {
        setOpenSnackbar(true);
      }
    } else {
      const allNodes = LocalStorage.getNotebooks(state.notebook);
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      //set the note inside note book
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        setOpenSnackbar(false);
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.set(state.notebook, JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
      } else {
        setOpenSnackbar(true);
      }
    }
  }

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  React.useEffect(() => {
    let All;
    let Personal = LocalStorage.getNotebooks("Personal");
    let College = LocalStorage.getNotebooks("College");
    let Home = LocalStorage.getNotebooks("Home");
    let Notes = LocalStorage.getNotebooks("notes");

    Personal = Personal !== null ? JSON.parse(Personal) : [];
    College = College !== null ? JSON.parse(College) : [];
    Home = Home !== null ? JSON.parse(Home) : [];
    Notes = Notes !== null ? JSON.parse(Notes) : [];
    All = [...Personal, ...College, ...Home, ...Notes];
    if (All.length > 0) {
      dispatch({ type: "newNote", notes: All });
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Add a new Note
      </Typography>

      <TextField
        id="outlined-textarea"
        label="Title"
        placeholder="Write your title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={e => handleChange("title", e)}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-category-native-simple">
          Category
        </InputLabel>
        <Select
          native
          value={state.category}
          onChange={e => handleChange("category", e)}
          labelWidth={labelWidth}
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple"
          }}
        >
          <option value="" />
          <option value={"Confidential "}>Confidential </option>
          <option value={"Work"}>Work</option>
          <option value={"General"}>General</option>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-notebook-native-simple">
          Note Book
        </InputLabel>
        <Select
          native
          value={state.notebook}
          onChange={e => handleChange("notebook", e)}
          labelWidth={labelWidth}
          inputProps={{
            name: "notebook",
            id: "outlined-notebook-native-simple"
          }}
        >
          <option value="" />
          <option value={"Personal"}>Personal</option>
          <option value={"College"}>College</option>
          <option value={"Home"}>Home</option>
        </Select>
      </FormControl>

      <TextField
        id="outlined-textarea"
        label="Message"
        placeholder="note"
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => handleChange("message", e)}
        rows={10}
        fullWidth
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={addToNotes}
      >
        Add Note
      </Button>
      <CustomSnackbar
        open={openSnackbar}
        setClose={() => setOpenSnackbar(false)}
      />
    </React.Fragment>
  );
}

export default CreateNote;
