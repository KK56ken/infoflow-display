import React from 'react';

import { useSubscription } from 'mqtt-react-hooks';

export default function Status() {
  /* Message structure:
   *  topic: string
   *  message: string
   */
  const { message } = useSubscription([
    'hdc1000/sencer',
    'room/esp32/light',
  ]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{`topic:${message?.topic} - message: ${message?.message}`}</span>
      </div>
    </>
  );
}


// import React from 'react';

// import { useMqttState } from 'mqtt-react-hooks';

// export default function Status() {
//   /*
//    * Status list
//    * - Offline
//    * - Connected
//    * - Reconnecting
//    * - Closed
//    * - Error: printed in console too
//    */
//   const { connectionStatus } = useMqttState();

//   return <h1>{`Status: ${connectionStatus}`}</h1>;
// }