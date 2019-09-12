import React from "react";import { createStackNavigator, createAppContainer , createSwitchNavigator } from "react-navigation";import Login from '../components/Login'import ForgetPassword from '../components/ForgetPassword'import VerifyCode from '../components/VerifyCode'import ChangePass from '../components/ChangePass'import Register from '../components/Register'import VerifyAcc from '../components/VerifyAcc'import Home from '../components/Home'import Products from '../components/Products'import Favourites from "../components/Favourites";import Profile from "../components/Profile";import Product from "../components/Product";import EditProfile from "../components/EditProfile";import ChangeOldPass from "../components/ChangeOldPass";import PassCode from "../components/PassCode";import MyOrders from "../components/MyOrders";import NewOrders from "../components/NewOrders";import OrderProduct from "../components/OrderProduct";import Notifications from "../components/Notifications";import Offers from "../components/Offers";import Categories from "../components/Categories";import Boxes from "../components/Boxes";import SearchResult from "../components/SearchResult";import AboutApp from "../components/AboutApp";import Faq from "../components/Faq";import ContactUs from "../components/ContactUs";import Settings from "../components/Settings";import Rules from "../components/Rules";import NewOrderProduct from "../components/NewOrderProduct";import PaymentSteps from "../components/PaymentSteps";import Payment from "../components/Payment";import BoxProduct from "../components/BoxProduct";import Cart from "../components/Cart";const appStack =  createStackNavigator({	home: {		screen: Home,		navigationOptions: {			header: null		}	},	myOrders: {		screen: MyOrders,		navigationOptions: {			header: null		}	},	settings: {		screen: Settings,		navigationOptions: {			header: null		}	},	searchResult: {		screen: SearchResult,		navigationOptions: {			header: null		}	},	rules: {		screen: Rules,		navigationOptions: {			header: null		}	},	profile: {		screen: Profile,		navigationOptions: {			header: null		}	},	products: {		screen: Products,		navigationOptions: {			header: null		}	},	product: {		screen: Product,		navigationOptions: {			header: null		}	},	paymentSteps: {		screen: PaymentSteps,		navigationOptions: {			header: null		}	},	payment: {		screen: Payment,		navigationOptions: {			header: null		}	},	passCode: {		screen: PassCode,		navigationOptions: {			header: null		}	},	orderProduct: {		screen: OrderProduct,		navigationOptions: {			header: null		}	},	offers: {		screen: Offers,		navigationOptions: {			header: null		}	},	notifications: {		screen: Notifications,		navigationOptions: {			header: null		}	},	newOrderProduct: {		screen: NewOrderProduct,		navigationOptions: {			header: null		}	},	favourites: {		screen: Favourites,		navigationOptions: {			header: null		}	},	faq: {		screen: Faq,		navigationOptions: {			header: null		}	},	editProfile: {		screen: EditProfile,		navigationOptions: {			header: null		}	},	contactUs: {		screen: ContactUs,		navigationOptions: {			header: null		}	},	changeOldPass: {		screen: ChangeOldPass,		navigationOptions: {			header: null		}	},	categories: {		screen: Categories,		navigationOptions: {			header: null		}	},	cart: {		screen: Cart,		navigationOptions: {			header: null		}	},	boxProduct: {		screen: BoxProduct,		navigationOptions: {			header: null		}	},	boxes: {		screen: Boxes,		navigationOptions: {			header: null		}	},	aboutApp: {		screen: AboutApp,		navigationOptions: {			header: null		}	},});const authStack = createStackNavigator({	login: {		screen: Login,		navigationOptions: {			header: null		}	},	verifyAcc: {		screen: VerifyAcc,		navigationOptions: {			header: null		}	},	register: {		screen: Register,		navigationOptions: {			header: null		}	},	changePass: {		screen: ChangePass,		navigationOptions: {			header: null		}	},	verifyCode: {		screen: VerifyCode,		navigationOptions: {			header: null		}	},	forgetPassword: {		screen: ForgetPassword,		navigationOptions: {			header: null		}	},});const AppNavigator = createSwitchNavigator({	app: appStack,	auth: authStack,});export default createAppContainer(AppNavigator);