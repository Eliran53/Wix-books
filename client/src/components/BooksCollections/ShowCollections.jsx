import React, { useContext } from "react";
import UserContext from "../../Context";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  TextField,
  makeStyles,
  Avatar,
  ListItemAvatar,
  ListItem,
  Grid,
  IconButton,
  Typography,
  ListItemText,
} from "@material-ui/core";
import ImportContactsTwoToneIcon from "@material-ui/icons/ImportContactsTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    float: "left",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  delete: {
    float: "left",
  },
  Button: {
    display: "inline-block",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function ShowCollections() {
  const list = useContext(UserContext).collectionsData;
  const [bookName, setBookName] = useState("");
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [collectionName, setCollectionsName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteBook = () => {
    try {
      const index = list.indexOf(collectionName);
      const i = list[index].books.indexOf(bookName);
      list[index].books[i].splice(i, 1);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = () => {
    try {
      const index = list.indexOf(collectionName);
      list.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  };
  const onInputChange = (e) => {
    setCollectionsName(e.target.value);
    list[collectionIndex].name = collectionName;
  };
  useEffect(() => {}, []);
  return (
    <div>
      <br></br>
      {list.length !== 0
        ? list.map((collection, i) => {
            return (
              <div className={classes.root}>
                <Grid item xs={12} md={6}>
                  <Button
                    className="Button"
                    aria-describedby={id}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    {collection.name}
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => {
                      handleClose();
                      setCollectionIndex(i);
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <TextField
                      onChange={onInputChange}
                      className={classes.typography}
                    ></TextField>
                  </Popover>
                  <IconButton
                    className={classes.root}
                    edge="start"
                    aria-label="delete"
                    onClick={() => (
                      setCollectionsName(collection.name), deleteCollection()
                    )}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {collection.books.map((book, index) => {
                    return (
                      <div className={classes.demo}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ImportContactsTwoToneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText />
                          {book}
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              setCollectionsName(collection.name);
                              setBookName(book.title);
                              deleteBook();
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      </div>
                    );
                  })}
                </Grid>
              </div>
            );
          })
        : "no collections found"}
    </div>
  );
}
export default ShowCollections;
