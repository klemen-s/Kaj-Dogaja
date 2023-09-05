import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { InputFormComponent } from './input-form/input-form.component';

const routes: Routes = [
  { path: 'places', component: PlacesComponent },
  { path: '', component: InputFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
