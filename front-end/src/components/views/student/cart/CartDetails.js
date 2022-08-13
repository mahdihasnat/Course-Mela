import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import CourseCard from "../../guestView/course/CourseCard";

import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import PromoService from "../../../../services/promo/PromoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import {
  getPayableAmountForACourse,
  getTotalAmountForAllCourses,
  getTotalAmountWithPromo,
} from "../../../../utils/coursePricing";
import { TakaSign } from "../../../helper/CustomIcons";
import { addPromo } from "../../../../store/database/course/CourseActions";

const CartPricingDetails = ({ courses }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="compare">
          <TableHead>
            <TableRow>
              <TableCell> Course</TableCell>
              <TableCell> Price </TableCell>
              <TableCell> Discount</TableCell>
              <TableCell> Price for you</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell component="th" scope="row">
                  {course.name}
                </TableCell>
                <TableCell>{course.coursePricing.subsFee}</TableCell>
                <TableCell>{course.coursePricing.offPercent}%</TableCell>
                <TableCell>
                  {/* {course.coursePricing.subsFee *
                    (1 - course.coursePricing.offPercent / 100)} */}
                  {getPayableAmountForACourse(course)}
                  <TakaSign />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const CartDetails = () => {
  const navigate = useNavigate();

  const [{ cartCourses, selectedPromo }, dispatch] = useSelectedCourseContext();
  console.log({ cartCourses: cartCourses });
  const [subTotal, setSubTotal] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [promoCode, setPromoCode] = useState();
  const [promoList, setPromoList] = useState([]);

  const [submitSureModalOpen, setSubmiSureModalOpen] = useState(false);

  const handleCheckoutProceed = () => {
    setSubmiSureModalOpen(false);
    navigate("/checkout");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmiSureModalOpen(true);
  };

  // useEffect(() => {
  //   const total = cartCourses
  //     .map(
  //       (course) =>
  //         course.coursePricing.subsFee * (1 - course.coursePricing.offPercent)
  //     )
  //     .reduce((a, b) => a + b, 0);

  //   setSubTotal(total);
  // }, [cartCourses]);

  // useEffect(() => {
  //   // alert(`work with promo deduction`);

  //   setTotalPrice(subTotal);
  // }, [subTotal, promoCode]);

  const handleChangeOfPromoCode = (e, value) => {
    // setPromoCode(value);
    // console.log({ "promoCode:": promoCode });
    console.log({ "value:": value });
    dispatch(addPromo(value));
  };

  useEffect(() => {
    PromoService.getGeneralizedPromos()
      .then((response) => {
        console.log({ "generalizedPromoResponse:": response });
        setPromoList(response.data);
      })
      .catch(LOG_CAUGHT_ERR);
  }, []);

  return (
    <Grid container>
      <Grid item xs={6} lg={7}>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Typography variant="h4">Course in your Cart</Typography>
          <Box sx={{ height: "5%" }} />
          <hr />
          <Grid container>
            {cartCourses.map((course) => (
              <Grid key={course.id} item xs={6}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6} lg={5}>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Typography variant="h4" px={15} marginTop={3}>
            Cart Summary
          </Typography>
          <Box marginTop={5} mx={5}>
            <CartPricingDetails courses={cartCourses} />
            <Box paddingTop={5} />
            <hr />
            <Stack py={5}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">SubTotal</Typography>
                <Typography variant="h6" marginRight={5}>
                  {getTotalAmountForAllCourses(cartCourses)}
                  <TakaSign />
                </Typography>
              </Stack>

              {
                /// TODO: work with promo deduction. make similar to add Tag
              }
              <Stack direction={"row"} marginTop={2}>
                <Box sx={{ width: "100vw" }}>
                  <Autocomplete
                    autoComplete={true}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    multiple={false}
                    options={promoList}
                    value={promoCode}
                    /// TODO how to fetch autocomplete's value
                    onChange={handleChangeOfPromoCode}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth={true}
                        margin="normal"
                        label="Select Or Type PROMO CODE"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                paddingTop={5}
              >
                <Typography variant="h5">Total</Typography>
                <Typography variant="h6" marginRight={5}>
                  {getTotalAmountWithPromo(cartCourses, selectedPromo)}{" "}
                  <TakaSign />
                </Typography>
              </Stack>
              {/* <Grid xs={12} justifyContent={"center"}> */}
              <Stack paddingTop={10}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Checkout
                </Button>
              </Stack>
              {/* </Grid> */}
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Dialog
        open={submitSureModalOpen}
        onClose={() => setSubmiSureModalOpen(false)}
      >
        <DialogTitle>
          <Typography variant="h4">Sure to checkout?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">
              Total price: {getTotalAmountWithPromo(cartCourses, selectedPromo)}
            </Typography>
            You will be redirected to the payment page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSubmiSureModalOpen(false)}
            color="primary"
            endIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCheckoutProceed}
            color="primary"
            endIcon={<SendIcon />}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
