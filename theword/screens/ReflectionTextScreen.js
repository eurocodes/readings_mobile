import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    HeaderContainer,
    CalendarText,
    HomeScreenContainer,
    ReadingsContainer, Text,
    TouchCalendar,
    TopText,
    FooterText,
    MediumText,
    ReadingBoldText,
    VerseText,
    PageView,
    ToastView,
    AddViewWrap
} from '../styles/home.elements';
import { TopBackground, LowerView, MessageText, View, InnerView } from '../styles/reflections.elements';
import { fetchReflectionTextSingle } from '../apiCalls';
import monstrance from '../assets/monstrance_host.jpg';
import { Alert, Clipboard, Platform, Share } from 'react-native';
import { Indicator } from '../components/ActivityIndicator';
import { Toast } from '../components/Toast';
import Constants from 'expo-constants';
import {AdMobBanner} from 'expo-ads-admob';
import { PRODUCTION_ID, TEST_ID } from '../appKeys';


// Is a real device and running in production.
const adUnitID = Constants.isDevice && !__DEV__ ? PRODUCTION_ID : TEST_ID;

const Item = ({ text }) => (
    <MessageText>{text}</MessageText>
);

const ReflectionTextScreen = ({ route, navigation }) => {
    const [text, setText] = useState({})
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false);
    const [visibleToast, setVisibleToast] = useState(false);
    const [hasAd, setHasAd] = useState(false)
    const [hideBar, setHideBar] = useState(false)
    const today = new Date().getTime()

    const { url } = route.params;
    useEffect(() => {
        const fetchSingleText = async () => {
            const urlStr = url;
            const response = await fetchReflectionTextSingle(urlStr, "");
            let refDate = url.split("/")
            refDate = refDate.slice(4, 5);
            refDate = refDate[0];
            refDate = refDate.split("-")
            setDate(new Date(refDate[0], refDate[1] - 1, refDate[2]))
            setText(response)
        }
        fetchSingleText()
        setVisibleToast(false)
    }, [visibleToast])

    const fetchSingleTextDated = async (date) => {
        let day = date.getDate();
        day = String(day)
        let month = date.getMonth() + 1;
        month = String(month);
        let year = date.getFullYear();
        year = String(year);
        year = year.slice(2, 4);
        if (day.length == 1) {
            day = "0" + day
        }
        if (month.length == 1) {
            month = "0" + month
        }
        const dateStr = `${year}-${month}-${day}`;
        const response = await fetchReflectionTextSingle("", dateStr);
        setText(response)
    }
    // fetchSingleTextDated()

    const changeDate = (selectedDate) => {
        const currentDate = selectedDate.nativeEvent.timestamp || date;
        setShow(Platform.OS === "ios");
        setDate(new Date(currentDate));
        fetchSingleTextDated(new Date(currentDate))

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode("date");
    }

    const copyText = () => {
        setVisibleToast(true);
        const reflections = copiedReflections(text.message)
        Clipboard.setString(text.title + "\n" + text.author + "\n" + "\n" +
            text.subtitle + "\n" + "\n" + text.verses + "\n" + "\n" + reflections.join("\n\n"))
    }

    const copiedReflections = (text) => {
        const reflectionArr = [];
        for (let i = 0; i < text.length; i++) {
            reflectionArr.push(text[i]);
        }

        return reflectionArr;
    }

    const onShare = async () => {
        const reflections = copiedReflections(text.message)
        try {
            const result = await Share.share({
                message: text.title + "\n" + text.author + "\n" + "\n" +
                    text.subtitle + "\n" + "\n" + text.verses + "\n" + "\n" + reflections.join("\n\n\n") + "\n" +
                    "Download Catholic Daily Readings And Reflections App from Google Play at \n \n https://play.google.com/store/apps/details?id=com.euteksoftwares/theword",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with actitvity type of " + result.activityType)
                } else {
                    console.log("Shared")
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Dismissed")
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const adRecieved = () => {
        setHasAd(true);
    }

    const hideBarToggle = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        let direction = currentOffset > 330 ? "down" : "up";
        if (currentOffset === 0) {
            setHideBar(false)
        }else if (direction === "down") {
            setHideBar(true);
        } else {
            setHideBar(false);
        }
        };

    return (
        <HomeScreenContainer >
            {text.message ? <PageView onScroll={(e) => hideBarToggle(e)}>
                <HeaderContainer>
                    <TopBackground
                    >

                        <StatusBar style="light" backgroundColor="#263759" hidden={hideBar} />
                        <TouchCalendar onPress={() => showDatePicker()}>
                            <CalendarText>{date.toDateString()},</CalendarText>
                        </TouchCalendar>
                        <TopText>{text.title}</TopText>
                        <MediumText>{text.author}</MediumText>
                        <Feather name="arrow-left" size={22} color="#fff"
                            onPress={() => navigation.goBack()}
                            style={{
                                position: "absolute", top: 40, left: 16
                            }} />
                        <Feather name="copy" size={22} color="#fff"
                            onPress={() => copyText()}
                            style={{
                                position: "absolute", top: 40, right: 70
                            }} />
                        <Feather name="share-2" size={22} color="#fff"
                            onPress={onShare}
                            style={{
                                position: "absolute", top: 40, right: 30
                            }} />
                    </TopBackground>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            minimumDate={new Date(today - 1728000000 * 1.2)}
                            maximumDate={new Date(today)}
                            display="default"
                            onChange={changeDate}
                        />
                    )}
                </HeaderContainer>

                <ReadingsContainer>
                    <LowerView>
                        <InnerView>
                            <ReadingBoldText>{text.subtitle}</ReadingBoldText>
                            <VerseText>{text.verses}</VerseText>
                        </InnerView>
                        {
                            text.message && text.message.map((text, index) => <InnerView key={index}>
                                <Item text={text} />
                            </InnerView>
                            )
                        }

                    </LowerView>
                    <FooterText>From CATHOLICDIOCESEOFWICHITA.ORG</FooterText>
                </ReadingsContainer>
                <ToastView>
                    <Toast visible={visibleToast} message="Text copied to clipboard" />
                </ToastView>
            </PageView> : <Indicator />}
            <AddViewWrap height={hasAd ? "auto": "0px"}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={adUnitID}
                servePersonalizedAds={true}
                onAdViewDidReceiveAd={adRecieved}
                // onDidFailToReceiveAdWithError={failedToLoadBanner}
            />
            </AddViewWrap>
        </HomeScreenContainer>
    )
}

export default ReflectionTextScreen;
