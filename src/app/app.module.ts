import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ChatService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: ChatService) => () => signalrService.initiateSignalrConnection(),
      deps: [ChatService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
