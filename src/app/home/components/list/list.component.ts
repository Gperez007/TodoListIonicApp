import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  IonButtons,
  IonButton,
  IonCheckbox,
  IonItem,
  IonList,
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
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
  ],
  providers: [TaskService],
})
export class ListComponent implements OnInit {
  tasks!: any[];
  isOptionEnable: boolean = false;
  update!: any;
  popover = document.querySelector('ion-popover');


  constructor(
    private readonly taskService: TaskService,
    private readonly cdr: ChangeDetectorRef,
    private readonly filteredDataService:FilteredDataService<any>
  ) {}

  ngOnInit(): void {
    this.filteredDataService.array$.subscribe((data)=>{
      this.tasks = data
      console.log(this.tasks);
      
    })
  }

  toggleOption(event: any, i: number) {
    this.isOptionEnable = event.detail.checked;
    this.taskService.removeTask(i);
    location.reload()
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
}
