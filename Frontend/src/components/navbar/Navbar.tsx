import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import CameraAltIcon from "@mui/icons-material/AddAPhoto";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MuiPhoneNumber from "material-ui-phone-number";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { authenticationService } from "../../utils/auth.service";
import image from "../../assets/cloud.png";
import { flexbox } from "@mui/system";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import LinearProgress from "@mui/material/LinearProgress";
import InputEmoji from "react-input-emoji";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  // const [userProfile, set] = useState(
  //   JSON.parse(localStorage.getItem("UserProfile"))
  // );

  const data = JSON.parse(localStorage.getItem("currentUser"));

  const userPro = JSON.parse(localStorage.getItem("loginUser"));
  // const savedPost = JSON.parse(localStorage.getItem("SavedPost"));

  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState();

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [openModal, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [photos, setPhotos] = useState([]);
  const [openUploadPostModal, setUploadPostModalOpen] = React.useState(false);
  const handleUploadPostModalOpen = () => setUploadPostModalOpen(true);
  const handleUploadPostModalClose = () => setUploadPostModalOpen(false);

  const [openUploadModal, setUploadModalOpen] = React.useState(false);
  const handleUploadModalOpen = () => setUploadModalOpen(true);
  const handleUploadModalClose = () => setUploadModalOpen(false);

  const [openPostModal, setPostModalOpen] = React.useState(false);
  const handlePostModalOpen = () => setPostModalOpen(true);
  const handlePostModalClose = () => setPostModalOpen(false);

  const [openUploadPost, setUploadPostOpen] = React.useState(false);
  const handleUploadPostOpen = () => setUploadPostOpen(true);
  const handleUploadPostClose = () => setUploadPostOpen(false);

  const [selectUrl, setSelectUrl] = useState([]);
 
  const[uploadPost,setUploadPost]=useState([])
  const [openEditModal, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);
  const [openEditMsg, setOpenEditMsg] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [openResetPwdMsg, setOpenResetPwdMsg] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [val, setVal] = useState("");

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditMsgClick = () => {
    setOpenEditMsg(true);
  };

  const handleEditMsgClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEditMsg(false);
  };

  const handleResetPwdMsgClick = () => {
    setOpenResetPwdMsg((prev) => !prev);
  };

  const handleResetPwdMsgClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenResetPwdMsg((prev) => !prev);
  };

  const Edithandler = () => {
    handleEditModalOpen();
  };

  const ResetPassword = () => {
    handleModalOpen();
  };

  const ChangePwdHandler = (userDetails: any) => {
    userDetails = {
      confirm_password: confirmPwd,
      old_password: oldPwd,
      new_password: newPwd,
    };

    authenticationService
      .ChangePassword(userDetails)
      .then((res) => {
        console.log(res);
        handleResetPwdMsgClick();
        setConfirmPwd("");
        setOldPwd("");
        setNewPwd("");
      })
      .catch((err) => {
        console.log(err.message);

        setShowMessage(true);
        setVal(err.message);
        handleResetPwdMsgClick();
        setConfirmPwd("");
        setOldPwd("");
        setNewPwd("");
      });
  };

  const UpdateProfile = (userDetails: any) => {
    userDetails = {
      lastName: firstName,
      email: email,
      bio: bio,
      date_of_birth: date,
      gender: gender,
      mobile_number: mobile,
    };

    authenticationService.EditProfile(userDetails).then((res) => {
      console.log(userDetails);

      handleEditMsgClick();
    });
  };

  const AddProfile = (event: any) => {
    console.log(event.target.value);

    let formdata = new FormData();
    formdata.append("profile_pic", event.target.files[0]);
    console.log(formdata);
    authenticationService
      .UploadProfile(formdata)

      .then((res) => {
        authenticationService.getImage();
      });
  };

  const SavePostHandler = () => {
    authenticationService
      .SavePost()
      .then((res) => {
        console.log(res);
        localStorage.setItem("SavedPost", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddPostHandler = () => {
    handleUploadModalOpen();
  };

  const UploadPost = (event: any) => {
    console.log(event.target.files);
    setPhotos(pre => [...pre,...event.target.files])
    console.log(photos);
   
    handleUploadPostModalOpen();
    handleUploadModalClose();
  };
 

  const homeHandler = () => {
    authenticationService.BackToHome();
  };

  const BackHandler = () => {
    handleUploadModalOpen();
  };

  const handlePostOpen = () => {
    handleUploadPostOpen();
  };

  const NextHandler = () => {
    handlePostModalOpen();
    handleUploadPostModalClose();
  };

  const UploadPostHandler = (event:any) => {
     let formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append("posted_photos", photos[i]);
      console.log(photos[i])
    }

// verify the data
console.log(formData.getAll("posted_photos"))
// formData.append("posted_photos", photos);
    formData.append("caption", caption);
    formData.append("location", location);

   
    authenticationService
      .UploadPost(formData)
      .then((res) => console.log(res));
    handlePostOpen();
    handlePostModalClose();
  };
 

  const LogoutHandler = () => {
    authenticationService.logout();
  };

  return (
    <>
      <AppBar
        style={{ backgroundColor: "white", color: "black" }}
        position="sticky"
      >
        <Toolbar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={Edithandler}>Edit Profile</MenuItem>
            <MenuItem onClick={ResetPassword}>Change Password</MenuItem>
            <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
          </Menu>

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{ flex: 1, marginLeft: "15%" }}
          >
            Life@AM
          </Typography>

          <HomeIcon style={{ margin: "10px" }} onClick={homeHandler} />
          <AddAPhotoOutlinedIcon
            style={{ margin: "10px" }}
            onClick={AddPostHandler}
          />

          <BookmarkAddOutlinedIcon
            style={{ margin: "10px" }}
            onClick={SavePostHandler}
          />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Stack style={{ margin: "3px" }} direction="row" spacing={2}>
              {data?.profile_pic == " " ? (
                <Avatar>{data && data.firstName[0]}</Avatar>
              ) : (
                <Avatar
                  src={`http://localhost:8080/${data?.profile_pic}`}
                ></Avatar>
              )}
              <h6 style={{ padding: "10px", margin: "3px" }}>
                {data?.lastName}
              </h6>
            </Stack>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div>
        <Modal
          open={openEditModal}
          onClose={handleEditModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginLeft: "33%" }}
            >
              Update Profile
            </Typography>
            <div
              style={{
                display: "flex",
                position: "relative",
                marginLeft: "40%",
              }}
            >
            
              <Avatar
                alt="upload Profile"
                src={`http://localhost:8080/${data?.profile_pic}`}
                style={{
                  height: "10vh",
                  width: "70px",
                  // margin: "5px",
                  borderRadius: "600px",
                  marginRight: "0px",
                  position: "relative",
                }}
              />
              <Button
                component="label"
             
                style={{ marginLeft: "0px" }}
              >
                <CameraAltIcon
                  style={{
                    marginRight: "27vh",
                    marginTop: "30px",

                    backgroundColor: "white",
                    borderRadius: "70px",
                  }}
                />
                <input type="file" onChange={(e) => AddProfile(e)} hidden />
              </Button>{" "}
            </div>
            <TextField
              variant="outlined"
              label="Name"
              style={{ width: "100%", margin: "5px" }}
              value={firstName === "" ? data && data.firstName : firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Emai Id"
              style={{ width: "100%", margin: "5px" }}
              value={email === "" ? data && data.email : email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Enter your bio here.."
              style={{ width: "100%", margin: "5px" }}
              value={bio === "" ? data && data.bio : bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <div>
              <RadioGroup
                style={{ display: "flex", flexDirection: "row", color: "gray" }}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={gender == "" ? data && data.gender : gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </div>
            <FormLabel id="demo-radio-buttons-group-label">
              Date of Birth
            </FormLabel>
            <div style={{ margin: "4px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="DD/MM/YYYY"
                  value={date === "" ? data && data.date_of_birth : date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "4px" }}
            >
              <MuiPhoneNumber
                style={{ width: "33%", margin: "5px" }}
                defaultCountry={"in"}
                variant="outlined"
                // value={mobile === "" ? data && data.mobile_number : mobile}
                // onChange={(e) => setMobile(e.target.value)}
              />

              <TextField
                variant="outlined"
                style={{ width: "100%", margin: "5px" }}
                value={mobile === "" ? data && data.mobile_number : mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></TextField>
            </div>
            <LoadingButton
              type="submit"
              style={{ borderRadius: "7px", height: "7vh", margin: "3px" }}
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={UpdateProfile}
            >
              Save Profile
            </LoadingButton>
          </Box>
        </Modal>
      </div>
      <div>
        <Dialog
          open={openUploadPostModal}
          onClose={handleUploadPostModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div style={{ display: "flex" }}>
              <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Paper
                  square
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <div>
                    <ArrowBackIcon
                      // style={{ marginRight: "90%" }}
                      onClick={BackHandler}
                    />
                  </div>
                  <div>
                    <Button
                      style={{ marginLeft: "40vh" }}
                      onClick={NextHandler}
                      // onClick={handlePostModalOpen}
                    >
                      Next
                    </Button>
                  </div>
                  
                </Paper>

                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {photos?.map((step, index) => (
                    <div>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: "block",
                            maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={`http://localhost:8080/${step.name}`}
                          // alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
              </Box>
            </div>
            
          </DialogContent>
        </Dialog>
      </div>

      <Dialog
        style={{ height: "100vh" }}
        open={openPostModal}
        onClose={handlePostModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ height: "65vh" }}>
          <div>
            <Button
              style={{ marginLeft: "70vh" }}
              // onClick={handlePostOpen}
              onClick={UploadPostHandler}
            >
              Upload
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // width: "100vh",
              // height: "100vh",
            }}
          >
            <section className="slider">
              <KeyboardArrowLeftIcon
                className="leftArr"
                // onClick={prevSlide}
              />
              <KeyboardArrowRightIcon
                className="rightArr"
                // onClick={nextSlide}
              />
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {photos?.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        style={{
                          marginRight: "50%",
                          width: "46vh",
                          height: "67vh",
                        }}
                        // sx={{
                        //   height: 255,
                        //   display: "block",
                        //   maxWidth: 400,
                        //   overflow: "hidden",
                        //   width: "100%",
                        // }}
                        src={`http://localhost:8080/${step.name}`}
                        // alt={step.label}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              {/* <div>
                {imageUrl.map((a, i) => {
                  return (
                    <img
                      style={{
                        marginRight: "50%",
                        width: "46vh",
                        height: "67vh",
                      }}
                      src={`http://localhost:8080/${a[0].name}`}
                    />
                  );
                })}
              </div> */}
            </section>

            <div style={{ padding: "10px", width: "50vh" }}>
              <div style={{ display: "flex" }}>
                <Avatar
                  src={`http://localhost:8080/${data?.profile_pic}`}
                ></Avatar>
                <h5 style={{ marginLeft: "10px" }}>{data?.firstName}</h5>
              </div>

              <div>
              <InputEmoji
                       value={caption}
                       onChange={ setCaption}
                      cleanOnEnter
                      // onEnter={handleOnEnter}
                    />
                {/* <TextField
                  style={{ marginTop: "10px" }}
                  variant="filled"
                  label="Write a Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></TextField> */}
              </div>
              <div style={{ marginTop: "150px" }}>
                <TextField
                  style={{ marginTop: "10px" }}
                  variant="filled"
                  label="Add a location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></TextField>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      

      <div>
        <Modal
          open={openUploadPost}
          onClose={handleUploadPostClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img
              src={image}
              style={{ width: "33%", height: "25vh", marginLeft: "35%" }}
            />
            <h5 style={{ color: "gray", marginLeft: "30%" }}>
              Just set on place, image being uploaded{" "}
            </h5>
            <div style={{ paddingTop: "195px" }}>
              <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={openUploadModal}
          onClose={handleUploadModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img
              src={image}
              style={{ width: "33%", height: "25vh", marginLeft: "35%" }}
            />
            <div style={{ paddingTop: "100px" }}>
              <Button
                component="label"
                // className="image"

                style={{
                  marginLeft: "25vh",
                  textTransform: "capitalize",
                  borderRadius: "7px",
                  height: "7vh",
                }}
                variant="contained"
              >
                Upload from device
                <input
                  type="file"
                  onChange={(e) => UploadPost(e)}
                  multiple
                  hidden
                />
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginLeft: "25%", padding: "10px" }}
            >
              Reset your password
            </Typography>
            <TextField
              margin="normal"
              required
              style={{ borderRadius: "5px", padding: "5px", width: "100%" }}
              label="Enter Old Password"
              type="password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              // name="email"

              autoFocus
            />
            <TextField
              margin="normal"
              required
              style={{ borderRadius: "5px", padding: "5px", width: "100%" }}
              label="Enter New Password"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              // name="email"

              autoFocus
            />
            <TextField
              margin="normal"
              required
              style={{ borderRadius: "5px", padding: "5px", width: "100%" }}
              label="Confirm New Password"
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              // name="email"

              autoFocus
            />

            <LoadingButton
              type="submit"
              style={{ borderRadius: "7px", height: "7vh" }}
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={ChangePwdHandler}
            >
              Reset Password
            </LoadingButton>
          </Box>
        </Modal>
      </div>
      <div>
        <Snackbar
          open={openEditMsg}
          autoHideDuration={2000}
          onClose={handleEditModalClose}
        >
          <Alert
            onClose={handleEditMsgClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profile Update Successfully!
          </Alert>
        </Snackbar>
      </div>
      <div>
        <Snackbar
          open={openResetPwdMsg}
          autoHideDuration={2000}
          onClose={handleResetPwdMsgClose}
        >
          <Alert
            onClose={handleResetPwdMsgClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password Updated Successfully!
          </Alert>
        </Snackbar>
      </div>

      <div>
        <Snackbar
          open={openResetPwdMsg}
          autoHideDuration={2000}
          onClose={handleResetPwdMsgClose}
        >
          <Alert
            onClose={handleResetPwdMsgClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {showMessage && <p>{val}</p>}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Navbar;
