import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { MessageService } from './messageService';

@Component({
  selector: 'hw-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.css']
})
export class AlertButtonComponent implements OnInit {

  content!: Observable<any>;
  sub!: Subscription;
  hideContent: boolean = true;
  severity: number = 423;

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.sub = this.msgService.getMessage().subscribe({
      next: data => {
        this.content = data.body
        console.log('this.content: ', this.content)
      }
    });
    
  }

  toggle(): void {
    this.hideContent = !this.hideContent;
  }

  toggleAsync(): void {
    timer(500).subscribe(() => {
      this.toggle()
    })
  }

}
