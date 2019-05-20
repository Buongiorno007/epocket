#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@import GoogleMaps;
@import Firebase;
@import YandexMobileMetrica;

@implementation AppDelegate

	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
	{
		[FIRApp configure];

		RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
		RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
														moduleName:@"EpocketCash"
													initialProperties:nil];

		[GMSServices provideAPIKey:@"AIzaSyBzxCpV9ME-F2W8rz-ZkOsZrYfgmpPdhEw"];
		
		rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

		self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
		UIViewController *rootViewController = [UIViewController new];
		rootViewController.view = rootView;
		self.window.rootViewController = rootViewController;
		[self.window makeKeyAndVisible];
		YMMYandexMetricaConfiguration *configuration = [[YMMYandexMetricaConfiguration alloc] initWithApiKey:@"e455a5ed-4f92-4071-8b46-5822489758d5"];
		[YMMYandexMetrica activateWithConfiguration:configuration];
		return YES;
	}

	- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
	{
		return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
	}
  
@end
