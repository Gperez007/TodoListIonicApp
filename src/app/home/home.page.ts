import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonCheckbox,
  IonPopover,
  IonInput,
  IonLabel
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AddTaskComponent } from './components/add-task/add-task.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ListComponent } from './components/list/list.component';

import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';

import { FirebaseService } from './services/remoteConfig/firebase.service';
import { CategoriesService } from '../categorias/service/categories.service';
import { FilteredDataService } from './services/filteredData/filtered-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    
    CommonModule,
    RouterLink,
    FormsModule,
    // Ionic
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonCheckbox,
    IonPopover,
    IonInput,
    IonLabel,

    // Componentes personalizados
    AddTaskComponent,
    SearchbarComponent,
    ListComponent
  ]
})
export class HomePage implements OnInit {
  showNumbering = false;
  categories: any[] = [];
  category: string = 'default';
  tasks: any[] = [];
  filteredCategory: any[] = [];

  nuevaTarea = '';
  categoriaSeleccionada = '';

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly filteredDataService: FilteredDataService<any>,
    private firebaseService: FirebaseService
  ) {
    addIcons({ ellipsisVertical });
  }

  async ngOnInit() {
    this.categoriesService.categories$.subscribe((updateCategories) => {
      this.categories = updateCategories;
    });

    this.filteredDataService.array$.subscribe((data) => {
      this.tasks = data;
    });

    await this.firebaseService.fetchRemoteConfig();
    const numeracionActiva = this.firebaseService.getConfigValue('activarNumeracion');
    this.showNumbering = numeracionActiva === 'true';
  }

  onCheckboxChange(event: any) {
    this.showNumbering = event.detail.checked;
    this.firebaseService.getConfigValue(this.showNumbering ? 'true' : 'false');
  }

  onChange(value: string) {
    const filterCategory = value.toLowerCase();
    this.filteredCategory = this.tasks.filter(task =>
      task.categorie?.toLowerCase().includes(filterCategory)
    );
    this.filteredDataService.updateArray(this.filteredCategory);
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      const tarea = {
        titulo: this.nuevaTarea,
        completada: false,
        categoriaId: this.categoriaSeleccionada
      };
      this.firebaseService.guardarTarea(tarea).then(() => {
        this.nuevaTarea = '';
      });
    }
  }
}
