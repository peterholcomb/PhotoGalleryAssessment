module.exports = {
  name: "SkylightFrontEndChallenge",
  displayName: "SkylightFrontEndChallenge",
  expo: {
    name: "SkylightFrontEndChallenge",
    slug: "SkylightFrontEndChallenge",
    scheme: "skylightfrontendchallenge",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon-all.png",
    splash: {
      image: "./assets/images/splash-logo-all.png",
      resizeMode: "contain",
      backgroundColor: "#191015",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    jsEngine: "hermes",
    assetBundlePatterns: ["**/*"],
    android: {
      icon: "./assets/images/app-icon-android-legacy.png",
      package: "com.skylightfrontendchallenge",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-android-adaptive-foreground.png",
        backgroundImage: "./assets/images/app-icon-android-adaptive-background.png",
      },
      splash: {
        image: "./assets/images/splash-logo-android-universal.png",
        resizeMode: "contain",
        backgroundColor: "#191015",
      },
    },
    ios: {
      icon: "./assets/images/app-icon-ios.png",
      supportsTablet: true,
      bundleIdentifier: "com.skylightfrontendchallenge",
      splash: {
        image: "./assets/images/splash-logo-ios-mobile.png",
        tabletImage: "./assets/images/splash-logo-ios-tablet.png",
        resizeMode: "contain",
        backgroundColor: "#191015",
      },
    },
    web: {
      favicon: "./assets/images/app-icon-web-favicon.png",
      splash: {
        image: "./assets/images/splash-logo-web.png",
        resizeMode: "contain",
        backgroundColor: "#191015",
      },
    },
    plugins: ["expo-localization"],
    extra: {
      storybookEnabled: process.env.STORYBOOK_ENABLED,
    },
  },
}
