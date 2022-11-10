import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";

import { Connector } from 'mqtt-react-hooks';
// import Status from './status';


export default function Home() {

const [T, setT] = useState("");
  // mqttを使用するための定義
var mqtt = require('mqtt');
const client  = mqtt.connect('ws://10.10.0.50:9001')
// MQTTブローカーの設定
// var client = mqtt.connect({
// 	host: '10.10.0.50',
// 	port: 9001
// });

// MQTTブローカーへ接続成功時
client.on('connect', function(){
		console.log('subscriber.connected.');
});

// subscribe設定
var topic_test = 'hdc1000/sencer';
client.subscribe(topic_test);

// MQTTブローカーからメッセージを受信した際
client.on('message', function(topic:string, message:string){
  setT(message.toString())
	console.log('aaasubscriber.on.message', 'topic:', topic, 'message:', message.toString());
});

  return (

    // <Connector brokerUrl="ws://10.10.0.50:9001">
    //   <Status />
    // </Connector>
    <div>
      <Head>
        <title>ホームページタイトル</title>
        <meta name="description" content="ホームページ概要"></meta>
      </Head>
      <h1>ホームページタイトル</h1>
      <h2>{T}</h2>
    </div>
  )
}
