import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';
import { CurrentUserModel } from '../../types/common.model';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  adminProfile:any;
  user:any;
  userData:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private componentManagerService:ComponentManagerService,
    private adminService:AdminService
  ) {}

  ngOnInit(): void {
    this.user= this.componentManagerService.user;
    this.getAdminDetails();
  }

  getAdminDetails(){
    this.adminService.getAdminDetails(this.user.UDID).subscribe((res)=>{
      this.userData = res.data;
    })
  }


  onEditProfile(){}

  enableEditing(){
    this.router.navigate(['/admin/profile/edit/'], { queryParams: { id: this.user.UDID, mode:'edit'} });
  }

}
