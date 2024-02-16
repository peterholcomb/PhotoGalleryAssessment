import { View, ViewStyle } from "react-native"
import React from "react"
import { Button, ButtonProps, Text } from "../atoms"
import { spacing } from "../../theme"

export interface ErrorViewProps {
  resetErrorBoundary: () => void
}

/**
 * A view to display when an error occurs in the app that allows the user to retry the action
 * @param resetErrorBoundary
 * @constructor
 */
export const ErrorView = ({ resetErrorBoundary }: ErrorViewProps) => {
  return (
    <View style={$container}>
      <View style={$innerContainer}>
        <Text tx="errorView.title" preset="heading" />
        <Text tx="errorView.body" />
        <Button tx="errorView.retry" style={$button} preset="danger" onPress={resetErrorBoundary} />
      </View>
    </View>
  )
}
const $button: ButtonProps["style"] = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.md,
}
const $innerContainer: ViewStyle = {
  gap: spacing.md,
  flexDirection: "column",
}
