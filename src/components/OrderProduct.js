import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, ListItem, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

const images = [
    {
        props: {
            source: require('../../assets/images/pic_two.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/product_pic.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/pic_two.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/product_pic.png')
        }
    },
]

class OrderProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            value:0,
            images,
            fancyModal: false,
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


    fancyModal = () => {
        this.setState({ fancyModal: !this.state.fancyModal });
    };

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.fancyModal()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/zoom.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <Swiper horizontal={false} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                        {
                            this.state.images.map((img,i) => (
                                    <Image source={ img.props.source } style={styles.swiperimageEvent} resizeMode={'cover'}/>
                            ))

                        }
                    </Swiper>
                    <View style={{ alignItems:'center'  , marginVertical:10}}>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم المنتج</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>تصنيفات حلويات شرقية</Text>
                        <Text style={[styles.type ,{color:COLORS.labelBackground}]}>عدد الاصناف 4</Text>
                        <View style={[ styles.availableProduct,{justifyContent:'space-between', paddingHorizontal:15 , paddingVertical:7 }]}>
                            <View style={{flexDirection:'row'}}>
                               <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر المنتج : </Text>
                               <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر التغليف : </Text>
                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                            </View>
                        </View>

                        <View style={[styles.desc , {marginBottom:25 , marginTop:10}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , alignSelf:'flex-start' }]}>مواصفات الطلب</Text>
                            <Text style={[styles.type ,{color:COLORS.mediumgray, alignSelf:'flex-start'}]}>طرسقة التغليف : تغليف هدايا</Text>
                            <Text style={[styles.type ,{color:COLORS.mediumgray, alignSelf:'flex-start'}]}>مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة</Text>
                        </View>

                        <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>تكلفة الطلبية كاملة : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر التوصيل : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>

                        <Button onPress={() => this.props.navigation.navigate('cart')} style={[styles.cartBtn , {marginVertical:35}]}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={{width:20 , height:20 , marginRight:5}} resizeMode={'contain'}/>
                            <Text style={styles.btnTxt}> اضف الي السلة</Text>
                        </Button>
                    </View>

                    <Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
                        <ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={this.state.images}/>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default OrderProduct;