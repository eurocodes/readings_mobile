import styled from "styled-components";

export const HomeScreenContainer = styled.SafeAreaView`
flex: 1;
background-color: #cfcfcf;
`;

export const HeaderContainer = styled.View`
border-bottom-right-radius: 65px;
`;

export const ScrollView = styled.ScrollView``;

export const View = styled.View`
padding: 5px;
`;

export const PageView = styled.ScrollView`
flex: 1;
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
font-size: 28px;
font-weight: bold;
color: #fff;
padding-left: 16px;
margin-top: 15px;
`;

export const ReadingsContainer = styled.ScrollView`
flex: 1;
background-color: #cfcfcf;
`;

export const Text = styled.Text`
font-size: 18px;
color: #3f2147;
padding: 0 5px 0 5px;
font-weight: normal;
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
padding: 0 5px 0 5px;
font-weight: bold;
`;

export const FooterText = styled.Text`
font-size: 15px;
color: #4a2a2a;
text-align: right;
padding-right: 14px;
font-weight: normal;
`;

export const ToastView = styled.View`
background-color: #000;
opacity: 0.3;
`;

export const FlatList = styled.FlatList`
`;

export const FlexView = styled.View`
`;

export const VerseText = styled.Text`
font-size: 18px;
padding: 0 5px 0 5px;
font-weight: 400;
color: #0f0f0f;
`;

// Psalm wrapper
export const PsalmView = styled.View``;

export const ResponseText = styled.Text`
font-size: 18px;
color: #3f2147;
padding: 0 5px 0 5px;
font-weight: bold;
justify-content: flex-start;
text-align: justify;
line-height: 26px;
`;

// Drawer elements
export const DrawerView = styled.View`
flex: 1;
padding: 8px;
background-color: #263759;
`;

export const HeaderImage = styled.Image`
width: 120px;
height: 120px;
align-self: center;
`;

export const ScrollContent = styled.View`
flex: 1;
`;

export const TitleWrapper = styled.View`
padding: 0 15px;
`;

export const TitleInner = styled.View`
margin-top: 15px;
`;

export const HeaderLabel = styled.View`
flex-direction: column;
`;

export const Title = styled.Text`
font-size: 26px;
margin-top: 3px;
color: #fff;
text-align: center;
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

export const DrawerItemText = styled.Text`
font-size: 18px;
font-weight: normal;
justify-content: flex-start;
text-align: justify;
color: #fff;
line-height: 26px;
`;

// About Page

export const AboutBackground = styled.SafeAreaView`
flex: 1;
`;

export const ScrollAbout = styled.ScrollView`
background-color: #263759;
`;

export const AboutImage = styled.Image`
margin: 120px 0 80px 0;
justify-content: center;
`;

export const AboutView = styled.View`
align-items: center;
margin-top: 20px;
`;

export const AboutInnerView = styled.View`
flex-direction: row;
justify-content: space-between;
margin: 100px 0;
`;

export const AboutInnerText = styled.Text`
font-size: 18px;
font-weight: bold;
justify-content: flex-start;
text-align: center;
color: #fff;
line-height: 26px;
margin-bottom: 20px;
padding: 0 15px;
`;

// Ad View
export const AddViewWrap = styled.View`
height: ${props => props.height};
width: ${props => props.height};
`;

// Buttons
export const PrevNextContainer = styled.View`
flex: 1;
flex-direction: row;
justify-content: space-between;
z-index: 1;
width: 100%;
margin-bottom: 10px;
`;