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
});

