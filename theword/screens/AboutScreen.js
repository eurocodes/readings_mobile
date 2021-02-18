import React, {useEffect, useState} from 'react'
import { View, Text, Clipboard } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Toast } from '../components/Toast';
import {fetchDetailsFromSite} from '../apiCalls';
import { Indicator } from "../components/ActivityIndicator";
import { 
    AboutBackground, 
    AboutImage, 
    AboutInnerText, AboutInnerView, 
    AboutView, Title, ScrollAbout, ToastView, 
    TouchableOpacity 
    } from '../styles/home.elements'

import logo from "../assets/logo-3.png";

const AboutScreen = ({ navigation }) => {

    const [details, setDetails] = useState({});
    const [visibleToast, setVisibleToast] = useState(false);

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetchDetailsFromSite()
            const email = response.email.split(":")[1];
            setDetails(response)
            console.log(details)
        }
        getDetails();
    }, []);

    const copyToClipboard = () => {
        setVisibleToast(true);
        Clipboard.setString(details.mail)
    }

    return (
        <AboutBackground>
         <StatusBar style="light" backgroundColor="#263759" />
            <ScrollAbout contentContainerStyle={{alignItems: "center"}}>
            <Feather name="arrow-left" size={22} color="#fff"
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute", top: 40, left: 16
                }} />

            <AboutImage
                source={logo}
                imageStyle={{ resizeMode: "contain" }}
            />

            <Title>App version: 1.0.0</Title>
            {details.email ? <AboutView>
                <AboutInnerText>App by {details.name}</AboutInnerText>
                <AboutInnerView>
                    <Feather name="mail" size={22} color="#fff" />
                    <TouchableOpacity onPress={copyToClipboard}>
                    <AboutInnerText>{details.mail}</AboutInnerText>
                    </TouchableOpacity>
                </AboutInnerView>
                <AboutInnerText>Appreciation</AboutInnerText>
                <AboutInnerText>{details.message}</AboutInnerText>
            </AboutView>: <Indicator />}
            <ToastView>
                        <Toast visible={visibleToast} message="Text copied to clipboard" />
                    </ToastView>

            </ScrollAbout>
        </AboutBackground>
    )
}

export default AboutScreen
