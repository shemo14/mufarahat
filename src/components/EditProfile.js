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
import * as Animatable from 'react-native-animatable';



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
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('editProfile') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                        <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue.png') : require('../../assets/images/bg_blue2.png')} resizeMode={'cover'} style={styles.imageBackground}>

                            {image != null?
                                <TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , styles.mtt50]}>
                                    <Image source={{ uri: image }} style={[styles.profileImg]} resizeMode={'cover'} />
                                </TouchableOpacity>
                                :
                                <Animatable.View animation="zoomIn" duration={1000}>
                                    <TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , styles.mtt50]}>
                                        <Image source={require('../../assets/images/profile.png')} style={[styles.profileImg]} resizeMode={'cover'} />
                                        <View style={styles.opacityView}/>
                                        <Image source={require('../../assets/images/upload.png')} style={styles.upload} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </Animatable.View>
                            }

                            <View style={[styles.loginFormContainerStyle , styles.mt30]}>
                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={[styles.ph25 , styles.w100]}>
                                        <Animatable.View animation="fadeInUp" duration={1400} style={[styles.itemView ,{borderColor: COLORS.mediumgray}]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('fullName') }</Label>
                                                <Input value={this.state.fullName} onChangeText={(fullName) => this.setState({fullName})} autoCapitalize='none' style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                            </Item>
                                        </Animatable.View>

                                        <Animatable.View animation="fadeInUp" duration={1800} style={[ styles.itemView , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('phoneNumber') }</Label>
                                                <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                            </Item>
                                        </Animatable.View>

                                        <Animatable.View animation="flash" duration={2200}>
                                            <Button  onPress={() => this.props.navigation.navigate('profile')} style={[styles.loginBtn ,styles.btnWidth]}>
                                                <Text style={styles.btnTxt}>{ i18n.t('save') }</Text>
                                            </Button>
                                        </Animatable.View>
                                    </Form>
                                </KeyboardAvoidingView>
                            </View>
                        </ImageBackground>
                </Content>

            </Container>

        );
    }
}

export default EditProfile;