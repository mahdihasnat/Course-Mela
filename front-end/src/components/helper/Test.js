import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  fileAuthorizedHeader,
  getHeader,
  jsonAuthorizedHeader,
} from "../../shared/Header";

import ReactPlayer from "react-player";

import Image, { Button, Card, Container } from "@mui/material";
import ImageService from "../../services/content/ImageService";
import { MuiTextField } from "./TextFieldTest";
import joinUrl from "../../utils/url";
import { AUTH_URL, baseUrl, VIDEO_ULR } from "../../shared/urls";
import { LOG_CAUGHT_ERR, LOG_RESPONSE } from "../../shared/utils";

const Test = () => {
  const [image, setImage] = useState("");

  const getFile = (url) => {
    ImageService.loadImage(url)
      .then((response) => {
        const srcurl = window.URL.createObjectURL(new Blob([response.data]));
        setImage(srcurl);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getFile("http://localhost:8080/fileserver/image/?fileId=24");
  }, []);

  // const handleClick = () => {
  //     axios.post(joinUrl(AUTH_URL, "test"), {}, {
  //             params: {
  //                 "name": "hello",
  //                 "id": 123
  //             }
  //         }
  //     ).then(LOG_RESPONSE).catch(LOG_CAUGHT_ERR)
  // }

  // const handleClick = () => {
  //     const formData = new FormData();
  //     formData.set("name", "hello");
  //     formData.set("id", 123);
  //     axios.post(joinUrl(AUTH_URL, "test"), formData, {
  //             // params: {
  //             //     "name": "hello",
  //             //     "id": 123
  //             // },
  //             headers:jsonAuthorizedHeader()
  //         }
  //     ).then(LOG_RESPONSE).catch(LOG_CAUGHT_ERR)
  // }

  // const handleClick = () => {
  //     const formData = new FormData();
  //     formData.set('videoId', "16");
  //     formData.set('videoUrl', "google.com")
  //     axios.post(joinUrl(VIDEO_ULR, "updateVideoUrl"), formData, {

  //         headers: jsonAuthorizedHeader()
  //     }).then(LOG_RESPONSE).catch(LOG_CAUGHT_ERR)
  // }

  const handleClick = () => {
    const formData = new FormData();
    formData.set("courses", []);
    console.log({ formData: formData });
    axios
      .post(joinUrl(baseUrl, "subscribe/abc"), formData, {
        headers: jsonAuthorizedHeader(),
      })
      .then(LOG_RESPONSE)
      .catch(LOG_CAUGHT_ERR);
  };

  return (
    <div>
      {/*<img  src="http://localhost:8080/fileserver/14" />*/}

      {/*<img width={100} src={image} />*/}

      {/*<Container>*/}
      {/*    <div>*/}
      {/*        <Card className="col-6 offset-3">*/}
      {/*            <img src={image} />*/}
      {/*        </Card>*/}
      {/*    </div>*/}

      {/*    <ReactPlayer*/}
      {/*     controls */}
      {/*     width='480px' */}
      {/*    //  url='https://www.youtube.com/watch?v=y8bRLf3SFBI&list=RDy8bRLf3SFBI&start_radio=1&ab_channel=AdityaMusic' \*/}
      {/*    url = 'http://localhost:8080/fileserver/video'*/}
      {/*     onReady={()=> console.log('video is ready')}*/}
      {/*     onEnded={()=> console.log('video has ended')}*/}
      {/*     >*/}

      {/*    </ReactPlayer>*/}
      {/*</Container>*/}

      {/*<MuiTextField></MuiTextField>*/}

      <Button onClick={handleClick}>Click me </Button>
    </div>
  );
};

export default Test;
