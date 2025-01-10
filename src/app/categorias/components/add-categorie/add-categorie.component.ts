import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonIcon,
  IonLabel, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CategoriesService } from '../../service/categories.service';
import { addIcons } from 'ionicons';
import { caretForward } from 'ionicons/icons';


@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButton, IonLabel, IonIcon, FormsModule, IonContent, IonInput, IonItem],
  providers: [CategoriesService],
})
export class AddCategorieComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  name!: string;
  categories: any[] = []; 


  constructor(
    private readonly categoriasService: CategoriesService,
    private readonly cdr: ChangeDetectorRef  
    
  ) {
    addIcons({caretForward});
  }

  ngOnInit() {
    this.categoriasService.categories$.subscribe((updateCategories)=>{
      this.categories = updateCategories
      this.cdr.detectChanges()
    })
  }

  addCategorie(){
    const newCategorie = {
      categorie:this.name,
      status:true
    }
    this.categoriasService.addCategorie(newCategorie)
    this.name=""
    location.reload()
  }
}
