import styled from "styled-components";

export const HomeScreenContainer = styled.SafeAreaView`
flex: 1;
background-color: #cfcfcf;
justify-content: center;
`;

export const HeaderContainer = styled.View`
border-bottom-right-radius: 65px;
`;

export const View = styled.View`
padding: 5px;
`;

export const DarkOverLayView = styled.View`
position: absolute;
top: 0;
right: 0;
left: 0;
height: 100%;
background-color: #000;
opacity: 0.5;
border-bottom-right-radius: 65px;
`;

export const TopText = styled.Text`
font-size: 38px;
font-weight: bold;
color: #fff;
padding-left: 16px;
margin-top: 15px;
`;

export const ReadingsContainer = styled.ScrollView`
background-color: #cfcfcf;
`;

export const Text = styled.Text`
font-size: 16px;
/* padding: 0 14px 0 14px; */
font-weight: normal;
opacity: 0.3;
justify-content: flex-start;
text-align: justify;
line-height: 26px;
`;

export const MediumText = styled.Text`
font-size: 20px;
font-weight: 600;
color: #fff;
padding: 0 0 10px 16px;
margin-top: 15px;
`;

export const Image = styled.Image`
width: 40px;
`;

export const ImageBackground = styled.ImageBackground`
width: 100%;
height: auto;
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const TouchCalendar = styled.TouchableOpacity`
background-color: #fff;
padding: 12px;
margin: 80px 16px 0 15px;
border-top-right-radius: 40px;
border-bottom-right-radius: 40px;
padding-left: 16px;
`;

export const CalendarText = styled.Text`
font-size: 25px;
font-weight: bold;
color: #aaa;
`;

export const ReadingBoldText = styled.Text`
font-size: 25px;
font-weight: bold;
`;

export const FlatList = styled.FlatList`
`;

export const FlexView = styled.View`
`;

export const VerseText = styled.Text`
font-size: 18px;
font-weight: 400;
color: #0f0f0f;
`;

// Drawer elements
export const DrawerView = styled.View`
flex: 1;
padding: 8px;
`;

export const ScrollContent = styled.View`
flex: 1;
`;

export const TitleWrapper = styled.View`
padding-left: 15px;
`;

export const TitleInner = styled.View`
flex-direction: row;
margin-top: 15px;
`;

export const HeaderLabel = styled.View`
flex-direction: column;
margin-left: 15px;
`;

export const Title = styled.Text`
font-size: 16px;
margin-top: 3px;
font-weight: bold;
`;

export const Caption = styled.Text`
font-size: 14px;
line-height: 14px;
`;

export const DrawerSection = styled.View`
margin-top: 15px;
`;

export const BottomDrawerSection = styled.View`
margin-bottom: 15px;
border-top-color: #f4f4f4;
border-top-width: 1px;
`;