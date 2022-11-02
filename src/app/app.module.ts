import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeriffdetailsComponent } from './teriffdetails/teriffdetails.component';
import { GrievanceforumComponent } from './grievanceforum/grievanceforum.component';
import { ConsumerServiceComponent } from './consumer-service/consumer-service.component';
import { EnergysavingComponent } from './energysaving/energysaving.component';
import { EodbComponent } from './eodb/eodb.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PressReleasesComponent } from './press-releases/press-releases.component';
import { NewEventsComponent } from './new-events/new-events.component';
import { TendersComponent } from './tenders/tenders.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CareersComponent } from './careers/careers.component';
import { OrdersComponent } from './orders/orders.component';
import { CircularsComponent } from './circulars/circulars.component';
import { EmployeeCornerComponent } from './employee-corner/employee-corner.component';
import { RtiActComponent } from './rti-act/rti-act.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { ImpLinksComponent } from './imp-links/imp-links.component';
import { PerformanceComponent } from './performance/performance.component';
import { RegulationComponent } from './regulation/regulation.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { LatestResultComponent } from './latest-result/latest-result.component';
import { LatestAnnoucementComponent } from './latest-annoucement/latest-annoucement.component';
import { ExternalLinksComponent } from './external-links/external-links.component';
import { DsmAccountComponent } from './dsm-account/dsm-account.component';
import { AppsComponent } from './apps/apps.component';
import { MissionVissionComponent } from './mission-vission/mission-vission.component';
import { PublicNoticeBoardComponent } from './public-notice-board/public-notice-board.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MyInterceptorService} from './utils/my-interceptor.service';
import { TokengerneratorService } from './utils/tokengernerator.service';
import {EncreptionDecreptionService} from './utils/encreption-decreption.service';
import {ExportExcelService} from './utils/export-excel.service';
import {FormatdatePipe} from './utils/formatdate.pipe';
import {FileUploadService} from './utils/file-upload.service';
import {DownloadService} from './utils/download.service';
import { TestPdsfComponent } from './test-pdsf/test-pdsf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeptAdminComponent } from './DeptUser/dept-admin/dept-admin.component';
import { DeptDeptuserComponent } from './DeptUser/dept-deptuser/dept-deptuser.component';
import { DeptEmployeeComponent } from './DeptUser/dept-employee/dept-employee.component';
import { DeptHeaderComponent } from './DeptUser/dept-header/dept-header.component';
import { DeptSidebarComponent } from './DeptUser/dept-sidebar/dept-sidebar.component';
import { DeptSubadminComponent } from './DeptUser/dept-subadmin/dept-subadmin.component';
import { EmpHeaderComponent } from './DeptUser/emp-header/emp-header.component';
import { EmpHomeComponent } from './DeptUser/emp-home/emp-home.component';
import { EmpViewOrderComponent } from './DeptUser/emp-view-order/emp-view-order.component';
import { SubadminHeaderComponent } from './DeptUser/subadmin-header/subadmin-header.component';
import { SubadminUploadCircularComponent } from './DeptUser/subadmin-upload-circular/subadmin-upload-circular.component';
import { SubadminUploadGallaryComponent } from './DeptUser/subadmin-upload-gallary/subadmin-upload-gallary.component';
import { SubadminUploadOrderComponent } from './DeptUser/subadmin-upload-order/subadmin-upload-order.component';
import { SubadminViewGallaryComponent } from './DeptUser/subadmin-view-gallary/subadmin-view-gallary.component';
import { ViewRemoveDocComponent } from './DeptUser/view-remove-doc/view-remove-doc.component';
import { DeptHomeComponent } from './DeptUser/dept-admin/dept-home/dept-home.component';
import { AdminAssignRoleComponent } from './DeptUser/dept-admin/admin-assign-role/admin-assign-role.component';
import { AdminCreateGallaryComponent } from './DeptUser/dept-admin/admin-create-gallary/admin-create-gallary.component';
import { CreateDepartmentComponent } from './DeptUser/dept-admin/create-department/create-department.component';
import { CreateUserComponent } from './DeptUser/dept-admin/create-user/create-user.component';
import { GallaryDashboardComponent } from './DeptUser/dept-admin/gallary-dashboard/gallary-dashboard.component';
import { ViewDeptListComponent } from './DeptUser/dept-admin/view-dept-list/view-dept-list.component';
import { ViewGallaryComponent } from './DeptUser/dept-admin/view-gallary/view-gallary.component';
import { GalleryModule } from '@ngx-gallery/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TeriffdetailsComponent,
    GrievanceforumComponent,
    ConsumerServiceComponent,
    EnergysavingComponent,
    EodbComponent,
    GalleryComponent,
    PressReleasesComponent,
    NewEventsComponent,
    TendersComponent,
    VendorsComponent,
    CareersComponent,
    OrdersComponent,
    CircularsComponent,
    EmployeeCornerComponent,
    RtiActComponent,
    SiteMapComponent,
    ContactusComponent,
    LoginComponent,
    ImpLinksComponent,
    PerformanceComponent,
    RegulationComponent,
    QuickLinksComponent,
    LatestResultComponent,
    LatestAnnoucementComponent,
    ExternalLinksComponent,
    DsmAccountComponent,
    AppsComponent,
    MissionVissionComponent,
    PublicNoticeBoardComponent,
    TestPdsfComponent,
    DeptAdminComponent,
    DeptDeptuserComponent,
    DeptEmployeeComponent,
    DeptHeaderComponent,
    DeptSidebarComponent,
    DeptSubadminComponent,
    EmpHeaderComponent,
    EmpHomeComponent,
    EmpViewOrderComponent,
    SubadminHeaderComponent,
    SubadminUploadCircularComponent,
    SubadminUploadGallaryComponent,
    SubadminUploadOrderComponent,
    SubadminViewGallaryComponent,
    ViewRemoveDocComponent,
    DeptHomeComponent,
    AdminAssignRoleComponent,
    AdminCreateGallaryComponent,
    CreateDepartmentComponent,
    CreateUserComponent,
    GallaryDashboardComponent,
    ViewDeptListComponent,
    ViewGallaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    LightboxModule,
    GalleryModule,
  ],
  providers: [
    TokengerneratorService,
    EncreptionDecreptionService,
    ExportExcelService,
    FormatdatePipe,
    FileUploadService,
    DownloadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
