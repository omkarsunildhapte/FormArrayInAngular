import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ServiesService } from './servies.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm!: FormGroup;
  bsModalRef!: BsModalRef;
  product: any[] = [];
  @ViewChild('customDialog') customContent!: TemplateRef<any>;

  constructor(private productService: ServiesService, private fb: FormBuilder, private modalService: BsModalService) {
  }
  ngOnInit(): void {
    this.intform()
    this.getProducts()
  }
  intform() {
    this.myForm = this.fb.group({
      productsArray: this.fb.array([]),
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      data.products.forEach((product: any) => {
        let images: any = product.images;
        this.addProduct(product.id, product.title, images);
      });
    });
    debugger
  }
  get productsArray(): FormArray {
    return this.myForm.get('productsArray') as FormArray;
  }
  addProduct(id: number, title: string, images: any): void {
    // const productGroup = this.fb.group({
    //   id: [id],
    //   title: [title],
    //   length: [images]
    // });
    // this.productsArray.push(productGroup);
  }
  addItem(): void {
    const newItem = this.fb.group({
      id: [''],
      title: [''],
      length: ['']
    });
    this.productsArray.push(newItem);
  }

  removeItem(index: number): void {
    this.productsArray.removeAt(index);
  }

  onSubmit(): void {
    debugger
    console.log(this.myForm.value);
  }
  openDialog(index: any) {
    this.product.push(index.value.length)
    this.bsModalRef = this.modalService.show(this.customContent, {
      class: 'modal-dialog-centered',
    });
  }
  close() {

  }
}

