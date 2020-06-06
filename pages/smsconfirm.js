import React, {Component} from 'react';

import {userStore,persistStore } from "../src/stores";

import Router from "next/router";
import ResponsiveLayout from "../src/components/layouts/ResponsiveLayout";

import {
    deviceWide,
    mapNumbersToEnglish,
    navigation,
    showMassage,
    doDelay
} from "../src/utils";
import images from "../public/static/assets/images";
import {
    bgItemRed,
    bgScreen,
    bgWhite,
    textItemRed,
    borderSeparate,
    border,
    primary,
    placeholderTextColor,
    lightRed,
    textItem,
    subTextItem,
    textItemBlack,
    borderLight,
    lightGrey,
    textGray,
    gr10, gr3, gr8, gr9, gr5, gr1, gr2
} from "../src/constants/colors";
import {View, TouchableOpacity, Text, Image, Platform,} from "../src/react-native";
import FloatingLabelTextInput from "../src/components/FloatingLabelTextInput";
import {postQuery, saveEntity} from "../dataService/dataService";
import translate from "../src/language/translate";

export default class Smsconfirm extends Component {
    constructor() {
        super();


        this.state = {
            focus:1,
            invitationLink:'',
        };
    }
    componentDidMount() {
        doDelay(20)
            .then(()=>{
                this.user= navigation.getParam('user');
                if(this.user){
                    this.setState({haveUser:true})
                }
            })
    }



    isValid() {
        return mobileValidation;
    }
    checkValidation() {

        if(!this.state.code1 && !this.state.code2 && !this.state.code3 && !this.state.code4 ){
            this.setState({confirmCodeValidation: false});
            return translate('enter_invitationcode');
        }

        if(!this.state.code1 || !this.state.code2 || !this.state.code3 || !this.state.code4 ){
            this.setState({confirmCodeValidation: false});
            return translate('enter_full_invitationcode');
        }
    }
    onfirmMobile(){
        const msg=this.checkValidation();
        if(msg){
            showMassage(msg,'info')
            return;
        }

        const confirmCode=this.state.code1+this.state.code2+this.state.code3+this.state.code4;
        const data={
            mobile:this.user.mobile,
            regentCode:this.user.regentCode,
            mobileConfirmCode:confirmCode
        }
        postQuery('Members/me/confirmMobile',data)
          .then(res=>{
              navigation.navigate('registerUserProperty', {
                  user: this.user,
              });
          })
          .catch(err=>{
              console.log(err);
          })
    }



