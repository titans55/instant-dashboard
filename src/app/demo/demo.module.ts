import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './component/demo.component';
import { InstantDashboardModule } from '../instant-dashboard/instant-dashboard.module';

@NgModule({
  imports: [CommonModule, InstantDashboardModule],
  declarations: [DemoComponent],
})
export class DemoModule {}
