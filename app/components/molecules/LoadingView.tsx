import { ActivityIndicator, View, ViewStyle } from "react-native"
import React from "react"
import { colors } from "../../theme"

export const LoadingView = () => {
  return (
    <View style={$container}>
      <ActivityIndicator size="large" color={colors.palette.secondary500} />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
