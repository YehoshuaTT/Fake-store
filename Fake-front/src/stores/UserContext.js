import { makeAutoObservable } from "mobx";

class UsersDataStore {
  canLog;
  isAdmin;
  token;
  cart_user_id;
  allUsers;
  constructor() {
    this.allUsers = [];
    this.canLog = false;
    this.isAdmin = true;
    this.carts = [];
    this.token = localStorage.getItem("token");
    this.cart_user_id = localStorage.getItem("id");
    makeAutoObservable(this);
  }

  userInfo() {}

  setCanLog(e) {
    this.canLog = e;
  }

  setIsAdmin(e) {
    this.isAdmin = e;
  }
  setAllUsers(e) {
    this.allUsers = e;
  }
  setCarts(e) {
    this.carts = e;
  }
  // userPurchases = async () => {
  //   const data = apiCalls("get", `/purchas/${this.cart_user_id}`);
  //   console.log(data);
  //   return data;
  // };
}

export default UsersDataStore;
