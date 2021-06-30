import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public vps: ViewportScroller) { }

  UserIcon = faUser;
  ngOnInit(): void {
  }
  cards = [
    {
      name: 'Mibel',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/mibel.jpeg',
    },
    {
      name: 'Etah',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/Etah.jpeg',
    },
    {
      name: 'Cindy',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/cindy.jpeg',
    },
    {
      name: 'Albert',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/ainstein.jpeg',
    },
    {
      name: 'Excel',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/excel.jpeg',
    },
    {
      name: 'Freedom',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/freedom.jpeg',
    }, {
      name: 'Jess',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/jess.jpeg',
    }, {
      name: 'Mbende',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/mbende.jpeg',
    },
    {
      name: 'Sheryfa',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/sheryfa.jpeg',
    },
    {
      name: 'Michel',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/michel.jpeg',
    },

    {
      name: 'Uche',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/uche.jpeg',
    },
    {
      name: 'Avengers',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/meet-the-team.jpeg',
    },
    {
      name: 'Quad',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/quad.jpeg',
    },
    {
      name: 'Duo',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/duo.jpeg',
    },
    {
      name: ' Leaders',
     
      description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
      img: '../../assets/img/the-girls.jpeg',
    }
  ];

  
galleries=[
  {
    name: 'Campus',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/free-time-students-bachelor-s-campus-life-rhythm-five-friendly-students-are-walking.jpg'
  },
  {
    name: 'Our work',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/rear-view-programmer-working-all-night-long.jpg',
  },
  {
    name: 'Seven',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/seven-graphic.jpg',
  },
  {
    name: 'Lorem',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/WhatsApp Image 2021-06-18 at 15.25.39.jpeg',
  },
  {
    name: 'Graduate',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/medium-shot-people-graduating.jpg',
  },
  {
    name: 'Seven',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/building.jpg',
  },
  {
    name: 'Class Room',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/estelle.jpg',
  },
  {
    name: 'conference',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/conference.jpg',
  },
  {
    name: 'Goofy',
   
    description: 'Lorem lorem korem ipsum iusom lorkem ladofjnejnrke',
    img: '../../assets/img/goofy.jpeg',
  }
]
  // function that takes in an anchor as a string and scrolls to the anchor
  scrollFunction(anchor: string) {
    this.vps.scrollToAnchor(anchor);
  }
}
