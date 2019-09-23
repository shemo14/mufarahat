import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import aboutApp from './AboutAppReducer';
import rules from './RulesReducer';
import contactUs from './ContactUsReducer';
import faq from './FaqReducer';
import sweet from './SweetReducer';
import newlyAdded from './NewlyAddedReducer';
import products from './ProductsReducer';
import product from './ProductReducer';
import recentOffers from './RecentOffersReducer';
import boxes from './BoxesReducer';
import boxProducts from './BoxProductsReducer';
import searchResult from './SearchReducer';
import setFav from './SetFavReducer';
import favs from './FavsReducer';
import rate from './RateReducer';
import addCart from './AddToCartReducer';
import cart from './CartReducer';
import cities from './PaymentReducer';
import packages from './PackagesReducer';
import completeOrder from './CompleteOrderReducer';
import myOrders from './MyOrdersReducer';
import newOrder from './NewOrderReducer';
import finishOrder from './FinishOrderReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    aboutApp,
    rules,
    contactUs,
    faq,
    sweet,
    newlyAdded,
    products,
    product,
    recentOffers,
    boxes,
    boxProducts,
    searchResult,
    setFav,
    favs,
    rate,
    addCart,
    cart,
    cities,
    packages,
    completeOrder,
    myOrders,
    newOrder,
    finishOrder,
});

