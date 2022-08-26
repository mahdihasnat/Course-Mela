import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import PaymentService from "../../../services/payment/PaymentService";
import { useSelectedCourseContext } from "../../../store/contexts/SelectedCourseContext";
import { LOG_CAUGHT_ERR } from "../../../shared/utils";
import { getTotalAmountWithPromo } from "../../../utils/coursePricing";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// const steps = ['Shipping address', 'Payment details', 'Review your order'];
const steps = ["Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    // case 0:
    //   return <AddressForm />;
    case 0:
      return <PaymentForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [
    { cartCourses, selectedPromo, paymentAccountNo, paymentType },
    dispatch,
  ] = useSelectedCourseContext();

  const [orderComplete, setOrderComplete] = React.useState(false);

  const [orderFailed, setOrderFailed] = React.useState(true);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const gotoMyCourses = (e) => {
    e.preventDefault();
    navigate("/my-courses");
  };

  const handleOrderSubmit = () => {
    // alert("Order submitted");
    const total = getTotalAmountWithPromo(cartCourses, selectedPromo);
    PaymentService.buyCourses(
      cartCourses,
      selectedPromo,
      paymentAccountNo,
      paymentType,
      total
    )
      .then((res) => {
        console.log(res);
        setOrderComplete(true);
      })
      .catch((err) => {
        console.log(err);
        setOrderFailed(true);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Enjoy our courses.
                  {/* Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped. */}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleOrderSubmit
                        : handleNext
                    }
                    sx={{ mt: 3, ml: 1 }}
                    // onClick={}
                  >
                    {activeStep === steps.length - 1 ? "Subscribe" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>

        <Dialog open={orderFailed}>
          <DialogTitle>Order Failed</DialogTitle>
          <DialogContent>
            <Typography>
              Sorry, we were unable to process your order. Please try again
              later.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOrderFailed(false)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={orderComplete}>
          <DialogTitle>Order Complete</DialogTitle>
          <DialogContent>
            <Typography>
              Thank you for your order. We will send you an email with
              transaction details.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={gotoMyCourses}>
              Continue watching
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
