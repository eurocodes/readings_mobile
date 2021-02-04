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
    MediumText,
    ReadingBoldText,
    VerseText
} from '../styles/home.elements';
import { TopBackground, LowerView, MessageText, View, InnerView } from '../styles/reflections.elements';
import { fetchReflectionTextSingle } from '../apiCalls';
import monstrance from '../assets/monstrance_host.jpg';
import { Platform } from 'react-native';

const Item = ({ text }) => (
    <MessageText>{text}</MessageText>
);

const ReflectionTextScreen = ({ route, navigation }) => {
    const [text, setText] = useState({})
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false);
    const today = new Date().getTime()

    const { url } = route.params;
    useEffect(() => {
        const fetchSingleText = async () => {
            const urlStr = url;
            const response = await fetchReflectionTextSingle(urlStr, "");
            setText(response)
        }
        fetchSingleText()
    }, [])

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

    return (
        <HomeScreenContainer >
            <HeaderContainer>
                <TopBackground
                    source={monstrance}
                    imageStyle={{ borderBottomRightRadius: 65 }}
                >

                    <StatusBar style="light" />
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
                    <Feather name="share-2" size={22} color="#fff"
                        style={{
                            position: "absolute", top: 40, right: 30
                        }} />
                </TopBackground>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        minimumDate={new Date(today - 2592000000)}
                        maximumDate={new Date(today + 259200000)}
                        is24Hour={true}
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
            </ReadingsContainer>
        </HomeScreenContainer>
    )
}

export default ReflectionTextScreen;
