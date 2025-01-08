import { Component, OnInit } from '@angular/core';
import { IonButtons, IonButton, IonCheckbox, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonList, IonButtons, IonButton, IonCheckbox, IonItem],
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
