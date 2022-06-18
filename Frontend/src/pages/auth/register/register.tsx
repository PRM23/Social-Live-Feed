import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Button, Stack, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";

import LoadingButton from "@mui/lab/LoadingButton";
import { type } from "os";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPwd] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [val, setVal] = useState("");
  const { handleSubmit, register } = useForm();
  const [token, setToken] = useState("");
  const theme = createTheme();
  const [openModal, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [openMsg, setMsgOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

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

  // function GetToken() {
  //   authenticationService.getToken();
  // }

  const doRegister = (userDetails: any) => {
    userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      bio: "",
      date_of_birth: "",
      gender: "",
      mobile_number: "",
      profile_pic: ""
    };
    console.log(userDetails);
    setButtonDisabled(true);
    authenticationService
      .register(userDetails)
      .then((response: any) => {
        console.log(response.token);//reg Token

        setToken(response.token);
        setShowToken(true);
        handleModalOpen();
        handleSuccessClick();
      
        setButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error.code);

        setShowMessage(true);

        setVal(error.message);
        handleClick();

        setButtonDisabled(false);
      });
  };

  function Home(){
    
  }

  function signin() {
    authenticationService.signin();
  }

 

  function VerifyEmail() {
    console.log(token)
    authenticationService.verifyEmail(token, email);
  }

  function VerifyToken() {
   
     
    authenticationService.getToken();
   
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
            height: "75vh",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <b
              style={{
                marginLeft: "5vh",
                fontSize: "25px",
                fontFamily: "Times New Roman",
              }}
            >
              Sign Up to Social Feed
            </b>
            <Box
              component="form"
              onSubmit={handleSubmit(doRegister)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                style={{ borderRadius: "5px", padding: "5px", width: "50%" }}
                id="firstName"
                label="First Name"
                autoComplete="firstname"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                // {...register("firstName")}
              />
              <TextField
                margin="normal"
                required
                style={{ borderRadius: "5px", padding: "5px", width: "50%" }}
                id="lastName"
                label="Last Name"
                autoComplete="lastname"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                // {...register("lastName")}
              />
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
                // {...register('email')}
              />
              <TextField
                margin="normal"
                required
                style={{ borderRadius: "5px", padding: "5px", width: "100%" }}
                // name="password"
                label="Password"
                defaultValue="Pass"
                type="password"
                id="password"
                // error={type === ""}
                // helperText={type === "" ? "Please enter 10 digit" : " "}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPwd(e.target.value)}
                // {...register("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ borderRadius: "7px", height: "7vh" }}
                loading={isButtonDisabled}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  Already have an account?
                  <Link href="#" onClick={handleSubmit(signin)} variant="body2">
                    Sign In
                  </Link>
                </Grid>
                {/* <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
              </Grid>

              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div>
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
                    />
                  </div>
                  <div>
                    <LoadingButton
                      style={{
                        borderRadius: "5px",
                        padding: "5px",
                        margin: "2px",
                      }}
                      variant="contained"
                      // sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit(VerifyEmail)}
                    >
                      Verify Email
                    </LoadingButton>
                  </div>
                  {showToken && (
                    <>
                      <div>
                        <LoadingButton
                          style={{
                            borderRadius: "5px",
                            padding: "5px",
                            margin: "2px",
                          }}
                          variant="contained"
                          // sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit(VerifyToken)}
                        >
                          Verify Token
                        </LoadingButton>
                      </div>
                    </>
                  )}
                </Box>
              </Modal>

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
                    Registered Successfully
                  </Alert>
                </Snackbar>
              </Stack>

              <Stack spacing={2}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
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
