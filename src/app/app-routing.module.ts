import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { InputFormComponent } from './input-form/input-form.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { LoginComponent } from './login/login.component';
import { PostPlaceComponent } from './post-place/post-place.component';
import { postPlaceGuardGuard } from './post-place-guard.guard';

const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'places/post-place',
    component: PostPlaceComponent,
    canActivate: [postPlaceGuardGuard],
  },
  { path: 'places/:placeId', component: PlaceDetailComponent },
  { path: 'places', component: PlacesComponent },
  { path: '', component: InputFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
