import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TeriffdetailsComponent } from './teriffdetails/teriffdetails.component';
import { GrievanceforumComponent } from './grievanceforum/grievanceforum.component';
import { ConsumerServiceComponent } from './consumer-service/consumer-service.component';
import { EnergysavingComponent } from './energysaving/energysaving.component';
import { EodbComponent } from './eodb/eodb.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CareersComponent } from './careers/careers.component';
import { EmployeeCornerComponent } from './employee-corner/employee-corner.component';
import { RtiActComponent } from './rti-act/rti-act.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { ImpLinksComponent } from './imp-links/imp-links.component';
import { PerformanceComponent } from './performance/performance.component';
import { RegulationComponent } from './regulation/regulation.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { LatestResultComponent } from './latest-result/latest-result.component';
import { NewEventsComponent } from './new-events/new-events.component';
import { ExternalLinksComponent } from './external-links/external-links.component';
import { DsmAccountComponent } from './dsm-account/dsm-account.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { MissionVissionComponent } from './mission-vission/mission-vission.component';
import { PressReleasesComponent } from './press-releases/press-releases.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PublicNoticeBoardComponent } from './public-notice-board/public-notice-board.component';
import { TestPdsfComponent } from './test-pdsf/test-pdsf.component';
import { TendersComponent } from './tenders/tenders.component';
import { CircularsComponent } from './circulars/circulars.component';
import { OrdersComponent } from './orders/orders.component';

