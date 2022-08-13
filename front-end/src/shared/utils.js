
export const LOG_CAUGHT_ERR = (err)=>{
    console.log({err : err.message})
}


export const LOG_RESPONSE = (response)=>{
    console.log({response: response})
}

export const DO_NOTHING = ()=>{}