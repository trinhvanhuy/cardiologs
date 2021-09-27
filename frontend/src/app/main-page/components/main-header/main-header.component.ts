import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
  
  @Output() public searching = new EventEmitter<any>();
  constructor() { }
}
