import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockComponent } from './components/block/block.component';

const modules = [CommonModule, HttpClientModule, ReactiveFormsModule];
@NgModule({
  declarations: [BlockComponent],
  imports: modules,
  exports: [BlockComponent, ...modules],
})
export class SharedModule {}
