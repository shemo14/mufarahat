import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,} from "react-native";
import {
    Container,
    Content,
    Icon,
    Header,
    List,
    ListItem,
    Left,
    Button,
    Item,
    Input,
    Right,
    CheckBox,
    Form
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class Rules extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            value:0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms') ,
        drawerIcon: (<Image source={require('../../assets/images/law.png')} style={{ height: 20, width: 20 }} resizeMode={'contain'} /> )
    })



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
                            <Button transparent onPress={() => this.props.navigation.navigate('drawerNavigator')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/cancel.png')} style={styles.headerMenu} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('terms') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/rules_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.curvedImg]}>
                            <Image source={require('../../assets/images/rules_pic.png')} style={[styles.swiperimageEvent , { borderBottomLeftRadius:0}]} resizeMode={'cover'} />
                            <View style={styles.overBg}/>
                        </View>
                        <View style={{padding:20}}>
                            <View style={{marginBottom:10}}>
                                <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>البند الأول</Text>
                                <Text style={[styles.type ,{color:COLORS.mediumgray }]}>هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>البند الثاني</Text>
                                <Text style={[styles.type ,{color:COLORS.mediumgray }]}>هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>البند الثالث</Text>
                                <Text style={[styles.type ,{color:COLORS.mediumgray }]}>هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص هذا النص </Text>
                            </View>
                        </View>
                        <View style={[ styles.directionRow , {marginLeft:15}]}>
                            <CheckBox checked={true} color={COLORS.labelBackground} style={{marginRight:20 , paddingRight:2 , backgroundColor:COLORS.labelBackground}} />
                            <Text style={[styles.agreeText , {color:COLORS.mediumgray}]}>{ i18n.t('agreeTo') } <Text  style={styles.termsText}>{ i18n.t('terms') }</Text></Text>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Rules;