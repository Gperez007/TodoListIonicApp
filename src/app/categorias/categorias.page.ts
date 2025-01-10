import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton, IonList, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ListCategoriesComponent } from "./components/list-categories/list-categories.component";
import { AddCategorieComponent } from "./components/add-categorie/add-categorie.component";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonItem, IonList,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink, ListCategoriesComponent, AddCategorieComponent],
  providers:[]
})
export class CategoriasPage implements OnInit {
  



  constructor() {
    addIcons({ arrowBack });
  }

  ngOnInit() {}
}
