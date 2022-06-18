import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Home from "../../home/home";
import Modal from "@mui/material/Modal";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Stack, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";

import LoadingButton from "@mui/lab/LoadingButton";
import history from "../../../routes/history";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  // Initial hooks
  //  const token=localStorage.getItem("token")
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [val, setVal] = useState("");
  const { handleSubmit, register } = useForm();
  const [openMsg, setMsgOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = createTheme();
  const [token, setToken] = useState("");
  const[pwdToken,setPwdToken]=useState("")
  const [newPassword, setNewPwd] = useState("");
  const [confirmPassword, setConfirmPwd] = useState("");
  const [openPasswordModal, setPasswordModalOpen] = React.useState(false);
  const handlePasswordModalOpen = () => setPasswordModalOpen(true);
  const handlePasswordModalClose = () => setPasswordModalOpen(false);
  const [openModal, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSuccessClick = () => {
    setMsgOpen(true);
  };
  const handleSuccessClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setMsgOpen(false);
  };

  /*
   * Verify Credentials
   */
  const doLogin = (userDetails: any) => {
    userDetails = {
      email: email,
      password: password,
    };
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(userDetails)
      .then((response: any) => {
        setShowMessage(true);
        console.log(response);
        setToken(response.token);
        handleSuccessClick();
         Feed();
        // authenticationService.Home();
        setButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error.message);

        setShowMessage(true);
        setVal(error.message);
        console.log(error.message);

        handleClick();

        setButtonDisabled(false);
      });
  };
  // console.log(val);

  function Feed() {
    authenticationService.Posts().then((res)=>console.log(res))
  }

  function signup() {
    authenticationService.signup();
  }

  function ClickHandler() {
    handleModalOpen();
  }

  function PasswordHandler(userDetails:any) {
    // handlePasswordModalOpen();
    userDetails={
     
      password:newPassword,
     
    }
    setNewPwd('')
    setConfirmPwd('')
    authenticationService.resetPassword(pwdToken,userDetails).then((res)=>{
      handlePasswordModalClose()
    })
    console.log(pwdToken);
  }

  function ForgotPasswordHandler(userDetails:any) {
      userDetails={
        email:email
      }

    authenticationService.forgotPassword(userDetails).then((res)=>{
      setPwdToken(res.token)
      // console.log(pwdToken)
      handlePasswordModalOpen()
      handleModalClose()
      
    })
  }

  /*
   * Render
   */
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          style={{
            marginRight: "50vh",
            width: "73vh",
            height: "65vh",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <b
              style={{
                marginLeft: "28%",
                fontSize: "25px",
                fontFamily: "Times New Roman",
              }}
            >
              Sign in Social Feed
            </b>
            <Box
              component="form"
              onSubmit={handleSubmit(doLogin)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                style={{ borderRadius: "5px", padding: "5px", width: "100%" }}
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <TextField
                  margin="normal"
                  required
                  style={{ padding: "5px", width: "100%" }}
                  // name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <LoadingButton
                type="submit"
                style={{ borderRadius: "7px", height: "7vh" }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isButtonDisabled}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs style={{ marginLeft: "75%" }}>
                  <Link href="#" onClick={ClickHandler} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={handleSubmit(signup)} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <div>
                <Modal
                  open={openModal}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit(doLogin)}
                    noValidate
                    sx={style}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      style={{ marginLeft: "25%", padding: "10px" }}
                    >
                      Forgot Your Password?
                    </Typography>

                    <Typography
                      id="modal-modal-title"
                      style={{ fontFamily: "Times New Roman", color: "gray" }}
                    >
                      Please enter the email address associated with your
                      account,and we'll email you a link to reset your password
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      style={{
                        borderRadius: "5px",
                        padding: "5px",
                        width: "100%",
                      }}
                      id="email"
                      label="Email Address"
                      // name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                    />

                    <LoadingButton
                      type="submit"
                      style={{ borderRadius: "7px", height: "7vh" }}
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2 }}
                      loading={isButtonDisabled}
                      onClick={handleSubmit(ForgotPasswordHandler)}
                    >
                      Reset Password
                    </LoadingButton>
                    <LoadingButton
                      type="submit"
                      style={{ borderRadius: "7px", height: "7vh" }}
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      loading={isButtonDisabled}
                    >
                      Back
                    </LoadingButton>
                  </Box>
                </Modal>
              </div>

              <div>
                <Modal
                  open={openPasswordModal}
                  onClose={handlePasswordModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit(doLogin)}
                    noValidate
                    sx={style}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      style={{ marginLeft: "25%", padding: "10px" }}
                    >
                      Set Your Password?
                    </Typography>

                    <TextField
                      margin="normal"
                      required
                      style={{
                        borderRadius: "5px",
                        padding: "5px",
                        width: "100%",
                      }}
                      id="New Password"
                      type="password"
                      label="New Password"
                      // name="email"
                      autoComplete="New Password"
                      autoFocus
                      value={newPassword}
                      onChange={(e) => setNewPwd(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      style={{
                        borderRadius: "5px",
                        padding: "5px",
                        width: "100%",
                      }}
                      id="Confirm Password"
                      type="password"
                      label="Confirm Password"
                      // name="email"
                      autoComplete="Confirm Password"
                      autoFocus
                      value={confirmPassword}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                    />
                    <LoadingButton
                      type="submit"
                      style={{ borderRadius: "7px", height: "7vh" }}
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2 }}
                      loading={isButtonDisabled}
                      onClick={handleSubmit(PasswordHandler)}
                    >
                      Reset Password
                    </LoadingButton>
                    <LoadingButton
                      type="submit"
                      style={{ borderRadius: "7px", height: "7vh" }}
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      loading={isButtonDisabled}
                    >
                      Back
                    </LoadingButton>
                  </Box>
                </Modal>
              </div>
              <Stack spacing={2}>
                <Snackbar
                  open={openMsg}
                  autoHideDuration={2000}
                  onClose={handleSuccessClose}
                >
                  <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {" "}
                    Login Successfully
                  </Alert>
                </Snackbar>
              </Stack>

              <Stack spacing={2}>
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {" "}
                    {showMessage && <p>{val}</p>}
                  </Alert>
                </Snackbar>

                {/* <Alert severity="success">This is a success message!</Alert> */}
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
