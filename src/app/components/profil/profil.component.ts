import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ToastController } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { users } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit ,ElementRef, Renderer2, ViewChild} from '@angular/core';

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
  constructor( public httpClient: HttpClient, private userService: UserService, public toastController: ToastController) {
    this.initForm();

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
    this.form = new FormGroup({
      Nom: new FormControl(this.user.Nom, { validators: [Validators.required] }),
      Prenom: new FormControl(this.user.Prenom, { validators: [Validators.required] }),
      mail: new FormControl(this.user.mail, { validators: [Validators.required, Validators.email] }),
      dateNaissance: new FormControl(null, {validators: [Validators.required]}),
      mdp: new FormControl(this.user.mdp, { validators: [Validators.required, Validators.minLength(8)] }),

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
      this.userupdated.dateNaissance=this.form.value.dateNaissance;
      console.log(this.userupdated);
     this.userService.updateUser(this.userupdated).subscribe(
        (res) => {
          {
            console.log(res);
            alert(res.message);
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
        this.userupdated.img = res.data;
        console.log(this.userupdated);
        this.userService.updateUser(this.userupdated).subscribe(
          (res) => {
            {
              console.log(res);
              alert(res.message);
              this.user = this.userupdated;

            }
          },
          error => {
            console.log(error);
          });

      })
    }
  }


  

}


