import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/data-types/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    messages: Message[] = [];
    currentMessage: Message = {
        user: 'Misha',
        text: ''
    };

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
        this.chatService.receiveMessage.subscribe((message: Message) => {
            if (message)
                this.messages.push(message);
        });
    }

    sendMessage() {
        this.chatService.connection
            .invoke('SendMessage', this.currentMessage)
            .then(() => {
                this.currentMessage.text = '';
            })
            .catch((error) => {
                console.log(`SignalrDemoHub.SimulateDataProcessing() error: ${error}`);
                alert('SignalrDemoHub.SimulateDataProcessing() error!, see console for details.');
            });
    }

}
