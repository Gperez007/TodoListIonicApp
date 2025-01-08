import { Component } from '@angular/core';
import { IonFab, IonFabButton, IonIcon, IonContent } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [IonContent, IonFab, IonFabButton, IonIcon],
})
export class AddTaskComponent {

  constructor() {
    addIcons({ add });
   }
}
