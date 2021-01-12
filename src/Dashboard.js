import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip"
import { Button, TextField } from "@material-ui/core";
import {CTX} from "./Store"
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems:"center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatsWindow: {
    width: "70%",
    height: "300px",
    padding:"20px"
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const {allChats,sendChatAction,user}=React.useContext(CTX);

  const topics=Object.keys(allChats);

const [activeTopic,changeActiveTopic]=React.useState(topics[0]);

const [textValue,changeTextValue]=React.useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h3">
          this is a sheet of paper
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => (
                <ListItem onClick={e=>changeActiveTopic(e.target.innerText)} key={topic} button>
                  <ListItemText primary={topic}></ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatsWindow}>
          {allChats[activeTopic].map((chat,index) => (
               <div className={classes.flex} key={index}>
                   <Chip label={chat.from}className={classes.chip}>
                       adadadada
                     
                   </Chip>
                   <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
               </div>
              ))}
          </div>
        </div>
        <div className={classes.flex}>
            <TextField
          
            label="Send a chat"
            className={classes.chatBox}
            vale={textValue}
            onChange={(e)=>changeTextValue(e.target.value)}
            />

           
            <Button onClick={()=>{
                
                
                sendChatAction({from:user,msg:textValue,topic:activeTopic})
                changeTextValue("")}} variant="contained" color="primary">
                Send
            </Button>
        </div>
      </Paper>
    </div>
  );
}
