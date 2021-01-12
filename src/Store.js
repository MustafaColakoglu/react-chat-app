import React from "react"
import io  from "socket.io-client"

export const CTX=React.createContext();

function reducer(state,action){

    const {from,msg,topic}=action.payload
    switch (action.type) {
        case "RECEIVE_MESSAGE":
            
            return{
                ...state,
                [topic]:[
                ...state[topic],
                { from,msg}
            ]
            }
    
        default:
            return state;
    }
}

const initState={
    general:[
        {from:"mustafa",msg:"hello"},
        {from:"ali",msg:"hello"},
        {from:"mustafa",msg:"how r u?"},
    ],
    topic2:[
        {from:"mustafa",msg:"test1"},
        {from:"ali",msg:"test2"},
        {from:"mustafa",msg:"test3?"},
    ]
}


let socket;
function sendChatAction(value) {
    socket.emit("chat message",value)
}
export default function Store(props){
  
    const [allChats,dispatch]=React.useReducer(reducer,initState)
    if(!socket){
       
        socket=io('http://127.0.0.1:3001')
        socket.on("chat message",function(msg){
            dispatch({type:"RECEIVE_MESSAGE",payload:msg})
        })
    }

const user="mustafa"+Math.random("100").toFixed(2)



    return(
        <CTX.Provider value={{allChats,sendChatAction,user}}>
                {props.children}
        </CTX.Provider>
    )
}