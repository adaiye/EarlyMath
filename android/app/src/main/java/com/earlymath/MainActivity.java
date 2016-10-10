package com.earlymath;

import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;

import static com.reactnativecomponent.splashscreen.RCTSplashScreen.UIAnimationFade;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EMSplashScreen.openSplashScreen(this, true);   //open splashscreen fullscreen
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                EMSplashScreen.removeSplashScreen(null, UIAnimationFade, 300);
            }
        }, 2000);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "EarlyMath";
    }
}
