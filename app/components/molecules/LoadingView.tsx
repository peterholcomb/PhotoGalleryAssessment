import { ActivityIndicator, View, ViewStyle } from "react-native"
import React from "react"

export const LoadingView = () => {
  return (
    <View style={$container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
