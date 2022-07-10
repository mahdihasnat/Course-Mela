const joinUrl = (...urls) => {
    // console.log(urls);
    return urls.join('/'); 
    //what they do ?  .replace(/\/\//g, '/');
    }
export default joinUrl;