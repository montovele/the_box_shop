import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const map = L.map('map').setView([32.5304355,-116.9543312], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([32.5304355, -116.9543312]).addTo(map);

    marker.bindPopup('OkDock',{className: 'leaflet-popup-content'});
  
    marker.on('add', () => {
      marker.openPopup();
    });

    marker.openPopup();

  }

}
