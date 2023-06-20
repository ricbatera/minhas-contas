import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsChipComponent } from './tags-chip/tags-chip.component';

//  ANGULAR MATERIAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    TagsChipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  exports:[
    TagsChipComponent
  ]
})
export class FormItensModule { }
