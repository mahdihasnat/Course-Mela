
export const getHeader = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),

    }
};

export const jsonAuthorizedHeader = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
    };
}

export const fileAuthorizedHeader = () => {
    return {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
    };
}