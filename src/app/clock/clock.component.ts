import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  clock;
  date;

  constructor() { }

  ngOnInit() {
  //setInterval(this.setTime,1000)
   this.setTime();
   this.setDate();

  }
  
  setTime() {
   this.clock=Date.now();
   setInterval(()=>{
    this.clock=Date.now();
   },1000)
  }
  setDate(){
    this.date=new Date();
  }
}
