import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons,
  IonSearchbar,
  IonItem,
  IonPopover,
  IonList,
  IonTitle,
  IonIcon,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';

import { ListComponent } from './components/list/list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../categorias/service/categories.service';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { FilteredDataService } from './services/filteredData/filtered-data.service';
import { TaskService } from './services/TaskService/task.service';
import { FirebaseService } from './services/remoteConfig/firebase.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonPopover,
    IonList,
    IonIcon,
    ListComponent,
    IonIcon,
    IonCheckbox,
    RouterLink,
    AddTaskComponent,
    SearchbarComponent,
    FormsModule,
  ],
  providers: [CategoriesService],
})
export class HomePage implements OnInit {
  showNumbering: boolean = false;
  showSearchBar: boolean = true;
  categories!: any[];
  category: string = 'default';
  filteredCategory: any[] = [];
  tasks: any[] = [];

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
      console.log('estos son los tasks ', this.tasks);
    });

    await this.firebaseService.fetchRemoteConfig();
    const numeracionActiva =
      this.firebaseService.getConfigValue('activarNumeracion');
    console.log('Numeración activa:', numeracionActiva);
    this.showNumbering = numeracionActiva === 'true';
  }

  onCheckboxChange(event: any) {
    this.showNumbering = event.detail.checked;

    this.firebaseService.getConfigValue(this.showNumbering ? 'true' : 'false');
  }

  onChange(value: string) {
    console.log(value);

    const filterCategory = this.category.toLowerCase();
    console.log('Tasks antes de filtrar:', this.tasks);

    this.filteredCategory = this.tasks.filter((element) =>
      element.categorie?.toLowerCase().includes(filterCategory)
    );

    console.log(this.filteredCategory, 'ya está filtrado por categoría');

    this.filteredDataService.updateArray(this.filteredCategory);
  }
}
