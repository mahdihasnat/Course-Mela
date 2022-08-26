import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelectedCourseContext } from "../../../store/contexts/SelectedCourseContext";
import {
  getPayableAmountForACourse,
  getTotalAmountForAllCourses,
  getTotalAmountWithPromo,
} from "../../../utils/coursePricing";
import { Box } from "@mui/material";
import { TakaSign } from "../../helper/CustomIcons";
import { useLoginContext } from "../../../store/contexts/LoginContext";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

export default function Review() {
  const [
    { cartCourses, selectedPromo, paymentType, paymentAccountNo },
    dispatch,
  ] = useSelectedCourseContext();

  const [{ userName }] = useLoginContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartCourses.map((course) => (
          <ListItem key={course.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={course.name} />
            <Typography variant="body2">
              {getPayableAmountForACourse(course)} <TakaSign />
            </Typography>
          </ListItem>
        ))}
        <Box
          sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)", px: 3 }}
          marginBottom={4}
        />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getTotalAmountWithPromo(cartCourses, selectedPromo)} <TakaSign />
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => ( */}
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{paymentType}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>User Name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{userName}</Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Account No</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{paymentAccountNo}</Typography>
              </Grid>
            </React.Fragment>
            {/* ))} */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
