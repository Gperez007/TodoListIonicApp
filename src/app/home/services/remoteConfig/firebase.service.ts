import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getRemoteConfig, RemoteConfig, fetchAndActivate, RemoteConfigSettings, getString } from 'firebase/remote-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly remoteConfig: RemoteConfig;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);

    this.remoteConfig = getRemoteConfig(this.app);

    const remoteConfigSettings: RemoteConfigSettings = {
      minimumFetchIntervalMillis: 60 * 60 * 1000, 
      fetchTimeoutMillis: 30 * 1000, 
    };

    this.remoteConfig.settings = remoteConfigSettings;
  }

  /**
   * 
   * @returns 
   */
  async fetchRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote Config activado:', this.remoteConfig);
    } catch (error) {
      console.error('Error al activar Remote Config:', error);
    }
  }

  /**
   * 
   * @param key 
   * @returns 
   */
  getConfigValue(key: string): string {
    return getString(this.remoteConfig, key);
  }
}
