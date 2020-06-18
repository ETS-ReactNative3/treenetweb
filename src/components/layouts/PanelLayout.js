
import {bgScreen} from "../../constants/colors";
import {observer} from 'mobx-react';
import React, {useEffect, useState,useRef} from "react";
import {deviceWide, height, showMassage, getCookie, saveCookie, setDemansion} from "../../utils";
import "./index.scss";
import ToastCard from "../ToastCard";
import {globalState, userStore} from "../../stores";
import {View} from "../../react-native";
import images from "../../../public/static/assets/images";
import persistStore from "../../stores/PersistStore";
import Router from "next/router";

const  screenMaxWidth=700;
const PanelLayout = observer( props => {
    const [showToast, setShowToast] = useState();
    const [isRtl, setIsRtl] = useState(true);
    const [accountSelectorVisible, setAccountSelectorVisible] = useState(false);
    const [screenwidth, setScreenwidth] = useState(900);
    const [isWide, setIsWide] = useState(false);
    let costPermission=null;
    let payAnnouncePermissioin=null;
    const ref = useRef(null);
    const selecetRole=(status)=> {
        setAccountSelectorVisible(status);
        getBalance();
    }
    const init=async()=> {
        manageScreenSize();
        setLanguage();

    }
    const setLanguage=async()=>{
        if(!global.slanguage){
            let lng = await getCookie('lng');
            if (lng) {
                global.slanguage = lng.key;
                global.isRtl = lng.rtl;
            }
            setIsRtl(global.isRtl);
        };
    }

    const manageScreenSize=()=> {
        setDemansion(screenMaxWidth);
        setScreenwidth(global.width);
        document.body.onresize = () => {
            setDemansion(screenMaxWidth);
            setScreenwidth(global.width);
            props.onResizeScreen && props.onResizeScreen(global.width,global.height);
        };
    }

    const checkToken=async()=> {
        //await fetchStore();
        persistStore.token=await getCookie('token');
        if(!persistStore.token ){
            Router.push('/index');
        }
    }
    checkToken();
    useEffect(() => {
        init();
        document.title = props.title;


    },  [ref.current]);

    return (
        <div   dir={global.isRtl?'rtl':'ltr'}  style={{
            textAlign:global.isRtl?"right":"left",
            display: 'flex',flex:1,
            justifyContent:'center',
            minHeight: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '125% auto',
            backgroundPosition: 'center top',
            backgroundAttachment: 'fixed',
            backgroundImage: `url(${images.publicPg})`}}
        >
            <div  ref={ref}   style={{
                display:'flex',
                flex:1,
                maxWidth:screenMaxWidth,
                backgroundColor:bgScreen,
                flexDirection:'column',
                position:'relative'
            }}>
                <View style={[props.style,{width:'100%',}]}>
                    <div id={"header"} style={{position:'fixed',top:0,width:screenwidth,zIndex:4,marginBottom:60}}>
                        {props.header}
                    </div>
                    <View id={'body'} style={{flex:1,width:screenwidth,marginTop:props.header?60:0,marginBottom:props.footer?60:0}}>
                        {props.children}
                    </View>
                    <div style={{position:'fixed',bottom:0,width:screenwidth,zIndex:4,backgroundColor:bgScreen,paddingTop:10 }}>
                        {props.footer}
                    </div>
                    <ToastCard
                        visible={globalState.toastCard}
                        type={globalState.toastType}
                        title={globalState.toastTitle}
                        message={globalState.responseMessage}
                        onClose={() => globalState.hideToastCard()}
                    />
                </View>
            </div>
        </div>
    );
});

export default PanelLayout;