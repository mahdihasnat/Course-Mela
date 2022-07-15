import React, { useState } from 'react'

const courseTopics = [
    // {
    //     id: 1,
    //     title: "Limit-1",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 2,
    //     title: "Statics",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 3,
    //     title: "Vectors-3",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 4,
    //     title: "Probability",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 5,
    //     title: "Vectors-3",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 6,
    //     title: "Probability",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 7,
    //     title: "Vectors-3",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 8,
    //     title: "Probability",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
]

const nCols = 7;
const nColsHalved = Math.floor(nCols/2);

function EditCourse() {

  const [selectedImg, setSelectedImg] = useState(null);
  
  const handleImgUpload = e => {
    if(e.target.files.length !== 0) {
        setSelectedImg(e.target.files[0]);
    }
  }

  return (
    <div className='container'>
        <div style={ styles.gridWrap }>
            <ul style={ styles.gridWrap_ul }>
                {
                    courseTopics.map(courseTopic => {
                        // setCurrentGridCol(currentGridCol+2);
                        return(
                            <li key={courseTopic.id} style={{ backgroundColor: "red", gridColumnStart: 2*(courseTopic.id%nColsHalved? courseTopic.id%nColsHalved : nColsHalved)-1, gridColumnEnd: 2*(courseTopic.id%nColsHalved? courseTopic.id%nColsHalved : nColsHalved)+1 }}>
                                <div className='card-container'>
                                    <div className='card-thumb'>
                                        <img src={ courseTopic.thumbPath } style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                                    </div>

                                </div>    
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div style={{ display: "flex" }}>
            <form>
                <div>
                    <label htmlFor='upload-courseimg' className='' style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ marginTop: "20px" }}>
                            { !selectedImg? <>No file chosen</> : 
                                <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedImg)} /> 
                            }
                        </span>
                        <span className='upload-courseimg-label'>
                            <span><i className="fa fa-camera" style={{ color: "white", fontSize: "15px", marginRight: "10px" }}></i>Upload CourseThumb</span> 
                        </span>
                        <input id='upload-courseimg' type='file' onChange={handleImgUpload} accept="image/png, image/jpg, image/jpeg, image/bmp" />
                    </label>
                </div>
            </form>
        </div>
    </div>
  )
}

const styles = {
    gridWrap: {
        width: "100%",
        margin: "auto"
    },
    gridWrap_ul: {
        display: "grid",
        gridTemplateColumns: "auto ".repeat(nCols-1),
        gridColumnGap: "10vw",
        gridRowGap: "10vh",
        listStyle: "none",
        paddingLeft: "none"
    },
}

export default EditCourse