    render() {
        //const { height, width } = useWindowDimensions();
        if(!this.state.haveUser){
            return <View style={{alignItems:'center',padding:40}} ><Text>404 not fond page</Text></View>
        }

        return (
            <ResponsiveLayout title={`Enter Confirm code`}  style={{margin:0}}>
                <View style={{flex:1,backgroundColor:gr9,alignItems:'center',padding:16,paddingTop:'5%',}} >
                    <Image
                        source={images.tree}
                        style={{maxWidth: '50%', maxHeight: '50%',}}
                    />
                    <Text
                        style={{
                            marginTop:20,
                            marginBottom:30,
                            fontSize:50,
                            fontWeight:800,
                            fontFamily: 'IRANYekanFaNum-Bold',
                            color:gr3
                        }}>
                        Treenet
                    </Text>

                    <View id='form' >
                        <Text
                            style={{
                                marginTop:10,
                                fontSize:16,
                                fontWeight:800,
                                fontFamily: 'IRANYekanFaNum-Bold',
                                color:gr3,
                                alignSelf:'center'
                            }}>
                           { translate('enter_sms_confirm_code')}
                        </Text>

                        <View  dir={'ltr'} id='sms code' style={{marginTop:10, flexDirection:'row',justifyContent:'center', marginHorizontal:10}}  >
                            {/*  <Text style={{marginTop:20,fontSize:14,color:bgWhite}}>Enter your phone number</Text>*/}
                            <View style={{ width:50,marginHorizontal:2,}} >
                                <FloatingLabelTextInput
                                    dir={'rtl'}
                                    //autoFocus={this.state.focus==1}
                                    style={{ borderColor: gr5,borderWidth:2,paddingVertical:5, borderRadius:8,backgroundColor:bgWhite}}
                                    //placeholder=""
                                    value={this.state.code1}
                                    onChangeText={text => {
                                        text = mapNumbersToEnglish(text);
                                        this.setState({ code1:text, code1Validation: true,focus:2});
                                    }}
                                    numberOfLines={1}
                                    tintColor={
                                        this.state.code1Validation ? placeholderTextColor : lightRed
                                    }
                                    textInputStyle={{
                                        fontFamily: 'IRANYekanFaNum-Bold',
                                        fontSize: 20,
                                        fontWeight:800,
                                        color: textItemBlack,
                                        paddingStart: 4,
                                        paddingTop: 6,
                                        paddingBottom: 5,
                                        textAlign: 'center',

                                    }}
                                    underlineSize={0}

                                    multiline={false}
                                    maxLength={1}
                                    //autoFocus={true}
                                    keyboardType="number-pad"
                                    returnKeyType="done"

                                />

                            </View>
                            <View style={{width:50,marginHorizontal:2,}} >
                                <FloatingLabelTextInput
                                    dir={'ltr'}
                                    autoFocus={this.state.focus==2}
                                    refInput={input=>{
                                        if(this.state.focus==2){
                                            input.focus();
                                        }
                                    }}
                                    style={{ borderColor: gr5,borderWidth:2,paddingVertical:5, borderRadius:8,backgroundColor:bgWhite}}
                                    //placeholder=""
                                    value={this.state.code2}
                                    onChangeText={text => {
                                        text = mapNumbersToEnglish(text);
                                        this.setState({ code2:text, code2Validation: true,focus:3});
                                    }}
                                    numberOfLines={1}
                                    tintColor={
                                        this.state.code1Validation ? placeholderTextColor : lightRed
                                    }
                                    textInputStyle={{
                                        fontFamily: 'IRANYekanFaNum-Bold',
                                        fontSize: 20,
                                        fontWeight:800,
                                        color: textItemBlack,
                                        paddingStart: 4,
                                        paddingTop: 6,
                                        paddingBottom: 5,
                                        textAlign: 'center',
                                    }}
                                    underlineSize={0}

                                    multiline={false}
                                    maxLength={1}
                                    //autoFocus={true}
                                    keyboardType="number-pad"
                                    returnKeyType="done"

                                />

                            </View>
                            <View style={{width:50,marginHorizontal:2,}} >
                                <FloatingLabelTextInput
                                    dir={'ltr'}
                                    autoFocus={this.state.focus==3}
                                    refInput={input=>{
                                        if(this.state.focus==3){
                                            input.focus();
                                        }
                                    }}
                                    style={{ borderColor: gr5,borderWidth:2,paddingVertical:5, borderRadius:8,backgroundColor:bgWhite}}
                                    //placeholder=""
                                    value={this.state.code3}
                                    onChangeText={text => {
                                        text = mapNumbersToEnglish(text);
                                        this.setState({ code3:text, code3Validation: true,focus:4});
                                    }}
                                    numberOfLines={1}
                                    tintColor={
                                        this.state.code1Validation ? placeholderTextColor : lightRed
                                    }
                                    textInputStyle={{
                                        fontFamily: 'IRANYekanFaNum-Bold',
                                        fontSize: 20,
                                        fontWeight:800,
                                        color: textItemBlack,
                                        paddingStart: 4,
                                        paddingTop: 6,
                                        paddingBottom: 5,
                                        textAlign: 'center',
                                    }}
                                    underlineSize={0}

                                    multiline={false}
                                    maxLength={1}
                                    //autoFocus={true}
                                    keyboardType="number-pad"
                                    returnKeyType="done"

                                />

                            </View>
                            <View style={{width:50,marginHorizontal:2,}} >
                                <FloatingLabelTextInput
                                    dir={'ltr'}
                                    autoFocus={this.state.focus==4}
                                    refInput={input=>{
                                        if(this.state.focus==4){
                                            input.focus();
                                        }
                                    }}
                                    style={{ borderColor: gr5,borderWidth:2,paddingVertical:5, borderRadius:8,backgroundColor:bgWhite}}
                                    //placeholder=""
                                    value={this.state.code4}
                                    onChangeText={text => {
                                        text = mapNumbersToEnglish(text);
                                        this.setState({ code4:text, code3Validation: true});
                                    }}
                                    numberOfLines={1}
                                    tintColor={
                                        this.state.code1Validation ? placeholderTextColor : lightRed
                                    }
                                    textInputStyle={{
                                        fontFamily: 'IRANYekanFaNum-Bold',
                                        fontSize: 20,
                                        fontWeight:800,
                                        color: textItemBlack,
                                        paddingStart: 4,
                                        paddingTop: 6,
                                        paddingBottom: 5,
                                        textAlign: 'center',
                                    }}
                                    underlineSize={0}

                                    multiline={false}
                                    maxLength={1}
                                    //autoFocus={true}
                                    keyboardType="number-pad"
                                    returnKeyType="done"
                                />
                            </View>

                        </View>
                        <TouchableOpacity
                            style={{
                                marginTop:15,
                                borderColor: gr5,
                                borderWidth:1,
                                padding:10,
                                paddingTop:10,
                                paddingHorizontal:30,
                                borderRadius:12,
                                alignItems:'center',
                                justifyContent:'center',

                            }}
                            onPress={() =>this.onfirmMobile()}
                        >
                            <Text style={{fontSize:20,color:gr1,fontWeight:500}}>{ translate('confirm')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ResponsiveLayout>


        )
    }

}


