import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useStateValue } from "../../statemanagement";
import { useListStyles as useStyles } from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import LocalStorage from "../../Utils/localStorage";

function NoteBooks() {
  const classes = useStyles();
  const [activeNote, setActiveNote] = useState("all");
  const [, dispatch] = useStateValue();

  /**
   * display a list of notes of a notebook and dispatch it into Context
   **/
  function showNotesOf(Notebook) {
    let Personal = LocalStorage.getNotebooks("Personal");
    let College = LocalStorage.getNotebooks("College");
    let Home = LocalStorage.getNotebooks("Home");
    let Notes = LocalStorage.getNotebooks("notes");
    setActiveNote(Notebook);
    if (Notebook === "all") {
      let All;
      Personal = Personal !== null ? JSON.parse(Personal) : [];
      College = College !== null ? JSON.parse(College) : [];
      Home = Home !== null ? JSON.parse(Home) : [];
      Notes = Notes !== null ? JSON.parse(Notes) : [];
      All = [...Personal, ...College, ...Home, ...Notes];
      if (All.length > 0) {
        dispatch({ type: "newNote", notes: All });
      }
    } else {
      let Notes;
      if (Notebook === "Personal") {
        Notes = Personal;
      }
      if (Notebook === "College") {
        Notes = College;
      }
      if (Notebook === "Home") {
        Notes = Home;
      }

      Notes = Notes !== null ? JSON.parse(Notes) : [];
      dispatch({ type: "newNote", notes: Notes });
    }
  }

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Note Books
      </Typography>

      <div className={classes.noteBooksContainer}>
        <div className={classes.demo}>
          <List dense={false}>
            <ListItem
              className={[
                classes.noteBookList,
                activeNote === "all" && classes.active
              ].join(" ")}
              onClick={() => showNotesOf("all")}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="All" />
            </ListItem>

            <ListItem
              className={[
                classes.noteBookList,
                activeNote === "Personal" && classes.active
              ].join(" ")}
              onClick={() => showNotesOf("Personal")}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Personal" />
            </ListItem>

            <ListItem
              className={[
                classes.noteBookList,
                activeNote === "College" && classes.active
              ].join(" ")}
              onClick={() => showNotesOf("College")}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="College" />
            </ListItem>

            <ListItem
              className={[
                classes.noteBookList,
                activeNote === "Home" && classes.active
              ].join(" ")}
              onClick={() => showNotesOf("Home")}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NoteBooks;
