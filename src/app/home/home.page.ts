import { Component } from '@angular/core';
import * as L from 'leaflet';

const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // ukuran ikon
  iconAnchor: [12, 41], // titik anchor yang sesuai untuk posisi ikon
  popupAnchor: [1, -34], // posisi popup di atas marker
  shadowSize: [41, 41], // ukuran bayangan
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}
  ongOnInit() {

  }
  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.798122635579226, 110.37069519882778], 10);

     // Base map layer - OpenStreetMap
     const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Base map layer - Google Maps (Satellit view)
    const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a>',
    });

    // Base map layer - Esri WorldStreetMap
    const esriWorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ',
    });

    // Menambahkan base map default (OpenStreetMap)
    openStreetMap.addTo(this.map);

    // Menambahkan Layer Control
    const baseMaps = {
      'OpenStreetMap': openStreetMap,
      'Google Satellite': googleSat,
      'Esri WorldStreetMap': esriWorldStreetMap,
    };

    L.control.layers(baseMaps).addTo(this.map);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.prd/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

      // Menambahkan marker di lokasi Tugu Jogja
      const Marker = L.marker([-7.7839981601525885, 110.37552383903854], { icon: iconDefault }).addTo(this.map);

      // Menambahkan popup dengan gambar dan teks
    const popupContent = `
    <b>Bubur Hayam</b><br>
    Kotabaru, Yogyakarta<br>
    <img src="https://cdn.idntimes.com/content-images/community/2022/09/fromandroid-0a11a821d695d32f75165ea3f79c286c.jpg" alt="Bubur Hayam" width="150" height="100"><br>
    Rekomendasi sarapan
      `;
  Marker.bindPopup(popupContent).openPopup();


  }
}
