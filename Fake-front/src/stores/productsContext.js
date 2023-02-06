import { makeAutoObservable } from "mobx";
import apiCalls from "../functions/apiRequest";

class FakeStoreDataStore {
  cartItem;
  categoryItems;
  token;
  cart_user_id;
  constructor() {
    this.cartItem = [];
    this.categoryItems = [];
    this.token = localStorage.getItem("token");
    this.cart_user_id = localStorage.getItem("id");
    makeAutoObservable(this);
  }

  allProducts() {}

  itemesByCategory() {}

  sendCartToDB = async (product, AddOrRemove) => {
    const theCart = {
      id: this.cart_user_id,
      products: product,
      type: AddOrRemove,
    };
    apiCalls("post", `/cart/${this.cart_user_id}`, theCart);
  };

  empy = async () => {
    this.setCartItem([]);
    const theCart = {
      id: this.cart_user_id,
      products: [],
      type: "empty",
    };
    apiCalls("post", `/cart/${this.cart_user_id}`, theCart);
  };

  increase = (e) => {
    this.sendCartToDB(e._id, "add");
    let allItems = [...this.cartItem];
    const todo = allItems.findIndex((i) => i._id === e._id);
    if (todo === -1) allItems.push(e);
    else ++allItems[todo].amount;

    this.setCartItem(allItems);
  };

  decrease = (item, amount) => {
    this.sendCartToDB(item._id, "remove");
    const id = this.cartItem.findIndex((v) => v._id === item._id);
    if (id === -1) return;
    if (amount === 1) {
      let toBeChange = [...this.cartItem];
      toBeChange.splice(id, 1);
      this.setCartItem(toBeChange);
    } else {
      item.amount = amount - 1;
      let toBeChange = [...this.cartItem];
      toBeChange[id] = item;
      this.setCartItem(toBeChange);
    }
  };
  setCartItem = (e) => {
    this.cartItem = e;
  };

  setCanLog(e) {
    this.canLog = e;
  }

  setCatItems(e) {
    this.categoryItems = [e];
  }
}

export default FakeStoreDataStore;
