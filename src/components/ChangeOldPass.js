import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
    FlatList,
    Platform,
    Dimensions,
    ImageBackground,
    Animated,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class ChangeOldPass extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            oldPass:'',
            newPass:'',
            reNewPass:'',
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });



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
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('changePass') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                        <ImageBackground source={require('../../assets/images/bg_blue.png')} resizeMode={'cover'} style={styles.imageBackground}>
                            <View style={[styles.loginFormContainerStyle , {marginTop:80 , alignSelf:'center' , height : height-80 , width:'83%' , backgroundColor:COLORS.white}]}>
                                <Form style={{ width: '100%' , height:'100%' , flex:1 , flexDirection:'column' , justifyContent:'space-between' , paddingVertical:30 }}>
                                    <View style={{paddingHorizontal:10}}>

                                        <View style={[styles.itemView ,{borderColor: COLORS.mediumgray}]}>
                                            <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15}]}>{ i18n.t('oldPass') }</Label>
                                                <Input onChangeText={(oldPass) => this.setState({oldPass})} autoCapitalize='none' secureTextEntry style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                            </Item>
                                        </View>

                                        <View style={[styles.itemView  , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15}]}>{ i18n.t('newPass') }</Label>
                                                <Input onChangeText={(newPass) => this.setState({newPass})} autoCapitalize='none' secureTextEntry style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                            </Item>
                                        </View>

                                        <View style={[ styles.itemView , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15}]}>{ i18n.t('verifyNewPass') }</Label>
                                                <Input onChangeText={(verifyNewPass) => this.setState({verifyNewPass})} autoCapitalize='none' secureTextEntry style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                            </Item>
                                        </View>
                                    </View>
                                    <Button onPress={() => this.props.navigation.navigate('passCode')} style={[styles.loginBtn ,{marginTop:50 , width:180 }]}>
                                        <Text style={styles.btnTxt}>{ i18n.t('save') }</Text>
                                    </Button>
                                </Form>
                            </View>
                        </ImageBackground>
                    </KeyboardAvoidingView>
                </Content>

            </Container>

        );
    }
}

export default ChangeOldPass;