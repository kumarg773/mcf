import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatabaseModel } from 'src/app/Models/DatabaseModel';
import { DatabaseProvider } from 'src/app/Providers/DatabaseProvider';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ServerProvider } from 'src/app/Providers/ServerProvider';
import { ServerModel } from 'src/app/Models/ServerModel';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {
  DatabaseDetails: DatabaseModel [] =[];
  model: DatabaseModel = new DatabaseModel;
  modalRef: BsModalRef;
  addNewForm: FormGroup;
  ServerPath : ServerModel[] = [];
  Server: boolean = false;
  constructor(private modalService: BsModalService,
              private DatabaseProvider: DatabaseProvider,
              private serverProvider: ServerProvider,
              private formBuilder: FormBuilder) { 
                this.addNewForm = this.formBuilder.group({
                  Path_Id: new FormControl('0'),
                  Database_Name: new FormControl('', [Validators.required]),
                  Database_Host: new FormControl('', [Validators.required]),
                  User_Name: new FormControl('', [Validators.required]),
                  Password: new FormControl('', [Validators.required]),
                });
              }
  ngOnInit() {
    this.DatabaseProvider.getDatabase();
    this.DatabaseDetails = this.DatabaseProvider.database;
    this.serverProvider.getServers();
    this.ServerPath =  this.serverProvider.server; 
    this.formControlValueChanged();   
  }

  ngDoCheck() {
    this.DatabaseDetails = this.DatabaseProvider.database;
    this.ServerPath =  this.serverProvider.server;    
  }

  formControlValueChanged() {
    this.addNewForm.get('Path_Id').clearValidators();
    this.addNewForm.get('Path_Id').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
    this.addNewForm.get('Path_Id').updateValueAndValidity();
}

  addClick(template: TemplateRef<any>):void {
    this.model = new DatabaseModel;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  editDatabase(template: TemplateRef<any>, data: DatabaseModel):void {
    let databaseEdit : DatabaseModel = new DatabaseModel();
    databaseEdit = Object.assign(databaseEdit, data);
    this.model = data;
    this.ServerPath =  this.serverProvider.server; 
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  onFormSubmit() {
    this.model.Database_Host = this.addNewForm.get('Database_Host').value;
    this.model.Path_Id = this.addNewForm.get('Path_Id').value;
    this.model.Login_Id = this.addNewForm.get('User_Name').value;
    this.model.Password = this.addNewForm.get('Password').value;
    this.model.Instance_Name = this.addNewForm.get('Database_Name').value;
    this.DatabaseProvider.add(this.model);
    this.modalRef.hide();
  }
}
