import { makeAutoObservable } from "mobx";
import apiCalls from "../functions/apiRequest";

class FakeStoreDataStore {
  cartItem;
  showCat;

  constructor() {
    this.cartItem = [];
    this.showCat = true;
    makeAutoObservable(this);
  }
  allProducts() {}
  categoryNames() {}
  itemesByCategory() {}
  userInfo() {}
  cart_user_id = localStorage.getItem("id");

  sendCartToDB = async (product, AddOrRemove) => {
    const theCart = {
      id: this.cart_user_id,
      products: product,
      type: AddOrRemove,
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
  canLog = [false];
  setCanLog(e) {
    this.canLog = e;
  }
  isAdmin = [false];
  setIsAdmin(e) {
    this.isAdmin = e;
  }

  setShowCat(e) {
    this.showCat = e;
  }
}

export default FakeStoreDataStore;

// //DO NOT defined method with arrow when you NOT destrucr it at the components:
// //see example in "Input" component
// addTodo(text) {
//   this.todos.push(text);
// }

// //DO defined method with arrow when you destrucr it at the components:
// //see example in "Todo" component
// delTodo = (id) => {
//   this.todos = this.todos.filter((v, i) => i !== id);
// };
