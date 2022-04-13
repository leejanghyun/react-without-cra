import React, { useState } from 'react';
import styled from '@emotion/styled';
import SendBirdCall from 'sendbird-calls'; // [test]
import { useSearchParams } from 'react-router-dom';
import { getSendBirdAuth, drawMediaToCanvas, donwload, record } from '@/pages/sendbirdInterface';

const GroupGuestPage = () => {
  const APP_ID = 'E2CEFB84-A3CF-420D-A334-FBE688060AE9';
  SendBirdCall.init(APP_ID);
  SendBirdCall.useMedia({ audio: true, video: true });
  const USER_ID = 'leejangheon';
  const ACCESS_TOKEN = '669081f2b666d67fbb0dc356cca7966c97e6e385';
  const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };
  const [searchParams, setSearchParams] = useSearchParams();
  const ROOM_ID = searchParams.get('roomid') || '';
  let currentRoom: SendBirdCall.Room | null = null;
  let guestRecordedChunks = [];
  let managerRecordedChunks = [];

  const dial = async () => {
    SendBirdCall.fetchRoomById(ROOM_ID)
      .then(async (room) => {
        let localMediaView = document.getElementById('local_video_element_id') as HTMLMediaElement;
        let remoteMediaView = document.getElementById('remote_video_element_id') as HTMLMediaElement;
        const localCanvas = document.getElementById('local_canvas_element_id') as HTMLCanvasElement;
        const remoteCanvas = document.getElementById('remote_canvas_element_id') as HTMLCanvasElement;
        currentRoom = room;

        const exit = (e) => {
          if (e.offsetX >= 20 && e.offsetX <= 100 && e.offsetY >= 260 && e.offsetY <= 350) {
            currentRoom?.exit();
          }
        };
        localCanvas.addEventListener('click', exit, false);
        remoteCanvas.addEventListener('click', exit, false);

        // 사용자 방 입장
        await room.enter({
          videoEnabled: true,
          audioEnabled: true,
        });
        await room.localParticipant.setMediaView(localMediaView);

        localMediaView.addEventListener('play', () => {
          //record(localMediaView, localCanvas, guestRecordedChunks);
          drawMediaToCanvas(localMediaView, localCanvas, 0, 0, 450, 450, '고객💊'); // [local canvas]
        });

        // 상담원 방 입장
        room.on('remoteParticipantStreamStarted', async (remoteParticipant) => {
          await remoteParticipant.setMediaView(remoteMediaView);

          record(remoteMediaView, remoteCanvas, managerRecordedChunks);
          drawMediaToCanvas(remoteMediaView, remoteCanvas, 0, 0, 450, 450, '상담원🥰'); // [remote canvas]
          drawMediaToCanvas(localMediaView as HTMLMediaElement, remoteCanvas, 300, 0, 150, 150); // [remote canvas]
          drawMediaToCanvas(remoteMediaView, localCanvas, 300, 0, 150, 150); // [local canvas]
        });
      })
      .catch((e) => {});
  };

  getSendBirdAuth(authOption, dial);
  return (
    <Overlay>
      <div>
        guest page
        <button onClick={() => donwload(managerRecordedChunks)}>상담원 녹음 기록</button>
      </div>
      <video height="100" width="100" id="local_video_element_id" autoPlay loop muted></video>
      <video height="100" width="100" id="remote_video_element_id" autoPlay loop></video>
      <canvas id="local_canvas_element_id" width="450" height="450"></canvas>
      <canvas id="remote_canvas_element_id" width="450" height="450"></canvas>
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

  #local_video_element_id {
    visibility: hidden;
    position: absolute;
  }
  #remote_video_element_id {
    visibility: hidden;
    position: absolute;
    left: 200px;
    top: 500px;
  }
`;

export default GroupGuestPage;
