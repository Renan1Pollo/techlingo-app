import { Component } from '@angular/core';
import { SidebarMenuAdminComponent } from "../sidebar-menu-admin/sidebar-menu-admin.component";

@Component({
    selector: 'app-question',
    standalone: true,
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    imports: [SidebarMenuAdminComponent]
})
export class QuestionComponent {

}
