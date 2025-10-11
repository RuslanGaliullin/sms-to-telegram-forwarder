package com.smsforwarding

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

/**
 * HeadlessJsTaskService to process SMS in background without UI
 */
class SmsTaskService : HeadlessJsTaskService() {

    companion object {
        private const val TAG = "SmsTaskService"
        private const val TASK_NAME = "SmsTask"
        private const val TIMEOUT = 60000L // 60 seconds
    }

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        return try {
            val extras = intent.extras ?: return null
            
            val taskData = Arguments.createMap().apply {
                putString("sender", extras.getString("sender", "Unknown"))
                putString("message", extras.getString("message", ""))
                putDouble("timestamp", extras.getLong("timestamp", 0L).toDouble())
            }

            Log.d(TAG, "Starting headless task with data: $taskData")

            HeadlessJsTaskConfig(
                TASK_NAME,
                taskData,
                TIMEOUT,
                true // Allow task in foreground
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error creating task config", e)
            null
        }
    }
}

