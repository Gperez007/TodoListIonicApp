import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonList,
  IonTitle,
  IonButtons,
  IonItem,
  IonPopover,
  IonContent,
  IonInput, IonFooter, IonToolbar } from '@ionic/angular/standalone';
import { CategoriesService } from '../../service/categories.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonFooter, 
    IonInput,
    IonContent,
    IonPopover,
    IonItem,
    IonButton,
    IonList,
    IonTitle,
    IonButtons,
    FormsModule,
  ],
  providers: [CategoriesService],
})
export class ListCategoriesComponent implements OnInit {
  categories!: any[];
  isOptionEnable: boolean = false;
  update!: any;
  popover = document.querySelector('ion-popover');

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((updatedCategories) => {
      this.categories = updatedCategories;
      this.cdr.detectChanges();
    });
    console.log('categorias cargadas desde localStorage:', this.categories);
  }

  removeCategorie(i: number) {
    this.categoriesService.removeCategorie(i);
  }

  updateCategorie(index: number): void {
    const newCategorie = {
      categorie: this.update,
      state: false,
    };
    this.categoriesService.updateCategorie(index,newCategorie);
    if (this.popover) {
      this.popover.dismiss(null, 'cancel');
    }
  }

  cancelEdit() {
    if (this.popover) {
      this.popover.dismiss(null, 'cancel');
    }
  }
}
