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

const favs=[
    {id:1 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:2 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:3 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:4 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:5 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:6 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
]


class Favourites extends Component {
    constructor(props){
        super(props);

        this.state={
            favs,
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            fav:true,
            refreshed: false,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    onFavPress(){
        this.setState({fav: !this.state.fav , refreshed:!this.state.refreshed})
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={[styles.scrollParent2 , { alignSelf: 'center', flex: 1, margin: 7 }]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                    <Image source={item.image} style={styles.scrollImg2} resizeMode={'contain'} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>{item.oldPrice}</Text>
                <TouchableOpacity onPress={() => this.onFavPress()} style={{alignSelf:'flex-end'}}>
                    <Icon type={'FontAwesome'} name={'heart'} style={{ fontSize: 20, color: this.state.fav? '#ff5252' : COLORS.lightgray }} />
                </TouchableOpacity>
            </View>
        );
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
                        <Text style={[styles.headerText , {top:15}]}>{ i18n.t('favorites') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:60}}>
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.state.favs}
                                    renderItem={({item}) => this.renderItems(item)}
                                    numColumns={2}
                                    keyExtractor={this._keyExtractor}
                                    extraData={this.state.refreshed}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'favourites'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Favourites;