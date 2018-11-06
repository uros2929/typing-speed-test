import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  results=Object.keys(localStorage.getItem('results') !== null ? JSON.parse(localStorage.getItem('results')) : {});
  name;
  words;
  totalTime;
  speed;
  mistakes;
  constructor() { }

  ngOnInit() {
 
  }
  showResults(event){
    document.getElementById('showResults').style.display="block";
  let fromLocal=JSON.parse(localStorage.getItem('results'))[event.target.id];
  this.name=fromLocal.name;
  this.words=fromLocal.wordsNum;
  this.totalTime=fromLocal.totalTime;
  this.speed=fromLocal.speed;
  this.mistakes=fromLocal.mistakes;
  }
  exitShowResults(){
    document.getElementById('showResults').style.display="none";
  }

}
