import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ClientModel } from './models/client.model';
import { ClienteService } from './services/cliente.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lumini';

  clientForm: FormGroup;
  plusIcon = faPlusCircle;

  columns = [
    { prop: 'companyName', name: 'Cliente'}, 
    { prop: 'fantasyName', name: 'Nome Fantasia'}, 
    { prop: 'legalRepresentative', name: 'Representante Legal'}, 
    { name: 'Email' },
    { prop: 'createdProduct', name: 'Data de cadastro'}, 
  ];
  
  rows = [];
  filteredRows = [];

  closeResult = '';
  showModalToast = false;
  
  constructor(
      private clientService: ClienteService,
      private fb: FormBuilder,
      private modalService: NgbModal
    ){
      
    this.clientService.getAll().subscribe( response => {
      this.rows = response.content;
      this.filteredRows = this.rows;
    });

    this.clientForm = this.fb.group({
      companyName: ['', Validators.required],
      cnpj: ['', Validators.required, Validators.minLength(14),  Validators.maxLength(14)],
      fantasyName: ['', Validators.required],
      legalRepresentative: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      phoneNumber: ['', Validators.required, Validators.minLength(11),  Validators.maxLength(11)],
      registerStatus: ['', Validators.required],
    });

  }

  saveClient(){
    let formData = this.clientForm.value;
    this.clientForm.reset();
    this.clientService.create(formData).subscribe( 
      response =>{
      alert(response);
    },
    err =>{
      alert(err.error.message);
      }
    );
  }

  openFormClient(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  filterTable(filterValue){
    if (filterValue == '') {
      this.filteredRows = this.rows;
    }else{
      const lowerValue = filterValue.toLowerCase();
      this.filteredRows = this.rows.filter(item => item.companyName.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
    }
  }

}
