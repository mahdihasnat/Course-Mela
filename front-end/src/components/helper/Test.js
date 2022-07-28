import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {getHeader} from "../../shared/Header";


const Test = () => {

    const [image, setImage] = useState();



    const getFile = () => {
        axios({
                method: "GET",
                url: "http://localhost:8080/fileserver/14",
                // params: {
                //     fileId: 14
                // }
                // ,
                headers: getHeader(),
                // responseType: 'blob'
            }
        ).then(response => {
            const data = response.data;

            // console.log(data)
            // cons
            // setImage(data);
            return data;

        }).catch(err => {
                console.log(err.message)
            }
        )
        return null;
    }

    useEffect(
        () => {
            getFile();
        },[]
    );


    return (<div>
            <img  src="http://localhost:8080/fileserver/14" />

            {/*<img src={getFile()} />*/}
        </div>
    )
}

export default Test;