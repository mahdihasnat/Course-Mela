import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";

import CopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";

import DifferenceIcon from "@mui/icons-material/Difference";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import {
  removeAllCourseFromCart,
  removeAllCourseFromCompare,
} from "../../../../store/database/course/CourseActions";

export const CartSpeedDial = () => {
  const [, dispatch] = useSelectedCourseContext();
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="Cart  SpeedDial"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
      icon={<ShoppingCartSharpIcon color="" />}
    >
      <SpeedDialAction
        icon={<ShoppingCartCheckoutIcon />}
        tooltipTitle="Checkout"
        // href="/checkout"
        onClick={() => {
          navigate("/checkout");
        }}
      ></SpeedDialAction>

      <SpeedDialAction
        icon={<DeleteIcon />}
        tooltipTitle="Free Cart"
        onClick={() => {
          dispatch(removeAllCourseFromCart());
        }}
      ></SpeedDialAction>
    </SpeedDial>
  );
};

export const CompareSpeedDial = () => {
  const [, dispatch] = useSelectedCourseContext();
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="Compare SpeedDial"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 80,
      }}
      icon={<DifferenceIcon />}
    >
      {/* <Link to={`/course/compare`}> */}
      <SpeedDialAction
        icon={<DifferenceIcon />}
        tooltipTitle="Compare"
        // href="/course/compare"
        onClick={() => {
          navigate("/course/compare");
        }}
      ></SpeedDialAction>
      {/* </Link> */}

      <SpeedDialAction
        icon={<RestartAltSharpIcon />}
        tooltipTitle="Remove Selection for Compare"
        onClick={() => dispatch(removeAllCourseFromCompare())}
      ></SpeedDialAction>
    </SpeedDial>
  );
};
