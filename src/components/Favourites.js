import React, { Component } from "react";
import {View, Text, Image, AsyncStorage, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import FooterSection from './FooterSection';
import RBSheet from "react-native-raw-bottom-sheet";
import DrawerCustomization from '../routes/DrawerCustomization';
import * as Animatable from 'react-native-animatable';
import FavProduct from './FavProduct';
import {getFavs,  profile} from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const IS_IPHONE_X 	= height === 812 || height === 896;
const is_iphone   	= Platform.OS === 'ios' ;

class Favourites extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            fav:true,
            refreshed: false,
            loader: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({ refreshed: true })
        AsyncStorage.getItem('deviceID').then(deviceID => {
            const token =  this.props.user ?  this.props.user.token : null;
            this.props.getFavs( this.props.lang, token, deviceID )
        })
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

    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.loader });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        console.log(item.index);

        return(
            <FavProduct data={item.item} navigation={this.props.navigation} />
        );
    }

    renderNoData(){
        if (this.props.favs && (this.props.favs).length <= 0){
            return(
                <View style={{ width: width - 50, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10, height: (80*height)/100 , borderColor: '#ddd', borderWidth: 1 }}>
                    <Image source={require('../../assets/images/empty.png')} resizeMode={'contain'} style={{ justifyContent: 'center', alignSelf: 'center', width: 200, height: 200 }} />
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={[styles.type ,{color:COLORS.labelBackground, fontSize: 16, fontWeight: 'bold', fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans' }]}>{i18n.t('noData')}</Text>
                        <Image source={require('../../assets/images/sad-emoji-png.png')} style={{ height: 25, width: 25, marginHorizontal: 5 }} resizeMode={'contain'}/>
                    </View>
                </View>
            );
        }

        return <View />
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
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor:  IS_IPHONE_X && is_iphone ? 'transparent' : backgroundColor }]}>
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
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={[styles.imageBackground, { height: null }]}>
                        <View style={IS_IPHONE_X && is_iphone ? styles.mt15 : styles.mT70}>
                            { this.renderNoData() }
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.props.favs}
                                    renderItem={(item) => this.renderItems(item)}
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

const mapStateToProps = ({ lang , favs ,  profile}) => {
    return {
        lang: lang.lang,
        favs: favs.favs,
        loader: favs.loader,
        user: profile.user,
    };
};
export default connect(mapStateToProps, { profile , getFavs})(Favourites);