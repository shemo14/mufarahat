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
            <Animatable.View animation="zoomIn" duration={1000} style={[styles.scrollParent2 , styles.touchProduct]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                    <Image source={item.image} style={styles.scrollImg2} resizeMode={'contain'} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                <TouchableOpacity onPress={() => this.onFavPress()} style={{alignSelf:'flex-end'}}>
                    <Icon type={'FontAwesome'} name={'heart'} style={{ fontSize: 20, color: this.state.fav? '#ff5252' : COLORS.lightgray }} />
                </TouchableOpacity>
            </Animatable.View>
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
                        <Text style={[styles.headerText , styles.t15]}>{ i18n.t('favorites') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>
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

export default Favourites;