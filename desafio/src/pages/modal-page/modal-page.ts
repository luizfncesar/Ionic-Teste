import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalPage {
  showContent: boolean = false;

  private register : FormGroup;
  isValid: Boolean = false;
  randomImage: string = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png';

  constructor(private navParams: NavParams, private view: ViewController, private formBuilder: FormBuilder) {

    this.register = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      image: ['']
    });
  }

  ionViewDidLoad() {
    this.showContent = true;
  }
  
  logForm() {
    debugger;
    this.register.value.image = this.randomImage;
    console.log(this.register.value)
    this.view.dismiss(this.register.value);
  }

  getRandomImage(type){
    debugger
    this.isValid = true;
    let number = Math.floor(Math.random() * 30) + 0;
    if(type === 'man') {
      this.randomImage = `https://randomuser.me/api/portraits/men/${number}.jpg`
    } else {
      this.randomImage = `https://randomuser.me/api/portraits/women/${number}.jpg`
    }
  }

  closeModal() {
    this.view.dismiss();
  }
}
