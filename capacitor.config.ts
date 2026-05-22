import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.breathe',
  appName: 'breathe',
  webDir: 'build/client',
  server: {
    url: 'https://breathe-app-alpha.vercel.app',
  },
};

export default config;
