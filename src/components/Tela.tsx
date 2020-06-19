import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
        tela: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            backgroundColor: 'rgba(152,75,158,0.6)',
            alignItems: 'flex-end',
        },
        valorNaTela: {
            fontSize: 60,
            color: '#fff',
        }
    })

export default (props: { valor: React.ReactNode; }) =>
    <View style={styles.tela}>
        <Text style={styles.valorNaTela}
              numberOfLines={1}>{props.valor}</Text>
    </View>
