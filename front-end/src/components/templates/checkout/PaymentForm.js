import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useSelectedCourseContext} from "../../../store/contexts/SelectedCourseContext";
import {addPaymentAccountNo} from "../../../store/database/course/CourseActions";

export default function PaymentForm() {

    const [{paymentAccountNo, paymentType}, dispatch] =
        useSelectedCourseContext();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                {/*/// TODO  Choose between bkash and rocket*/}
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="mobileNo"
                        label="Mobile No"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        onChange={(e) =>
                            dispatch(addPaymentAccountNo(e.target.value))
                        }
                        />
                < /Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="pin"
                        label="PIN"
                        fullWidth
                        type={'password'}
                        autoComplete="cc-number"
                        variant="standard"

                    />
                </Grid>
                {/*<Grid item xs={12} md={6}>*/}
                {/*  <TextField*/}
                {/*    required*/}
                {/*    id="expDate"*/}
                {/*    label="Expiry date"*/}
                {/*    fullWidth*/}
                {/*    autoComplete="cc-exp"*/}
                {/*    variant="standard"*/}
                {/*  />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={6}>*/}
                {/*  <TextField*/}
                {/*    required*/}
                {/*    id="cvv"*/}
                {/*    label="CVV"*/}
                {/*    helperText="Last three digits on signature strip"*/}
                {/*    fullWidth*/}
                {/*    autoComplete="cc-csc"*/}
                {/*    variant="standard"*/}
                {/*  />*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
);
}
