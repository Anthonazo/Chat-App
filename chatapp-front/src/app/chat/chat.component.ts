import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'; // Import the 'io' function from 'socket.io-client' package

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket: any;
  messages: string[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    // Conectar al servidor Socket.IO
    this.socket = io('http://localhost:3000');

    // Escuchar mensajes del servidor
    this.socket.on('message', (data: any) => {
      this.messages.push(data.message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.socket.emit('message', this.newMessage);
      this.newMessage = '';
    }
  }
}
