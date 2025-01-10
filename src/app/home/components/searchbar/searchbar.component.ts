import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar } from "@ionic/angular/standalone";
import { TaskService } from '../../services/TaskService/task.service';
import { FilteredDataService } from '../../services/filteredData/filtered-data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: true,
  imports: [IonSearchbar, FormsModule],
  providers: [TaskService]
})
export class SearchbarComponent implements OnInit {
  searchInput: string = ''; // Inicializado como cadena vacía
  task: any[] = [];
  filteredTasks: any[] = []; 

  constructor(
    private readonly taskService: TaskService,
    private readonly filteredDataService: FilteredDataService<any>
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((updatetask) => {
      this.task = updatetask;

      this.filteredTasks = this.task.filter(element =>
        element.task.toLowerCase().includes(this.searchInput.toLowerCase())
      );

      this.filteredDataService.updateArray(this.filteredTasks);
    });
  }

  onInputChange(value: string) {
    const filterDataSearch = this.searchInput.toLowerCase();
    this.filteredTasks = this.task.filter(element =>
      element.task.toLowerCase().includes(filterDataSearch)
    );
    this.filteredDataService.updateArray(this.filteredTasks);
  }
}
