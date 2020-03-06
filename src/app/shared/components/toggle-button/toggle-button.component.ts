import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {

  @Output() changed = new EventEmitter<boolean>();
  @Input() label = '';
  constructor() { }

  ngOnInit() {
  }

}
