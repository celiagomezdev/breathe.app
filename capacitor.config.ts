import type { CapacitorConfig } from '@capacitor/cli';

const { CAPACITOR_SERVER_URL } = process.env;

const config: CapacitorConfig = {
  appId: 'app.breathe',
  appName: 'breathe',
  webDir: 'build/client',
  ...(CAPACITOR_SERVER_URL && { server: { url: CAPACITOR_SERVER_URL } }),
};

export default config;
