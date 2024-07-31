import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PluginService } from '../../services/plugin-service/plugin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../services/component-manager.service';

@Component({
  selector: 'app-plugins-add',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './plugins-add.component.html',
  styleUrl: './plugins-add.component.scss'
})
export class PluginsAddComponent {

  pluginForm: FormGroup;
  submitted: boolean = false;
  pluginId:any;
  mode:any;
  pluginDetailData:any;
  user:any;

  constructor(private fb: FormBuilder,
    private pluginService: PluginService,
    private router : Router,
    private SnackBar:MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private componentManagerService:ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (!!params.id) {
        this.pluginId = params.id;
        this.mode = params.mode;
        this.getPluginDetailsById(this.pluginId);
      }
    });
    this.pluginForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      // id:[''],
      key:['']
    });
    this.user = this.componentManagerService.user;
  }

  onSubmit() {
    this.submitted = true;
    if (this.pluginForm.valid) {
      const data = {
        plugin_name: this.pluginForm.value.name,
        created_by: this.user.UDID,
        updated_by:this.user.UDID,
        settings:{
          // id:this.pluginForm.value.id,
          secretKey:this.pluginForm.value.key
        },
        record_status: this.pluginForm.value.status
      };
      this.pluginService.createPlugin(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Plugin saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/plugins']);
        } else {
          this.SnackBar.open('Error While Saving Plugin', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.pluginForm.valid) {
      const data = {
        plugin_name: this.pluginForm.value.name,
        updated_by:this.user.UDID,
        settings:{
          // id:this.pluginForm.value.id,
          secretKey:this.pluginForm.value.key
        },
        record_status: this.pluginForm.value.status
      };
      this.pluginService.updatePlugin(this.pluginId,data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Plugin Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/plugins']);
        } else {
          this.SnackBar.open('Error While Updated Plugin', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getPluginDetailsById(id){
    this.pluginService.getPluginById(id).subscribe((res:any)=>{
      if(res.success){
        this.pluginDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data){
    if(this.mode === 'edit'){
      this.pluginForm.get('name').setValue(data.plugin_name);
      this.pluginForm.get('status').setValue(data.record_status);
      // this.pluginForm.get('id').setValue(data.settings.id);
      this.pluginForm.get('key').setValue(data.pluginSettings.secretKey);
    }
  }

}
