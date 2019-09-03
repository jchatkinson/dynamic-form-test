import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSliderModule, MatTooltipModule, MatIconModule, MatDividerModule } from '@angular/material'
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicFormsMaterialUIModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSliderModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
