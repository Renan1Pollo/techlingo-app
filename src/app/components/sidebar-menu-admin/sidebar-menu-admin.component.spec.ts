import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuAdminComponent } from './sidebar-menu-admin.component';

describe('SidebarMenuAdminComponent', () => {
  let component: SidebarMenuAdminComponent;
  let fixture: ComponentFixture<SidebarMenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenuAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
