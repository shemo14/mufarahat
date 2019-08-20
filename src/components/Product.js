import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, ListItem, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class Product extends Component {
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
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.onFavPress()}  style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'heart'} style={[styles.leftHeaderIcon , {color: this.state.fav? '#ff5252' : COLORS.lightgray }]} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <Swiper horizontal={false} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                <Image source={require('../../assets/images/pic_two.png')} style={styles.swiperimageEvent} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/pic_one.png')} style={styles.swiperimageEvent} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/pic_two.png')} style={styles.swiperimageEvent} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/pic_one.png')} style={styles.swiperimageEvent} resizeMode={'cover'}/>
                    </Swiper>

                    <View style={{ alignItems:'center'  , marginVertical:10}}>
                        <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>12 ريال</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>30 ريال</Text>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم المنتج</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>تصنيفات حلويات شرقية</Text>
                        <View style={{marginVertical:5}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#ffcd00'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={20}
                                starStyle={{color: '#ffcd00', marginHorizontal: 2}}
                            />
                        </View>
                        <View style={styles.availableProduct}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>الكمية الموجودة : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>50 منتج</Text>
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
                        <Button style={styles.cartBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={{width:20 , height:20 , marginRight:5}} resizeMode={'contain'}/>
                            <Text style={styles.btnTxt}> اضف الي السلة</Text>
                        </Button>
                        <View style={styles.line}/>
                        <View style={styles.desc}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , alignSelf:'flex-start' , marginBottom:10}]}>مواصفات السلعة</Text>
                            <Text style={[styles.type ,{color:COLORS.mediumgray, alignSelf:'flex-start'}]}>مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة</Text>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
}

export default Product;