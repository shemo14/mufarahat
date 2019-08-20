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
import { DoubleBounce } from 'react-native-loader';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            userImage: null,
            base64: null,
            fullName: "اماني قاسم",
            phone: '01023654789',
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };


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
        let image = this.state.userImage;
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
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('editProfile') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                        <ImageBackground source={require('../../assets/images/bg_blue.png')} resizeMode={'cover'} style={styles.imageBackground}>


                            {image != null?
                                <TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , {marginTop:'50%'}]}>
                                    <Image source={{ uri: image }} style={[styles.profileImg]} resizeMode={'cover'} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , {marginTop:'50%'}]}>
                                    <Image source={require('../../assets/images/profile.png')} style={[styles.profileImg]} resizeMode={'cover'} />
                                    <View style={{ width:'100%' , height:90 , position:'absolute' ,zIndex:1 , backgroundColor:'#ffffff8c'}}/>
                                    <Image source={require('../../assets/images/upload.png')} style={styles.upload} resizeMode={'contain'} />
                                </TouchableOpacity>
                            }
                            <View style={[styles.loginFormContainerStyle , {marginTop:30}]}>
                                <Form style={{ width: '100%' , paddingHorizontal:25}}>
                                    <View style={[styles.itemView ,{borderColor: COLORS.mediumgray}]}>
                                        <Item floatingLabel style={styles.loginItem} bordered>
                                            <Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('fullName') }</Label>
                                            <Input disabled={true} value={this.state.fullName} onChangeText={(fullName) => this.setState({fullName})} autoCapitalize='none' style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                        </Item>
                                    </View>

                                    <View style={[ styles.itemView , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
                                        <Item floatingLabel style={styles.loginItem} bordered>
                                            <Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('phoneNumber') }</Label>
                                            <Input disabled={true} value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                        </Item>
                                    </View>
                                    <Button  onPress={() => this.props.navigation.navigate('profile')} style={[styles.loginBtn ,{marginTop:50 , width:180 }]}>
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

export default EditProfile;