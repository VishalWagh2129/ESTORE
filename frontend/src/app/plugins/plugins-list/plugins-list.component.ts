import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PluginService } from '../../services/plugin-service/plugin.service';
import { ComponentManagerService } from '../../services/component-manager.service';
import { CurrentUserModel } from '../../home/components/types/common.model';

@Component({
  selector: 'app-plugins-list',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './plugins-list.component.html',
  styleUrl: './plugins-list.component.scss'
})
export class PluginsListComponent {

  pluginData:any=[];
  user:CurrentUserModel = new CurrentUserModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pluginService:PluginService,
    private snackBar : MatSnackBar,
    private componentManagerService:ComponentManagerService
  ) {
  }

  ngOnInit(){
    this.getAllPlugins();
    this.user = this.componentManagerService.user;
  }

  getAllPlugins(){
    this.pluginService.getAllPlugin().subscribe((res:any)=>{
      if(res.success){
        this.pluginData = res.data;
      }
    });
  }

  deletePlugin(data){
    this.pluginService.deletePlugin(data.plugin_id).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Plugin Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllPlugins();
    });
  }
  displayedColumns: string[] = ['id','name','status','action'];

  editPlugin(data){  
    this.router.navigate(['/admin/plugins/add/'], { queryParams: { id: data.plugin_id,mode:'edit'} });
  }

  addPlugin(){
    this.router.navigate(['/admin/plugins/add'], {queryParams: { mode:'add'} });
  }

}
