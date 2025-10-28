import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StandardComponent } from './components/standard/standard.component';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { ReviewComponent } from './components/review/review.component';
import { DataClassificationComponent } from './components/data-classification/data-classification.component';
import { DuplicateSimilarityComponent } from './components/duplicate-similarity/duplicate-similarity.component';
import { InvoiceChecklistComponent } from './components/invoice-checklist/invoice-checklist.component';
import { InvoiceAuditTrailComponent } from './components/invoice-audit-trail/invoice-audit-trail.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardModernComponent } from './components/dashboard-modern/dashboard-modern.component';
import { EmailIntegrationComponent } from './components/email-integration/email-integration.component';
import { AuthGuard } from './components/auth.guard';
import { EntityFlowComponent } from './components/entity-flow/entity-flow.component';
import { ProcurementTableComponent } from './components/procurement-table/procurement-table.component';
import { PepsicoComponent } from './components/pepsico/pepsico.component';

const routes: Routes = [

  {
    path:'projects',
    loadChildren: () => import('./components/projects/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: 'dashboard',
    component: DashboardModernComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'standard',
    component: StandardComponent,
    //  canActivate: [AuthGuard] 
  },
  {
    path: 'Procurement',
    component: ProcurementComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'review',
    component: ReviewComponent,
    // canActivate: [AuthGuard] 
  },
   {
    path: 'procurement-table',
    component: ProcurementTableComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'data-clasification',
    component: DataClassificationComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'duplicat_similarity',
    component: DuplicateSimilarityComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'duplicat_similarity/:id',
    component: DuplicateSimilarityComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'invoice_check_list/:id/:batch_id',
    component: InvoiceChecklistComponent,
    // canActivate: [AuthGuard] 

  },
  {
    path: 'po_list/:id',
    component: InvoiceAuditTrailComponent,
    // canActivate: [AuthGuard] 

  },
  {
 path: 'projects_flow_screen',
    component: EntityFlowComponent,
    // canActivate: [AuthGuard] 
  },
  {
    path: 'email_integration',
    component: EmailIntegrationComponent,
    // canActivate: [AuthGuard] 

  },
  {
    path: 'pepsico',
    component: PepsicoComponent,
    // canActivate: [AuthGuard] 

  },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
