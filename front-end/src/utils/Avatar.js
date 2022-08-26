import {createAvatar} from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { Container} from "@mui/material";
import React from "react";

export const getAvatar = (name) => {
    return createAvatar(style, {
        dataUri: true,
        seed: name,
        size: 128,
        radius: 25,
    });
};

const Avaatar = ({name}) => {
    return (

        <Container>
                <img src={getAvatar(name)} alt={name} style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                    height: "100%",
                }}/>
        </Container>

    );
};

// export getAvatar;
export default Avaatar;
