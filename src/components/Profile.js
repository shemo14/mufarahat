import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import FooterSection from './FooterSection';
import RBSheet from "react-native-raw-bottom-sheet";
import DrawerCustomization from '../routes/DrawerCustomization';
import * as Animatable from 'react-native-animatable';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    setAnimate(availabel){
        if (availabel === 0){
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 1,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }

        console.log(availabel);
    }

    headerScrollingAnimation(e){
        if (e.nativeEvent.contentOffset.y > 30){
            console.log(e.nativeEvent.contentOffset.y);
            this.setAnimate(0)
        } else{
            this.setAnimate(1)
        }
    }

    closeDrawer(){
        this.RBSheet.close()
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Button transparent onPress={() => this.RBSheet.open()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                        <Text style={[styles.headerText , styles.t15]}>{ i18n.t('profile') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue.png') : require('../../assets/images/bg_blue2.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <Animatable.View animation="zoomIn" duration={1000} style={styles.profileImgParent}>
                            <Image source={require('../../assets/images/profile.png')} style={[styles.profileImg]} resizeMode={'cover'} />
                        </Animatable.View>

                        <View style={styles.directionColumnCenter}>
                            <Animatable.Text animation="fadeInUp" duration={1400} style={[styles.type , styles.termsText ,{color:COLORS.boldgray }]}>{ i18n.t('fullName') }</Animatable.Text>
                            <Animatable.View animation="fadeInUp" duration={1800}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')} style={styles.directionRowCenter}>
                                    <Image source={require('../../assets/images/edit_profile.png')} style={[styles.headerMenu , styles.transform , {marginRight:7}]} resizeMode={'contain'} />
                                    <Text style={[styles.type ,{color:COLORS.darkRed , marginVertical:10}]}>{ i18n.t('editProfile') }</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[styles.line , {borderColor:'#cfcfcf'}]}/>

                        <Animatable.View animation={I18nManager.isRTL ? "fadeInRight" : "fadeInLeft"} duration={2000} style={[ styles.directionRow , styles.ph23]}>
                            <Image source={require('../../assets/images/smartphone.png')} style={[styles.headerMenu ,styles.mr10]} resizeMode={'contain'} />
                            <Text style={[styles.type ,{color:COLORS.mediumgray}]}>12365478945</Text>
                        </Animatable.View>

                        <Animatable.View animation={I18nManager.isRTL ? "fadeInRight" : "fadeInLeft"} duration={2000} style={[ styles.directionRow , styles.ph23 , styles.mt15]}>
                            <Image source={require('../../assets/images/marker_gray.png')} style={[styles.headerMenu ,styles.mr10]} resizeMode={'contain'} />
                            <Text style={[styles.type ,{color:COLORS.mediumgray}]}>الرياض - جدة</Text>
                        </Animatable.View>

                        <View style={[styles.line , {borderColor:'#cfcfcf'}]}/>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('changeOldPass')} style={[ styles.directionRowCenter , {alignSelf:'center'}]}>
                            <Animatable.Text animation="fadeInUp" duration={2400} style={[styles.headerText ,{color:COLORS.labelBackground}]}>{ i18n.t('changePass') }</Animatable.Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </Content>

                <FooterSection routeName={'profile'} navigation={this.props.navigation}/>
                {/*drawer content*/}
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    duration={350}
                    customStyles={{
                        container: styles.drawerCont
                    }}
                >
                    <DrawerCustomization onClose={() => this.closeDrawer()} navigation={this.props.navigation}/>
                </RBSheet>
            </Container>

        );
    }
}

export default Profile;