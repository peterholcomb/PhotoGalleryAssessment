import { View, ViewStyle } from "react-native"
import React from "react"
import { Button, Text } from "../atoms"

export const ErrorView = ({ resetErrorBoundary }) => {
  return (
    <View style={$container}>
      <Text tx="errorView.title" />
      <Button tx="errorView.retry" preset="danger" onPress={resetErrorBoundary} />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}
