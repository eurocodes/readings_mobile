import * as React from 'react';
import { Share, Alert } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';
import {
    ScrollContent,
    TitleWrapper,
    DrawerView,
    TitleInner,
    HeaderImage,
    HeaderLabel,
    Title,
    Caption,
    DrawerSection,
    BottomDrawerSection,
    DrawerItemText,
} from '../styles/home.elements';
import logo_3 from "../assets/app-icon.png";

export default function DrawerContent(props) {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "Download Catholic Daily Readings And Reflections App from Google Play at \n \n https://play.google.com/store/apps/details?id=com.euteksoftwares/theword",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // console.log("Shared with actitvity type of" + result.activityType)
                } else {
                    // Alert.alert("Shared")
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Dismissed")
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <DrawerView>
            <DrawerContentScrollView {...props}>
                <ScrollContent>
                    <TitleWrapper>
                        <TitleInner>
                            <HeaderImage
                                source={logo_3}
                                imageStyle={{ resizeMode: "contain" }}
                            />
                            <HeaderLabel>
                                <Title>Daily Readings with Reflections</Title>
                            </HeaderLabel>
                        </TitleInner>
                    </TitleWrapper>

                    <DrawerSection>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="book" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>Daily Readings</DrawerItemText>}
                            onPress={() => { props.navigation.navigate("Daily Readings") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="video" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>Daily Reflection</DrawerItemText>}
                            onPress={() => { props.navigation.navigate("Daily Reflection") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="file-text" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>Daily Reflection</DrawerItemText>}
                            onPress={() => { props.navigation.navigate("Daily Reflection Text") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="info" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>About us</DrawerItemText>}
                            onPress={() => { props.navigation.navigate("About us") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="star" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>Rate this App</DrawerItemText>}
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="share-2" color="#fff" size={size} />
                            )}
                            label={() => <DrawerItemText>Share this App</DrawerItemText>}
                            onPress={onShare}
                        />
                    </DrawerSection>
                </ScrollContent>
            </DrawerContentScrollView>
            <BottomDrawerSection>
                <DrawerItem
                    icon={({ size }) => (
                        <Feather name="archive" color="#fff" size={size} />
                    )}
                    label={() => <DrawerItemText>More</DrawerItemText>}
                    onPress={() => { }}
                />
            </BottomDrawerSection>
        </DrawerView>
    );
}