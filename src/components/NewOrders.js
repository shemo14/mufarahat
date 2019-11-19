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



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class NewOrders extends Component {
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
                        <Text style={[styles.headerText , styles.t15]}>{ i18n.t('myOrders') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>

                            <View style={styles.orderTabs}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('myOrders')}  style={styles.normalTab}>
                                    <Text style={styles.normalTabText} >{ i18n.t('implementedOrd') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.activeTab}>
                                    <Text style={styles.activeTabText} >{ i18n.t('newOrd') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.flatContainer}>
                                <View style={[styles.scrollParent2 , styles.orderProduct ]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={styles.oldPrice}>30 ريال</Text>
                                </View>
                                <View style={[styles.scrollParent2 , styles.orderProduct ]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={[styles.scrollImg2 , {position:'absolute' , left:10}]} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={[styles.scrollImg2 , {position:'absolute' , right:10}]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={styles.oldPrice}>30 ريال</Text>
                                </View>
                                <View style={[styles.scrollParent2 , styles.orderProduct ]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={styles.oldPrice}>30 ريال</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'myOrders'} navigation={this.props.navigation}/>
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

export default NewOrders;