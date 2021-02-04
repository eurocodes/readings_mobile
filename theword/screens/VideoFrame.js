import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import { HomeScreenContainer, Text } from '../styles/home.elements';
import { Alert, Button } from 'react-native';


const VideoFrame = ({ route, navigation }) => {
    const [playing, setPlaying] = useState(false)
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false)
            Alert.alert("Video has finished playing")
        }
    },
        [],
    )

    const togglePlaying = useCallback(
        () => {
            setPlaying((prev) => !prev);
        },
        [],
    )
    const { id } = route.params;
    return (
        <HomeScreenContainer >
            <StatusBar style="light" />
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={String(id)}
                onChangeState={onStateChange}
            />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </HomeScreenContainer>
    )
}

export default VideoFrame;
