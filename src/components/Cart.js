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



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;



const dataArray = [
    { title: "اسم المنتج", price: '12 ريال', image:require('../../assets/images/pic_of_sweet.png') ,content: "Lorem ipsum dolor sit amet" , category:'تصنيفات حلويات شرقية'},
    { title: "اسم المنتج ٢", price: '12 ريال', image:require('../../assets/images/pic_two-1.png') ,content: "Lorem ipsum dolor sit amet" , category:'تصنيفات حلويات شرقية'},
    { title: "اسم المنتج ٣", price: '12 ريال', image:require('../../assets/images/pic_of_sweet.png') ,content: "Lorem ipsum dolor sit amet" , category:'تصنيفات حلويات شرقية'}
];

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
            checkAll:false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    showCheckBox(){
        this.setState({hideCheck: !this.state.hideCheck})
    }

    checkAll(){
        if (this.state.hideCheck)
            this.setState({checkAll: !this.state.checkAll})
        else
            this.setState({hideCheck: !this.state.hideCheck , checkAll: !this.state.checkAll})
    }

    _renderHeader(item, expanded, hideCheck) {
        return <CartHeaderItem item={item}  expanded={expanded} hideCheck={hideCheck} />;
    }

    _renderContent(item , value) {
        return <CartBodyItem item={item}  value={value}  />;
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
        this.props.navigation.navigate('searchResult', { search : this.state.search } );
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
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>
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
                                        <Text style={styles.type}>{ i18n.t('selectAll') }</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.hideCheck ?
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('paymentSteps')} style={styles.doneStyle}>
                                            <Text style={[styles.type , {color:COLORS.labelBackground}]}>{ i18n.t('done') }</Text>
                                        </TouchableOpacity> : <View />
                                }
                            </View>

                            <View style={styles.flatContainer}>
                                <Accordion
                                    dataArray={dataArray}
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

export default Cart;