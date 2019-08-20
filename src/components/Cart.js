import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input , Accordion} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;



const dataArray = [
    { title: "اسم المنتج", price: '12 ريال', image:require('../../assets/images/pic_of_sweet.png') ,content: "Lorem ipsum dolor sit amet" , category:'التصنيف'},
    { title: "اسم المنتج ٢", price: '12 ريال', image:require('../../assets/images/pic_two-1.png') ,content: "Lorem ipsum dolor sit amet" , category:'التصنيف'},
    { title: "اسم المنتج ٣", price: '12 ريال', image:require('../../assets/images/pic_of_sweet.png') ,content: "Lorem ipsum dolor sit amet" , category:'التصنيف'}
];

class Cart extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });
    _renderHeader(item, expanded) {
        return (
            <View style={{flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center" , backgroundColor: "#fff" }}>
                <View style={styles.directionRow}>
                    <Image source={item.image} style={[styles.scrollImg2 , {marginHorizontal:10}]} resizeMode={'contain'} />
                    <View>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.title}</Text>
                        <Text style={[styles.type ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                    </View>
                </View>
                {expanded
                    ? <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-up" />
                    : <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-down" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <Text
                style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic",
                }}
            >
                {item.content}
            </Text>
        );
    }
    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('boxProduct')} style={[styles.cartItem ]}>
                <Image source={item.image} style={styles.scrollImg2} resizeMode={'contain'} />
                <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>{item.oldPrice}</Text>
            </TouchableOpacity>
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
                        <Right style={{flex:0 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('home')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/cancel.png')} style={styles.headerMenu} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('cart') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:70}}>
                            <View style={[styles.inputView , { marginBottom:15}]}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchPlaceholder') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <Image source={require('../../assets/images/search.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                            </View>

                            <View style={[styles.directionRow , {paddingHorizontal:20 }]}>
                                <TouchableOpacity>
                                    <Text style={styles.type}>{ i18n.t('select') }</Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine}/>
                                <TouchableOpacity>
                                    <Text style={styles.type}>{ i18n.t('selectAll') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.flatContainer}>
                                <Accordion
                                    dataArray={dataArray}
                                    animation={true}
                                    expanded={true}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
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