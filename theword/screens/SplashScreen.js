import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import logo from "../assets/logo-2.png";

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Daily Readings")
        }, 3000)
    }, [])
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Image
                resizeMode="contain"
                style={{ width: "100%", }}
                source={logo} />
        </View>
    )
}

export default SplashScreen
