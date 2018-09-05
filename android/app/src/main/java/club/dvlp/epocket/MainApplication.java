package club.dvlp.epocket;

import android.app.Application;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
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
                    new LinearGradientPackage(),
                    new MapsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        Fresco.initialize(this);
    }
}
