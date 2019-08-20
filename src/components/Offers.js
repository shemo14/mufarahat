import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

const offers=[
    {id:1 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:2 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:3 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:4 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:5 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_of_sweet.png') , price:'12 ريال', oldPrice:'30 ريال'},
    {id:6 , name:'اسم الحلويات' , category:'التصنيف', image:require('../../assets/images/pic_two-1.png') , price:'12 ريال', oldPrice:'30 ريال'},
]


class Offers extends Component {
    constructor(props){
        super(props);

        this.state={
            offers,
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: i18n.t('offers') ,
        drawerIcon: (<Image source={require('../../assets/images/bargain.png')} style={{ height: 20, width: 20 }} resizeMode={'contain'} /> )
    })


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={[styles.scrollParent2 , { alignSelf: 'center', flex: 1, margin: 7 }]}>
                <Image source={require('../../assets/images/discount.png')} style={styles.discount} resizeMode={'contain'} />
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
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('offers') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:70}}>

                            <View style={[styles.scrollParent2 , { alignSelf: 'center', width:'91%', margin: 7, paddingLeft:20 , borderBottomRightRadius:5 }]}>
                                <Text style={[styles.type ,{color:'#f44336' , alignSelf:'flex-start' , fontSize: 14}]}>خصومات تصل الي 50٪</Text>
                                <View style={[styles.directionRowSpace ]}>
                                    <View style={{flexDirection:'column', flex:1}}>
                                        <Text style={[styles.type ,{color:COLORS.boldgray   , fontSize: 14 , textAlign: 'center' , left:-13  }]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize: 14  }]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>
                                        <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize: 14  }]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>
                                    </View>
                                    <Image source={require('../../assets/images/sweet.png')} resizeMode={'contain'} style={{width:80 , height:80, flex:0, alignSelf:'flex-end'}}/>
                                </View>
                            </View>

                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.state.offers}
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

export default Offers;