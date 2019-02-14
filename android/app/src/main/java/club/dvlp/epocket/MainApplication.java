package club.dvlp.epocket;

import android.app.Application;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnfs.RNFSPackage;
import com.jobeso.RNInstagramStoryShare.RNInstagramStorySharePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import cl.json.RNSharePackage;
import com.wheelpicker.WheelPickerPackage;
import com.smixx.fabric.FabricPackage;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;

import io.invertase.firebase.RNFirebasePackage;

import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;

import org.reactnative.camera.RNCameraPackage;

import com.ocetnik.timer.BackgroundTimerPackage;
import com.imagepicker.ImagePickerPackage;

import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import iyegoroff.RNTextGradient.RNTextGradientPackage;

import com.surajit.rnrg.RNRadialGradientPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

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
                    new LinearGradientPackage(),
                    new SvgPackage(),
                    new RNSoundPackage(),
                    new RNFSPackage(),
                    new RNInstagramStorySharePackage(),
                    new FBSDKPackage(mCallbackManager),
                    new CookieManagerPackage(),
                    new RNFetchBlobPackage(),
                    new FastImageViewPackage(),
                    new RNSharePackage(),
                    new WheelPickerPackage(),
                    new FabricPackage(),
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
                    new RNBackgroundGeolocation(),
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
        Fabric.with(this, new Crashlytics());
        SoLoader.init(this, /* native exopackage */ false);
        Fresco.initialize(this);
        WebView.setWebContentsDebuggingEnabled(true);
    }


}
