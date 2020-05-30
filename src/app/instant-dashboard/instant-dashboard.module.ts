import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantDashboardComponent } from './component/instant-dashboard.component';
import { ChartsModule } from './charts/charts.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    ChartsModule,
  ],
  declarations: [InstantDashboardComponent],
  exports: [InstantDashboardComponent],
})
export class InstantDashboardModule {}
