import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';
import {getSearchResult} from "../actions";
import {connect} from "react-redux";
import searchResult from "../reducers/SearchReducer";



const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= height === 812 || height === 896;
const is_iphone   	= Platform.OS === 'ios' ;


class SearchResult extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            search:'',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.props.getSearchResult( this.props.lang , this.props.navigation.state.params.search )
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: item.id })} style={[styles.scrollParent2 , styles.touchProduct]}>
                    <Image source={{ uri: item.image }} style={styles.scrollImg2} resizeMode={'cover'} />
                    {/*<Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />*/}
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
                    <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{item.price}</Text>
                    <Text style={[styles.type ,{color:COLORS.mediumgray , fontSize:14 , textDecorationLine: 'line-through'}]}>{item.old_price}</Text>
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

    submitSearch(){
        this.props.getSearchResult( this.props.lang , this.state.search )
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
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('searchResults') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        { this.renderLoader() }
                        <View style={IS_IPHONE_X && is_iphone ? styles.mt15 : styles.mT70}>
                            <View style={styles.inputView}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('searchProduct') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <Image source={require('../../assets/images/search.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                            </View>
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.props.searchResult}
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
const mapStateToProps = ({ lang  , searchResult}) => {
    return {
        lang: lang.lang,
        searchResult: searchResult.searchResult,
        loader: searchResult.loader
    };
};
export default connect(mapStateToProps, {getSearchResult})(SearchResult);