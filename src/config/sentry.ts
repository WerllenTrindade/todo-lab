import * as Sentry from "@sentry/react-native";

import { isRunningInExpoGo } from "expo";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  enableNative: true,
  enableNativeNagger: true,
  enableAutoPerformanceTracing: true,
  attachStacktrace: true,
  enableUserInteractionTracing: true,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
  integrations: [
    navigationIntegration,
  ],
  enableNativeFramesTracking: !isRunningInExpoGo(),
});

export { Sentry };

