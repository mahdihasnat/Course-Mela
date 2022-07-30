import React, { useState, useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useNavigate } from 'react-router-dom';
import ImageService from "../../../services/content/ImageService";


function CourseCard({ id, title, teacher, rating, price, discount, thumbPath }) {
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const getFile = (url) => {
    ImageService.loadImage(url).then(response => {
      const srcurl = window.URL.createObjectURL(new Blob([response.data]));
      setImage(srcurl);
    }).catch(err => {
      console.log(err.message)
    }
    )
  }

  useEffect(() => {
    getFile(thumbPath);
  }, []);


  return (
    <div className='card-container' onClick={()=>navigate(`/courses/${id}`)}  >
      <div className='card-thumb'>
        <img src={image} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
      </div>
      <div className='card-details'>
        <span style={{ fontWeight: "bold" }}>{title}</span> <br />
        <span style={{ fontSize: "0.9rem" }}>{teacher}</span> <br />
        <span style={{ display: "flex", alignItems: "center", marginBottom: "-15px" }}><span style={{ paddingRight: "5px", fontSize: "0.9rem" }}>{rating}</span><ReactStars count={5} value={rating} size={15} isHalf={true} color="black" /></span> <br />
        {discount === 0 ? <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{price}</span>
          : <><strike><span style={{ fontSize: "0.9rem", paddingRight: "20px" }}>Tk.{price}</span></strike><span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{price * (100 - discount) / 100.0}</span><span style={{ fontSize: "0.8rem" }}> ({discount}% off)</span></>
        }
        {/* <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "2px 2px grey" }}>{ discount === 0? `Tk. ${price}` : <strike>Tk. {price}</strike> }</span> <br /> */}
      </div>
    </div>
  )
}

export default CourseCard