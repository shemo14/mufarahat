import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';
import {getNewlyAdded, getRecentOffers, getSweet} from "../actions";
import {connect} from "react-redux";



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const IS_IPHONE_X = height === 812 || height === 896;


class Offers extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }

    componentWillMount() {
        this.props.getRecentOffers( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.labelBackground} />
                </View>
            );
        }
    }


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="zoomIn" duration={1000} style={[ styles.touchProduct]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: item.id })} style={[styles.scrollParent2 ,styles.touchProduct]}>
                    <Image source={require('../../assets/images/discount.png')} style={styles.discount} resizeMode={'contain'} />
                    <Image source={{ uri: item.image }} style={styles.scrollImg2} resizeMode={'cover'} />
                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                    <Text style={[styles.type ,styles.oldPrice]}>{item.old_price}</Text>
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

	renderNoData(){
		if ((this.props.recentOffers).length <= 0){
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
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('offers') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>
                            { this.renderNoData() }
                            {/*<View style={[styles.scrollParent2 , styles.offer]}>*/}
                                {/*<Text style={[styles.type , styles.aSFS ,{color:'#f44336' , fontSize: 14}]}>خصومات تصل الي 50٪</Text>*/}
                                {/*<View style={[styles.directionRowSpace ]}>*/}
                                    {/*<View style={[styles.directionColumn , styles.flex1]}>*/}
                                        {/*<Text style={[styles.type ,{color:COLORS.boldgray   , fontSize: 14 , textAlign: 'center' , left:-13  }]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>*/}
                                        {/*<Text style={[styles.type ,{color:COLORS.mediumgray , fontSize: 14 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>*/}
                                        {/*<Text style={[styles.type ,{color:COLORS.mediumgray , fontSize: 14 ,  writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>هذا النص هو مثال لنص هذا النص هو مثال لنص </Text>*/}
                                    {/*</View>*/}
                                    {/*<Image source={require('../../assets/images/sweet.png')} resizeMode={'contain'} style={styles.sweetImg}/>*/}
                                {/*</View>*/}
                            {/*</View>*/}

                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.props.recentOffers}
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

const mapStateToProps = ({ lang , recentOffers}) => {
    return {
        lang: lang.lang,
        recentOffers: recentOffers.recentOffers,
        loader: recentOffers.loader
    };
};
export default connect(mapStateToProps, {getRecentOffers})(Offers);