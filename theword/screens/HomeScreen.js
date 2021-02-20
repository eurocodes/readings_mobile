import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    ResponseText
} from '../styles/home.elements';
import { fetchReadings, getReadings } from '../apiCalls';
import churchWall from '../assets/church-wall-1.jpg';
import monstrance from '../assets/monstrance_host.jpg';
import { Platform, Clipboard, Share, Alert } from 'react-native';
import { Indicator } from "../components/ActivityIndicator";
import { TouchableOpacity } from '../styles/home.elements';
import { fetchReadingsSpecial } from '../apiCalls';
import { FooterBoldText } from '../styles/home.elements';
import { Toast } from '../components/Toast';

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
    useEffect(() => {
        const fetchText = async () => {
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
        const currentDate = selectedDate.nativeEvent.timestamp || date;
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

    const copyToClipboard = () => {
        setVisibleToast(true);
        let allReading = copiedReadings(text.text)
        Clipboard.setString(text.title.toUpperCase() + "\n" + text.lectionary + "\n" + "\n" + allReading)

    }

    const copiedReadings = (text) => {
        const reading = []
        for (let i = 0; i < text.length; i++) {
            reading.push(text[i].title + ": " + text[i].verse + "\n" + "\n");
            reading.push(text[i].text.replace(/\s\s+/g, "") + "\n" + "\n");
        }
        return reading;
    }

    const onShare = async () => {
        const allReading = copiedReadings(text.text)
        try {
            const result = await Share.share({
                message: text.title.toUpperCase() + "\n" + text.lectionary + "\n" + "\n" + allReading + "\n" + "\n" +
                    "Download daily readings and reflections App from \n \n https://expo.io/@emmanuelum/theword",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with actitvity type of" + result.activityType)
                } else {
                    Alert.alert("Shared")
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Dismissed")
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString()
    //     setCopiedText(text);
    // }

    return (
        <HomeScreenContainer >
            {text.title ? <PageView>
                <HeaderContainer>
                    <ImageBackground
                        source={monstrance}
                        imageStyle={{ borderBottomRightRadius: 65 }}
                    >

                        <StatusBar style="light" backgroundColor="#141414" />
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
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={changeDate}
                        />
                    )}
                </HeaderContainer>

                <ReadingsContainer>
                    {text.text[0].title ? text.text.map((item) => <View key={item.id}>
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
                    <FooterBoldText>{text.ref}</FooterBoldText>
                </ReadingsContainer>
            </PageView> : <Indicator />}
        </HomeScreenContainer>
    )
}

export default HomeScreen
