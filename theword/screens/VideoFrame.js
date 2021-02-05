import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import { VideoScreen } from '../styles/reflections.elements';


const VideoFrame = ({ route, navigation }) => {
    const [playing, setPlaying] = useState(false)
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false)
            // Alert.alert("Video has finished playing")
        }
    },
        [],
    )

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
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={String(id)}
                onChangeState={onStateChange}
            />
            {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
        </VideoScreen>
    )
}

export default VideoFrame;
