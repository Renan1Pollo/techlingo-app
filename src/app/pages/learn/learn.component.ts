import { Component } from '@angular/core';
import { SidebarMenuComponent } from "../../components/sidebar-menu/sidebar-menu.component";

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [SidebarMenuComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {

}
