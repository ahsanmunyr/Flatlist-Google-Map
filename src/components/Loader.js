import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import colors from '../assets/colors/colors'

export default function Loader({color,size}) {
  return (
    <View style={styles.con}>
      <ActivityIndicator size={responsiveFontSize(size?size:4)} color={color ? color :colors.themeblue}/>
    </View>
  )
}

const styles = StyleSheet.create({
    con:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})