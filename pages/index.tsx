import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";


export default function Home() {

const [Q, setQ] = useState("");
const [T, setT] = useState("");
const [H, setH] = useState("");

  // mqttを使用するための定義
var mqtt = require('mqtt');
const client  = mqtt.connect('ws://10.10.0.50:9001')

// MQTTブローカーへ接続成功時
client.on('connect', function(){
		console.log('subscriber.connected.');
});

// subscribe設定
var topic_test = 'hdc1000/sencer';
client.subscribe(topic_test);

// MQTTブローカーからメッセージを受信した際
client.on('message', function(topic:string, message:string){
  let str_message = message.toString()
  // setQ(str_message)
  setT(str_message.slice(0, 4))
  for(let i=0;i<str_message.length;i++){
    if(str_message[i] === ","){
      setH(str_message.slice(i+1,i+5))
    }
  };
  // setH(message.toString().slice(17,22))
	console.log('subscriber.on.message', 'topic:', topic, 'message:', str_message);
});

  return (
    <div>
      <Head>
        <title>InfoFlowシステム-デバイス表示</title>
        <meta name="description" content="ホームページ概要"></meta>
      </Head>
      <h2>温度:{T}度</h2>
      <h2>湿度:{H}%</h2>
    </div>
  )
}


