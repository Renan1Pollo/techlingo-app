import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from '../../../services/unit.service';
import { Unit } from '../../../types/Unit.type';
import { SidebarMenuAdminComponent } from '../sidebar-menu-admin/sidebar-menu-admin.component';

@Component({
  selector: 'app-unit',
  standalone: true,
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
  imports: [SidebarMenuAdminComponent, CommonModule],
})
export class UnitComponent implements OnInit {
  response!: Boolean;
  units!: Unit[];

  constructor(private router: Router, private service: UnitService) {}

  ngOnInit(): void {
    this.getUnitData();
  }

  addUnit(): void {
    this.router.navigate(['/units/add']);
  }

  editUnit(unitId: number): void {
    this.router.navigate(['/units', unitId, 'edit']);
  }

  deleteUnit(unitId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir essa Unidade?');

    if (this.response) {
      this.service.deleteUnit(unitId).subscribe(() => {
        alert('Unidade excluída!');
        this.getUnitData();
      });
    }
  }

  getUnitData(): void {
    this.units = [];
    this.service.getAllUnits().subscribe((data: Unit[]) => {
      this.units = data;
    });
  }
}
