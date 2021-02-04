import * as React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';
import {
    ScrollContent,
    TitleWrapper,
    DrawerView,
    TitleInner,
    Image,
    HeaderLabel,
    Title,
    Caption,
    DrawerSection,
    BottomDrawerSection
} from '../styles/home.elements';

export default function DrawerContent(props) {

    return (
        <DrawerView>
            <DrawerContentScrollView {...props}>
                <ScrollContent>
                    <TitleWrapper>
                        <TitleInner>
                            <Image
                                source={{
                                    uri: "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                                }}
                                size={40}
                            />
                            <HeaderLabel>
                                <Title>...</Title>
                                <Caption>Welcome</Caption>
                            </HeaderLabel>
                        </TitleInner>
                    </TitleWrapper>

                    <DrawerSection>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="book" color={color} size={size} />
                            )}
                            label="Daily Readings"
                            onPress={() => { props.navigation.navigate("Daily Readings") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="video" color={color} size={size} />
                            )}
                            label="Daily Reflection"
                            onPress={() => { props.navigation.navigate("Daily Reflection") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="file-text" color={color} size={size} />
                            )}
                            label="Daily Reflection"
                            onPress={() => { props.navigation.navigate("Daily Reflection Text") }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="star" color={color} size={size} />
                            )}
                            label="Rate this App"
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="share-2" color={color} size={size} />
                            )}
                            label="Share this App"
                            onPress={() => { }}
                        />
                    </DrawerSection>
                </ScrollContent>
            </DrawerContentScrollView>
            <BottomDrawerSection>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="log-out" color={color} size={size} />
                    )}
                    label="Sign In"
                    onPress={() => { }}
                />
            </BottomDrawerSection>
        </DrawerView>
    );
}