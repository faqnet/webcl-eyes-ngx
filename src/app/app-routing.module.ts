import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './domain/home/home.component';
import {EyesComponent} from './domain/eyes/eyes.component';
import {JsEyesComponent} from './domain/js-eyes/js-eyes.component';
import {JsLoaderEyesComponent} from './domain/js-loader-eyes/js-loader-eyes.component';
import {CopyPasteEyeComponent} from './domain/copy-paste-eye/copy-paste-eye.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'eyes',
    children: [
      {
        path: 'angular',
        component: EyesComponent,
        pathMatch: 'full'
      },
      {
        path: 'constructorJS',
        component: JsEyesComponent,
        pathMatch: 'full'
      },
      {
        path: 'loaderJS',
        component: JsLoaderEyesComponent,
        pathMatch: 'full'
      },
      {
        path: 'copypaste',
        component: CopyPasteEyeComponent,
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
