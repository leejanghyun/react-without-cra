import React, { useState } from 'react';
import styled from '@emotion/styled';
import SendBirdCall from 'sendbird-calls'; // [test]
import { DirectCallRecordOption, RecordingType } from 'sendbird-calls';

const CallerPage = () => {
  const APP_ID = 'E2CEFB84-A3CF-420D-A334-FBE688060AE9';
  SendBirdCall.init(APP_ID);
  SendBirdCall.useMedia({ audio: true, video: true });
  const USER_ID = 'leejangheon';
  const ACCESS_TOKEN = '669081f2b666d67fbb0dc356cca7966c97e6e385';
  const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };

  const dial = function () {
    const TARGET_ID = 'robot';
    const dialParams = {
      userId: TARGET_ID,
      isVideoCall: true,
      callOption: {
        localMediaView: document.getElementById('local_video_element_id') as HTMLMediaElement,
        remoteMediaView: document.getElementById('remote_video_element_id') as HTMLMediaElement,
        audioEnabled: true,
        videoEnabled: true,
      },
    };

    const call = SendBirdCall.dial(dialParams, (call, error) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log('success');
    });

    call.onEstablished = (call) => {
      console.log('onEstablished');
    };

    call.onConnected = (call) => {
      console.log('onConnected');
    };

    call.onEnded = (call) => {
      console.log('onEnded');
    };

    call.onRemoteAudioSettingsChanged = (call) => {
      console.log('onRemoteAudioSettingsChanged');
    };

    call.onRemoteVideoSettingsChanged = (call) => {
      console.log('onRemoteVideoSettingsChanged');
    };
  };

  SendBirdCall.authenticate(authOption, (result, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      // connent websocket
      SendBirdCall.connectWebSocket()
        .then(dial)
        .catch((error) => console.log(error));
    }
  });
  return (
    <Overlay>
      <div>caller</div>;<video id="local_video_element_id" autoPlay muted loop></video>
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

export default CallerPage;
