import React, { useState } from 'react'

const Carousel = ({ courses }) => {

    const [slideIndex, setSlideIndex] = useState(1)

    // Next controls
    function plusSlides(n) {
        if(slideIndex > courses.length-1) {
            setSlideIndex(1);
        }
        else {
            setSlideIndex(slideIndex + n);
        }
        // showSlides(slideIndex += n);
        console.log("slideIndex = ", slideIndex, "courses.len = ", courses.length);
    }
    //Prev controls
    function minuxSlides(n) {
        if(slideIndex < 2) {
            setSlideIndex(courses.length);
        }
        else {
            setSlideIndex(slideIndex - n);
        }
    }

    // Thumbnail image controls
    function currentSlide(n) {
        setSlideIndex(n);
        // showSlides(slideIndex = n);
    }

    return (
        <div style={{ boxSizing: "border-box" }}>
            {/* <!-- Slideshow container --> */}
            <div className="slideshow-container">

            {/* <!-- Full-width images with number and caption text --> */}

            {
                courses.map(course => {
                    return(
                        <div className="mySlides fade" key={course.id} style={ course.id === slideIndex? { display: "block" }: { display: "none" } } >
                            <div className="numbertext">{course.id} / {courses.length}</div>
                            <img src={ course.thumbPath } style={{ width: "100%" }} />
                            <div className="text">{course.title}<br /><span style={{ fontSize: "25px" }}>By {course.teacher}</span></div>
                        </div>
                    )
                })
            }

            {/* <!-- Next and previous buttons --> */}
            <a className="prev" onClick={() => minuxSlides(1)}>&#10094;</a>
            <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <br />

            <div style={{ textAlign: "center" }}>
                {
                    courses.map(course => (
                        <span key={course.id} className={course.id === slideIndex? "dot active": "dot"} onClick={() => currentSlide(course.id)}></span>
                    ))
                }
            </div>

            {/* <!-- The dots/circles --> */}
            {/* <div style={{ textAlign: "center" }}>
            <span className="dot" onClick={() => currentSlide(1)}></span>
            <span className="dot" onClick={() => currentSlide(2)}></span>
            <span className="dot" onClick={() => currentSlide(3)}></span>
            </div>  */}
        </div>
    )
}

export default Carousel