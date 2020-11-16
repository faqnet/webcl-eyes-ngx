import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JsEyesComponent} from './domain/js-eyes/js-eyes.component';
import {EyeComponent} from './domain/eye/eye.component';
import {EyesComponent} from './domain/eyes/eyes.component';
import {FlexModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {HomeComponent} from './domain/home/home.component';
import {JsLoaderEyesComponent} from './domain/js-loader-eyes/js-loader-eyes.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { CopyPasteEyeComponent } from './domain/copy-paste-eye/copy-paste-eye.component';



@NgModule({
  declarations: [
    AppComponent,
    JsEyesComponent,
    EyeComponent,
    EyesComponent,
    HomeComponent,
    JsLoaderEyesComponent,
    CopyPasteEyeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
