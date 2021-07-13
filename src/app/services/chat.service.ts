import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../data-types/message';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    connection: HubConnection;
    receiveMessage: BehaviorSubject<Message>;

    constructor() {
        this.receiveMessage = new BehaviorSubject<Message>(null);
    }

    public initiateSignalrConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection = new HubConnectionBuilder()
                .withUrl('http://localhost:6727/chathub')
                .build();

            this.setSignalrClientMethods();

            this.connection
                .start()
                .then(() => {
                    console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
                    resolve();
                })
                .catch((error) => {
                    console.log(`SignalR connection error: ${error}`);
                    reject();
                });
        });
    }

    private setSignalrClientMethods(): void {
        this.connection.on('ReceiveMessage', (message: Message) => {
            this.receiveMessage.next(message);
        })
    }
}
