import React from 'react'

const courseVideos = [
    {
        id: 1,
        title: "Limit-1",
        time: "07:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 2,
        title: "Statics",
        time: "05:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 3,
        title: "Vectors-3",
        time: "12:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 4,
        title: "Probability",
        time: "20:30",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 5,
        title: "Limit-1",
        time: "07:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    // {
    //     id: 6,
    //     title: "Statics",
    //     time: "05:00",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 7,
    //     title: "Vectors-3",
    //     time: "12:00",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 8,
    //     title: "Probability",
    //     time: "20:30",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
]

const nCols = 7;
const nColsHalved = Math.floor(nCols/2);

function CourseVideos() {
  return (
    <div style={ styles.gridWrap }>
        <ul style={ styles.gridWrap_ul }>
            {
                courseVideos.map(courseVideo => {
                    // setCurrentGridCol(currentGridCol+2);
                    return(
                        <li key={courseVideo.id} style={{ gridColumnStart: 2*(courseVideo.id%nColsHalved? courseVideo.id%nColsHalved : nColsHalved)-1, gridColumnEnd: 2*(courseVideo.id%nColsHalved? courseVideo.id%nColsHalved : nColsHalved)+1 }}>
                            <div className='course-topic-card-container'>
                                <div className='card-thumb'>
                                    <img src={ courseVideo.thumbPath } style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                                </div>
                                <div className='card-details' style={{backgroundColor: "rgb(255, 244, 118)"}}>
                                    <span style={{ fontWeight: "bold" }}>{ courseVideo.title }</span> <br />
                                    <span >{ courseVideo.time }</span> <br />
                                    {/* <span style={{ fontSize: "0.9rem" }}>{ teacher }</span> <br /> */}
                                    
                                </div>
                            </div>    
                        </li>
                    )
                })
            }
        </ul>
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
        gridRowGap: "5vh",
        listStyle: "none",
        paddingLeft: "none"
    },
}

export default CourseVideos;