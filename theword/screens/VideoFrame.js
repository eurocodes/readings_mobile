import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { VideoScreen, VideoContainer } from '../styles/reflections.elements';
import {AddViewWrap} from '../styles/home.elements';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { PRODUCTION_ID, IOS_PRODUCTION_ID } from '../appKeys';
import WebView from 'react-native-webview';

// Is a real device and running in production.
//const adUnitID = Constants.isDevice && !__DEV__ ? PRODUCTION_ID : TEST_ID;
const adUnitID = getAdUnitId();

function getAdUnitId(){
    if(__DEV__){
        return TestIds.BANNER;
    }

    switch(Platform.OS.toLowerCase()){
        case 'ios': return IOS_PRODUCTION_ID;
        case 'android': return PRODUCTION_ID;
        default: return "";
    }
}

const VideoFrame = ({ route, navigation }) => {
    const [playing, setPlaying] = useState(false)
    const [hasAd, setHasAd] = useState(false)
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false)
            // Alert.alert("Video has finished playing")
        }
    },
        [],
    );

    const adRecieved = () => {
        setHasAd(true);
    }

    const { id } = route.params;
    return (
        <VideoScreen >
            <StatusBar style="light" />
            <VideoContainer>

            <WebView
            javaScriptEnabled={true}
            source={{
            uri: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=1`,
            }}
            />

            </VideoContainer>
            {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
             <AddViewWrap height={hasAd ? "auto": "0px"} width={hasAd ? "auto": "0px"}>
                <BannerAd
                        // It is extremely important to use test IDs as you can be banned/restricted by Google AdMob for inappropriately using real ad banners during testing
                        unitId={adUnitID}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                        requestNonPersonalizedAdsOnly: true, 
                        // You can change this setting depending on whether you want to use the permissions tracking we set up in the initializing
                        }}
                        onAdLoaded={() => {
                        setHasAd(true);
                        }}
                    />
            </AddViewWrap>
        </VideoScreen>
    )
}

export default VideoFrame;
