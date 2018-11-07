import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('showWords') showWords;
  @ViewChild('typedWords') typedWords;
  @ViewChild('time') time;
  @ViewChild('mistakes') mistakes;
  @ViewChild('name') name;
  startTime;
  testResults = localStorage.getItem('results') !== null ? JSON.parse(localStorage.getItem('results')) : {};
  greskeNiz=[];
  words = {
    english: ["if you can correctly and quickly type this perplexing sentence you are one superb typist"],
    serbian: ["Jesen u mom sokaku lisce pada na sve strane ona stoji na prozoru sama ceka mene dok ne svane dan"]
  }
  constructor() { }

  ngOnInit() {


  }

  startTyping(selectList) {
    if (selectList.value === "english") {
      this.showWords.nativeElement.value = this.words.english;
    }
    if (selectList.value === "serbian") {
      this.showWords.nativeElement.value = this.words.serbian;
    }
    this.timeChecker()
    let start = new Date();
    this.startTime = start.getTime();
    this.typedWords.nativeElement.focus();
  }
  timeChecker() {
    let timeCount = this.time.nativeElement.value,
      interval = setInterval(() => {
        timeCount--;
        this.time.nativeElement.value = timeCount;
        if (this.showWords.nativeElement.value === this.typedWords.nativeElement.value) {
          clearInterval(interval);
          this.results();
          location.reload();
        }
        if (timeCount === 0 || this.showWords.nativeElement.value.length == this.typedWords.nativeElement.value.length) {
          clearInterval(interval);
          if (this.showWords.nativeElement.value !== this.typedWords.nativeElement.value) {
            for (let index = 0; index < this.typedWords.nativeElement.value.split(/\s+/).length; index++) {
             if (this.typedWords.nativeElement.value.split(/\s+/)[index]!==this.showWords.nativeElement.value.split(/\s+/)[index]) {
               this.greskeNiz.push(this.typedWords.nativeElement.value.split(/\s+/)[index])
               this.mistakes.nativeElement.value=this.greskeNiz.length
               this.results();
             }
              
            }
           }
        }
      }, 1000)
  }
  results() {
    let word = this.typedWords.nativeElement.value.split(/\s+/).length,
      mistakes = this.mistakes.nativeElement.value,
      name = this.name.nativeElement.value,
      time = new Date,
      endTime = time.getTime(),
      totalTime = Math.round((endTime - this.startTime) / 1000),
      speed = Math.round((word / totalTime) * 60);
    let results = {
      name: name,
      wordsNum: word,
      totalTime: totalTime,
      speed: speed,
      mistakes: mistakes
    }
    this.testResults[name + this.startTime] = results;
    localStorage.setItem("results", JSON.stringify(this.testResults));
    this.typedWords.nativeElement.setAttribute('disabled', 'disabled')
  }
  checkTypingMistakes() {

    if (this.typedWords.nativeElement.value == this.showWords.nativeElement.value.substr(0, this.typedWords.nativeElement.value.length)) {
      this.mistakes.nativeElement.value = 0
    } 

  }

}
