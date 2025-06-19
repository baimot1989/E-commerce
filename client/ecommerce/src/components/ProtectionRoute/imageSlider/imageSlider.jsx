import { useState } from "react";
import { Box, Slide, IconButton, Container, Typography, useTheme } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Dots from "./dots";
import CarouselSlide from "./carouselSlide";
import myImage from '../../../assets/ChatGPT Image Jun 19, 2025, 12_11_50 PM.png'

const contents = [
    {
        imgSrc:
            "https://res.cloudinary.com/jerrick/image/upload/v1620732253/609a695d49932b001dce1ce5.jpg",
        title: "Online Shopping"
    },
    {
        imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBju5H8PjcKZpB-jtZBIF1_sjfEmmb5_ggA&s",
        title: "Fast and free shipment "
    },
    {
        imgSrc:
        myImage,
        title: "A variety of products"
    },

];

const ImageSlider = () => {

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState("left");
    const [index, setIndex] = useState(0);
    const content = contents[index];
    const numSlides = contents.length;

    const handleArrowClick = (direction) => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        const opposite = direction === "left" ? "right" : "left";

        setSlideDirection(direction);
        setSlideIn(false);
        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(opposite);
            setSlideIn(true);
        }, 400);
    };

    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}
            >
                {/* Left Arrow */}
                <IconButton
                    onClick={() => handleArrowClick("left")}
                    sx={{
                        position: "absolute",
                        left: 0,
                        zIndex: 2,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" }
                    }}
                >
                    <ArrowBackIos />
                </IconButton>

                {/* Slide */}
                <Slide in={slideIn} direction={slideDirection} timeout={400}>
                    <Box sx={{ width: "100%", mx: 3 }}>
                        <CarouselSlide content={content} />
                    </Box>
                </Slide>

                {/* Right Arrow */}
                <IconButton
                    onClick={() => handleArrowClick("right")}
                    sx={{
                        position: "absolute",
                        right: 0,
                        zIndex: 2,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" }
                    }}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>

            {/* Dots */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Dots content={contents} index={index} />
            </Box>
        </Container>
    );

}

export default ImageSlider;

