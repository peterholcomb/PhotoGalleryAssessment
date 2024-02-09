declare module "*.svg" {
  import React from "react"
  import type { SvgProps } from "react-native-svg"

  const content: React.FC<SvgProps>
  export default content
}

declare module "*.png" {
  import type { ImageSourcePropType } from "react-native"

  const value: ImageSourcePropType
  export default value
}

declare module "*.jpg" {
  import type { ImageSourcePropType } from "react-native"

  const value: ImageSourcePropType
  export default value
}
