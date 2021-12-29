import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';






@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
