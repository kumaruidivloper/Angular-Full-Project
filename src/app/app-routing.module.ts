import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: '',
        children: [
          {path: '', loadChildren: './features/home/home.module#HomeModule'}
        ]
      },
      {
        path: 'test',
        data: {
          breadcrumb: 'Test Overview'
        },
        loadChildren: './features/test/test-overview/test-overview.module#TestOverviewModule'
      },
      {
        path: 'routine',
        data: {
          breadcrumb: 'Routine Overview'
        },
        loadChildren: './features/routine/routine-overview/routine-overview.module#RoutineOverviewModule'
      },
      {
        path: 'procedure',
        data: {
          breadcrumb: 'Procedure Overview'
        },
        loadChildren: './features/procedure/procedure.module#ProcedureModule'
      },
      {
        path: 'sequence',
        data: {
          breadcrumb: 'Sequence Overview'
        },
        loadChildren: './features/sequence/sequence-overview/sequence-overview.module#SequenceOverviewModule'
      },
      {
        path: 'test-case-step',
        data: {
          breadcrumb: 'Test Case-Step Overview'
        },
        loadChildren: './features/test-case-step/test-case-step-overview/test-case-step-overview.module#TestCaseStepOverviewModule'
      },
      {
        path: 'test-progress',
        data: {
          breadcrumb: 'Test Progress Overview'
        },
        loadChildren: './features/test-progress/test-progress-overview/test-progress-overview.module#TestProgressOverviewModule'
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class AppRoutingModule {
}
