import React from "react";
import {Dimensions, StyleSheet, Text, TouchableHighlight} from "react-native";

export default (props: { onClick: (arg0: any) => void; campo: React.ReactNode; }) => {
    return (
        <TouchableHighlight onPress={() => props.onClick(props.campo)}>
            <Text style={styles.button}>
                {props.campo}
            </Text>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
})
