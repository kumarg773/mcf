import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ServerModel } from 'src/app/Models/ServerModel';
import { ServerProvider } from 'src/app/Providers/ServerProvider';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductProvider } from 'src/app/Providers/ProductProvider';

@Component({
  selector: 'app-server-path',
  templateUrl: './server-path.component.html',
  styleUrls: ['./server-path.component.css']
})
export class ServerPathComponent implements OnInit {
  ServerPath: ServerModel[] = [];
  modalRef: BsModalRef;
  addNewForm: FormGroup;
  model: ServerModel = new ServerModel;
  constructor(private modalService: BsModalService,
    private serverProvider: ServerProvider
    , private formBuilder: FormBuilder
    , private productProvider: ProductProvider) {
    this.addNewForm = this.formBuilder.group({
      Server_Name: new FormControl('', [Validators.required]),
      Server_Host: new FormControl('', [Validators.required]),
      User_Name: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Server_Path: new FormControl('', [Validators.required]),
      Customer_Type: new FormControl('')
    });
  }

  ngOnInit() {
    this.serverProvider.getServers();
    this.ServerPath =  this.serverProvider.server;
    this.formControlValueChanged();  
  }

  ngDoCheck() {
    this.ServerPath =  this.serverProvider.server;
  }

  formControlValueChanged() {
    this.addNewForm.get('Customer_Type').clearValidators();
    this.addNewForm.get('Customer_Type').setValidators([Validators.required, Validators.min(1)]);
    this.addNewForm.get('Customer_Type').updateValueAndValidity();
}
  
  addClick(template: TemplateRef<any>):void {
    this.model = new ServerModel;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  editServer(template: TemplateRef<any>, data: ServerModel):void {
    let serverEdit : ServerModel = new ServerModel();
    serverEdit = Object.assign(serverEdit, data);
    this.model = data;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  onFormSubmit() {
    this.model.Customer_Type = this.addNewForm.get('Customer_Type').value;
    this.model.Server_Name = this.addNewForm.get('Server_Name').value;
    this.model.Server_Instance_Path = this.addNewForm.get('Server_Path').value;
    this.model.Login_Id = this.addNewForm.get('User_Name').value;
    this.model.Password = this.addNewForm.get('Password').value;
    this.model.Server_Path = this.addNewForm.get('Server_Host').value;
    this.serverProvider.addServer(this.model);
    this.modalRef.hide();
  }


}
