import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getHeader } from "../../shared/Header";

import ReactPlayer from 'react-player';

import Image, { Card, Container } from "@mui/material"
import ImageService from "../../services/content/ImageService";


const Test = () => {

    const [image, setImage] = useState('');



    const getFile = (url) => {
        ImageService.loadImage(url).then(response => {
            const srcurl = window.URL.createObjectURL(new Blob([response.data]));
            setImage(srcurl);

        }).catch(err => {
            console.log(err.message)
        }
        )
    }

    useEffect(
        () => {
            getFile("http://localhost:8080/fileserver/image/?fileId=24");
        }, []
    );


    return (<div>
        {/*<img  src="http://localhost:8080/fileserver/14" />*/}

        {/*<img width={100} src={image} />*/}

        <Container>
            <div>
                <Card className="col-6 offset-3">
                    <img src={image} />
                </Card>
            </div>

            <ReactPlayer
             controls 
             width='480px' 
            //  url='https://www.youtube.com/watch?v=y8bRLf3SFBI&list=RDy8bRLf3SFBI&start_radio=1&ab_channel=AdityaMusic' \
            url = 'http://localhost:8080/fileserver/video'
             onReady={()=> console.log('video is ready')}
             onEnded={()=> console.log('video has ended')}
             >

            </ReactPlayer>
        </Container>


    </div>
    )
}

export default Test;