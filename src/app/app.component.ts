import firebase from 'firebase/app';
import 'firebase/analytics';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit(): void {
    let firebaseConfig = {
      apiKey: 'AIzaSyCyyTPcrju1PsbfsAYqf1vFsN7hMKbF3_E',
      authDomain: 'instagram-clone-f3593.firebaseapp.com',
      projectId: 'instagram-clone-f3593',
      storageBucket: 'instagram-clone-f3593.appspot.com',
      messagingSenderId: '467792948916',
      appId: '1:467792948916:web:77740dfc0fcb68659ef1e1',
      measurementId: 'G-KK5DTG4ZCZ',
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
