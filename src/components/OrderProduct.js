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
import * as Animatable from 'react-native-animatable';



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
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.fancyModal()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/zoom.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <Swiper horizontal={Platform.OS === 'ios' ? true :false} dotStyle={styles.eventdoteStyle2} activeDotStyle={styles.eventactiveDot2}
                            containerStyle={styles.eventswiper2} showsButtons={false} autoplay={true}>
                        {
                            this.state.images.map((img,i) => (
                                <View style={styles.directionColumn}>
                                    <View style={styles.swiperimageEvent2}>
                                        <Image source={ img.props.source } resizeMode={'cover'}/>
                                    </View>
                                    <View style={styles.prodDet}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم المنتج</Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>تصنيفات حلويات شرقية</Text>
                                        <Text style={[styles.type ,{color:COLORS.labelBackground}]}>{ i18n.t('NumberOfItems') } 4</Text>
                                        <Animatable.View animation="zoomIn" duration={1000} style={[ styles.availableProduct,styles.pack]}>
                                            <View style={styles.directionRow}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('productPrice') } : </Text>
                                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                                            </View>
                                            <View style={styles.directionRow}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('packagingPrice') } : </Text>
                                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                                            </View>
                                        </Animatable.View>

                                        <View style={[styles.desc , styles.mb25 , styles.mt10 ]}>
                                            <Text style={[styles.type, styles.aSFS ,{color:COLORS.boldgray}]}>{ i18n.t('orderSpecification') }</Text>
                                            <Text style={[styles.type, styles.aSFS ,{color:COLORS.mediumgray}]}>{ i18n.t('packingMethod') } : تغليف هدايا</Text>
                                            <Text style={[styles.type, styles.aSFS ,{color:COLORS.mediumgray , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة</Text>
                                        </View>
                                    </View>
                                </View>
                            ))

                        }
                    </Swiper>
                    <View style={styles.prodDet}>
                       <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('fullOrderCost') } : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('deliveryPrice') } : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>

                        <Animatable.View animation="flash" duration={1400}>
                            <Button onPress={() => this.props.navigation.navigate('cart')} style={[styles.cartBtn , styles.mv35 ]}>
                                <Image source={require('../../assets/images/shopping_cart.png')} style={[styles.btnImg , styles.transform]} resizeMode={'contain'}/>
                                <Text style={styles.btnTxt}> { i18n.t('addToCart') }</Text>
                            </Button>
                        </Animatable.View>
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