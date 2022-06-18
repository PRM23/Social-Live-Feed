import React, { useState, useEffect } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid, Button, Paper, Stack, TextField, Input } from "@mui/material";
import { Navbar } from "../../components/navbar";
import { Avatar } from "@mui/material";
import { CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { authenticationService } from "../../utils/auth.service";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Dialog from "@mui/material/Dialog";
import image from "../../assets/imag3.jpeg";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import InputEmoji from "react-input-emoji";
import Favorite from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
const paperstyle = {
  padding: 20,
  height: "25vh",
  width: 450,
  margin: "20px auto",
};

function Home() {
  const posts = JSON.parse(localStorage.getItem("Posts"));
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const comments = JSON.parse(localStorage.getItem("Comments"));
  const [like, setLike] = useState(false);
  // const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
  const [postComment, setPostComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  let length;
  const [open, setOpen] = React.useState(false);

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    authenticationService.Posts();
  }, []);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // if (!Array.isArray(images) || images.length <= 0) {
  //   return null;
  // }

  const LikePostHandler = (id: any) => {
    setLike(true);
    authenticationService.LikePost(id);
    
  };

  

  const SavePostHandler = async (id: any) => {
    setIsSaved(true);
    await authenticationService.SavedPost(id).then((res) => {
      console.log(res);
    });
  };

  

  const CommentHandler = (id: any) => {
    console.log(id);

    posts.map((a, i) => {
      if (a._id == id) {
        console.log(a);
        console.log("true");

        authenticationService.getComments(id).then((res) => {
          console.log(res);
          handleClickOpen();
        });
      }
    });

   
  };

  const replyHandler = () => {
    setIsSelect(true);
    console.log(comments.data);
    comments.data.map((each, i) => {
      console.log(each.comments);
      each.comments.map((a, i) => {
        console.log(a.comment);
      });
    });
  };

  const PostComment = (id: any, comment: any) => {
    comment = {
      comment: text,
    };
    authenticationService.PostComments(id, comment);
  };

  const getCommentHandler = (id: any) => {
    console.log(id);
    authenticationService.getComments(id);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={40}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "3%",
            // minHeight: "105vh",
          }}
        >
          {posts?.map((a: any, i: number) => {
            return (
              <>
                <Card
                  style={{
                    // boxShadow: " 1px 1px 1px 0 gray",

                    width: "41%",
                    //maxHeight: "900vh",
                    marginBottom: "25px",
                    marginLeft: "100vh",
                  }}
                >
                 
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      margin: "5px",
                      // backgroundColor: "#ccdfe3",
                    }}
                  >
                    <div style={{ display: "flex", margin: "2px" }}>
                      {a.created_by.profile_pic === "" ? (
                        <Avatar>{data && data?.firstName[0]}</Avatar>
                      ) : (
                        <Avatar
                          src={`http://localhost:8080/${a.created_by.profile_pic}`}
                        ></Avatar>
                      )}
                      <h4 style={{ margin: "5px" }}>
                        {a.created_by.firstName}
                      </h4>
                    </div>
                    {/* <div style={{ marginRight:'90vh'}}>
                      <h5 style={{color:'gray'}}>{a.location}</h5>
                    </div> */}
                  </div>
                 

                  <section className="slider">
                    <KeyboardArrowLeftIcon
                      className="leftArr"
                      onClick={prevSlide}
                    />
                    <KeyboardArrowRightIcon
                      className="rightArr"
                      onClick={nextSlide}
                    />
                    
                    {a.posted_photos.map((slide: any, i: number) => {
                      return (
                        <div key={i}>
                          {i === current && (
                            <img
                              src={`http://localhost:8080/${slide}`}
                              className="image"
                            />
                          )}
                        </div>
                      );
                    })}
                  </section>

                  <div style={{ display: "flex" }}>
                    {/* {a?.likes?.includes(data?._id) ? ( */}
                    <FavoriteIcon
                      style={{ padding: "2px", marginLeft: "5px" }}
                      //  color="disabled"
                      color={
                        a?.likes?.includes(data?._id) ? "error" : "disabled"
                      }
                      onClick={() => LikePostHandler(a._id)}
                    />
                    {/* ) : (
                      <FavoriteBorderOutlinedIcon
                        style={{ padding: "2px", marginLeft: "5px" }}
                        color=""
                        onClick={() => DisLikePostHandler(a._id)}
                      />
                    )}                               */}
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ padding: "2px", marginLeft: "5px" }}
                      onClick={() => CommentHandler(a._id)}
                    />

                    <BookmarkAddedOutlinedIcon
                     
                      style={{ marginLeft: "40vh" }}
                      onClick={() => SavePostHandler(a._id)}
                    />

                   
                  </div>
                  <h5>{a.likes.length} likes </h5>
                  <div style={{ display: "flex", padding: "2px" }}>
                    <h5 style={{ marginLeft: "3px" }}>
                      {a.created_by.firstName}
                    </h5>
                    <h5 style={{ marginLeft: "3px" }}>{a.caption}</h5>
                  </div>

                  <h5
                    key={i}
                    style={{ color: "gray" }}
                    onClick={() => CommentHandler(a._id)}
                  >
                    View all comments
                  </h5>

                  {/* <h5 style={{ color: "gray" }}>View all comments</h5> */}
                  <div style={{ display: "flex" }}>
                    
                    <InputEmoji
                      value={text}
                      onChange={setText}
                      cleanOnEnter
                      onEnter={handleOnEnter}
                    />
                    <Button
                      style={{ textTransform: "capitalize" }}
                      onClick={() => PostComment(a._id)}
                    >
                      Post
                    </Button>
                  </div>
                </Card>
              </>
            );
          })}
        </Grid>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent style={{ height: "60vh" }}>
              {posts?.map((a, i) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100vh",
                      height: "100vh",
                    }}
                  >
                    <div>
                      <section className="slider">
                        <KeyboardArrowLeftIcon
                          className="leftArr"
                          onClick={prevSlide}
                        />
                        <KeyboardArrowRightIcon
                          className="rightArr"
                          onClick={nextSlide}
                        />
                        {a?.posted_photos.map((slide: any, i: number) => {
                          return (
                            <div key={i}>
                              {i === current && (
                                <img
                                  style={{
                                    marginRight: "50%",
                                    width: "50vh",
                                    height: "60vh",
                                  }}
                                  src={`http://localhost:8080/${slide}`}
                                  className="image"
                                />
                              )}
                            </div>
                          );
                        })}
                      </section>
                      
                    </div>
                      
                    <div key={i} style={{ padding: "10px", width: "50vh" }}>
                   
                      <div>
                      <Paper elevation={2} style={{padding:'5px'}}>
                        <div style={{ display: "flex" }}>
                          <Avatar
                            src={`http://localhost:8080/${a?.created_by.profile_pic}`}
                          ></Avatar>
                          <h5>{a?.created_by.firstName}</h5>
                        </div>
                        </Paper>
                       
                        <h5>{a?.caption}</h5>
                       
                      </div>
                    
                      <Container className="container">
                        {comments?.data.map((comment, i) => {
                          return (
                            <>
                              <div style={{ display: "flex" }}>
                                {comment?.created_by.profile_pic === "" ? (
                                  <Avatar>
                                    {comment?.created_by.firstName[0]}
                                  </Avatar>
                                ) : (
                                  <Avatar
                                    src={`http://localhost:8080/${comment?.created_by.profile_pic}`}
                                  ></Avatar>
                                )}

                                <h5 style={{ marginLeft: "3px" }}>
                                  {comment?.created_by.firstName}
                                </h5>

                                <h5
                                  style={{ color: "gray", marginLeft: "3px" }}
                                >
                                  {comment?.comment}
                                </h5>
                                
                              </div>
                              <div style={{ marginLeft: "45%" }}>
                                <h6
                                  style={{ color: "gray" }}
                                  onClick={replyHandler}
                                >
                                  {comment.comments.length} Reply
                                </h6>
                                {isSelect &&
                                  comment.comments.map((a, i) => {
                                    return (
                                      <>
                                        <div style={{ display: "flex" }}>
                                          {comment?.created_by.profile_pic ===
                                          "" ? (
                                            <Avatar>
                                              {comment?.created_by.firstName[0]}
                                            </Avatar>
                                          ) : (
                                            <Avatar
                                              src={`http://localhost:8080/${comment?.created_by.profile_pic}`}
                                            ></Avatar>
                                          )}
                                          <h5>{a.comment}</h5>
                                        </div>
                                      </>
                                    );
                                  })}
                              </div>
                            </>
                          );
                        })}
                        <div style={{ display: "flex" }}>
                          <FavoriteIcon
                            style={{ padding: "2px"}}
                            //  color="disabled"
                            color={
                              a?.likes?.includes(data?._id)
                                ? "error"
                                : "disabled"
                            }
                            onClick={() => LikePostHandler(a._id)}
                          />

                          <BookmarkAddIcon
                            //  color={a?.likes?.includes(data?._id) ? "#0d0e12" : "disabled"}
                            style={{ marginLeft: "20vh" }}
                            onClick={() => SavePostHandler(a._id)}
                          />
                        </div>
                        <h5>{a.likes.length} likes </h5>
                      </Container>
                     
                      <div style={{ display: "flex", marginTop: "95%" }}>
                        <InputEmoji
                          value={text}
                          onChange={setText}
                          cleanOnEnter
                          onEnter={handleOnEnter}
                        />

                        <Button
                          style={{ textTransform: "capitalize" }}
                          onClick={() => PostComment(a._id)}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
      </Box>
    </>
  );
}
export default Home;
