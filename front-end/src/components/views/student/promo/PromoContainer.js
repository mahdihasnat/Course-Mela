import {Box, Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import PromoBox from "./PromoBox";

const PromoImage = () => {
    return (
        <Container >
            <Typography variant={"h3"} align={"center"}>Only For You</Typography>
            <Box marginTop={10}>
                <img width={"100%"} height={"100%"} src={require("../../../../assets/promoGift.png")} alt="promo" />
            </Box>
        </Container>
    )
}




const PromoContainer = () => {
    return (
        <Container>
            <Grid container marginTop={5}>
                <Grid item xs={12} md={4}>
                    <PromoImage/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <PromoBox/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PromoContainer;