import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import { VideoScreen, VideoContainer } from '../styles/reflections.elements';
import {AddViewWrap} from '../styles/home.elements';
import Constants from 'expo-constants';
import {AdMobBanner} from 'expo-ads-admob';
import { PRODUCTION_ID, TEST_ID } from '../appKeys';

// Is a real device and running in production.
const adUnitID = Constants.isDevice && !__DEV__ ? PRODUCTION_ID : TEST_ID;

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

    // const togglePlaying = useCallback(
    //     () => {
    //         setPlaying((prev) => !prev);
    //     },
    //     [],
    // )
    const { id } = route.params;
    return (
        <VideoScreen >
            <StatusBar style="light" />
            <VideoContainer>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={String(id)}
                onChangeState={onStateChange}
            />
            </VideoContainer>
            {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
             <AddViewWrap height={hasAd ? "auto": "0px"}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={adUnitID}
                servePersonalizedAds={true}
                onAdViewDidReceiveAd={adRecieved}
                // onDidFailToReceiveAdWithError={failedToLoadBanner}
            />
            </AddViewWrap>
        </VideoScreen>
    )
}

export default VideoFrame;
