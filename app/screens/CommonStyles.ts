import { ButtonProps, ScreenProps } from "../components"
import type { ViewStyle } from "react-native"
import { spacing } from "../theme"

export const $screen: ScreenProps["contentContainerStyle"] = {
  flex: 1,
}

export const $innerContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

export const $buttonPadding: ViewStyle = {
  marginBottom: spacing.xl,
}

export const $photosList: ViewStyle = {
  flex: 1,
  marginBottom: spacing.sm,
}

export const $buttons: ViewStyle = {
  flexDirection: "row",
  gap: spacing.md,
  marginBottom: spacing.xl,
}
export const $button: ButtonProps["style"] = {
  flex: 1,
}
