import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import {
    HeaderContainer,
    CalendarText,
    HomeScreenContainer,
    ImageBackground,
    ReadingsContainer, Text,
    TouchCalendar,
    DarkOverLayView,
    TopText,
    MediumText,
    View,
    ReadingBoldText,
    PageView,
    VerseText,
    ToastView,
    PsalmView,
    ResponseText,
    AddViewWrap
} from '../styles/home.elements';
import { fetchReadings, getReadings } from '../apiCalls';
import churchWall from '../assets/church-wall-1.jpg';
import monstrance from '../assets/monstrance_host.jpg';
import { Platform, Clipboard, Share, Alert } from 'react-native';
import { Indicator } from "../components/ActivityIndicator";
import { TouchableOpacity, PrevNextContainer } from '../styles/home.elements';
import { fetchReadingsSpecial } from '../apiCalls';
import { FooterText } from '../styles/home.elements';
import { Toast } from '../components/Toast';
import Constants from 'expo-constants';
import { PRODUCTION_ID, IOS_PRODUCTION_ID } from '../appKeys';
import { DateSelector } from '../components/DateSelector';


// Is a real device and running in production.
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
const Item = ({ title, verse, text }) => (
    <View>
        <ReadingBoldText>{title}</ReadingBoldText>
        <VerseText>{verse}</VerseText>
        {
            // Renders responsorial psalm and alleluia verses differently
            title.toUpperCase() === "RESPONSORIAL PSALM" ? <PsalmView>
                {
                    text.split("\n").map((a, i) =>
                        text.split("\n")[0].replace(/\s\s+/g, "").split(")")[1] === a.replace(/\s\s+/g, "").split("R.")[1]
                            ? <ResponseText key={i}>{a.replace(/\s\s+/g, "")}</ResponseText> :
                            text.split("\n")[0] == a ? <ResponseText key={i}>{a.replace(/\s\s+/g, "")}</ResponseText> :
                                text.split("\n")[0].replace(/\s\s+/g, "").split(")")[1].trim() === a.replace(/\s\s+/g, "").split("R.")[1]
                                    ? <ResponseText key={i}>{a.replace(/\s\s+/g, "")}</ResponseText> :
                                text.split("\n")[0].replace(/\s\s+/g, "").split(")")[1].trim() === a.replace(/\s\s+/g, "").split("R. ")[1]
                                    ? <ResponseText key={i}>{a.replace(/\s\s+/g, "")}</ResponseText> :
                                    <Text key={i}>{a.replace(/\s\s+/g, "")}</Text>
                    )
                }
            </PsalmView>
                : title.toUpperCase() === "ALLELUIA" ? <PsalmView>
                    {
                        text.split("\n").map((a, i) =>
                            a.replace(/\s\s+/g, "") === text.split("\n")[0].replace(/\s\s+/g, "")
                                ? <ResponseText key={i}>{a.replace(/\s\s+/g, "")}</ResponseText> :
                                <Text key={i}>{a.replace(/\s\s+/g, "")}</Text>
                        )
                    }
                </PsalmView>
                    : <Text>{text}</Text>
        }
        {/* <Text>{text}</Text> */}
    </View>
);

const ItemSpecialDays = ({ text }) => (
    <View>
        <ReadingBoldText>{text}</ReadingBoldText>
    </View>
);

