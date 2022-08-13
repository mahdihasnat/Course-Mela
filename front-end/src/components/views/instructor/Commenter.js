import React from 'react'

function Commenter(props) {
  return (
    <div>
        <div className='commenter'>
            <img src={props.avatar} style={{ height: "12%", width: "11%", marginRight: "10px" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.name}</span> <br />
                <span className='commenter-comment'>{props.comment}</span>
            </div>            
        </div>
    </div>
  )
}

export default Commenter