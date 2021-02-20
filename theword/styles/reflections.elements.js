import styled from "styled-components";
export const colors = {
    themeCOlor: "#4263ec",
    white: "#fff",
    backGround: "#f4f6fc",
    greyish: "#a4a4a4",
    tint: "#2b49c3",
}
export const ReflectionsContainer = styled.SafeAreaView`
flex: 1;
background-color: #cfd2da;
`;
export const PageView = styled.View`
flex: 1;
`;

export const HeaderContainer = styled.View`
padding-top: 40px;
background-color: #263759;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
`;

export const HeaderContent = styled.View`
padding: 16px;
flex-direction: row;
justify-content: space-between;
`;

export const HeaderTextContainer = styled.View`
padding: 20px 16px;
`;

export const HeaderText = styled.Text`
color: #fff;
font-size: 25px;
font-weight: bold;
text-transform: uppercase;
`;

export const ReflectionSearch = styled.View`
padding: 16px 6px;
flex-direction: row;
justify-content: space-between;
background-color: #2b49c3;
border-radius: 20px;
margin: 20px 0;
align-items: center;
`;

export const View = styled.View`
border-radius: 15px;
padding: 10px;
width: 85%;
`;
export const Text = styled.Text`
font-size: 18px;
font-weight: bold;
text-transform: uppercase;
color: #0f2147;
`;

export const ListDateText = styled.Text`
font-size: 18px;
font-weight: bold;
color: #5f2147;
`;

export const FlatList = styled.FlatList``;
export const TouchableOpacity = styled.TouchableOpacity`
justify-content: center;
border-radius: 15px;
background-color: #f8f7f0;
padding: 10px 20px;
`;

export const RenderListView = styled.View`
flex-direction: row;
justify-content: space-between;
margin: 4px 2px;
padding: 2px 14px;
`;

export const ScrollWrapper = styled.View`
flex: 1;
`;

export const FlatListView = styled.ScrollView`
background-color: #cfd2da;
margin: 20px 0;
`;

export const ItemsWrapper = styled.View``;

export const LineBreaker = styled.View`
width: 100%;
border-color: #86878a;
border-width: 1px;
`;

// Reflection text styles

export const RenderTextView = styled.View`
margin: 4px 2px;
padding: 2px 10px;
`;

export const ViewText = styled.View`
border-radius: 15px;
padding: 5px;
`;

export const ReflectionTextTitle = styled.Text`
font-size: 18px;
font-weight: bold;
color: #0f2147;
margin-bottom: 15px;
text-transform: uppercase;
`;

export const TextReflectionText = styled.Text`
font-size: 18px;
font-weight: bold;
color: #5f2147;
margin-bottom: 15px;
`;

// Single reflection

export const TopBackground = styled.View`
width: 100%;
height: auto;
background-color: #263759;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
`;

export const InnerView = styled.View`
padding: 5px;
border-radius: 15px;
width: 90%;
`;

export const LowerView = styled.View`
padding: 5px;
justify-content: center;
align-items: center;
`;

export const MessageText = styled.Text`
font-size: 18px;
font-weight: normal;
color: #3f2147;
justify-content: flex-start;
text-align: justify;
line-height: 26px;
margin-top: 16px;
`;

// Videos
export const VideoScreen = styled.SafeAreaView`
flex: 1;
background-color: #2e2e2e;
justify-content: center;
`;