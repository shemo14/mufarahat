import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ImageBackground,
    Animated,
    I18nManager, Platform
} from "react-native";
import {Container, Content, Icon, Header, Right, Left, Button} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import {getBoxes} from "../actions";
import boxes from "../reducers/BoxesReducer";
import {NavigationEvents} from "react-navigation";


const height        = Dimensions.get('window').height;
const IS_IPHONE_X 	= height === 812 || height === 896;
const is_iphone   	= Platform.OS === 'ios' ;


class Boxes extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    componentWillMount() {
        this.props.getBoxes( this.props.lang )
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('product' , { id: item.id })} style={[styles.scrollParent , styles.touchProduct]}>
                <Animatable.View animation="zoomIn" duration={1000}>
                    <Image source={{ uri: item.image }} style={[styles.scrollImg , styles.w100]} resizeMode={'cover'} />
                    <View style={styles.scrollText}>
                        <Text style={[styles.type]}>{item.name}</Text>
                    </View>
                </Animatable.View>
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

	onFocus(){
		this.componentWillMount()
    }

    render() {
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
				<NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{i18n.t('boxes')}</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={IS_IPHONE_X && is_iphone ? styles.mt15 : styles.mT70}>
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.props.boxes}
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

const mapStateToProps = ({ lang , sweet , boxes }) => {
    return {
        lang: lang.lang,
        boxes: boxes.boxes,
        loader: sweet.loader
    };
};
export default connect(mapStateToProps, {getBoxes})(Boxes);