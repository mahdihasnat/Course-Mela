const axios = require('axios');

// var token = '';
console.log('working on axios get')
axios({
    method: 'post',
    url: 'http://localhost:8080/authenticate/',
    data: {
        userName: 'jhon',
        password: '123'
    }
}).then(response => {
    const token = response.data.jwtToken;
    console.log('tehe token is: ' + token);

    test(token);
}).catch(error => {
    console.log(error.message);
});

function test(token) {

    axios(
        {
            method: 'get',
            url: 'http://localhost:8080/topic/',
            params : {
                name : 'test', 
                subjectId : 10
    
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error.message);
    });

}