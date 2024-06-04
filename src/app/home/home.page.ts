import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  infoForm: FormGroup;

  @ViewChild('firstNameInput', { static: false }) firstNameInput!: ElementRef;
  @ViewChild('lastNameInput', { static: false }) lastNameInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private navCtrl: NavController
  ) {
    this.infoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      educationLevel: [''],
      birthDate: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  clearForm() {
    this.playAnimation();
    setTimeout(() => {
      this.infoForm.reset();
    }, 1000);
  }

  playAnimation() {
    const firstNameAnimation = this.animationCtrl.create()
      .addElement(this.firstNameInput.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)');

    const lastNameAnimation = this.animationCtrl.create()
      .addElement(this.lastNameInput.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)');

    firstNameAnimation.play();
    lastNameAnimation.play();
  }

  async showInfo() {
    const { firstName, lastName } = this.infoForm.value;
    const alert = await this.alertController.create({
      header: 'Información Ingresada',
      message: `Nombre: ${firstName} ${lastName}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}