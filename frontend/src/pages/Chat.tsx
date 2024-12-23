import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";

const chatMessages = [
    {
        role: "user",
        content: "Hello, can you tell me the weather forecast for tomorrow",
    },
    {
        role: "assistant",
        content: "Sure! I can help with that. Please provide me with your current location.",
    },
    {
        role: "user",
        content: "I am in New York City",
    },
    {
        role: "assistant",
        content: "Great! Give me a minute to fetch the weather information for New York City.",
    },
    {
        role: "assistant",
        content: "The weather forecast for New York City tomorrow is: Sunny with a high of 70F and a low od 30F.",
    },
    {
        role: "user",
        content: "That sounds perfect! Thank you for that information",
    },
    {
        role: "assistant",
        content: "You're welcome! Let me know if you have any more questions.",
    },
]

const Chat = () => {
    const auth = useAuth();
    return (
        <Box
            sx={{
                display:'flex',
                flex: 1,
                width: "100%",
                height: "100%",
                mt: 3,
                gap: 3,
            }}
        >
            <Box sx={{display: {md: "flex", xs: "none", sm: "none"}, flex: 0.2, flexDirection: "column"}}>
                <Box sx={{
                    display: "flex",
                    width: "100%", 
                    height: "60vh", 
                    bgcolor: "rgb(17,29,39)", 
                    borderRadius: 5,
                    flexDirection: "column",
                    mx: 3}}>

                    <Avatar
                        sx={{
                            mx: "auto", 
                            my: 2,
                            bgcolor: "white",
                            color: "black",
                            fontWeight: 700,
                        }}>
                    {auth?.user?.name[0]}
                    {auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{
                        mx: "auto",
                        fontFamily: "work sans"
                    }}>
                        You are talking to a ChatBOT
                    </Typography>
                    <Typography sx={{
                        mx: "auto",
                        fontFamily: "work sans",
                        my: 4,
                        p: 3,
                    }}>
                        You can ask me questions on Programming, General Knowledge, Business Advice, Entertainement, Education, etc. But avoid sharing any personal information!
                    </Typography>
                    <Button sx={{
                        width: "200px",
                        my: "auto",
                        color: "white",
                        fontWeight: "700",
                        borderRadius: 3,
                        mx: "auto",
                        bgcolor: red[300],
                        ":hover" : {
                            bgcolor: red.A400,
                        }
                    }}>
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: {md: 0.8, xs: 1, sm: 1}, flexDirection: "column", px: 3 }}>
                <Typography
                    sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600" }}
                >Model - GPT 3.5 Turbo
                </Typography>
                <Box 
                    sx={{
                        width: "100%", 
                        height: "60vh", 
                        borderRadius: 3, 
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth"}}>
                    {chatMessages.map((chat, index) =>
                    <ChatItem content={chat.content} role={chat.role} key={index}/>
                        // <div>
                        //     {chat.content}
                        // </div>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;