import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, RemoteConfigSettings, getString, getBoolean } from 'firebase/remote-config';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, push, set, remove, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly app = initializeApp(environment.firebaseConfig);
  private db = getDatabase(this.app);
  private remoteConfig = getRemoteConfig(this.app);

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(this.app);
    this.remoteConfig = getRemoteConfig(this.app);
  }

  async fetchRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote Config activado:', this.remoteConfig);
    } catch (error) {
      console.error('Error al activar Remote Config:', error);
    }
  }

  getConfigValue(key: string): string {
    return getString(this.remoteConfig, key);
  }

  guardarTarea(tarea: any) {
    const tareasRef = ref(this.db, 'tareas');
    const nuevaTareaRef = push(tareasRef);
    return set(nuevaTareaRef, tarea);
  }

    deleteTask(taskId: string): Promise<void> {
    const taskRef = ref(this.db, 'tareas/' + taskId);
    return remove(taskRef);
  }

    // Método para marcar tarea como completada
  toggleCompleted(taskId: string, completada: boolean): Promise<void> {
    const taskRef = ref(this.db, 'tareas/' + taskId);
    return update(taskRef, {
      completada: completada, // Actualiza el estado de la tarea
    });
  }

    getFeatureFlag(feature: string): boolean {
    return getBoolean(this.remoteConfig, feature);
  }
}
