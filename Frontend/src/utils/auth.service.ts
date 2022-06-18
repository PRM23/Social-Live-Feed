import { BehaviorSubject } from "rxjs";
import { get, patch, post, put } from "./http/httpMethods";
import Cookie from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast } from "./toastUtil";
import { defaultUsers } from "../@types/user";
import { baseURL } from "../utils/constants/urls";

let currentUserFromStorage: any;

/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
  //   if (currentUserFromStorage) {
  //     loadCurrentUser();
  //   }
} catch (e) {
  showErrorToast("Could not find user in local storage");
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
const currentOrganizationSubject = new BehaviorSubject(
  (currentUserFromStorage &&
    currentUserFromStorage._org &&
    currentUserFromStorage._org[0]) ||
    undefined
);

/*
 * Export as a Type
 */
export const authenticationService = {
  // logout,
  authToken,
  register,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  setPassword,
  isUserAndTokenAvailable,
  verifyOTP,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  signup,
  login,
  verifyEmail,
  getToken,
  forgotPassword,
  resetPassword,
  signin,
  Posts,
  EditProfile,
  ChangePassword,
  UploadProfile,
  getImage,
  LikePost,
  SavePost,
  unSavedPost,
  Home,
  SavedPost,
  disLikePost,
  Comments,
  UploadPost,
  logout,
  BackToHome,
  PostComments,
  getComments,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  currentOrganization: currentOrganizationSubject.asObservable(),
  get currentOrganizationValue() {
    return currentOrganizationSubject.value;
  },
};

/*
 * Verify OTP method
 */

function verifyCredentials(payload: any) {
  return post(`${baseURL}/auth/login`, payload).then((response: any) => {
    console.log(response);
    // localStorage.setItem("loginToken", JSON.stringify(response.token));
    // localStorage.setItem("loginUser", JSON.stringify(response));

    handleLogin(response);
    //  history.push(paths.home);
    //  window.location.reload();
    return response;
  });
}

/*
 * Verify OTP method
 */
function requestPasswordReset(payload: any) {
  return post("/api/user/password/reset", payload).then((response: any) => {
    return response;
  });
}

function signin() {
  history.push("/auth/login");
  window.location.reload();
}

function signup() {
  history.push("/auth/register");
  window.location.reload();
}

function BackToHome() {
  history.push(paths.home);
  window.location.reload();
}

/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
function logout() {
  //`${baseURL}/feeds/posts
  return get(`${baseURL}/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      // window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}

/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");

  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

//const url = `http://localhost:8080/feeds/comments/postId` => POST=>
//token is required => body{comment} => used to post the comment for post
/*
 * Get auth token from cookie
 */

function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method

 */
//http://localhost:8080/feeds/comments/${postID}

function getComments(postId:any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return get(`http://localhost:8080/feeds/comments/${postId}`, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);
      localStorage.setItem("Comments", JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

function PostComments(postId: any, payload: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return post(`http://localhost:8080/feeds/comments/${postId}`, payload, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

function UploadPost(payload: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return post(`${baseURL}/feeds/posts`, payload, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

function ChangePassword(payload: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return patch(`${baseURL}/password`, payload, {
    headers: { Authorization: `Bearer ${login_token}` },
  }).then((response: any) => {
    console.log(response);

    return response;
  });
}
//`http://localhost:8080/feeds/likes/${postId}` => PATCH => token is required
// => it is used for post the like for post and remove also

//  const url = `http://localhost:8080/users/profile/${useid}` =>
//   PATCH => token => formdata = formData.append("profile_pic", event.target.files[0]); =>
//    used to to add profile pic and use DELETE method for remove the pic

//const url = `http://localhost:8080/feeds/save/${postId}`; => token => POST => used to save the post

//post the feed => http://localhost:8080/feeds/posts => toke is reqired => body:{caption:"",posted_photos:required Array of photo path max photos uploaded 6 min 1 ,likes:[],location:""}

function SavePost() {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return get(`http://localhost:8080/feeds/save`, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);
      history.push(paths.savedPost);
      window.location.reload();
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  // var login_token = JSON.parse(localStorage.getItem("token"));

  // console.log(login_token);

  // return get(`http://localhost:8080/feeds/save`, {
  //   headers: { authorization: `Bearer ${login_token}` },
  // })
  //   .then((response: any) => {
  //     console.log(response);
  //     history.push(paths.savedPost);
  //     window.location.reload();
  //     return response;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

async function unSavedPost(postId: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  const url = `http://localhost:8080/feeds/save/${postId}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${login_token}`,
    },
  };
  const res = await fetch(url, options);
  return await res.json();
}

function SavedPost(postId: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return post(`http://localhost:8080/feeds/save/${postId}`, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  // var login_token = JSON.parse(localStorage.getItem("token"));

  // console.log(login_token);

  // const url = `http://localhost:8080/feeds/save/${postId}`;
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${login_token}`,
  //   },
  // };
  // const res = await fetch(url, options);
  // console.log(res);
  // return await res.json();
}

async function disLikePost(postId: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  const url = `http://localhost:8080/feeds/likes/${postId}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${login_token}`,
    },
  };
  const res = await fetch(url, options);
  return await res.json();
}

async function LikePost(postId: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return patch(`http://localhost:8080/feeds/likes/${postId}`, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);
      Posts()
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  // var login_token = JSON.parse(localStorage.getItem("token"));

  // console.log(login_token);

  // const url = `http://localhost:8080/feeds/likes/${postId}`;
  // const options = {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${login_token}`,
  //   },
  // };
  // const res = await fetch(url, options);
  // return await res.json();
}
//const url = `http://localhost:8080/feeds/comments/${postID}` =>
// token => GET => used to get commnet for unique post

async function Comments(id: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));

  console.log(login_token);
  return get(`http://localhost:8080/feeds/comments/${id}`, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);
      localStorage.setItem("Comments", JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

//http://localhost:8080/feeds/comments/${postID}
//post the feed => http://localhost:8080/feeds/posts
//=> toke is reqired => body:{caption:"",posted_photos:required Array of photo path max photos uploaded 6 min 1 ,likes:[],location:""}

// return patch(`http://localhost:8080/feeds/likes/${postId}`, {
//   headers: { Authorization: `Bearer ${login_token}` },
// })
//   .then((res: any) => {
//     return res;
//   })
//   .catch((err) => console.log(err));

function UploadProfile(payload: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));
  var userId = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userId._id);
  console.log(login_token);
  return patch(`http://localhost:8080/users/profile/${userId._id}`, payload, {
    headers: { Authorization: `Bearer ${login_token}` },
  }).then((response: any) => {
    console.log(response);

    getImage();

    return response;
  });
}

function getImage() {
  var login_token = JSON.parse(localStorage.getItem("token"));
  var userId = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userId._id);
  console.log(login_token);
  return get(`http://localhost:8080/users/profile/${userId._id}`, {
    headers: { Authorization: `Bearer ${login_token}` },
  }).then((response: any) => {
    console.log(response);

    localStorage.setItem("currentUser", JSON.stringify(response));
    return response;
  });
}

function EditProfile(payload: any) {
  var login_token = JSON.parse(localStorage.getItem("token"));
  var userId = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userId._id);
  console.log(login_token);
  return patch(`http://localhost:8080/users/${userId._id}`, payload, {
    headers: { Authorization: `Bearer ${login_token}` },
  })
    .then((response: any) => {
      console.log(response);
      // localStorage.setItem("currentUser", JSON.stringify(response));
      getImage();
      return response;
    })
    .catch((err) => console.log(err.message));
}

function Posts() {
  var login_token = JSON.parse(localStorage.getItem("token"));
  console.log(login_token);

  return get(`${baseURL}/feeds/posts`, {
    headers: { Authorization: `Bearer ${login_token}` },
  }).then((response: any) => {
    console.log(response);
    localStorage.setItem("Posts", JSON.stringify(response));

    return response;
  });
}

function verifyEmail(token: string, payload: any) {
  console.log(token);
  return post(`${baseURL}/auth/send-verification-email`, payload, {
    headers: { authorization: ` Bearer ${token}` },
  }).then((response: any) => {
    console.log(response.token);
    localStorage.setItem("token", JSON.stringify(response.token));
    // history.push("/auth/login");
    // window.location.reload();

    return response;
  });
}

function getToken() {
  var verify_token = JSON.parse(localStorage.getItem("token"));
  console.log(verify_token);
  return post(`${baseURL}/auth/verify-email?token=${verify_token}`, {
    headers: { authorization: ` Bearer ${verify_token}` },
  }).then((response: any) => {
    console.log(response);

    return response;
  });
}

// const url = `http://localhost:8080/auth/reset-password?token=${forgotToken}` => body password

function resetPassword(forgotToken: any,payload:any) {
  
  return post(`http://localhost:8080/auth/reset-password?token=${forgotToken}`,payload).then(
    (response: any) => {
      console.log(response);
      return response;
    }
  );
}


//http://localhost:8080/auth/forgot-password
function forgotPassword(payload: any) {
  console.log(payload);
  return post(`http://localhost:8080/auth/forgot-password`,payload).then(
    (response: any) => {
      console.log(response);
      return response;
    }
  );
}

function register(payload: any) {
  return post(`${baseURL}/auth/register`, payload).then((response: any) => {
    // handleLogin(response)
    return response;
  });
}
function Home() {
  history.push("/home");
  // window.location.reload();
}

function login(payload: any) {
  return post(`${baseURL}/auth/login`, payload).then((response: any) => {
    console.log(response);
    localStorage.setItem("loginToken", JSON.stringify(response.token));
    localStorage.setItem("loginUser", JSON.stringify(response));

    // handleLogin(response)
    return response;
  });
}

/*
 * Set new password
 */
function setPassword(payload: any, token: string) {
  return put("/api/user/password", payload, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
//http://localhost:8080/auth/forgot-password

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  get(`/api/auth/self`).then((response: any) => {
    localStorage.setItem("currentUser", JSON.stringify(response));
    currentUserSubject.next(response);
    currentOrganizationSubject.next(response._org[0]);
  });
}

/*
 * Register user method
 */
function handleLogin(response: any) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  Cookie.set("_token", response.token, { path: "/" });

  localStorage.setItem("currentUser", JSON.stringify(response.user));

  currentUserSubject.next(response.user);

  // currentOrganizationSubject.next(response.user._org[0]);

  if (response.user && !response.user._pre) {
    history.push(paths.home);
    window.location.reload();
  }
}
