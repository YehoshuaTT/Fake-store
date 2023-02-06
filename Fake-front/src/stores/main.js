import FakeStoreDataStore from "./productsContext";
import UsersDataStore from "./UserContext";
const productsData = new FakeStoreDataStore();
const userData = new UsersDataStore();
const context = { productsData, userData };
export default context;
