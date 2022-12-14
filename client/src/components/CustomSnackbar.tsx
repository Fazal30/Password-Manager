import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar, {
  SnackbarProps,
  SnackbarCloseReason,
} from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const PREFIX = "CustomSnackbar";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const RefAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  text: string;
  open: boolean;
  severity: AlertProps["severity"];
  handleClose: (
    event: React.SyntheticEvent<any> | Event,
    reason: SnackbarCloseReason
  ) => void;
  autoHideDuration?: SnackbarProps["autoHideDuration"];
  anchorOrigin?: SnackbarProps["anchorOrigin"];
}

const CustomSnackbar: React.FC<Props> = ({
  text,
  open,
  severity,
  handleClose,
  anchorOrigin,
  autoHideDuration = 6000,
}) => {
  return (
    <Root className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <RefAlert
          onClose={(e) => handleClose(e, "" as any)}
          severity={severity}
        >
          {text}
        </RefAlert>
      </Snackbar>
    </Root>
  );
};

CustomSnackbar.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(["success", "info", "error", "warning"]),
  handleClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
};

CustomSnackbar.defaultProps = {
  handleClose: () => {},
  autoHideDuration: undefined,
  severity: undefined,
};

export default CustomSnackbar;
