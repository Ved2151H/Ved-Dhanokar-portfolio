/**
 * Cross-platform detection and adapter utilities.
 * Enables clean portability between Web, React Native, and Expo targets.
 */

export type PlatformType = 'web' | 'android' | 'ios' | 'desktop';

export const getPlatform = (): PlatformType => {
  if (typeof window === 'undefined') {
    return 'web';
  }
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) {
    return 'android';
  }
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }
  if (/electron/.test(userAgent)) {
    return 'desktop';
  }
  return 'web';
};

export const isWeb = typeof window !== 'undefined';
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export function platformSelect<T>(specifics: {
  web?: T;
  native?: T;
  android?: T;
  ios?: T;
  default: T;
}): T {
  const current = getPlatform();
  if (current === 'android' && specifics.android) return specifics.android;
  if (current === 'ios' && specifics.ios) return specifics.ios;
  if ((current === 'android' || current === 'ios') && specifics.native) return specifics.native;
  if (current === 'web' && specifics.web) return specifics.web;
  return specifics.default;
}
