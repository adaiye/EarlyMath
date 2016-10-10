package com.earlymath;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.ScaleAnimation;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.reactnativecomponent.splashscreen.RCTSplashScreen;

import java.lang.ref.WeakReference;

/**
 * Created by designerii on 2016/10/10.
 */

public class EMSplashScreen extends RCTSplashScreen {

    private static Dialog dialog;
    private static ImageView imageView;

    private static WeakReference<Activity> wr_activity;

    public static void openSplashScreen(final Activity activity, final boolean isFullScreen) {
        if (activity == null) return;
        wr_activity = new WeakReference<>(activity);
        final int drawableId = R.drawable.appicon;
        if (dialog != null && dialog.isShowing()) {
            return;
        }
        activity.runOnUiThread(new Runnable() {
            public void run() {

                if(!getActivity().isFinishing()) {
                    Context context = getActivity();

                    imageView = new ImageView(context);

                    ViewGroup.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
                    imageView.setLayoutParams(layoutParams);
                    imageView.setBackgroundColor(Color.parseColor("#4F5D73"));

                    imageView.setImageResource(drawableId);
                    imageView.setScaleType(ImageView.ScaleType.CENTER);

                    dialog = new Dialog(context, isFullScreen ? android.R.style.Theme_Translucent_NoTitleBar_Fullscreen : android.R.style.Theme_Translucent_NoTitleBar);
                    dialog.setContentView(imageView);
                    dialog.setCancelable(false);
                    dialog.show();
                }
            }
        });
    }

    public static void removeSplashScreen(Activity activity, final int animationType,final int duration) {
        if (activity == null) {
            activity = getActivity();
            if(activity == null) return;
        }
        activity.runOnUiThread(new Runnable() {
            public void run() {
                if (dialog != null && dialog.isShowing()) {
                    AnimationSet animationSet = new AnimationSet(true);

                    if(animationType == UIAnimationScale) {
                        AlphaAnimation fadeOut = new AlphaAnimation(1, 0);
                        fadeOut.setDuration(duration);
                        animationSet.addAnimation(fadeOut);

                        ScaleAnimation scale = new ScaleAnimation(1, 1.5f, 1, 1.5f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.65f);
                        scale.setDuration(duration);
                        animationSet.addAnimation(scale);
                    }
                    else if(animationType == UIAnimationFade) {
                        AlphaAnimation fadeOut = new AlphaAnimation(1, 0);
                        fadeOut.setDuration(duration);
                        animationSet.addAnimation(fadeOut);
                    }
                    else {
                        AlphaAnimation fadeOut = new AlphaAnimation(1, 0);
                        fadeOut.setDuration(0);
                        animationSet.addAnimation(fadeOut);
                    }

                    final View view = ((ViewGroup)dialog.getWindow().getDecorView()).getChildAt(0);
                    view.startAnimation(animationSet);

                    animationSet.setAnimationListener(new Animation.AnimationListener() {
                        @Override
                        public void onAnimationStart(Animation animation) {
                        }
                        @Override
                        public void onAnimationRepeat(Animation animation) {
                        }
                        @Override
                        public void onAnimationEnd(Animation animation) {
                            view.post(new Runnable() {
                                @Override
                                public void run() {
                                    dialog.dismiss();
                                    dialog = null;
                                    imageView = null;
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    protected static Activity getActivity() {
        return wr_activity.get();
    }
}
