import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Stack} from "@mui/material";
import {Facebook, Instagram, Twitter, YouTube} from "@mui/icons-material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CourseMela
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer(props) {
    const {description, title} = props;

    return (
        <Box component="footer" sx={{backgroundColor: 'secondary.light', py: 6}}>
            <Container maxWidth="lg">
                <Stack spacing={4} width={'25%'} direction={"row"}>
                    <Stack>
                        <Typography variant="h6" align="center" gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            component="p"
                        >
                            {description}
                        </Typography>

                    </Stack>

                    <Stack >
                        <Copyright/>
                    </Stack>

                    <Stack px={'70%'} direction={'row'}  >
                        <Facebook/>
                        <Instagram/>
                        <Twitter/>
                        <YouTube/>
                    </Stack>
                </Stack>

            </Container>
        </Box>
    );
}

Footer.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Footer;