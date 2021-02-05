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
    FlatList,
    PageView,
    VerseText
} from '../styles/home.elements';
import { fetchReadings, getReadings } from '../apiCalls';
import churchWall from '../assets/church-wall-1.jpg';
import monstrance from '../assets/monstrance_host.jpg';
import { Platform, } from 'react-native';
import { Indicator } from "../components/ActivityIndicator";

const imageUri = "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Item = ({ title, verse, text }) => (
    <View>
        <ReadingBoldText>{title}</ReadingBoldText>
        <VerseText>{verse}</VerseText>
        <Text>{text}</Text>
    </View>
);

const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState({})
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [copiedText, setCopiedText] = useState("")
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
    }, [date])

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

    const renderItem = ({ item }) => (
        <View>
            <Item title={item.title} verse={item.verse} text={item.text} />
        </View>
    );

    return (
        <HomeScreenContainer >
            {text.title ? <PageView>
                <HeaderContainer>
                    <ImageBackground
                        source={monstrance}
                        imageStyle={{ borderBottomRightRadius: 65 }}
                    >

                        <StatusBar style="light" />
                        <DarkOverLayView></DarkOverLayView>
                        <TouchCalendar onPress={() => showDatePicker()}>
                            <CalendarText>{date.toDateString()},</CalendarText>
                        </TouchCalendar>
                        <TopText>{text.title}</TopText>
                        <MediumText>{text.lectionary}</MediumText>
                        <Feather name="menu" size={22} color="#fff"
                            onPress={() => navigation.openDrawer()}
                            style={{
                                position: "absolute", top: 40, left: 16
                            }} />
                        <Feather name="copy" size={22} color="#fff"
                            onPress={() => { }}
                            style={{
                                position: "absolute", top: 40, right: 70
                            }} />
                        <Feather name="share-2" size={22} color="#fff"
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
                    <View>
                        <FlatList
                            data={text.text}
                            renderItem={renderItem}
                            keyExtractor={item => String(item.id)} />
                    </View>
                </ReadingsContainer>
            </PageView> : <Indicator />}
        </HomeScreenContainer>
    )
}

export default HomeScreen
