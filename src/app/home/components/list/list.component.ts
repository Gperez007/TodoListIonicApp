import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  IonButtons,
  IonButton,
  IonCheckbox,
  IonItem,
  IonList,
  IonLabel,
  IonContent,
  IonPopover,
  IonTitle,
  IonInput,
  IonFooter,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TaskService } from '../../services/TaskService/task.service';
import { FormsModule } from '@angular/forms';
import { FilteredDataService } from '../../services/filteredData/filtered-data.service';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/remoteConfig/firebase.service';
import { onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonToolbar,
    IonFooter,
    IonInput,
    IonTitle,
    IonPopover,
    IonContent,
    IonList,
    IonButtons,
    IonButton,
    IonCheckbox,
    IonItem,
    FormsModule,
    IonLabel
  ],
  providers: [TaskService],
})
export class ListComponent implements OnInit {
  tasks!: any[];
  isOptionEnable: boolean = false;
  update!: any;
  popover = document.querySelector('ion-popover');
  tareas: any[] = [];
  featureEnabled: boolean = true;

  constructor(private firebaseService: FirebaseService,
    private readonly taskService: TaskService,
    private readonly cdr: ChangeDetectorRef,
    private readonly filteredDataService: FilteredDataService<any>
  ) { }

  ngOnInit() {
    const db = this.firebaseService['db']; // si tu propiedad `db` es privada
    const tareasRef = ref(db, 'tareas');

      this.firebaseService.fetchRemoteConfig().then(() => {
      // Obtener el estado del feature flag
      this.featureEnabled = this.firebaseService.getFeatureFlag('enableNewFeature');
    });

    onValue(tareasRef, (snapshot) => {
      const data = snapshot.val();
      this.tareas = data
        ? Object.entries(data).map(([id, tarea]: any) => ({ id, ...tarea }))
        : [];
      console.log('Tareas cargadas:', this.tareas);
    });
  }

  

  toggleOption(event: any, i: number) {
    this.tasks[i].completada = event.detail.checked;
    this.taskService.updateTask(i, this.tasks[i]);
  }

  updateTask(index: number): void {
    const newTask = {
      task: this.update,
      state: false,
      categorie: 'default',
    };
    this.taskService.updateTask(index, newTask);
    if (this.popover) {
      this.popover.dismiss(null, 'cancel');
    }
    location.reload()
  }

  cancelEdit() {
    if (this.popover) {
      this.popover.dismiss(null, 'cancel');
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  // Método para marcar tarea como completada
toggleCompleted(index: number): void {
  const tarea = this.tareas[index];
  const nuevaCompletada = !tarea.completada;  // Invertir el estado de completada

  // Actualizamos en Firebase
  this.firebaseService.toggleCompleted(tarea.id, nuevaCompletada)
    .then(() => {
      // Ya no es necesario actualizar la tarea manualmente aquí
      // ngModel se encarga de vincular el estado entre la UI y la variable
    })
    .catch(error => {
      console.error("Error al actualizar la tarea en Firebase: ", error);
    });
}

  eliminarTarea(tareaId: string): void {
    // Llamamos al método de FirebaseService para eliminar la tarea desde Firebase
    this.firebaseService.deleteTask(tareaId).then(() => {
      // Después de eliminarla de Firebase, eliminamos la tarea de la lista local
      this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId);
    }).catch(error => {
      console.error("Error al eliminar la tarea: ", error);
    });
  }

   // Esta función puede ser la que habilite la nueva funcionalidad, si es necesario
  toggleFeature() {
    if (this.featureEnabled) {
      // Lógica de la nueva funcionalidad
      console.log("Función habilitada.");
    } else {
      // Lógica si la funcionalidad está desactivada
      console.log("Función deshabilitada.");
    }
  }

}
