import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() message!: any;
  @Output() formData: EventEmitter<any> = new EventEmitter();
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      imageUrls: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.addFileNameAndUrls(this.message)
  }
  sendData() {
    const formData = this.myForm.value
    this.formData.emit(formData);
  }

  get imageUrls(): FormArray {
    return this.myForm.get('imageUrls') as FormArray;
  }
  addImageUrl(): void {
    const imageUrlGroup = this.fb.group({
      url: [''],
    });
    this.imageUrls.push(imageUrlGroup);
  }
  removeImageUrl(index: number): void {
    this.imageUrls.removeAt(index);
  }
  addFileNameAndUrls(urls: string[]): void {
    debugger;
    for (const url of urls) {
      const imageUrlGroup = this.fb.group({
        url: [url],
      });
      this.imageUrls.push(imageUrlGroup);
    }
  }
}