import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

type Message = {
    role: "user" | "assistant";
    content: string;
}

// const chatMessages = [
//     {
//         role: "user",
//         content: "Hello, can you tell me the weather forecast for tomorrow",
//     },
//     {
//         role: "assistant",
//         content: "Sure! I can help with that. Please provide me with your current location.",
//     },
//     {
//         role: "user",
//         content: "I am in New York City",
//     },
//     {
//         role: "assistant",
//         content: "Great! Give me a minute to fetch the weather information for New York City.",
//     },
//     {
//         role: "assistant",
//         content: "The weather forecast for New York City tomorrow is: Sunny with a high of 70F and a low od 30F.",
//     },
//     {
//         role: "user",
//         content: "That sounds perfect! Thank you for that information",
//     },
//     {
//         role: "assistant",
//         content: "You're welcome! Let me know if you have any more questions.",
//     },
// ]

const Chat = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const auth = useAuth();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage: Message = { role: "user", content };
        setChatMessages((prev) => [...prev, newMessage]);
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
        //
    };

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deletechats" });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted Chats Successfully", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Deleting Chats Failed!", { id: "deletechats" });
        }
    };

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", {id: "loadchats"});
            getUserChats()
                .then((data) => {
                    setChatMessages([...data.chats]);
                    toast.success("Successfully loaded chats", {id: "loadchats"});
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Loading Failed", {id: "loadchats"});
                });
        }
    }, [auth]);

    //@ts-ignore
    useEffect(() => {
        if(!auth?.user) {
            return navigate("/login");
        }
    }, [auth]);

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
                    <Button 
                        onClick={handleDeleteChats}
                            sx={{
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
                    //@ts-ignore
                    <ChatItem content={chat.content} role={chat.role} key={index}/>
                    )}
                </Box>
                <div 
                    style={{
                        width: "90%", 
                        padding: "10px", 
                        borderRadius: 8, 
                        backgroundColor: "rgb(17,27,39)",
                        display: "flex",
                        margin: "auto",
                    }}
                >
                    {" "}
                    <input
                        ref={inputRef}
                        type="text"
                        style={{
                            width: "100%", 
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "20px",
                        }}
                    />
                    <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white "}}><IoMdSend /></IconButton>
                </div>
                <Footer/>
            </Box>
        </Box>
    );
};

export default Chat;