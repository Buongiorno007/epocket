package club.dvlp.epocket;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected String getMainComponentName() {
        return "EpocketCash";
    }

}
