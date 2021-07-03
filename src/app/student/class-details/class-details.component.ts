import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from '../../shared/services/class.service';
import { Class } from '../../shared/interfaces/class';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  singleClass!: Class;

  constructor(private route: ActivatedRoute,
    private router: Router, public classService:ClassService) { }

  ngOnInit(): void {
    this.getClass();
  }

  getClass() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).then((doc) => {
      this.singleClass = doc.data();
      console.log(this.singleClass);
    })
  }

}


