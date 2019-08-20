import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import FooterSection from './FooterSection';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class MyOrders extends Component {
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

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                        <Text style={[styles.headerText , {top:15}]}>{ i18n.t('myOrders') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:60}}>

                            <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , marginTop:20}}>
                                 <TouchableOpacity style={styles.activeTab}>
                                    <Text style={styles.activeTabText} >الطلبات المنفذه</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('newOrders')} style={styles.normalTab}>
                                    <Text style={styles.normalTabText} >الطلبات الجديدة</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.flatContainer}>
                                <View style={[styles.scrollParent2 , { alignSelf: 'center' ,  width:'45%', margin: 7 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    <TouchableOpacity  style={{alignSelf:'flex-end'}}>
                                        <Image source={require('../../assets/images/dustbin_red.png')} style={{width:23 , height:23}} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.scrollParent2 , { alignSelf: 'center',  width:'45%', margin: 7 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={[styles.scrollImg2 , {position:'absolute' , left:10}]} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={[styles.scrollImg2 , {position:'absolute' , right:10}]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    <TouchableOpacity  style={{alignSelf:'flex-end'}}>
                                        <Image source={require('../../assets/images/dustbin_red.png')} style={{width:23 , height:23}} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.scrollParent2 , { alignSelf: 'center',  width:'45%', margin: 7 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderProduct')}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                    <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    <TouchableOpacity  style={{alignSelf:'flex-end'}}>
                                        <Image source={require('../../assets/images/dustbin_red.png')} style={{width:23 , height:23}} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'myOrders'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default MyOrders;