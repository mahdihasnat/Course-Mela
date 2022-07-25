import React from 'react'
import {Container} from "reactstrap";

function Footer() {
    return (
            <section className="footer">
                <span><i className="fa fa-copyright"></i> Copyright {new Date().getFullYear()} | CourseMela</span>
                <div>
                    <ul className="social-media">
                        <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube-play"></i></a></li>
                    </ul>
                </div>
            </section>
    )
}

export default Footer