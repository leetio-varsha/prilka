import { setDoc } from "firebase/firestore";
import { collection, db, doc, getDoc, getDocs, getDownloadURL, storage, storageRef } from "services/firebaseInit";
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
      const categorySnapshot = await getDoc(postData.category);
      const category = categorySnapshot.data();
      const imageRef = storageRef(storage, postData.image);
      const image = await getDownloadURL(imageRef);
      posts.push({ ...postData, id: post.id, category, image });
      return posts;
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

const savePushToken = async (deviceId: string, token: string) => {
  try {
    const docRef = doc(db, "push-tokens", deviceId);
    await setDoc(docRef, { token });
  } catch (error) {
    console.log("Save push token error:", error);
  }
};
export default { getCategories, getPosts, getConfig, getTrusted, savePushToken };
