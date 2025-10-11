package com.smsforwarding

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Native module to provide SMS receiver functionality to React Native
 */
class SmsReceiverModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "SmsReceiverModule"

    /**
     * Start listening for SMS (receiver is registered in AndroidManifest)
     */
    @ReactMethod
    fun startListening(promise: Promise) {
        try {
            // The receiver is registered in AndroidManifest.xml
            // This method is just for confirmation that the module is initialized
            promise.resolve("SMS Listener started")
        } catch (e: Exception) {
            promise.reject("START_ERROR", "Failed to start SMS listener", e)
        }
    }

    /**
     * Stop listening for SMS
     */
    @ReactMethod
    fun stopListening(promise: Promise) {
        try {
            // The receiver cannot be unregistered as it's declared in manifest
            // This is for compatibility with the JS interface
            promise.resolve("SMS Listener stopped")
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", "Failed to stop SMS listener", e)
        }
    }

    /**
     * Check if SMS permissions are granted
     */
    @ReactMethod
    fun hasPermissions(promise: Promise) {
        try {
            val context = reactApplicationContext
            val hasReadSms = android.content.pm.PackageManager.PERMISSION_GRANTED ==
                androidx.core.content.ContextCompat.checkSelfPermission(
                    context,
                    android.Manifest.permission.READ_SMS
                )
            val hasReceiveSms = android.content.pm.PackageManager.PERMISSION_GRANTED ==
                androidx.core.content.ContextCompat.checkSelfPermission(
                    context,
                    android.Manifest.permission.RECEIVE_SMS
                )
            
            promise.resolve(hasReadSms && hasReceiveSms)
        } catch (e: Exception) {
            promise.reject("PERMISSION_ERROR", "Failed to check permissions", e)
        }
    }
}

