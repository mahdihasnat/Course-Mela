
const createImageLinkFromByte = (data)=>{
    return window.URL.createObjectURL(new Blob[data]);
}


export default createImageLinkFromByte;