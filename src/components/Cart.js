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
            value:0,
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
        return (
            <View style={styles.acorrContent}>
                <View style={styles.directionRowSpace}>
                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={5}
                        fullStarColor={'#f0aa0c'}
                        starSize={20}
                        starStyle={{color: '#f0aa0c', marginLeft: 5}}
                    />
                </View>
                <Text style={[styles.type , styles.mv10 , styles.aSFS ,{color:COLORS.boldgray }]}>{ i18n.t('itemSpecification') }</Text>
                <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة</Text>

                <View style={[styles.line ]}/>

                <View style={styles.directionRowSpace}>
                    <View style={styles.directionRowCenter}>
                        <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                            <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                        </TouchableOpacity>
                        <Text style={[styles.countText ]}>{value}</Text>
                        <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                            <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.directionRowSpace}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('paymentSteps')} >
                            <Image source={require('../../assets/images/credit_card.png')} style={[styles.headerMenu , styles.mr20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={require('../../assets/images/dustbin.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
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