import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Localisation } from 'src/app/model/localisation';
import { LocalisationService } from 'src/app/services/localisation.service';
import tt  from '@tomtom-international/web-sdk-maps';
import { Geolocation, Position } from '@capacitor/geolocation'; 
import { HttpClient } from '@angular/common/http'; 
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
})
export class LocalisationComponent implements OnInit {
  id_part: number;
  id_carte: number;
  societe: string;
  query : string ;
  constructor(private http : HttpClient ,private router: Router ,public route: ActivatedRoute , private partenaireService: PartenaireService) { }
  ngOnInit() {
  }

  ////////////////////
  map: tt.Map;
  center = { lng: 10.17972, lat: 36.80278 };
  reverseGeoCoded: any;
  searchResults: any;
  currentLocationAvailable: boolean = false;
  searchResultsAvailable: boolean = false;
  searchResultMarker: any;
  ionViewDidEnter() {
    this.id_carte = this.route.snapshot.params.id1;
    this.id_part = this.route.snapshot.params.id2;

    this.partenaireService.getNamePartById(this.id_part).subscribe(
      (res)  => {
        console.log(res);
        this.societe = res.data.societe;
        console.log("aaaaaaaaaa",this.societe);
        this.query=this.societe;

      },
      error => {
        console.log(error);
      });


    console.log('load')
    this.map = tt.map({
      key: "EdNdRPxF4UVs0Ad5EnAaKSKeqGvK1dEn",
      container: "map",
      center: this.center,
      zoom: 11,
    });
    //let marker = new tt.Marker().setLngLat(this.center).addTo(this.map);
    this.getLocation();
    this.search();
  }

  async getLocation() {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    let marker2 = new tt.Marker({ color: 'green' }).setLngLat([coordinates.coords.longitude, coordinates.coords.latitude]).addTo(this.map);
    this.getAddress(coordinates.coords);
  }

  async getAddress(home) {
    const res: any = await this.http.get(`https://api.tomtom.com/search/2/reverseGeocode/${home.latitude}%2C${home.longitude}.json?key=EdNdRPxF4UVs0Ad5EnAaKSKeqGvK1dEn`).toPromise();
    this.reverseGeoCoded = res.addresses[0].address.freeformAddress + ' ' + res.addresses[0].address.countryCodeISO3;
  }

  async search() {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    const res: any = await this.http.get(`https://api.tomtom.com/search/2/search/${this.query}.json?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=EdNdRPxF4UVs0Ad5EnAaKSKeqGvK1dEn`).toPromise();
    this.searchResults = res.results;
     for (var i = 0; i < this.searchResults.length ; i++) {
      if(this.searchResults[i].position.lon<15 && this.searchResults[i].position.lon>8 && this.searchResults[i].position.lat<40 && this.searchResults[i].position.lat>29 ){
      this.locateResult(this.searchResults[i]);
      }
    }
  }

  
  locateResult(place) {
    this.searchResultMarker = new tt.Marker({ color: 'orange' }).setLngLat([place.position.lon, place.position.lat]).addTo(this.map);
    this.map.setCenter({ lng: place.position.lon, lat: place.position.lat });
    this.map.setZoom(15);
  
  }


















  ////////////
 
 /* onClick1(url: string){
    window.open(url,'_system');
  }*/

  gotoDetail(){
    this.router.navigate(['main/home/detailcard/'+this.id_carte+'/'+this.id_part]);

  }
}
