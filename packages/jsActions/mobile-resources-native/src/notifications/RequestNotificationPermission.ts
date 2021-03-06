// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { NativeModules, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

/**
 * Notification permissions are required to send a user push messages. Calling this action displays the permission dialog to the user.
 * Returns true if permission is granted, otherwise it returns false.
 * @returns {Promise.<boolean>}
 */
export async function RequestNotificationPermission(): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/receiving-notifications

    if (NativeModules && !NativeModules.RNFBMessagingModule) {
        return Promise.reject(new Error("Firebase module is not available in your app"));
    }

    return messaging()
        .requestPermission()
        .then(() =>
            Platform.OS === "ios" && !messaging().isDeviceRegisteredForRemoteMessages
                ? messaging()
                      .registerDeviceForRemoteMessages()
                      .then(() => true)
                : true
        )
        .catch(() => false);

    // END USER CODE
}
