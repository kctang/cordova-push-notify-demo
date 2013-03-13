package net.big2.pushnotify;


import android.app.Activity;
import android.util.Log;
import android.widget.Toast;
import com.google.android.gcm.GCMRegistrar;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import static org.apache.cordova.api.LOG.e;


public class PushNotifyPlugin extends CordovaPlugin {
    public static final String TAG = PushNotifyPlugin.class.getName();

    public static final String ACTION_REGISTER = "register";
    public static final String ACTION_UNREGISTER = "unregister";

    public static final String DATA_SENDER_ID = "senderID";
    public static final String DATA_GCM_CALLBACK = "ecb";

    public static Activity activity;
    public static CordovaWebView staticWebView;
    public static String gcmCallback;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        activity = cordova.getActivity();
        staticWebView = webView;
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        boolean success = true;


        if (ACTION_REGISTER.equals(action)) {
            try {
                // setup static fields for sendJavaScript method
                // is there a better way of doing this?
                gcmCallback = data.getJSONObject(0).getString(DATA_GCM_CALLBACK);

                String senderId = data.getJSONObject(0).getString(DATA_SENDER_ID);
                if (!GCMRegistrar.isRegistered(cordova.getActivity())) {
                    GCMRegistrar.register(cordova.getActivity(), senderId);
                }
            } catch (Exception e) {
                e(TAG, "Error getting gcmCallback and/or senderId", e);
            }

        } else if (ACTION_UNREGISTER.equals(action)) {
            GCMRegistrar.unregister(cordova.getActivity());
            GCMRegistrar.onDestroy(cordova.getActivity());
        } else {
            success = false;
        }

        return success;
    }

    public static void sendJavaScript(JSONObject json) {
        if (gcmCallback == null || staticWebView == null) {
            Log.e(TAG, "Call 'register' action before receiving JavaScript data");
        }
        String script = "javascript:" + gcmCallback + "(" + json.toString() + ")";
        Log.d(TAG, script);
        staticWebView.sendJavascript(script);
    }

    public static void showToast(final String message) {
        activity.runOnUiThread(new Runnable() {
            public void run() {
                Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
            }
        });
    }
}
