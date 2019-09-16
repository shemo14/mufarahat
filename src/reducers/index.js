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
});

