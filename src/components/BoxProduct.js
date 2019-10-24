import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import {Container, Content, Icon, Header, Button} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class BoxProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            fav:true,
            starCount:3,
            value:0
        }
    }


    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
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
    }

    increment(){
        this.setState({value: this.state.value + 1 })
    }

    decrement(){
        if (this.state.value === 0){
            this.setState({value: 0})
        } else {
            this.setState({value: this.state.value - 1})
        }
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
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.onFavPress()}  style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'heart'} style={[styles.leftHeaderIcon , {color: this.state.fav? '#ff5252' : COLORS.lightgray }]} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <Swiper  horizontal={Platform.OS === 'ios' ? true :false} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                        <View style={styles.swiperimageEvent}>
                        <Image source={require('../../assets/images/pic_two.png')} resizeMode={'cover'}/>
                        </View>
                        <View style={styles.swiperimageEvent}>
                        <Image source={require('../../assets/images/pic_one.png')} resizeMode={'cover'}/>
                        </View>
                        <View style={styles.swiperimageEvent}>
                        <Image source={require('../../assets/images/pic_two.png')}  resizeMode={'cover'}/>
                        </View>
                        <View style={styles.swiperimageEvent}>
                        <Image source={require('../../assets/images/pic_one.png')}  resizeMode={'cover'}/>
                        </View>
                    </Swiper>

                    <View style={styles.productContainer}>
                        <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                        <Text style={styles.oldPrice }>30 ريال</Text>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم المنتج</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>تصنيفات حلويات شرقية</Text>
                        <Animatable.View animation="zoomIn" duration={1000} style={styles.mv5}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#f0aa0b'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={20}
                                starStyle={styles.starStyle}
                            />
                        </Animatable.View>
                        <View style={styles.availableProduct}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>{i18n.t('existingQuantity')} : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>50 منتج</Text>
                        </View>
                        <View style={styles.counterParent}>
                            <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                                <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                            </TouchableOpacity>
                            <Text style={[styles.countText]}>{this.state.value}</Text>
                            <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                                <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                            </TouchableOpacity>
                        </View>


                        <Animatable.View animation="flash" duration={1400}>
                            <Button style={styles.cartBtn}>
                                <Image source={require('../../assets/images/shopping_cart.png')} style={[styles.btnImg , styles.transform]} resizeMode={'contain'}/>
                                <Text style={styles.btnTxt}> {i18n.t('addToCart')}</Text>
                            </Button>
                        </Animatable.View>

                        <View style={styles.line}/>
                        <View style={styles.desc}>
                            <Text style={[styles.type , styles.aSFS , styles.mb10 , {color:COLORS.boldgray}]}>{i18n.t('boxContents')}</Text>
                            <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>- هذا النص هو مثال لنص يمكن ان يستبدل</Text>
                            <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>- هذا النص هو مثال لنص يمكن ان يستبدل</Text>
                            <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>- هذا النص هو مثال لنص يمكن ان يستبدل</Text>
                            <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>- هذا النص هو مثال لنص يمكن ان يستبدل</Text>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
}

export default BoxProduct;