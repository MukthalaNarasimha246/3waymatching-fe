import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StandardComponent } from './components/standard/standard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { ReviewComponent } from './components/review/review.component';
import { DataClassificationComponent } from './components/data-classification/data-classification.component';
import { ReceiptAgainstOrderComponent } from './components/receipt-against-order/receipt-against-order.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { MaterialReceiptNoteComponent } from './components/material-receipt-note/material-receipt-note.component';
import { DuplicateSimilarityComponent } from './components/duplicate-similarity/duplicate-similarity.component';
import { InvoiceAuditTrailComponent } from './components/invoice-audit-trail/invoice-audit-trail.component';
import { InvoiceChecklistComponent } from './components/invoice-checklist/invoice-checklist.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardModernComponent } from './components/dashboard-modern/dashboard-modern.component';
import { EwaybillComponent } from './components/ewaybill/ewaybill.component';
import { EmailIntegrationComponent } from './components/email-integration/email-integration.component';
import { EntityFlowComponent } from './components/entity-flow/entity-flow.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ProcurementTableComponent } from './components/procurement-table/procurement-table.component';
import { PepsicoComponent } from './components/pepsico/pepsico.component';
import { LoaderComponent } from './components/loader/loader.component';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    DashboardComponent,
    StandardComponent,
    ProcurementComponent,
    ReviewComponent,
    DataClassificationComponent,
    ReceiptAgainstOrderComponent,
    PurchaseOrderComponent,
    MaterialReceiptNoteComponent,
    DuplicateSimilarityComponent,
    InvoiceAuditTrailComponent,
    InvoiceChecklistComponent,
    LoginComponent,
    EwaybillComponent,
    EmailIntegrationComponent,
    EntityFlowComponent,
    MainDashboardComponent,
    ProcurementTableComponent,
    PepsicoComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MarkdownModule.forRoot()

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
