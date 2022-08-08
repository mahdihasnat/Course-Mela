import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {getHeader} from "../../shared/Header";

import Image, {Card, Container, Row} from "reactstrap"
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
        },[]
    );


    return (<div>
            {/*<img  src="http://localhost:8080/fileserver/14" />*/}

            {/*<img width={100} src={image} />*/}

            <Container>
                <Row>
                    <Card className="col-6 offset-3">
                        <img  src={image}/>
                    </Card>
                </Row>
            </Container>


        </div>
    )
}

export default Test;