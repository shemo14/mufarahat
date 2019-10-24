import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Animated,
    ScrollView,
    I18nManager
} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import FooterSection from './FooterSection';
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import CountDown from 'react-native-countdown-component';
import RBSheet from "react-native-raw-bottom-sheet";
import DrawerCustomization from '../routes/DrawerCustomization';
import * as Animatable from 'react-native-animatable';
import {getSweet , getNewlyAdded , getRecentOffers} from "../actions";
import {connect} from "react-redux";


const height = Dimensions.get('window').height;

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            search:'',
        }
    }

    componentWillMount() {
        this.props.getSweet( this.props.lang )
        this.props.getNewlyAdded( this.props.lang )
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
                        <Text style={[styles.headerText , styles.t15]}>{ i18n.t('home') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={styles.mT70}>

                            <View style={styles.inputView}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchPlaceholder') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <Image source={require('../../assets/images/search.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                            </View>

                            <View style={styles.pl20}>

                                <Text style={[styles.type , styles.aSFS ]}>{ i18n.t('sweetTypes') }</Text>
                                <ScrollView style={styles.scrollSweet} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        this.props.sweets.map((sweet, i) => (

                                            <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('products' , { category_id: sweet.id , category_name: sweet.name})}
                                                              style={styles.scrollParent}>
                                                <Image source={{ uri: sweet.image }}
                                                       style={styles.scrollImg} resizeMode={'cover'}/>
                                                <Animatable.View animation="slideInUp" duration={1000}
                                                                 style={styles.scrollText}>
                                                    <Text style={[styles.type]}>{sweet.name}</Text>
                                                </Animatable.View>
                                            </TouchableOpacity>

                                        ))
                                    }
                                </ScrollView>

                                { (this.props.recentOffers).length > 0 ? (
                                    <View>
										<Text style={[styles.type , styles.aSFS ,{color:COLORS.white}]}>{ i18n.t('todayDeal') }</Text>
										<ScrollView style={styles.mv10} horizontal={true} showsHorizontalScrollIndicator={false}>
											{
												this.props.recentOffers.map((offer, i) => (

													<Animatable.View key={i} animation="zoomIn" duration={1000}
														style={styles.scrollParent2}>
														<Image  source={{ uri: offer.image }}
															style={styles.scrollImg2} resizeMode={'cover'}/>
														<Image source={require('../../assets/images/orange_circle.png')}
															style={styles.orangeCircle} resizeMode={'contain'}/>
														<Text style={[styles.type, {color: COLORS.boldgray}]}>{offer.name}</Text>
														<Text style={[styles.type, {color: COLORS.mediumgray}]}>{offer.category}</Text>
														<CountDown
															size={12}
															until={offer.seconds}
															onFinish={() => alert('Finished')}
															style={styles.count}
															digitStyle={{backgroundColor: 'transparent'}}
															digitTxtStyle={styles.counterStyle}
															separatorStyle={styles.counterStyle}
															timeToShow={['H', 'M']}
															timeLabels={{H: null, M: null}}
															showSeparator
														/>
														<Text style={[styles.headerText, {color: COLORS.labelBackground}]}>{offer.price}</Text>
														<Text style={styles.oldPrice}>{offer.old_price}</Text>
													</Animatable.View>
												))
											}

										</ScrollView>
                                    </View>
                                ) : ( <View /> ) }

                                <Text style={[styles.type, styles.aSFS ,{color:COLORS.boldgray}]}>{ i18n.t('newlyAdded') }</Text>
                                <ScrollView style={{marginVertical:10}} horizontal={true} showsHorizontalScrollIndicator={false}>

                                    {

                                        this.props.newlyAdded.map((newly, i) => (

                                            <Animatable.View key={i} animation="zoomIn" duration={1000}>
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('product', { id: newly.id })}
                                                    style={styles.scrollParent2}>
                                                    <Image source={{ uri: newly.image }}
                                                           style={styles.scrollImg2} resizeMode={'cover'}/>
                                                    <Image source={require('../../assets/images/orange_circle.png')}
                                                           style={styles.orangeCircle} resizeMode={'contain'}/>
                                                    <Text style={[styles.type, {color: COLORS.boldgray}]}>{newly.name}</Text>
                                                    <Text
                                                        style={[styles.type, {color: COLORS.mediumgray}]}>{newly.category}</Text>
                                                    <Text style={[styles.headerText, {color: COLORS.labelBackground, marginTop: newly.old_price == newly.price ? 7 : 0}]}>{newly.price}</Text>
													<Text style={styles.oldPrice}>{ newly.old_price != newly.price ? newly.old_price : ''}</Text>
                                                </TouchableOpacity>
                                            </Animatable.View>

                                        ))
                                    }

                                </ScrollView>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
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
                    <DrawerCustomization routeName={'home'} onClose={() => this.closeDrawer()} navigation={this.props.navigation}/>
                </RBSheet>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , sweet , newlyAdded , recentOffers}) => {
    return {
        lang: lang.lang,
        sweets: sweet.sweets,
        newlyAdded: newlyAdded.newlyAdded,
        recentOffers: recentOffers.recentOffers,
        loader: sweet.loader
    };
};
export default connect(mapStateToProps, {getSweet , getNewlyAdded , getRecentOffers})(Home);