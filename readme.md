1) npm i
2) replace from native-modules in node-modules
3) node node_modules/react-native-text-gradient/patch-rn.js
4) cd ios && pod update && cd ../
5) brew update && brew cask install react-native-debugger
android studio react-native-google-analytics 15.0.0

if FBSDK     /pod 'FBSDKCoreKit', '~> 4.42.0'   /
            / pod 'FBSDKLoginKit', '~> 4.42.0' /
           /  pod 'FBSDKShareKit', '~> 4.42.0'/


6) npm i && node node_modules/react-native-text-gradient/patch-rn.js && cd ios && pod update && cd ../ 

NOTATION: then replace from native-modules in node-modules and react-native-google-analytics 15.0.0
NOTATION: remove 'static' from 'static getDerivedStateFromProps'

#EpocketCash
cd ios && pod deintegrate && pod clean && pod install && cd ../

maybe need remove :{
  react-native-crypto,<---- NEED FOR react-native-randombytes
  react-native-drawer,
  react-native-easy-grid,
  react-native-iphone-x-helper,
  react-native-keyboard-aware-scroll-view,
  react-native-safe-area-view,
  react-native-screens,
  react-native-tab-view,
  react-native-udp
}

check update for remove: {
    react-native-maps-super-cluster,
    react-native-mock-location-detector,
    react-native-instagram-story-share
}

This might be related to https://github.com/facebook/react-native/issues/4968
To resolve try the following:
  1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
  4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`. (null))

<!-- Purpose of the application: to increase the time of clients' stay in the shopping center -->

##Windows - Android

####Installing dependencies

You will need Node, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

####Node, JDK

We recommend installing Node.

React Native also requires a recent version of the [Java SE Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

If you have already installed Node on your system, make sure it is version 6 or newer. If you already have a JDK on your system, make sure it is version 8 or newer.

>You can find additional installation options on [Node Downloads page](https://nodejs.org/en/download/).

####The React Native CLI

Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Command Prompt or shell:

>npm install -g react-native-cli

####Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

#####1. Install Android Studio


[Download and install Android Studio](https://developer.android.com/studio/index.html). Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:
- Android SDK
- Android SDK Platform
- Performance (Intel ® HAXM)
- Android Virtual Device

Then, click "Next" to install all of these components.

#####2. Install the Android SDK


Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 8.1 (Oreo) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

![](https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidStudioWelcomeWindows.png)

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 8.1 (Oreo) entry, then make sure the following items are all checked:

- Google APIs
- Android SDK Platform 27
- Intel x86 Atom_64 System Image
- Google APIs Intel x86 Atom_64 System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 27.0.3 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#####3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Open the System pane under System and Security in the Control Panel, then click on Change settings -> Open the Advanced tab and click on Environment Variables -> Click on New -> to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

![](https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png)

The SDK is installed, by default, at the following location:

>c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk

You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

####Preparing the Android device

You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

#####Using a physical device
If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions here.

#####Using a virtual device
You can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:
![](https://facebook.github.io/react-native/docs/assets/GettingStartedAndroidStudioAVD.png)

If you have just installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next".

![](https://facebook.github.io/react-native/docs/assets/GettingStartedCreateAVDWindows.png)

>If you don't have HAXM installed, click on "Install HAXM" or follow [these instructions](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows) to set it up, then go back to the AVD Manager.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

####Running your React Native application


Run react-native run-android inside your React Native project folder:
> cd qc-app
> react-native run-android

If everything is set up correctly, you should see your app running in your Android emulator shortly.

##macOs - iOS

####Installing dependencies

You will need Node, Watchman, the React Native command line interface, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

####Node

We recommend installing [Node Downloads page](https://nodejs.org/en/download/)

If you have already installed Node on your system, make sure it is version 6 or newer.

####The React Native CLI

Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Command Prompt or shell:

>npm install -g react-native-cli

####Xcode

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 8 or higher.

#####Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences" from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![](https://facebook.github.io/react-native/docs/assets/GettingStartedXcodeCommandLineTools.png)

####Running your React Native application

Run react-native run-android inside your React Native project folder:
> cd qc-app
> react-native run-android

You should see your new app running in the iOS Simulator shortly.

#####Running on a device

The above command will automatically run your app on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the instructions [here](https://facebook.github.io/react-native/docs/running-on-device.html).
