import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat";
import { setDoc } from "firebase/firestore";
import {
  addDoc,
  arrayUnion,
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getDownloadURL,
  query,
  storage,
  storageRef,
  where,
} from "services/firebaseInit";
import Timestamp = firebase.firestore.Timestamp;

const getCategories = async () => {
  const categories = [];
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.log("Get categories error:", error);
  }
  return categories;
};

const getPosts = async () => {
  const posts = [];
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    for (let post of querySnapshot.docs) {
      const postData = post.data();
      if (!postData.isHot) {
        const categorySnapshot = await getDoc(postData.category);
        const category = categorySnapshot.data();
        const imageRef = storageRef(storage, postData.image);
        const image = await getDownloadURL(imageRef);
        posts.push({ ...postData, id: post.id, category, image });
      }
    }
  } catch (error) {
    console.log("Get posts error:", error);
  }
  return posts;
};

const getHotPosts = async () => {
  const posts = [];
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    for (let post of querySnapshot.docs) {
      const postData = post.data();
      if (postData.isHot) {
        const categorySnapshot = await getDoc(postData.category);
        const category = categorySnapshot.data();
        const imageRef = storageRef(storage, postData.image);
        const image = await getDownloadURL(imageRef);
        posts.push({ ...postData, id: post.id, category, image });
      }
    }
  } catch (error) {
    console.log("Get posts error:", error);
  }
  return posts;
};

const getConfig = async () => {
  let config: any = {};
  try {
    const querySnapshot = await getDocs(collection(db, "config"));
    querySnapshot.forEach((doc) => {
      config = doc.data();
    });
  } catch (error) {
    console.log("Get config error:", error);
  }
  return config;
};

const getTrusted = async (id: string) => {
  let tracked = null;
  try {
    const docRef = doc(db, "trusted", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      tracked = docSnapshot.data();
    }
  } catch (error) {
    console.log("Get tracked error:", error);
  }
  return tracked;
};

const savePushToken = async (campId: string, token: string) => {
  try {
    const docRef = doc(db, "push-tokens", campId);
    await setDoc(
      docRef,
      {
        token: arrayUnion(token),
      },
      { merge: true }
    );
  } catch (error) {
    console.log("Save push token error:", error);
  }
};

const getCommentsByPostId = async (postId: string) => {
  const comments = [];
  try {
    const q = query(collection(db, "comments"), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      comments.push({
        id: doc.id,
        created_at: commentData.created_at.toDate(),
        comment: commentData.comment,
        userDisplayName: commentData.userDisplayName,
      });
    });
  } catch (error) {
    console.log("Get comments error:", error);
  }
  return comments;
};

const saveComment = async (postId: string, comment: string, userDisplayName: string) => {
  try {
    const userId = auth.currentUser?.uid; // get the ID of the currently authenticated user
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    const commentData = {
      postId,
      comment,
      userDisplayName,
      userId, // include the userId in the document data
      created_at: Timestamp.now(),
    };
    await addDoc(collection(db, "comments"), commentData);
    return commentData;
  } catch (error) {
    console.log("Save comment error:", error);
  }
};

const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

const createUserOrUpdate = async (uid: string, data: any) => {
  let userData = null;
  try {
    const userRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      await setDoc(userRef, data, { merge: true });
      userData = { uid, ...data };
    } else {
      await setDoc(userRef, data);
      userData = { uid, ...data };
    }
  } catch (error) {
    console.log("Error creating or updating user:", error);
  }
  return userData;
};
const getUser = async (uid: string) => {
  let userData = null;
  try {
    const docRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      userData = docSnapshot.data();
    }
  } catch (error) {
    console.log("Error getting user:", error);
  }
  return userData;
};

const deleteUser = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};

const deleteUserFromAuth = async () => {
  try {
    if (auth.currentUser) {
      await auth.currentUser.delete();
    }
  } catch (error) {
    console.log("Error deleting user from Firebase Auth:", error);
  }
};

export default {
  getCategories,
  saveComment,
  getPosts,
  getHotPosts,
  getConfig,
  getTrusted,
  savePushToken,
  getCommentsByPostId,
  createUser,
  createUserOrUpdate,
  getUser,
  deleteUser,
  deleteUserFromAuth,
};
