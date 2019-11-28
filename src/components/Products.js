import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';
import {getProducts, setCart} from "../actions";
import {connect} from "react-redux";

const height        = Dimensions.get('window').height;
const IS_IPHONE_X 	= height === 812 || height === 896;
const is_iphone   	= Platform.OS === 'ios' ;

class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        console.log('loader__', this.props.loader);
        this.props.getProducts( this.props.lang , this.props.navigation.state.params.category_id )
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

	addToCart(id){
		const token     =  this.props.user ?  this.props.user.token : null;
		this.props.setCart( this.props.lang , id , 1 , token , this.props)
	}

    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.loader })
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="zoomIn" duration={1000} style={[ styles.touchProduct]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: item.id })} style={[styles.scrollParent2 , styles.touchProduct]}>
                    <Image source={{ uri: item.image }} style={styles.scrollImg2} resizeMode={'cover'} />
                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price} { i18n.t('RS') }</Text>
                    <Text style={[styles.oldPrice, { marginTop: item.old_price == item.price ? 7 : 0 }]}>{ item.old_price != item.price ? item.old_price + ' ' + i18n.t('RS') : '' }</Text>
					<TouchableOpacity onPress={() => this.addToCart(item.id)} style={{alignSelf:'flex-end'}}>
						<Icon type={'AntDesign'} name={'shoppingcart'} style={{ fontSize: 25, color: this.state.fav? '#ff5252' : COLORS.lightgray }} />
					</TouchableOpacity>
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

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor, top: -3}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{this.props.navigation.state.params.category_name}</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground} >
                        <View style={IS_IPHONE_X && is_iphone ? styles.mt15 : styles.mT70}>
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.props.products}
                                    renderItem={({item}) => this.renderItems(item)}
                                    numColumns={2}
                                    keyExtractor={this._keyExtractor}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang  , products, addCart, profile}) => {
    return {
        lang: lang.lang,
        products: products.products,
        user: profile.user,
        loader: products.loader,
		addCart: addCart.addCart,
    };
};
export default connect(mapStateToProps, {getProducts, setCart})(Products);