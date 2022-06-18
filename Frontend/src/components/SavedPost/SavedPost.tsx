import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DialogContent from "@mui/material/DialogContent";
import InputEmoji from "react-input-emoji";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { Grid, Button, Paper, Stack, TextField } from "@mui/material";
import image from "../../assets/image1.jpeg";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Navbar } from "../navbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const SavedPost = ({ onLogout }: NavbarProps) => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const posts = JSON.parse(localStorage.getItem("Posts"));
  const data = JSON.parse(localStorage.getItem("currentUser"));

  const [openUploadModal, setSavedModalOpen] = React.useState(false);
  const handleSavedModalOpen = () => setSavedModalOpen(true);
  const handleSavedModalClose = () => setSavedModalOpen(false);

  const comments = JSON.parse(localStorage.getItem("Comments"));
  const [userProfile, set] = useState(
    JSON.parse(localStorage.getItem("UserProfile"))
  );
  const [isSelect, setIsSelect] = useState(false);

  const [current, setCurrent] = useState(0);

  const savedPost = JSON.parse(localStorage.getItem("SavedPost"));

  let length;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const ClickHandler = (id) => {
    //console.log(savedPost.data)
    console.log(id);
    // savedPost.data.map((each,i)=>{
    //   console.log(each.savedPost)
    //   each.savedPost.map((a,i)=>{
    //     console.log(a._id)
    //   })
    // })
    handleSavedModalOpen();
  };
  return (
    <>
      <div>
        <Stack direction="row" spacing={2}>
          <Item>
            <Grid container>
            {savedPost?.data.map((post, i) => {
            return (
              <>
               <section className="sliderImage">
              <KeyboardArrowLeftIcon
                      className="leftArr"
                      onClick={prevSlide}
                    />
                    <KeyboardArrowRightIcon
                      className="rightArr"
                      onClick={nextSlide}
                    />
                    {post.savedPost.posted_photos.map(
                      (slide: any, i: number) => {
                        return (
                          <div key={i}>
                            {i === current && (
                              <img style={{padding:'3px', width: "40vh", height: "40vh" }}
                                src={`http://localhost:8080/${slide}`}
                                className="image"
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                    </section>
              </>
            )})}
              {/* <img style={{ width: "40vh", height: "40vh" }} src={image}></img> */}
            </Grid>
          </Item>
        </Stack>
      </div>

      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          item
          xs={8}
          spacing={40}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "3%",
          }}
        >
          {savedPost?.data.map((post, i) => {
            return (
              <>
                <Card
                  style={{
                    width: "41%",

                    marginBottom: "25px",
                    marginLeft: "100vh",
                  }}
                >
                
                    <KeyboardArrowLeftIcon
                      className="leftArr"
                      onClick={prevSlide}
                    />
                    <KeyboardArrowRightIcon
                      className="rightArr"
                      onClick={nextSlide}
                    />
                    {post.savedPost.posted_photos.map(
                      (slide: any, i: number) => {
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
                      }
                    )}
                
                </Card>
              </>
            );
          })}
        </Grid>
      </Box> */}

      <div>
        <Dialog
          open={openUploadModal}
          onClose={handleSavedModalClose}
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
                                onClick={ClickHandler}
                              />
                            )}
                          </div>
                        );
                      })}
                    </section>
                   
                  </div>

                  <div key={i} style={{ padding: "10px", width: "50vh" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <Avatar
                          src={`http://localhost:8080/${a?.created_by.profile_pic}`}
                        ></Avatar>
                        <h5>{a?.created_by.firstName}</h5>
                      </div>
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

                              <h5 style={{ color: "gray", marginLeft: "3px" }}>
                                {comment?.comment}
                              </h5>
                            </div>
                            <div style={{ marginLeft: "45%" }}>
                              <h6
                                style={{ color: "gray" }}
                                // onClick={replyHandler}
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
                          style={{ padding: "2px" }}
                          //  color="disabled"
                          color={
                            a?.likes?.includes(data?._id) ? "error" : "disabled"
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
                    {/* <div style={{ display: "flex", marginTop: "95%" }}>
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
                      </div> */}
                  </div>
                </div>
              );
            })}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SavedPost;
