import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Animated,
    I18nManager,
    Platform
} from "react-native";
import {
    Container,
    Content,
    Icon,
    Header,
    Right,
    Left,
    Button,
    Item,
    Input,
    Accordion,
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import StarRating from 'react-native-star-rating';
import CartHeaderItem from './CartHeaderItem'
import CartBodyItem from './CartBodyItem'
import * as Animatable from 'react-native-animatable';
import {getCart , profile , deleteCart , cartSearch , cartQuantity} from "../actions";
import {connect} from "react-redux";
import Reactotron from '../../ReactotronConfig'

const height = Dimensions.get('window').height;
const width  = Dimensions.get('window').width;
const IS_IPHONE_X = height === 812 || height === 896;

let selectedItems = [];
let totalPrice= 0
class Cart extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            value:1,
            search:'',
            hideCheck:false,
            checkAll:false,
            loader: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.getCart( this.props.lang  , token )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.loader });
    }

    pushSelectedChecks(cart_id , price){
        if (selectedItems.includes(cart_id) === false) {
            selectedItems.push(cart_id);
            totalPrice = totalPrice + Number(price)
        }

        Reactotron.log('selected items_', selectedItems , 'current total price ' , totalPrice);
    }

    pullSelectedChecks(cart_id , price){
        for( var i = 0; i < selectedItems.length; i++){
            if ( selectedItems[i] === cart_id) {
                selectedItems.splice(i, 1);
                totalPrice = totalPrice - Number(price)
            }
        }
        console.log('selected items_', selectedItems , 'current total price ' ,totalPrice );
    }

    showCheckBox(){
        this.setState({hideCheck: !this.state.hideCheck})
        if (!this.state.hideCheck)
            this.setState({ checkAll: false })
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

    checkAll(){
        if (this.state.hideCheck)
            this.setState({checkAll: !this.state.checkAll})
        else
            this.setState({hideCheck: !this.state.hideCheck , checkAll: !this.state.checkAll})

        Reactotron.log('check all', this.state.checkAll);
    }

    deleteCart(cart_id){
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.deleteCart( this.props.lang  , cart_id , token)
    }

    cartQuantity(cart_id , quantity){
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.cartQuantity( this.props.lang  , cart_id , token , quantity)
    }

    _renderHeader(item, expanded, hideCheck) {
        return <CartHeaderItem item={item} navigation={this.props.navigation} expanded={expanded} hideCheck={hideCheck} checkAll={this.state.checkAll}
                   pushSelectedChecks={(cart_id , price) => this.pushSelectedChecks(cart_id , price)} pullSelectedChecks={(cart_id , price) => this.pullSelectedChecks(cart_id , price)}/>;
    }

    _renderContent(item , value) {
        return <CartBodyItem item={item} navigation={this.props.navigation} value={value} quantity={this.props.cart.quantity}
                     deleteCart={(cart_id) => this.deleteCart(cart_id)}  cartQuantity={(cart_id , quantity) => this.cartQuantity(cart_id , quantity)}  />;
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

    submitSearch(){
        const token =  this.props.user ?  this.props.user.token : null;
       this.props.cartSearch(this.props.lang  , token , this.state.search)
    }

    renderNoData(){
        if ((this.props.cart).length <= 0){
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

    render() {
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('cart') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>
                            { this.renderNoData() }
                            { (this.props.cart).length > 0 ? (
                                <View>
                                    <View style={[styles.inputView ,styles.mb15]}>
                                        <Item  style={styles.inputItem} bordered>
                                            <Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchPlaceholder') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                        </Item>
                                        <Image source={require('../../assets/images/search.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                                    </View>

                                    <View style={[styles.directionRowSpace , styles.ph23 ]}>
                                        <View style={styles.directionRow}>
                                            <TouchableOpacity onPress={() => this.showCheckBox()}>
                                                <Text style={styles.type}>{ i18n.t('select') }</Text>
                                            </TouchableOpacity>
                                            <View style={styles.verticalLine}/>
                                            <TouchableOpacity  onPress={() => this.checkAll()}>
                                                <Text style={styles.type}>{  this.state.checkAll && this.state.hideCheck  ? i18n.t('removeSelected') : i18n.t('selectAll') }</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.hideCheck ?
                                                <TouchableOpacity onPress={() => selectedItems.length > 0 ? this.props.navigation.navigate('paymentSteps' , {selectedItems , totalPrice}) : false } style={styles.doneStyle}>
                                                    <Text style={[styles.type , {color:COLORS.labelBackground}]}>{ i18n.t('done') }</Text>
                                                </TouchableOpacity> : <View />
                                        }
                                    </View>
                                </View>
                            ) : ( <View /> ) }

                            <View style={styles.flatContainer}>
                                <Accordion
                                    dataArray={this.props.cart}
                                    animation={true}
                                    expanded={true}
                                    renderHeader={(item, expanded) => this._renderHeader(item, expanded , this.state.hideCheck)}
                                    renderContent={(item) => this._renderContent(item, this.state.value)}
                                    style={styles.accordion}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ lang , cart , profile  }) => {
    return {
        lang: lang.lang,
        cart: cart.cart,
        deleteCart: cart.deleteCart,
        cartQuantity: cart.cartQuantity,
        loader: cart.loader,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getCart , profile , deleteCart , cartQuantity , cartSearch })(Cart);