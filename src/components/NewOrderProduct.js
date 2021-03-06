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
import * as Animatable from 'react-native-animatable';
import {getNewOrder, profile , finishOrder } from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import axios from 'axios';
import CONST from '../consts'
import Question from './Question'
import _ from 'lodash'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const IS_IPHONE_X = height === 812 || height === 896;

let questions = [];
class NewOrderProduct extends Component {
	constructor(props){
		super(props);

		this.state={
			status: null,
			backgroundColor: new Animated.Value(0),
			availabel: 0,
			value:0,
			fancyModal: false,
			evaluateModal:false,
			rangeValue: 20,
			max: 100,
			step: 20,
			min: 20,
			loader: true,
			isSubmitted: false,
			questions: []
		}
	}

	static navigationOptions = () => ({
		drawerLabel: () => null
	});

	componentWillMount() {
		const token =  this.props.user ?  this.props.user.token : null;
		this.props.getNewOrder( this.props.lang , this.props.navigation.state.params.id , token );
		axios.post(CONST.url + 'questions', { lang: this.props.lang }).then(response => {
			this.setState({ questions: response.data.data })
		})
	}

	renderLoader(){
		if (this.state.loader){
			return(
				<View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
					<DoubleBounce size={20} color={COLORS.labelBackground} />
				</View>
			);
		}
	}

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

	pushQuestions(quAns){
		console.log('is find.......', _.find(questions, { id: quAns.id }));
		if (_.find(questions, { id: quAns.id })){
			const index = questions.findIndex(() => { return quAns });
			questions.splice(index, 1);

			console.log('after push', questions);
		}

		questions.push(quAns);
		console.log(questions);
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

	componentWillReceiveProps(nextProps) {
		this.setState({ loader: nextProps.loader });
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
		const token =  this.props.user ?  this.props.user.token : null;
		this.props.finishOrder( this.props.lang , this.props.navigation.state.params.id , token )
		this.setState({ evaluateModal: !this.state.evaluateModal });
	};

	sendEval = () => {
		this.props.navigation.navigate('home');
		this.setState({ evaluateModal: !this.state.evaluateModal });
	};

	setCart(){
		this.setState({ isSubmitted: true });
		const order_id = this.props.navigation.state.params.id;
		axios.post(CONST.url + 'reset_cart', { order_id }).then(response => {
			if (response.data.status == 200){
				this.setState({ isSubmitted: false });
				this.props.navigation.navigate('cart')
			}
		});
	}

	renderSubmit(){
		if (this.state.isSubmitted){
			return(
				<View style={{ alignSelf: 'center', justifyContent: 'center' }}>
					<DoubleBounce size={20} color="#B7264B" style={{ alignSelf: 'center' }} />
				</View>
			)
		}

		return (
			<Animatable.View animation="flash" duration={1400}>
				<Button onPress={() => this.setCart()} style={[styles.cartBtn , styles.mv35 ]}>
					<Image source={require('../../assets/images/shopping_cart.png')} style={[styles.btnImg , styles.transform]} resizeMode={'contain'}/>
					<Text style={styles.btnTxt}> { i18n.t('addToCart') }</Text>
				</Button>
			</Animatable.View>
		);
	}

	between(x, min, max) {
		return x >= min && x <= max;
	}

	onFocus(){
		this.setState({ status: null });
		this.componentWillMount()
	}

	render() {
		const backgroundColor = this.state.backgroundColor.interpolate({
			inputRange: [0, 1],
			outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
		});

		return (
			<Container>
				<Header style={[styles.header , styles.plateformMarginTop, { backgroundColor: 'transparent' }]} noShadow>
					<Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: '#00000099', top: -3}]}>
						<Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
							<Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
						</Button>
						<Button transparent onPress={() => this.fancyModal()} style={styles.headerBtn}>
							<Image source={require('../../assets/images/zoom.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
						</Button>
					</Animated.View>
				</Header>
				<Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
					<NavigationEvents onWillFocus={() => this.onFocus()} />
					{ this.renderLoader() }
					{
						this.props.newOrder ?
							<Swiper key={this.props.newOrder.items.length} horizontal={Platform.OS === 'ios' ? true : false} dotStyle={styles.eventdoteStyle2} activeDotStyle={styles.eventactiveDot2}
								containerStyle={styles.eventswiper2} showsButtons={false} autoplay={true}>
								{
									this.props.newOrder.items.map((item,i) => (
										<View key={i} style={styles.directionColumn}>
											<View style={styles.swiperimageEvent2}>
												<Image source={{ uri:item.url }} style={{width:'100%' , height:'100%'}} resizeMode={'cover'}/>
											</View>
											<View style={styles.prodDet}>
												<Text style={[styles.type ,{color:COLORS.boldgray}]}>{item.name}</Text>
												<Text style={[styles.type ,{color:COLORS.mediumgray}]}>{item.category}</Text>
												<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{ i18n.t('NumberOfItems') } {item.quantity}</Text>
												<Animatable.View animation="zoomIn" duration={1000} style={[ styles.availableProduct,styles.pack]}>
													<View style={styles.directionRow}>
														<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('productPrice') } : </Text>
														<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{item.price}</Text>
													</View>
													{
														item.package_price ?
															<View style={styles.directionRow}>
																<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('packagingPrice') } : </Text>
																<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{item.package_price}</Text>
															</View>
															: <View />
													}
												</Animatable.View>

												<View style={[styles.desc , styles.mb25 , styles.mt10 ]}>
													<Text style={[styles.type , styles.aSFS ,{color:COLORS.boldgray}]}>{ i18n.t('orderSpecification') }</Text>
													{
														item.package_name ?
															<Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>{ i18n.t('packingMethod') } : {item.package_name}</Text>
															: <View />
													}
													<Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray,  writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{item.desc}</Text>
												</View>

											</View>
										</View>
									))
								}
							</Swiper>
							:  <View />
					}


