import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, ListItem, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
import {getProduct , getSetFav , getRate, profile , setCart} from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class Product extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            fav:false,
            starCount:0,
            value:1,
            loader: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.getProduct( this.props.lang , this.props.navigation.state.params.id , token )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ fav: nextProps.product.isLiked, starCount: nextProps.product.rate, loader: nextProps.loader });
    }

    renderLoader(){
        if (this.state.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.labelBackground} />
                </View>
            );
        }
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.getRate( this.props.lang , this.props.navigation.state.params.id , rating , token )
    }

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


    onFavPress(){
        this.setState({fav: !this.state.fav })
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.getSetFav( this.props.lang , this.props.navigation.state.params.id , token )
    }

    addToCart(){
        const token =  this.props.user ?  this.props.user.token : null;
        const quantity = this.state.value ;
        this.props.setCart( this.props.lang , this.props.navigation.state.params.id , quantity , token , this.props)
    }


    increment(){
        this.setState({value: this.state.value + 1 })
    }

    decrement(){
        if (this.state.value > 1)
            this.setState({value: this.state.value - 1})
    }

    onFocus(payload){
        this.setState({ status: null });
        this.componentWillMount()
    }

    render() {
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: '#00000099'}]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.onFavPress()}  style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'heart'} style={[styles.leftHeaderIcon , {color: this.state.fav? '#ff5252' : COLORS.lightgray }]} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    { this.renderLoader() }
                    <Swiper key={this.props.product.images.length} horizontal={Platform.OS === 'ios' ? true :false} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                        {
                            this.props.product ?
                            this.props.product.images.map((img, i) =>{
                                return (
                                    <View key={i} style={styles.swiperimageEvent}>
                                        <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} resizeMode={'cover'}/>
                                    </View>
                                )
                            }) : (<View />)
                        }
                    </Swiper>

                    <View style={styles.productContainer}>
                        <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{this.props.product.price} { i18n.t('RS') }</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>{  this.props.product.old_price != this.props.product.price ? this.props.product.old_price + ' ' + i18n.t('RS') : '' }</Text>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>{this.props.product.name}</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{this.props.product.category}</Text>
                        { this.props.user ? (
                            <Animatable.View animation="zoomIn" duration={1000} style={styles.mv5}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    fullStarColor={'#f0aa0c'}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starSize={20}
                                    starStyle={styles.starStyle}
                                />
                            </Animatable.View>
                        ) : ( <View /> ) }

                        <View style={styles.availableProduct}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>{i18n.t('total')} : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>{ this.state.value * this.props.product.price } { i18n.t('RS') }</Text>
                        </View>
                        <View style={styles.counterParent}>
                            <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                                <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                            </TouchableOpacity>
                            <Text style={[styles.countText ]}>{this.state.value}</Text>
                            <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                                <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                            </TouchableOpacity>
                        </View>


                        <Animatable.View animation="flash" duration={1400}>
                            <Button onPress={() => this.addToCart()} style={styles.cartBtn}>
                                <Image source={require('../../assets/images/shopping_cart.png')} style={[styles.btnImg , styles.transform]} resizeMode={'contain'}/>
                                <Text style={styles.btnTxt}> {i18n.t('addToCart')}</Text>
                            </Button>
                        </Animatable.View>

                        <View style={styles.line}/>
                        <View style={styles.desc}>
                            <Text style={[styles.type , styles.aSFS , styles.mb10 , {color:COLORS.boldgray}]}>{i18n.t('itemSpecification')}</Text>
                            <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray , writingDirection: I18nManager.isRTL ? 'rtl' : ' ltr'}]}>{this.props.product.desc}</Text>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , product , setFav , rate , profile , addCart}) => {
    return {
        lang: lang.lang,
        product: product.product,
        setFav: setFav.fav,
        rate: rate.rate,
        addCart: addCart.addCart,
        loader: product.loader,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getProduct , getSetFav , getRate , profile , setCart})(Product);