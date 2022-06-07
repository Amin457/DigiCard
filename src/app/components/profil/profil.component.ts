import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ToastController ,AlertController} from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit ,ElementRef, Renderer2, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
  swipeNext(){
    this.slides.slideNext();
  }
  decoded: any;
  user: users;
  userupdated: users = new users();
  form: FormGroup;
  http: any;
  id: number;
  imgUrl = environment.Api + 'api/files/get/';
  selectedFile: any;
  file: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private alertCtrl: AlertController, public httpClient: HttpClient, private userService: UserService, public toastController: ToastController) {
    this.initForm();

  }

  async presentAlert(msg : string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }



  ngOnInit() {
    
  }


  initForm() {
    const token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
    this.user = this.decoded.result;
    this.id = this.user.id;
    console.log(this.user)
    this.form = new FormGroup({
      Nom: new FormControl(this.user.Nom, { validators: [Validators.required] }),
      Prenom: new FormControl(this.user.Prenom, { validators: [Validators.required] }),
      mail: new FormControl(this.user.mail, { validators: [Validators.required, Validators.email] }),
      dateNaissance: new FormControl(this.date(this.user.dateNaissance), {validators: [Validators.required]}),
      mdp: new FormControl(this.user.mdp, { validators: [Validators.required, Validators.minLength(8)] }),
      CIN: new FormControl(this.user.CIN, {validators: [Validators.required, Validators.minLength(8)]}),


    });
  }

  


  onSubmit() {

    if (this.file == undefined) {
      this.userupdated.id = this.id;
      this.userupdated.Nom = this.form.value.Nom;
      this.userupdated.Prenom = this.form.value.Prenom;
      this.userupdated.mail = this.form.value.mail;
      this.userupdated.mdp = this.form.value.mdp;
      this.userupdated.img = this.user.img;
      this.userupdated.CIN=this.form.value.CIN;
      this.userupdated.dateNaissance=this.form.value.dateNaissance;
     this.userService.updateUser(this.userupdated).subscribe(
        (res) => {
          {
            this.presentAlert(res.message);
            this.user = this.userupdated;

          }
        },
        error => {
          console.log(error);
        });
    } else {
      this.userService.postFile(this.file).subscribe(res => {

        this.userupdated.id = this.id;
        this.userupdated.Nom = this.form.value.Nom;
        this.userupdated.Prenom = this.form.value.Prenom;
        this.userupdated.mail = this.form.value.mail;
        this.userupdated.mdp = this.form.value.mdp;
        this.userupdated.CIN=this.form.value.CIN;
        this.userupdated.img = res.data;
        this.userupdated.dateNaissance=this.form.value.dateNaissance;

        console.log("hhhhhhhhhhhh",this.userupdated);
        this.userService.updateUser(this.userupdated).subscribe(
          (res) => {
            {
              console.log(res);
              this.presentAlert(res.message);
              this.user = this.userupdated;

            }
          },
          error => {
            console.log(error);
          });

      })
    }
  }


  date(date1 : Date) {

    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(new Date(date1),'yyyy-MM-dd');
  }
 
}


