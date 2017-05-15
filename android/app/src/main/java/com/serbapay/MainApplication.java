package com.serbapay;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import cl.json.RNSharePackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BarcodeScannerPackage(),
            new RCTCameraPackage(),
            new RNSharePackage(),
            new FIRMessagingPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new RandomBytesPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
