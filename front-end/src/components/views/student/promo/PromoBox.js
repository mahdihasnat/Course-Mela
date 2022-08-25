import {Box, Container, Grid, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import PromoService from "../../../../services/promo/PromoService";
import Typography from "@mui/material/Typography";
import {TakaSign} from '../../../helper/CustomIcons';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

const PromoCard = ({id, code, promoType, value, minimumPrice, maximumDiscount, maximumAttempt}) => {
    return (<Container>
        <Grid container={true} border={1} borderRadius={5} marginTop={3}>
            <Grid item={true} xs={12} md={7}>
                <Box sx={{
                    display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
                }}>
                    <Stack>
                        {/*<Typography variant={"body1"} align={"center"} gutterBottom>use code</Typography>*/}
                        <Box sx={{color: "primary.main", fontWeight: "bold"}}>
                            <Typography variant={'h3'} align={'center'}>{code}</Typography>
                        </Box>
                        <Box paddingTop={3}>

                            {promoType === "PERCENTAGE" && (<Typography variant={"h6"} align={"center"} gutterBottom>
                                {value}% off on purchase above {minimumPrice}<TakaSign/>
                            </Typography>)}
                            {promoType === 'FIXED' && (<Typography variant={"h6"} align={"center"} gutterBottom>
                                {value} <TakaSign/> off on purchase above {minimumPrice}<TakaSign/>
                            </Typography>)}
                        </Box>
                    </Stack>
                </Box>
            </Grid>
            <Grid item={true} xs={12} md={5}>

                {<Container sx={{margin:3}}>
                    <Table>
                        {/*<TableHead>Terms and condition</TableHead>*/}
                        <TableBody>
                            <TableRow>
                                <TableCell>Minimum buy</TableCell>
                                <TableCell>{minimumPrice}<TakaSign/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Maximum off</TableCell>
                                <TableCell>{maximumDiscount}<TakaSign/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Attempt remaining</TableCell>
                                <TableCell>{maximumAttempt}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>}


            </Grid>
        </Grid>
    </Container>)
}

const PromoBox = () => {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        PromoService.getGeneralizedPromos().then(res => {
            console.log({"promos": res.data});
            setPromos(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (<Container>
        {promos.map(promo => (<PromoCard key={promo.id} {...promo}/>))}
    </Container>)
}


export default PromoBox;