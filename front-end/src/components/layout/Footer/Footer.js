import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Stack} from "@mui/material";
import Paper from '@mui/material/Paper';
import {Facebook, Instagram, Twitter, YouTube} from "@mui/icons-material";
import { styled } from '@mui/material/styles';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Footer(props) {
    const {description, title} = props;

    return (
        <Box component="footer" sx={{backgroundColor: 'secondary.light', py: 6}}>
            <Container maxWidth="lg">
                <Stack direction={"row"} justifyContent="space-between" alignItems="center" spacing={4} width={'100%'}>
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

                    <Stack direction={'row'}  >
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
