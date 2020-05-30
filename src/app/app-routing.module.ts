import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoModule } from './demo/demo.module';
import { DemoComponent } from './demo/component/demo.component';
import { InstantDashboardModule } from './instant-dashboard/instant-dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DemoModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
