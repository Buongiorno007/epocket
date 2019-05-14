package club.dvlp.epocket;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.reactnativecommunity.webview.RNCWebViewPackage;
=======
import com.cmcewen.blurview.BlurViewPackage;
>>>>>>> 80f76a00caa7fb581cbe0fbf46209aca444b32f0
import com.horcrux.svg.SvgPackage;
import com.jobeso.RNInstagramStoryShare.RNInstagramStorySharePackage;
import com.mocklocation.reactnative.RNMockLocationDetectorPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.tradle.react.UdpSocketsModule;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.gantix.JailMonkey.JailMonkeyPackage;
import com.tron.ReactNativeWheelPickerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnfs.RNFSPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;

import cl.json.RNSharePackage;

import com.marianhello.bgloc.react.BackgroundGeolocationPackage;

import io.invertase.firebase.RNFirebasePackage;

import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;

import org.reactnative.camera.RNCameraPackage;

import com.ocetnik.timer.BackgroundTimerPackage;
import com.imagepicker.ImagePickerPackage;

import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import iyegoroff.RNTextGradient.RNTextGradientPackage;

import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.surajit.rnrg.RNRadialGradientPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.crashlytics.android.Crashlytics;

import io.fabric.sdk.android.Fabric;

import com.yandex.metrica.YandexMetrica;
import com.yandex.metrica.YandexMetricaConfig;

import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

import android.os.Build;
import android.webkit.WebView;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNCWebViewPackage(),
                    new SvgPackage(),
            new BlurViewPackage(),
                    new NetInfoPackage(),
                    new ReactNativeWheelPickerPackage(),
                    new RNGestureHandlerPackage(),
                    new RNI18nPackage(),
                    new UdpSocketsModule(),
                    new RNMockLocationDetectorPackage(),
                    new AndroidOpenSettingsPackage(),
                    new JailMonkeyPackage(),
                    new LinearGradientPackage(),
                    new RNSoundPackage(),
                    new RNFSPackage(),
                    new RNInstagramStorySharePackage(),
                    new FBSDKPackage(mCallbackManager),
                    new CookieManagerPackage(),
                    new RNFetchBlobPackage(),
                    new FastImageViewPackage(),
                    new RNSharePackage(),
                    new BackgroundGeolocationPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseNotificationsPackage(),
                    new RNFirebaseMessagingPackage(),
                    new RNAndroidLocationEnablerPackage(),
                    new RNCameraPackage(),
                    new BackgroundTimerPackage(),
                    new ImagePickerPackage(),
                    new RNTextGradientPackage(),
                    new VectorIconsPackage(),
                    new RNRadialGradientPackage(),
                    new RNBackgroundFetchPackage(),
                    new MapsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }


    };


    @Override
    public String getFileProviderAuthority() {
        return "club.dvlp.epocket.provider";
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        YandexMetricaConfig config = YandexMetricaConfig.newConfigBuilder("e455a5ed-4f92-4071-8b46-5822489758d5").build();
        YandexMetrica.activate(getApplicationContext(), config);
        YandexMetrica.enableActivityAutoTracking(this);

        Fabric.with(this, new Crashlytics());
        SoLoader.init(this, /* native exopackage */ false);
        Fresco.initialize(this);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//            WebView.setWebContentsDebuggingEnabled(true);
        }
    }


}
