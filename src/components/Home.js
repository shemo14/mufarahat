import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, ListItem, Left, Button, Item, Input} from 'native-base'
import FooterSection from './FooterSection';
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import CountDown from 'react-native-countdown-component';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home_gray.png')} style={{ height: 20, width: 20 }} resizeMode={'contain'} /> )
    })






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
                        <Text style={[styles.headerText , {top:15}]}>{ i18n.t('home') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:70}}>
                            <View style={styles.inputView}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchPlaceholder') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <Image source={require('../../assets/images/search.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                            </View>
                            <View style={{paddingLeft:20}}>
                                <Text style={styles.type}>انواع الحلويات</Text>
                                <ScrollView style={{marginTop:10 , marginBottom:20}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_one.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>غريبة</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_two.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>شرقية</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_three.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>شامية</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_one.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>غريبة</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_two.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>شرقية</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.scrollParent}>
                                        <Image source={require('../../assets/images/pic_three.png')} style={styles.scrollImg} resizeMode={'cover'} />
                                        <Text style={[styles.type , styles.scrollText]}>شامية</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>صفقات اليوم</Text>
                                <ScrollView style={{marginVertical:10}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                        <CountDown
                                            size={12}
                                            until={1000}
                                            onFinish={() => alert('Finished')}
                                            style={styles.count}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            separatorStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            timeToShow={['H', 'M']}
                                            timeLabels={{H: null, M: null}}
                                            showSeparator
                                        />
                                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </View>
                                    <View style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                        <CountDown
                                            size={12}
                                            until={1000}
                                            onFinish={() => alert('Finished')}
                                            style={styles.count}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            separatorStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            timeToShow={['H', 'M']}
                                            timeLabels={{H: null, M: null}}
                                            showSeparator
                                        />
                                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </View>
                                    <View style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                        <CountDown
                                            size={12}
                                            until={1000}
                                            onFinish={() => alert('Finished')}
                                            style={styles.count}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            separatorStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            timeToShow={['H', 'M']}
                                            timeLabels={{H: null, M: null}}
                                            showSeparator
                                        />
                                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </View>
                                    <View style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                        <CountDown
                                            size={12}
                                            until={1000}
                                            onFinish={() => alert('Finished')}
                                            style={styles.count}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            separatorStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            timeToShow={['H', 'M']}
                                            timeLabels={{H: null, M: null}}
                                            showSeparator
                                        />
                                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </View>
                                    <View style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                        <CountDown
                                            size={12}
                                            until={1000}
                                            onFinish={() => alert('Finished')}
                                            style={styles.count}
                                            digitStyle={{backgroundColor: 'transparent'}}
                                            digitTxtStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            separatorStyle={{color: COLORS.labelBackground , fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans'}}
                                            timeToShow={['H', 'M']}
                                            timeLabels={{H: null, M: null}}
                                            showSeparator
                                        />
                                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </View>
                                </ScrollView>
                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>المضافة حديثا</Text>
                                <ScrollView style={{marginVertical:10}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                         <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                         <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                         <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_two-1.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                         <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={styles.scrollParent2}>
                                        <Image source={require('../../assets/images/pic_of_sweet.png')} style={styles.scrollImg2} resizeMode={'contain'} />
                                        <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم الحلويات</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>التصنيف</Text>
                                         <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

// const mapStateToProps = ({ lang , profile}) => {
//     return {
//         lang: lang.lang,
//         user: profile.user,
//     };
// };
// export default connect(mapStateToProps, {})(Home);
export default Home;