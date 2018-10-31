import { Component } from '@angular/core';
import AWSMqtt from 'aws-mqtt-client';
import awsIot from 'aws-iot-device-sdk';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  awsKeys: {};
  mqttClient: any;
  iotTopic = 'TEST'
  messages: any[] = [];
  singleMessage: string;


  constructor(
    private appService: AppService
  ){}

  retrieveKeys() {
    this.appService.getKeys().subscribe((keys) => {
      this.awsKeys = keys;
      
      this.mqttClient = awsIot.device({
          region: keys.region,
          protocol: 'wss',
          accessKeyId: keys.accessKey,
          secretKey: keys.secretKey,
          sessionToken: keys.sessionToken,
          port: 443,
          host: keys.iotEndpoint
      });
      this.mqttClient .on('connect', this.onConnect);
      this.mqttClient .on('message', this.onMessage);            
      this.mqttClient .on('error', this.onError);
      this.mqttClient .on('reconnect', this.onReconnect);
      this.mqttClient .on('offline', this.onOffline);
      this.mqttClient .on('close', this.onClose);
    })
  }

  onConnect = () => {
    this.mqttClient.subscribe(this.iotTopic);
    this.messages.push('Connected');
  };

  onMessage = (topic, message) => {
    this.messages.push(message);
  };

  onError = () => {};
  onReconnect = () => {};
  onOffline = () => {};

  onClose = () => {
    this.messages.push('Connection failed');
  };

  sendMessage() {
    this.mqttClient.publish(this.iotTopic, this.singleMessage);
    this.singleMessage = null;
  }
}
