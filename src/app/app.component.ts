import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'instagram-clone';
  
  ngOnInit(): void {

    let firebaseConfig = {
      apiKey: "AIzaSyCyyTPcrju1PsbfsAYqf1vFsN7hMKbF3_E",
      authDomain: "instagram-clone-f3593.firebaseapp.com",
      projectId: "instagram-clone-f3593",
      storageBucket: "instagram-clone-f3593.appspot.com",
      messagingSenderId: "467792948916",
      appId: "1:467792948916:web:77740dfc0fcb68659ef1e1",
      measurementId: "G-KK5DTG4ZCZ"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

}