const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState({})
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [copiedText, setCopiedText] = useState("")
    const [visibleToast, setVisibleToast] = useState(false);
    const [hasAd, setHasAd] = useState(false)
    const [hideBar, setHideBar] = useState(false)
    const today = new Date().getTime()
    useEffect(() => {
        const fetchText = async () => {
            try {
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
            const dateStr = month + day + year;
            const response = await fetchReadings(dateStr);
            setText(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchText()
        setVisibleToast(false)
    }, [date, visibleToast])

    // Get readings manually
    const getReadingsSpecialDays = async (link) => {
        const response = await fetchReadingsSpecial(link)
        setText(response)
    }

    const changeDate = (selectedDate) => {
        setText({});
        const currentDate = selectedDate.nativeEvent?.timestamp || date;
        setShow(Platform.OS === "ios");
        setDate(new Date(currentDate))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode("date");
    }

    // set min and max arrow date navigator
    const minimumDate = new Date(today - 86400000 * 273.75);
    const maximumDate = new Date(today + 86400000 * 273.75);

    const copyToClipboard = () => {
        setVisibleToast(true);
        let allReading = copiedReadings(text.text)
        Clipboard.setString(text.title.toUpperCase() + "\n" + text.lectionary + "\n" + "\n" + allReading.join("\n\n"))

    }

    const copiedReadings = (text) => {
        const reading = []
        for (let i = 0; i < text.length; i++) {
            reading.push(text[i].title + ": " + text[i].verse);
            reading.push(text[i].text.replace(/\s\s+/g, ""));
        }
        return reading;
    }

    const onShare = async () => {
        const allReading = copiedReadings(text.text)
        let shareUrl = "";
        if(Platform.OS.toLowerCase() == "ios"){
            shareUrl = "Download the Daily Catholic Readings And Reflections from App Store at \n \n https://apps.apple.com/ng/app/theword/";
        }
        else{
            shareUrl = "Download the Daily Catholic Readings And Reflections from Google Play at \n \n https://play.google.com/store/apps/details?id=com.ugsoft.theword";
        }
        try {
            const result = await Share.share({
                message: text.title.toUpperCase() + "\n" + text.lectionary + "\n" + "\n" + allReading.join("\n\n\n") + "\n\n" +
                    shareUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with actitvity type of" + result.activityType)
                } else {
                    console.log("Shared")
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Dismissed")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const adRecieved = () => {
        setHasAd(true);
    }

    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString()
    //     setCopiedText(text);
    // }

    const hideBarToggle = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        let direction = currentOffset > 330 ? "down" : "up";
        if (currentOffset === 0) {
            setHideBar(false)
        } else if (direction === "down") {
            setHideBar(true);
        } else {
            setHideBar(false);
        }
        };

    return (
        <HomeScreenContainer>
            {text?.title ? <PageView onScroll={(e) => hideBarToggle(e)}>
                <HeaderContainer>
                    <ImageBackground
                        source={monstrance}
                        imageStyle={{ borderBottomRightRadius: 65 }}
                    >

                        <StatusBar style="light" backgroundColor="#141414" hidden={hideBar} />
                        <DarkOverLayView></DarkOverLayView>
                        <TouchCalendar onPress={() => showDatePicker()}>
                            <CalendarText>{date.toDateString()}</CalendarText>
                        </TouchCalendar>
                        <TopText>{text.title}</TopText>
                        <MediumText>{text.lectionary}</MediumText>
                        <Feather name="menu" size={22} color="#fff"
                            onPress={() => navigation.openDrawer()}
                            style={{
                                position: "absolute", top: 40, left: 16
                            }} />
                        <Feather name="copy" size={22} color="#fff"
                            onPress={() => copyToClipboard()}
                            style={{
                                position: "absolute", top: 40, right: 70
                            }} />
                        <Feather name="share-2" size={22} color="#fff"
                            onPress={onShare}
                            style={{
                                position: "absolute", top: 40, right: 30
                            }} />
                    </ImageBackground>
                    {show && (
                        <DateSelector 
                            platform = {Platform.OS}
                            today = {today}
                            date = {date}
                            mode = {mode}
                            changeDate = {changeDate}
                        />
                    )}
                </HeaderContainer>
                <PrevNextContainer>
                <Feather name="arrow-left" size={22} color="#263759"
                            onPress={() => changeDate(date.setDate(date.getDate() - 1))}
                            style={{
                                left: 16, top: 15
                            }} />

                {maximumDate > date && <Feather name="arrow-right" size={22} color="#263759"
                            onPress={() => changeDate(date.setDate(date.getDate() + 1))}
                            style={{
                                right: 16, top: 15,
                            }} />}
                </PrevNextContainer>
                <ReadingsContainer>
                    {text.text[0].verse ? text.text.map((item) => <View key={item.id}>
                        <Item title={item.title} verse={item.verse} text={item.text} />
                    </View>) :
                        text.text.map((item) => <View key={item.id}>
                            <TouchableOpacity
                                onPress={() => getReadingsSpecialDays(item.link)}
                            >
                                <ItemSpecialDays text={item.text} />
                            </TouchableOpacity>
                        </View>)}
                    <ToastView>
                        <Toast visible={visibleToast} message="Text copied to clipboard" />
                    </ToastView>
                    <FooterText>From USCCB.ORG</FooterText>
                </ReadingsContainer>
            </PageView> : <Indicator />}
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
        </HomeScreenContainer>
    )
}

export default HomeScreen
