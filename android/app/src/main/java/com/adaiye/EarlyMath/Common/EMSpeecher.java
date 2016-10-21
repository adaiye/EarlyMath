package com.adaiye.EarlyMath.Common;

import android.util.Log;

import com.adaiye.EarlyMath.BuildConfig;
import com.baidu.tts.auth.AuthInfo;
import com.baidu.tts.client.SpeechError;
import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import static com.baidu.tts.client.SpeechSynthesizer.AUDIO_BITRATE_AMR_15K85;
import static com.baidu.tts.client.SpeechSynthesizer.AUDIO_ENCODE_AMR;
import static com.baidu.tts.client.SpeechSynthesizer.MIX_MODE_DEFAULT;

/**
 * Created by designerii on 2016/10/18.
 */

public class EMSpeecher extends ReactContextBaseJavaModule implements SpeechSynthesizerListener {

    private SpeechSynthesizer speechSynthesizer;

    public EMSpeecher(ReactApplicationContext reactContext) {
        super(reactContext);

        // 获取 tts 实例
        speechSynthesizer = SpeechSynthesizer.getInstance();
        // 设置 app 上下文（必需参数）
        speechSynthesizer.setContext(reactContext);
        // 设置 tts 监听器
        speechSynthesizer.setSpeechSynthesizerListener(this);
//        // 文本模型文件路径， 文件的绝对路径 (离线引擎使用)
//        speechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_TEXT_MODEL_FILE,
//                TEXT_MODEL_FILE_FULL_PATH_NAME);
//        // 声学模型文件路径，文件的绝对路径 (离线引擎使用)
//        speechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_SPEECH_MODEL_FILE,
//                SPEECH_MODEL_FILE_FULL_PATH_NAME);
//        // 本地授权文件路径,如未设置将使用默认路径.设置临时授权文件路径 ，LICENCE_FILE_NAME 请替换成临时授权文件的实际路径，仅在使用临时 license 文件时需要进行设置，如果在[应用管理]中开通了离线授权，不需要设置该参数，建议将该行代码删除（离线引擎）
//        speechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_LICENCE_FILE,
//                LICENSE_FILE_FULL_PATH_NAME);

        // 请替换为语音开发者平台上注册应用得到的 App ID (离线授权)
        speechSynthesizer.setAppId(BuildConfig.Baidu_YuYin_App_ID_Android);
        // 请替换为语音开发者平台注册应用得到的 apikey 和 secretkey (在线授权)
        speechSynthesizer.setApiKey(BuildConfig.Baidu_YuYin_Api_Key_Android, BuildConfig.Baidu_YuYin_Secret_Key_Android);
        // 授权检测接口
        AuthInfo authInfo = speechSynthesizer.auth(TtsMode.ONLINE);
        if (authInfo.isSuccess()) {
            // 引擎初始化接口
            speechSynthesizer.initTts(TtsMode.ONLINE);

            speechSynthesizer.setParam(SpeechSynthesizer.PARAM_VOLUME, "5");
            speechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEED, "5");
            speechSynthesizer.setParam(SpeechSynthesizer.PARAM_PITCH, "5");
            speechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEAKER, "0");
            speechSynthesizer.setParam(SpeechSynthesizer. PARAM_MIX_MODE,
                    MIX_MODE_DEFAULT);
            speechSynthesizer.setParam(SpeechSynthesizer. PARAM_AUDIO_ENCODE,
                    AUDIO_ENCODE_AMR);
            speechSynthesizer.setParam(SpeechSynthesizer. PARAM_AUDIO_RATE,
                    AUDIO_BITRATE_AMR_15K85);
            speechSynthesizer.setParam(SpeechSynthesizer. PARAM_VOCODER_OPTIM_LEVEL, "0");
        } else {
            // 授权失败
        }
    }

    @Override
    public String getName() {
        return "EMSpeecher";
    }

    @ReactMethod
    public void speech(String sentence) {
        speechSynthesizer.stop();
        speechSynthesizer.speak(sentence);
    }

    @ReactMethod
    public void speechCard(ReadableMap cardItem, Integer language) {
        String key = language == 0 ? "chinese" : "english";
        String value = cardItem.getString(key);
        this.speech(value);
    }

    @Override
    public void onSynthesizeStart(String s) {
        Log.d("SynthesizeStart", s);
    }

    @Override
    public void onSynthesizeDataArrived(String s, byte[] bytes, int i) {
        Log.d("DataArrived", s);
    }

    @Override
    public void onSynthesizeFinish(String s) {
        Log.d("SynthesizeFinish", s);
    }

    @Override
    public void onSpeechStart(String s) {
        Log.d("SpeechStart", s);
    }

    @Override
    public void onSpeechProgressChanged(String s, int i) {

    }

    @Override
    public void onSpeechFinish(String s) {
        Log.d("Finish", s);
    }

    @Override
    public void onError(String s, SpeechError speechError) {
        Log.e(s, speechError.toString());
    }
}
