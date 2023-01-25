import { makeAutoObservable, observable } from "mobx";

class FakeStoreDataStore {
  constructor() {
    makeAutoObservable(this);
  }
  allProducts() {}
  categoryNames() {}
  itemesByCategory() {}
  userInfo() {}
  decrease() {}

  cartItems = [];
  setCartItem(e) {
    this.cartItems = [e];
  }
  canLog = [false];
  setCanLog(e) {
    this.canLog = [e];
  }
  isAdmin = [false];
  setIsAdmin(e) {
    this.isAdmin = [e];
  }
  cartItem = [];
  setCartItem(e) {
    this.cartItem = [e];
  }
  showCat = [true];
  setShowCat(e) {
    this.showCat = [e];
  }

  incerase() {}
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

observable();
