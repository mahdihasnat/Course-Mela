import {Box, Card, CardContent, CardMedia, Container} from "@mui/material";
import React from "react";

const CourseBasicDescription = ({
                                    id,
                                    coverPhotoPath,
                                    name,
                                    description,
                                    topic,
                                    subject,
                                }) => {
    return (
        <Container>
            <Box margin={2}>
                <Card>
                    <CardMedia
                        alt={`cover photo for id ${id}`}
                        // src={coverPhoto}
                        component={"img"}
                        image={coverPhotoPath}
                        height={"400px"}
                    />
                    <CardContent>
                        <CardContent
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {name}
                            </CardContent>
                            <CardContent sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                                {description}
                            </CardContent>
                        </CardContent>
                        <CardContent
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardContent
                                sx={{
                                    backgroundColor: "black",
                                    padding: 2,
                                    borderRadius: 5,
                                    color: "white",
                                }}
                            >
                                Topic: {topic.name}
                            </CardContent>
                            <CardContent
                                sx={{
                                    backgroundColor: "black",
                                    padding: 2,
                                    borderRadius: 5,
                                    color: "white",
                                }}
                            >
                                Subject: {topic.subject.name}
                            </CardContent>
                        </CardContent>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default CourseBasicDescription;