import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockComponent {
  @Input() title?: string;
}
