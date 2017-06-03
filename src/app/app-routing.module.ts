import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { SplashPageComponent } from './splash-page/splash-page.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ViewSinglePostComponent } from './view-single-post/view-single-post.component';
import { WritePostComponent } from './write-post/write-post.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WriteRedirectComponent } from './write-redirect/write-redirect.component';


const appRoutes: Routes = [
  { path: '', component:  SplashPageComponent },
  { path: 'write', component:  WriteRedirectComponent},
  { path: 'write/:userId', component:  WritePostComponent},
  { path: 'view/:userId', component:  ViewPostsComponent},
  { path: 'view/:userId/:postId', component:  ViewSinglePostComponent },

  // {
  //   path: 'servers',
  //   // canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard], //135
  //   component:  ServersComponent,
  //   children: [
  //   { path: ':id', component:  ServerComponent, resolve: {server: ServerResolver} },
  //   { path: ':id/edit', component:  EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  // ] },
  { path: 'error-page', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/error-page'} //NEEDS TO BE THE LAST ROUTE IN YOUR ARRAY OF ROUTES!!!
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) //added for Routes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
