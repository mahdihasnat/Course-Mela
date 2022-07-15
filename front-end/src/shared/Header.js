
export const getHeader =  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        
};