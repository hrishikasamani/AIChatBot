import { Box } from "@mui/material";
import React from "react";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/footer/Footer";

const Home = () => {
    return(
        <Box width={'100%'} height={'100%'}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    mx: "auto",
                    mt: 3,
                }}
            >
                <Box>
                    <TypingAnimation/>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        gap: 5,
                        my: 10,
                    }}
                >
                    <img src="robot.png" alt="robot" style={{width:"200px", margin:"auto"}}/>
                    <img className="image-inverted rotate" src="openai.png" alt="robot" style={{width:"200px", margin:"auto"}}/>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        mx: "auto",
                    }}
                >
                    <img src="chatbot.png" alt="chatbot" style={{display: "flex", width:"60%", margin:"auto", borderRadius: 20, boxShadow: "-5px -5px 105px #64f3d5", marginTop: 20, marginBottom: 60}}/>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
};

export default Home;