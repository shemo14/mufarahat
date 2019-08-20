import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager,  Platform, Dimensions, ScrollView, Animated,Slider } from "react-native";
import {Container, Content, Icon, Header,  Button,  CheckBox} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";
import Communications from "react-native-communications";



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

const images = [
    {
        props: {
            source: require('../../assets/images/pic_two.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/product_pic.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/pic_two.png')
        }
    },
    {
        props: {
            source: require('../../assets/images/product_pic.png')
        }
    },
]

class NewOrderProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            value:0,
            images,
            fancyModal: false,
            evaluateModal:false,
            rangeValue: 20,
            max: 100,
            step: 20,
            min: 20,
        }
    }


    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    renderInputImage(rangeValue){
        let source ='';
        if (rangeValue === 20){
            source = require('../../assets/images/step_one.png')
        } else if (rangeValue === 40){
            source = require('../../assets/images/step_smile_littel.png')
        } else if (rangeValue === 60){
            source = require('../../assets/images/step_smil.png')
        } else if (rangeValue === 80){
            source = require('../../assets/images/step_very_smil.png')
        } else {
            source = require('../../assets/images/step_last.png')
        }

        return source;
    }

    change(rangeValue){
        this.setState({rangeValue})
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


    fancyModal = () => {
        this.setState({ fancyModal: !this.state.fancyModal });
    };

    evaluateModal = () => {
        this.setState({ evaluateModal: !this.state.evaluateModal });
    };

    sendEval = () => {
        this.props.navigation.navigate('drawerNavigator');
        this.setState({ evaluateModal: !this.state.evaluateModal });
    };

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                        </Button>
                        <Button transparent onPress={() => this.fancyModal()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/zoom.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <Swiper horizontal={false} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                        {
                            this.state.images.map((img,i) => (
                                <Image source={ img.props.source } style={styles.swiperimageEvent} resizeMode={'cover'}/>
                            ))

                        }
                    </Swiper>
                    <View style={{ alignItems:'center'  , marginVertical:10}}>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>اسم المنتج</Text>
                        <Text style={[styles.type ,{color:COLORS.mediumgray}]}>تصنيفات حلويات شرقية</Text>
                        <Text style={[styles.type ,{color:COLORS.labelBackground}]}>عدد الاصناف 4</Text>
                        <View style={[ styles.availableProduct,{justifyContent:'space-between', paddingHorizontal:15 , paddingVertical:7 }]}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر المنتج : </Text>
                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر التغليف : </Text>
                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                            </View>
                        </View>

                        <View style={[styles.desc , {marginBottom:25 , marginTop:10}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , alignSelf:'flex-start' }]}>مواصفات الطلب</Text>
                            <Text style={[styles.type ,{color:COLORS.mediumgray, alignSelf:'flex-start'}]}>طرسقة التغليف : تغليف هدايا</Text>
                            <Text style={[styles.type ,{color:COLORS.mediumgray, alignSelf:'flex-start'}]}>مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة مواصفات السلعة</Text>
                        </View>

                        <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>تكلفة الطلبية كاملة : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>
                        <View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر التوصيل : </Text>
                            <Text style={[styles.type ,{color:COLORS.labelBackground}]}>116</Text>
                        </View>
                        <View style={[styles.line , {marginVertical:0}]}/>

                        <Button  onPress={() => this.evaluateModal()} style={[styles.cartBtn , {marginVertical:35}]}>
                            <Image source={require('../../assets/images/tick_white.png')} style={{width:20 , height:20 , marginRight:5}} resizeMode={'contain'}/>
                            <Text style={styles.btnTxt}> انهاء الطلب</Text>
                        </Button>

                        <View style={[styles.line , {marginVertical:0}]}/>


                        <View style={[styles.desc , { marginTop:10}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , alignSelf:'flex-start' }]}>مواصفات المندوب</Text>
                            <View style={[styles.directionRowSpace , {width:'100%' , marginBottom:20}]}>
                                <View style={styles.directionRowCenter}>
                                    <View style={styles.mandob}>
                                        <Image source={require('../../assets/images/profile.png')} style={[styles.profileImg , {height:50}]} resizeMode={'cover'} />
                                    </View>
                                    <Text style={[styles.type ,{color:COLORS.labelBackground  }]}>اسم المندوب</Text>
                                </View>
                                <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)} style={styles.directionRowCenter}>
                                    <Text style={[styles.type ,{color:COLORS.darkRed , marginRight:5 }]}>اتصل</Text>
                                    <Image source={require('../../assets/images/call.png')} style={[{width:20 , height:20} , styles.transform ]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row' , marginBottom:15}} >
                                <Image source={require('../../assets/images/smartphone.png')} style={[styles.headerMenu , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.type ,{color:COLORS.mediumgray }]}>0123456789</Text>
                            </View>
                            <View style={{flexDirection:'row' , marginBottom:15}} >
                                <Image source={require('../../assets/images/ride_gray.png')} style={[styles.headerMenu , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.type ,{color:COLORS.mediumgray  }]}>4568 س م ع</Text>
                            </View>
                        </View>

                        <View style={[styles.line , {marginVertical:0}]}/>

                        <View style={[styles.desc , {marginBottom:25 , marginTop:15}]}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , alignSelf:'flex-start' }]}>مكان التسليم</Text>
                            <View style={{flexDirection:'row'   , marginTop:15 }} >
                                <Image source={require('../../assets/images/marker_gray.png')} style={[styles.headerMenu , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.type ,{color:COLORS.mediumgray  }]}>العنوان بالتفصيل بالمدينة و المنطقة</Text>
                            </View>
                        </View>

                    </View>

                    <Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
                        <ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={this.state.images}/>
                    </Modal>

                    <Modal style={{}} isVisible={this.state.evaluateModal} onBackdropPress={() => this.evaluateModal()}>
                        <View style={[styles.evaluateModal]}>
                            <TouchableOpacity style={styles.closeImgTouch} onPress={() => this.evaluateModal()}>
                                <Image source={require('../../assets/images/close_page.png')} style={styles.closeImg} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={[styles.ques]}>استبيان و تقييم للخدمة</Text>

                                <View style={styles.sliderParent}>
                                    <View style={styles.range}>
                                        <Image source={this.renderInputImage(this.state.rangeValue)} style={styles.emoji} resizeMode={'contain'} />
                                        <Text style={{ color: '#acabae' }}>{this.state.rangeValue} %</Text>
                                    </View>
                                    <Slider
                                        step={this.state.step}
                                        maximumValue={this.state.max}
                                        minimumValue={this.state.min}
                                        onValueChange={(rangeValue) => this.change(rangeValue)}
                                        // value={this.state.value}
                                        thumbTintColor={COLORS.labelBackground}
                                        style={styles.slider}
                                        maximumTrackTintColor={COLORS.mediumgray}
                                        minimumTrackTintColor={'#f0aa0c'}
                                    />
                                </View>
                                <View style={[styles.line ]}/>

                                <Text style={[styles.ques , {marginBottom:10}]}>صيغة سؤال من المشكلات المواجهة للتطبيق ؟</Text>
                                <View style={styles.directionRowSpace}>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={true}  color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('excellent') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('good') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('acceptable') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('poor') } </Text>
                                    </View>
                                </View>

                                <View style={[styles.line ]}/>

                                <Text style={[styles.ques , {marginBottom:10}]}>صيغة سؤال من المشكلات المواجهة للتطبيق ؟</Text>
                                <View style={styles.directionRowSpace}>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={true}  color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('excellent') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('good') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('acceptable') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('poor') } </Text>
                                    </View>
                                </View>

                                <View style={[styles.line ]}/>

                                <Text style={[styles.ques , {marginBottom:10}]}>صيغة سؤال من المشكلات المواجهة للتطبيق ؟</Text>
                                <View style={styles.directionRowSpace}>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={true}  color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('excellent') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('good') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('acceptable') } </Text>
                                    </View>
                                    <View style={[ styles.directionRow ]}>
                                        <CheckBox checked={false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                                        <Text style={[styles.check]}>{ i18n.t('poor') } </Text>
                                    </View>
                                </View>

                                <View style={[styles.line ]}/>

                                <View style={styles.directionRowSpace}>
                                    <TouchableOpacity onPress={() => this.sendEval()} style={[styles.loginBtn ,{width:'45%'}]}>
                                        <Text style={styles.quesBtn}>{ i18n.t('sendButton') }</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.evaluateModal()} style={[styles.loginBtn ,{width:'45%', backgroundColor:'transparent' }]}>
                                        <Text style={[styles.quesBtn , {color:COLORS.darkRed}]}>{ i18n.t('skip') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default NewOrderProduct;