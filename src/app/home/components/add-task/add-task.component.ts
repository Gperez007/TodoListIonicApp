import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonContent,
  IonInput,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonTitle,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { TaskService } from '../../services/TaskService/task.service';
import { CategoriesService } from 'src/app/categorias/service/categories.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonButton,
    FormsModule,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonModal,
    IonInput,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
  providers:[TaskService,CategoriesService]
})
export class AddTaskComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  task!:any[]
  categories!:any[]

  selectedCategory!:string
  name!: string;

  constructor(
    private readonly taskService: TaskService,
    private readonly categoriesService: CategoriesService
  ) {
    addIcons({ add });
  }

  ngOnInit(): void {
      this.categoriesService.categories$.subscribe((updateCategories)=>{
        this.categories = updateCategories        
      })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<any>) {
    const newTask = {
      task: this.name,
      state: false,
      categorie: this.selectedCategory || 'default',
    }

    if (event.detail.role === 'confirm' ) {
      this.taskService.addTask(newTask)
      location.reload() 
    }
  }
}
