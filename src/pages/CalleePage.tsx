import React, { useState } from 'react';
import styled from '@emotion/styled';
import SendBirdCall from 'sendbird-calls'; // [test
import { DirectCallRecordOption, RecordingType } from 'sendbird-calls';

const CalleePage = () => {
  const APP_ID = 'E2CEFB84-A3CF-420D-A334-FBE688060AE9';
  SendBirdCall.init(APP_ID);
  SendBirdCall.useMedia({ audio: true, video: true });
  const USER_ID = 'robot';
  const ACCESS_TOKEN = '80280771ce7f6ec4b01a2fb548ebcb6254453a6f';
  const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };

  const recv = function () {
    SendBirdCall.addListener('unique_id', {
      onRinging: (call) => {
        const TARGET_ID = 'leejangheon';
        const acceptParams = {
          userId: TARGET_ID,
          callOption: {
            localMediaView: document.getElementById('local_video_element_id') as HTMLMediaElement,
            remoteMediaView: document.getElementById('remote_video_element_id') as HTMLMediaElement,
            audioEnabled: true,
            videoEnabled: true,
          },
        };

        call.accept(acceptParams);
      },
    });
  };

  SendBirdCall.authenticate(authOption, (result, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      // connent websocket
      SendBirdCall.connectWebSocket()
        .then(recv)
        .catch((error) => console.log(error));
    }
  });
  return (
    <Overlay>
      <div>callee</div>
      <video id="local_video_element_id" autoPlay muted loop></video>
      <video id="remote_video_element_id" autoPlay muted loop></video>
    </Overlay>
  );
};
const Overlay = styled.div`
  position: fixed;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */

  video {
    width: 100%;
    display: block;
  }
`;

export default CalleePage;
