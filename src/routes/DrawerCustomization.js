import React, { Component } from "react";
import { View, Text, Image , TouchableOpacity , Share } from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import i18n from "../../locale/i18n";


class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }


    render() {

        return (
            <Container>
                <Content style={{backgroundColor:'#121320'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("profile")} style={{flex:1 , alignItems: 'center' , marginBottom:20, paddingTop:95}}>
                        {/*<Image source={require('../../assets/images/bg_menu.png')} resizeMode={'contain'} style={{ width: '100%', height: 230 , position:'absolute' , top:15  }}/>*/}
                        {/*<Image source={{ uri: user.avatar }} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 }}/>*/}
                        <Text style={{color:'#fff',  fontSize:17, fontFamily: 'cairo'}}>amany</Text>
                    </TouchableOpacity>
                    <DrawerItems {...this.props}

                                 activeBackgroundColor='transparent' inactiveBackgroundColor='transparent' activeLabelStyle={{color:'#fff'}}
                                 labelStyle={{color: '#bbbcbd' , fontSize:17 , marginLeft: 0 , marginRight: 0 , marginBottom:10 , marginTop:10 , fontFamily: 'cairo' ,  fontWeight: 'normal' }} iconContainerStyle ={{  marginRight: 12}}
                                 itemStyle  = {{marginBottom:0 , paddingBottom:0 , marginTop:0 , paddingTop:0 , fontFamily: 'cairo'}} itemsContainerStyle ={{fontFamily: 'cairo'}} />


                </Content>

            </Container>
        );
    }
}

// const mapStateToProps = ({ auth, profile }) => {
//     return {
//         auth: auth.user,
//         user: profile.user
//     };
// };
//
// export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);
export default DrawerCustomization;