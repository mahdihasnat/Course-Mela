import React, {useState, useEffect} from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link, useNavigate} from 'react-router-dom';
import ImageService from "../../../services/content/ImageService";
import {
    Avatar,
    Button, ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container, Grid,
    IconButton,
    Rating,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import {AttachMoney} from "@mui/icons-material";


function CourseCard({id, title, teacher, rating, price, discount, thumbPath}) {
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
        <Container sx={{maxWidth: 300}} onClick={()=>navigate(`/courses/${id}`)}>
            <Card>

                <CardMedia
                    component='img'
                    height='150'
                    // image='https://source.unsplash.com/random'
                    alt='unsplash image'
                    image={thumbPath}
                />

                {/*<CardHeader*/}
                {/*    avatar={*/}
                {/*        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">*/}
                {/*            R*/}
                {/*        </Avatar>*/}
                {/*    }*/}
                {/*    */}
                {/*    title="Shrimp and Chorizo Paella"*/}
                {/*    subheader="September 14, 2016"*/}
                {/*/>*/}
                <CardContent>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    This impressive paella is a perfect party dish and a fun meal to cook*/}
                    {/*    together with your guests. Add 1 cup of frozen peas along with the mussels,*/}
                    {/*    if you like.*/}
                    {/*</Typography>*/}
                    <Typography variant="button" display="block" gutterBottom>{title}</Typography>

                    <Typography variant="subtitle2" gutterBottom>{teacher}</Typography>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={.1} value={rating} readOnly/>
                    <Stack>
                        <Grid container sx={{maxHeight: 20}}>
                            <Grid item>
                                <Button endIcon={<AttachMoney/>}>{price}</Button>
                            </Grid>
                            <Grid>
                                <Button>
                                    {discount}%
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>

                </CardContent>
            </Card>
        </Container>
    )

    // return (
    //   <div className='card-container' onClick={()=>navigate(`/courses/${id}`)}  >
    //     <div className='card-thumb'>
    //       <img src={image} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
    //     </div>
    //     <div className='card-details'>
    //       <span style={{ fontWeight: "bold" }}>{title}</span> <br />
    //       <span style={{ fontSize: "0.9rem" }}>{teacher}</span> <br />
    //       <span style={{ display: "flex", alignItems: "center", marginBottom: "-15px" }}><span style={{ paddingRight: "5px", fontSize: "0.9rem" }}>{rating}</span><ReactStars count={5} value={rating} size={15} isHalf={true} color="black" /></span> <br />
    //       {discount === 0 ? <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{price}</span>
    //         : <><strike><span style={{ fontSize: "0.9rem", paddingRight: "20px" }}>Tk.{price}</span></strike><span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{price * (100 - discount) / 100.0}</span><span style={{ fontSize: "0.8rem" }}> ({discount}% off)</span></>
    //       }
    //       {/* <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "2px 2px grey" }}>{ discount === 0? `Tk. ${price}` : <strike>Tk. {price}</strike> }</span> <br /> */}
    //     </div>
    //   </div>
    // )
}

export default CourseCard