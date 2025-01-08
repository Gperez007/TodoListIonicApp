import { Component } from '@angular/core';
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
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';


import { ListComponent } from './components/list/list.component';
import { AddTaskComponent } from "./components/add-task/add-task.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
    ListComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    AddTaskComponent
],
})
export class HomePage {
  showSearchBar: boolean = true;

  constructor() {
    addIcons({ ellipsisVertical });
  }

  toggleSearchOrCategories() {
    this.showSearchBar = !this.showSearchBar;
    alert('hola mundo');
  }
}
