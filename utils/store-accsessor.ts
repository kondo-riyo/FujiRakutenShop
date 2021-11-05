import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import items from '../store/items';
import toppings from '../store/toppings';
import user from '../store/user';
import cart from '../store/cart';
import apiItems from '../store/apiItems';
import admin from '../store/admin';

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items;
let ToppingsStore: toppings;
let UserStore: user;
let CartStore: cart;
let ApiItemsStore: apiItems;
let AdminStore: admin;

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store);
  ToppingsStore = getModule(toppings, store);
  UserStore = getModule(user, store);
  CartStore = getModule(cart, store);
  ApiItemsStore = getModule(apiItems, store);
  AdminStore = getModule(admin, store);
}

export { initialiseStores,  ItemsStore, ToppingsStore, UserStore, CartStore, ApiItemsStore, AdminStore}