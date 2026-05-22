import type { CapacitorConfig } from '@capacitor/cli';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const { CAPACITOR_SERVER_URL } = process.env;

const config: CapacitorConfig = {
  appId: 'com.breatheapp.ios',
  appName: 'breathe',
  webDir: 'ios-shell',
  ...(CAPACITOR_SERVER_URL && { server: { url: CAPACITOR_SERVER_URL } }),
};

export default config;
