import React, { Component } from "react";
import {Image, View, Dimensions, Platform, Text} from "react-native";
import {  Button, Footer, Icon, FooterTab } from 'native-base'
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import i18n from '../../locale/i18n'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

class FooterSection extends Component {
    constructor(props){
        super(props);
    }


    renderFooterTabs(tabName){
        // is Active
        if (this.props.routeName === tabName){
            let activePath = '';
            let activeText = '';

            switch (tabName) {
                case 'home':
                    activePath = require('../../assets/images/home.png');
                    activeText =  i18n.t('home') ;
                    break;
                case 'profile':
                    activePath = require('../../assets/images/user_blue.png');
                    activeText = i18n.t('user');
                    break;
                case 'favourites':
                    activePath = require('../../assets/images/heart_blue.png');
                    activeText =  i18n.t('favorites') ;
                    break;
                case 'myOrders':
                    activePath = require('../../assets/images/package_blue.png');
                    activeText =  i18n.t('myOrders') ;
                    break;
                case 'notifications':
                    activePath = require('../../assets/images/blue_notifcation.png');
                    activeText =  i18n.t('notifs') ;
                    break;
            }

            return(
                <Button transparent>
                    <View style={styles.activeDot}/>
                    <Image style={styles.footImg} resizeMode={'contain'} source={activePath}/>
                    <Text style={[styles.type ,styles.activeFoot]}>{activeText}</Text>
                </Button>
            );
        }


        let path = '';
        switch (tabName) {
            case 'home': path = require('../../assets/images/home_gray.png');
                break;
            case 'profile': path = require('../../assets/images/user.png');
                break;
            case 'favourites': path = require('../../assets/images/heart.png');
                break;
            case 'myOrders': path = require('../../assets/images/package.png');
                break;
            case 'notifications': path = require('../../assets/images/notifcation.png');
                break;
        }
        return(

            <Button transparent onPress={() => this.props.navigation.navigate(tabName)} >
                <Image style={styles.footImg} resizeMode={'contain'} source={path}/>
            </Button>
        );
    }


    render() {

        return (
            <Footer style={styles.footer}>
                <FooterTab style={styles.footerTab}>

                    {  this.renderFooterTabs('home') }


                    {  this.renderFooterTabs('profile') }


                    {  this.renderFooterTabs('favourites') }


                    {  this.renderFooterTabs('myOrders') }


                    {  this.renderFooterTabs('notifications') }

                </FooterTab>
            </Footer>
        );
    }
}

//
// const mapStateToProps = ({ profile }) => {
//     return {
//         user: profile.user,
//     };
// };
//
// export default connect(mapStateToProps, {})(FooterSection);
export default FooterSection;