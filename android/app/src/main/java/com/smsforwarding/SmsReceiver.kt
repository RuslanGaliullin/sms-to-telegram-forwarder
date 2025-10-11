package com.smsforwarding

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.telephony.SmsMessage
import android.util.Log

/**
 * BroadcastReceiver to intercept incoming SMS messages
 * Starts HeadlessJsTaskService to process SMS in background
 */
class SmsReceiver : BroadcastReceiver() {

    companion object {
        private const val TAG = "SmsReceiver"
        private const val SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED"
        const val ACTION_SMS_RECEIVED = "com.smsforwarding.SMS_RECEIVED"
    }

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != SMS_RECEIVED) {
            return
        }

        try {
            val bundle: Bundle? = intent.extras
            if (bundle != null) {
                val pdus = bundle.get("pdus") as Array<*>?
                val format = bundle.getString("format")
                
                if (pdus != null) {
                    val messages = arrayOfNulls<SmsMessage>(pdus.size)
                    val smsText = StringBuilder()
                    var sender = ""

                    for (i in pdus.indices) {
                        messages[i] = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            SmsMessage.createFromPdu(pdus[i] as ByteArray, format)
                        } else {
                            @Suppress("DEPRECATION")
                            SmsMessage.createFromPdu(pdus[i] as ByteArray)
                        }

                        messages[i]?.let { sms ->
                            if (sender.isEmpty()) {
                                sender = sms.originatingAddress ?: "Unknown"
                            }
                            smsText.append(sms.messageBody)
                        }
                    }

                    Log.d(TAG, "SMS received from: $sender, message: $smsText")

                    // Start HeadlessJsTaskService to process SMS
                    val serviceIntent = Intent(context, SmsTaskService::class.java).apply {
                        putExtra("sender", sender)
                        putExtra("message", smsText.toString())
                        putExtra("timestamp", System.currentTimeMillis())
                    }

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        context.startForegroundService(serviceIntent)
                    } else {
                        context.startService(serviceIntent)
                    }
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error receiving SMS", e)
        }
    }
}

