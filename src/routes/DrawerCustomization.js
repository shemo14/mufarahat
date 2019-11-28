import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, Dimensions} from "react-native";
import i18n from "../../locale/i18n";
import styles from "../../assets/styles";
import COLORS from "../consts/colors";
import {logout, tempAuth} from "../actions";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    tabEvent(tabName){
		if (tabName == 'login' && this.props.user){
			this.props.logout(this.props.user.token);
			this.props.tempAuth();
		}

        this.props.onClose();
		if (tabName == 'settings'){
            return this.props.navigation.navigate(this.props.user ? tabName : 'login')
        }

		if (tabName == 'rules'){
			return this.props.navigation.navigate(tabName, { navigate: 'home' })
        }

        this.props.navigation.navigate(tabName)
    }

    renderMenuTabs(tabName){
        // is Active
        if (this.props.routeName === tabName){
            let activePath = '';
            let activeText = '';

            switch (tabName) {
                case 'home':
                    activePath = require('../../assets/images/home.png');
                    activeText =  i18n.t('home') ;
                    break;
                case 'offers':
                    activePath = require('../../assets/images/bargain_blue.png');
                    activeText = i18n.t('offers');
                    break;
                case 'boxes':
                    activePath = require('../../assets/images/diamond_blue.png');
                    activeText =  i18n.t('boxes') ;
                    break;
                case 'categories':
                    activePath = require('../../assets/images/note_blue.png');
                    activeText =  i18n.t('categories') ;
                    break;
                case 'aboutApp':
                    activePath = require('../../assets/images/conversation_blue.png');
                    activeText =  i18n.t('aboutApp') ;
                    break;
                case 'faq':
                    activePath = require('../../assets/images/customer_service_blue.png');
                    activeText =  i18n.t('faq') ;
                    break;
                case 'contactUs':
                    activePath = require('../../assets/images/contact_blue.png');
                    activeText =  i18n.t('contactUs') ;
                    break;
                case 'settings':
                    activePath = require('../../assets/images/settings_blue.png');
                    activeText =  i18n.t('settings') ;
                    break;
                case 'rules':
                    activePath = require('../../assets/images/law_blue.png');
                    activeText =  i18n.t('terms') ;
                    break;
                case 'login':
                    activePath = require('../../assets/images/sign_out_blue.png');
                    activeText =  i18n.t('logout') ;
                    break;
            }

            return(
                <TouchableOpacity style={styles.activeLink}>
                    <Image style={[styles.menuImg, styles.transform]} resizeMode={'contain'} source={activePath}/>
                    <Text style={[styles.type ,{color:COLORS.labelBackground}]}>{activeText}</Text>
                </TouchableOpacity>
            );
        }


        let path = '';
        let disabledText =''
        switch (tabName) {
            case 'home': path = require('../../assets/images/home_gray.png');
                disabledText =  i18n.t('home') ;
                break;
            case 'offers': path = require('../../assets/images/bargain.png');
                disabledText = i18n.t('offers');
                break;
            case 'boxes': path = require('../../assets/images/diamond.png');
                disabledText =  i18n.t('boxes') ;
                break;
            case 'categories': path = require('../../assets/images/note.png');
                disabledText =  i18n.t('categories') ;
                break;
            case 'aboutApp': path = require('../../assets/images/conversation.png');
                disabledText =  i18n.t('aboutApp') ;
                break;
            case 'faq': path = require('../../assets/images/customer_service.png');
                disabledText =  i18n.t('faq') ;
                break;
            case 'contactUs': path = require('../../assets/images/contact.png');
                disabledText =  i18n.t('contactUs') ;
                break;
            case 'settings': path = require('../../assets/images/settings.png');
                disabledText =  i18n.t('settings') ;
                break;
            case 'rules': path = require('../../assets/images/law.png');
                disabledText =  i18n.t('terms') ;
                break;
            case 'login': path = require('../../assets/images/sign_out.png');
                disabledText =  this.props.user ? i18n.t('logout') : i18n.t('loginButton') ;
                break;
        }
        return(

            <TouchableOpacity style={styles.disabledLink} onPress={() => this.tabEvent(tabName)} >
                <Image style={[styles.menuImg, styles.transform]} resizeMode={'contain'} source={path}/>
                <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{disabledText}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        let { user } = this.props;
        if (user == null)
            user = {
                avatar: 'https://shams.arabsdesign.com/mufarahat-backend/images/users/default.png',
                name: i18n.t('guest'),
                phone: null
            }

        return (
            <View style={[styles.drawerParent]}>
                <TouchableOpacity onPress={() => [this.props.navigation.navigate(this.props.user ? 'profile' : 'login') , this.props.onClose()]} style={styles.directionRowCenter}>
                    <View style={styles.mandob}>
                        <Image source={{ uri: user.avatar }} style={[styles.profileImg , {height:50}]} resizeMode={'cover'} />
                    </View>
                    <View style={styles.directionColumnCenter}>
                        <Text style={[styles.ques]}>{ user.name }</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray  }]}>{ user.phone }</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.line}/>
                <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
                    <View style={[styles.drawerParent ]}>


                        {  this.renderMenuTabs('home') }


                        {  this.renderMenuTabs('offers') }


                        {  this.renderMenuTabs('boxes') }


                        {  this.renderMenuTabs('categories') }


                        {  this.renderMenuTabs('aboutApp') }


                        {  this.renderMenuTabs('faq') }


                        {  this.renderMenuTabs('contactUs') }


                        {  this.renderMenuTabs('settings') }


                        {  this.renderMenuTabs('rules') }


                        {  this.renderMenuTabs('login') }


                    </View>
                </ScrollView>
            </View>

        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
	return {
		auth: auth.user,
		user: profile.user
	};
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);