					{
						this.props.newOrder ?
							<View style={styles.prodDet}>
								{
									this.props.newOrder.coupon_name ?
										<View style={{ width }}>
											<View style={[styles.line , {marginVertical:0}]}/>
											<View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
												<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('disCode') } : </Text>
												<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{this.props.newOrder.coupon_name}</Text>
											</View>
										</View>	: <View />
								}

								<View style={[styles.line , {marginVertical:0}]}/>
								<View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
									<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('fullOrderCost') } : </Text>
									<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{this.props.newOrder.total}</Text>
								</View>

								<View style={[styles.line , {marginVertical:0}]}/>
								<View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
									<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('deliveryPrice') } : </Text>
									<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{this.props.newOrder.shaping_price}</Text>
								</View>

								<View style={[styles.line , {marginVertical:0}]}/>
								<View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
									<Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('vat') } : </Text>
									<Text style={[styles.type ,{color:COLORS.labelBackground}]}>{this.props.newOrder.vat}</Text>
								</View>
								<View style={[styles.line , {marginVertical:0}]}/>

								<View style={styles.followBlock}>
									<View style={styles.followStep}>
										<View style={[styles.yellowCircle ,
											{backgroundColor: (this.props.newOrder.status >= 0) ? '#0fd1fa' : '#fff', borderColor : (this.props.newOrder.status >= 0)  ? '#0fd1fa' : '#999'}]}>
											<Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
										</View>
										<Text style={[styles.check]}>{i18n.t('newOrd')}</Text>
										<View style={[styles.stepLine ,
											{backgroundColor: this.between(this.props.newOrder.status,0,2)  ? '#0fd1fa' : '#999',}]}/>
									</View>

									<View style={[styles.followStep ]}>
										<View style={[styles.yellowCircle ,
											{backgroundColor: (this.props.newOrder.status >= 1)  ? '#0fd1fa' :'#fff',
												borderColor : (this.props.newOrder.status >= 1)   ? '#0fd1fa' : '#999'}]}>
											<Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
										</View>
										<Text style={[styles.check]}>{i18n.t('underway')}</Text>
										<View style={[styles.stepLine ,
											{backgroundColor: this.between(this.props.newOrder.status,0,3) ? '#0fd1fa' : '#999',}]}/>
									</View>

									<View style={[styles.followStep ]}>
										<View style={[styles.yellowCircle ,
											{backgroundColor: (this.props.newOrder.status == 2)  ? '#0fd1fa' :'#fff',
												borderColor : (this.props.newOrder.status == 2)   ? '#0fd1fa' : '#999'}]}>
											<Icon type={'Feather'} name={'check'} style={[styles.checkCircle]} />
										</View>
										<Text style={[styles.check]}>{i18n.t('implementedOrd')}</Text>
									</View>
								</View>

								<View style={[styles.line , {marginVertical:0}]}/>

								{
									this.props.newOrder.status !=2 ?
										<View style={[styles.directionColumnCenter , styles.w100]}>
											<Animatable.View animation="flash" duration={1400}>
												<Button disabled={true} style={[styles.loginBtn , styles.mv35, {backgroundColor:'#e5e5e5'}]}>
													<Text style={[styles.btnTxt , {color:'#888888'}]}>{ i18n.t('hanging') }</Text>
												</Button>
											</Animatable.View>

											<View style={[styles.line , {marginVertical:0}]}/>

											{this.props.newOrder.delegated.name ?
												<View style={[styles.desc, styles.mt10]}>
													<Text
														style={[styles.type, styles.aSFS, {color: COLORS.boldgray}]}>{i18n.t('specOfDele')}</Text>
													<View style={[styles.directionRowSpace, styles.w100, styles.mb20]}>
														<View style={styles.directionRowCenter}>
															<View style={styles.mandob}>
																<Image source={{uri:this.props.newOrder.delegated.avatar}}
																	style={[styles.profileImg, {height: 50}]}
																	resizeMode={'cover'}/>
															</View>
															<Text style={[styles.type, {color: COLORS.labelBackground}]}>{this.props.newOrder.delegated.name}</Text>
														</View>
														<TouchableOpacity
															onPress={() => Communications.phonecall(this.props.newOrder.delegated.phone, true)}
															style={styles.directionRowCenter}>
															<Text
																style={[styles.type, styles.mr10, {color: COLORS.darkRed}]}>{i18n.t('call')}</Text>
															<Image source={require('../../assets/images/call.png')}
																style={[{width: 20, height: 20}, styles.transform]}
																resizeMode={'contain'}/>
														</TouchableOpacity>
													</View>
													<View style={[styles.directionRow, styles.mb15]}>
														<Image source={require('../../assets/images/smartphone.png')}
															style={[styles.headerMenu, styles.mr10]} resizeMode={'contain'}/>
														<Text style={[styles.type, {color: COLORS.mediumgray}]}>{ this.props.newOrder.delegated.phone }</Text>
													</View>
													{/*<View style={[styles.directionRow, styles.mb15]}>*/}
													{/*<Image source={require('../../assets/images/ride_gray.png')}*/}
													{/*style={[styles.headerMenu, styles.mr10]} resizeMode={'contain'}/>*/}
													{/*<Text style={[styles.type, {color: COLORS.mediumgray}]}>4568 س م ع</Text>*/}
													{/*</View>*/}
												</View> : <View />
											}

											<View style={[styles.line , {marginVertical:0}]}/>

											<View style={[styles.desc , styles.mb25 , styles.mt15 ]}>
												<Text style={[styles.type , styles.aSFS,{color: '#999' }]}>{ i18n.t('deliveryPlace') }</Text>
												<View  style={[ styles.directionRow , styles.mt15]} >
													<Image source={require('../../assets/images/marker_gray.png')} style={[styles.headerMenu , styles.mr10]} resizeMode={'contain'} />
													<Text style={[styles.type ,{color:COLORS.mediumgray ,  writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', alignSelf: 'flex-start', flex: 1 }]}>{this.props.newOrder.location.address}</Text>
												</View>
											</View>
										</View>
										:
										this.renderSubmit()
								}
							</View> : <View /> }

					{/* End Error */}

                    {
                        this.props.newOrder ?
							<Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
								<ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={this.props.newOrder.items}/>
							</Modal> : <View />
                    }

					<Modal style={{}} isVisible={this.state.evaluateModal} onBackdropPress={() => this.evaluateModal()}>
						<View style={[styles.evaluateModal]}>
							<TouchableOpacity style={styles.closeImgTouch} onPress={() => this.evaluateModal()}>
								<Image source={require('../../assets/images/close_page.png')} style={styles.closeImg} resizeMode={'contain'} />
							</TouchableOpacity>
							<ScrollView showsVerticalScrollIndicator={false}>
								<Text style={[styles.ques]}>{ i18n.t('questionnaire') }</Text>

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

								{
									this.state.questions.map((qu, i) => (
										<Question pushQuestions={(quAns) => this.pushQuestions(quAns)} data={qu} key={i}/>
									))
								}

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

const mapStateToProps = ({ lang , newOrder, profile }) => {
	return {
		lang: lang.lang,
		newOrder: newOrder.newOrder,
		loader: newOrder.loader,
		user: profile.user,
	};
};
export default connect(mapStateToProps, {getNewOrder , profile , finishOrder })(NewOrderProduct);
