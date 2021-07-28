import React, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function Indicator() {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#263759" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});