import { DeptAdminComponent } from './DeptUser/dept-admin/dept-admin.component';
import { DeptDeptuserComponent } from './DeptUser/dept-deptuser/dept-deptuser.component';
import { DeptEmployeeComponent } from './DeptUser/dept-employee/dept-employee.component';
import { DeptSubadminComponent } from './DeptUser/dept-subadmin/dept-subadmin.component';
import { EmpViewOrderComponent } from './DeptUser/emp-view-order/emp-view-order.component';
import { SubadminUploadCircularComponent } from './DeptUser/subadmin-upload-circular/subadmin-upload-circular.component';
import { SubadminUploadGallaryComponent } from './DeptUser/subadmin-upload-gallary/subadmin-upload-gallary.component';
import { ViewRemoveDocComponent } from './DeptUser/view-remove-doc/view-remove-doc.component';
import { SubadminViewGallaryComponent } from './DeptUser/subadmin-view-gallary/subadmin-view-gallary.component';
import { SubadminUploadOrderComponent } from './DeptUser/subadmin-upload-order/subadmin-upload-order.component';
import { DeptHomeComponent } from './DeptUser/dept-admin/dept-home/dept-home.component';
import { AdminAssignRoleComponent } from './DeptUser/dept-admin/admin-assign-role/admin-assign-role.component';
import { AdminCreateGallaryComponent } from './DeptUser/dept-admin/admin-create-gallary/admin-create-gallary.component';
import { CreateDepartmentComponent } from './DeptUser/dept-admin/create-department/create-department.component';
import { CreateUserComponent } from './DeptUser/dept-admin/create-user/create-user.component';
import { GallaryDashboardComponent } from './DeptUser/dept-admin/gallary-dashboard/gallary-dashboard.component';
import { ViewDeptListComponent } from './DeptUser/dept-admin/view-dept-list/view-dept-list.component';
import { ViewGallaryComponent } from './DeptUser/dept-admin/view-gallary/view-gallary.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'teriff-details', component: TeriffdetailsComponent },
  { path: 'grievence', component: GrievanceforumComponent },
  { path: 'customerservice', component: ConsumerServiceComponent },
  { path: 'energy-saving', component: EnergysavingComponent },
  { path: 'EODB', component: EodbComponent },
  { path: 'vendor', component: VendorsComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'employee-corner', component: EmployeeCornerComponent },
  { path: 'rtiact', component: RtiActComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'regulation', component: RegulationComponent },
  { path: 'imp-links', component: ImpLinksComponent },
  { path: 'quicklinks', component: QuickLinksComponent },
  { path: 'public-latest-result', component: LatestResultComponent },
  { path: 'public-latest-news-updates', component: NewEventsComponent },
  { path: 'external-links', component: ExternalLinksComponent },
  { path: 'dsm-account', component: DsmAccountComponent },
  { path: 'sitemap', component: SiteMapComponent },
  { path: 'mission-vission', component: MissionVissionComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'public-notice-board', component: PublicNoticeBoardComponent },
  { path: 'public-press-release', component: PressReleasesComponent },
  { path: 'public-tender-ven', component: TendersComponent },
  { path: 'user-view-circular', component: CircularsComponent },
  { path: 'user-view-order', component: OrdersComponent },

  // admin routes
  { path: 'dept-admin', component: DeptAdminComponent },
  { path: 'admin-assign-role/:name/:id', component: AdminAssignRoleComponent },
  { path: 'dept-deptuser', component: DeptDeptuserComponent },
  { path: 'gallery-dashboard', component: GallaryDashboardComponent },
  { path: 'admin-create-gallary', component: AdminCreateGallaryComponent },
  { path: 'dept-home', component: DeptHomeComponent },
  { path: 'create-department', component: CreateDepartmentComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'view-dept-list', component: ViewDeptListComponent },
  { path: 'view-gallary/:gid', component: ViewGallaryComponent },


  // employee routes
  { path: 'dept-employee', component: DeptEmployeeComponent },
  { path: 'emp-view-order', component: EmpViewOrderComponent },

  // department routes
  { path: 'dept-user', component: DeptDeptuserComponent },
  { path: 'dept-subadmin', component: DeptSubadminComponent },
  { path: 'subadmin-upload-circular', component: SubadminUploadCircularComponent },
  { path: 'subadmin-upload-gallary', component: SubadminUploadGallaryComponent },
  { path: 'subadmin-upload-order', component: SubadminUploadOrderComponent },
  { path: 'subadmin-view-gallary', component: SubadminViewGallaryComponent },

  // 
  { path: 'view-remove-doc', component: ViewRemoveDocComponent },


  // dynamic routes 
  { path: 'view-pdf/:path/:filename/:title/:desc', component: TestPdsfComponent },



  //dept admin  login
  // {path: 'dept-admin', component: DeptAdminComponent},
  // {path: 'admin-assign-role/:name/:id', component: AdminAssignRoleComponent},
  // {path: 'dept-deptuser', component: DeptDeptuserComponent},
  // {path:'gallery-dashboard', component:GalleryDashboardComponent},
  // {path:'admin-create-gallery', component:AdminCreateGalleryComponent},
  // {path: 'dept-home', component: DeptHomeComponent},
  // {path: 'create-department', component: CreateDepartmentComponent},
  // {path: 'create-user', component: CreateUserComponent},
  // {path: 'view-dept-list', component: ViewDeptListComponent},
  // {path: 'view-gallary/:gid' , component: ViewGallaryComponent},

  // // {path: 'admn-view-docs', component: AdmnViewDocsComponent},

  // //emp login
  // {path: 'emp-home', component: EmpHomeComponent},
  // {path: 'dept-employee', component: DeptEmployeeComponent},
  // {path: 'emp-view-order', component: EmpViewOrderComponent},
  // {path: 'trylatter', component: TrylatterComponent},
  // {path: 'apps', component: AppsComponent},

  // //dept-Subadmin
  // {path: 'dept-subadmin', component: DeptSubadminComponent},
  // {path: 'subadmin-upload-circular', component: SubadminUploadCircularComponent},
  // {path: 'subadmin-upload-order', component: SubadminUploadOrderComponent},
  // {path: 'view-details/:type', component: ViewNewsResultDetailsComponent},
  // {path: 'view-remove-doc', component: ViewRemoveDocComponent},
  // {path: 'view-pdf/:path/:filename/:title/:desc', component: TestPdsfComponent},
  // {path: 'subadmin-view-gallary/:gid' , component: SubadminViewGallaryComponent},
  // {path: 'eodb' , component: EodbComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
