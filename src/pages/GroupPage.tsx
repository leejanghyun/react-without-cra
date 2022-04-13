import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import SendBirdCall from 'sendbird-calls'; // [test]
import { drawMediaToCanvas, donwload, record } from '@/pages/sendbirdInterface';
import { initCallAuth, createRoom } from '@/pages/netmarbleCalls';

const GroupPage = () => {
  const authOption = { userId: 'leejangheon', accessToken: '669081f2b666d67fbb0dc356cca7966c97e6e385' };
  const guestRecordedChunks = [];
  const localCanvas = useRef<HTMLCanvasElement>(null);
  const remoteCanvas = useRef<HTMLCanvasElement>(null);
  const localMediaView = useRef<HTMLVideoElement>(null);
  const remoteMediaView = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function exexuteInitCallAuth() {
      await initCallAuth(
        { appId: 'E2CEFB84-A3CF-420D-A334-FBE688060AE9', ...authOption },
        { audio: true, video: true }
      );
      dial();
    }
    exexuteInitCallAuth();
  }, []);

  const dial = async () => {
    const room = await createRoom(SendBirdCall.RoomType.SMALL_ROOM_FOR_VIDEO);

    if (!room) {
      return;
    }

    alert(room.roomId);
    console.log(room.roomId);

    const exit = (e) => {
      if (e.offsetX >= 20 && e.offsetX <= 100 && e.offsetY >= 260 && e.offsetY <= 350) {
        room?.exit();
      }
    };
    ((localCanvas as any).current as HTMLCanvasElement).addEventListener('click', exit, false);

    const enterParams = {
      videoEnabled: true,
      audioEnabled: true,
    };

    // 상담원 방 입장
    room.enter(enterParams).then(async () => {
      const localMedia = localMediaView.current as HTMLMediaElement;
      const localCvs = localCanvas.current as HTMLCanvasElement;

      await room.localParticipant.setMediaView(localMedia);

      localMedia.addEventListener('play', () => {
        drawMediaToCanvas(localMedia, localCvs, 0, 0, 450, 450, '상담원🥰');
      });
    });
    // 사용자 입장
    room.on('remoteParticipantEntered', async (remoteParticipant) => {
      const remoteMedia = remoteMediaView.current as HTMLMediaElement;

      await remoteParticipant.setMediaView(remoteMedia);

      remoteMedia.addEventListener('play', () => {
        const localMedia = localMediaView.current as HTMLMediaElement;
        const remoteCvs = remoteCanvas.current as HTMLCanvasElement;
        const localCvs = localCanvas.current as HTMLCanvasElement;
        drawMediaToCanvas(remoteMedia, remoteCvs, 0, 0, 450, 450, '고객💊');
        drawMediaToCanvas(localMedia, remoteCvs, 300, 0, 150, 150);
        drawMediaToCanvas(remoteMedia, localCvs, 300, 0, 150, 150);
        record(remoteMedia, remoteCvs, guestRecordedChunks);
      });
    });
  };
  return (
    <Overlay>
      <div>
        group page
        <button onClick={() => donwload(guestRecordedChunks)}>고객 녹음 기록</button>
      </div>
      <video ref={localMediaView} height="100" width="100" id="local_video_element_id" autoPlay muted></video>
      <video ref={remoteMediaView} height="100" width="100" id="remote_video_element_id" autoPlay loop></video>
      <canvas ref={localCanvas} id="local_canvas_element_id" width="450" height="450"></canvas>
      <canvas ref={remoteCanvas} id="remote_canvas_element_id" width="450" height="450"></canvas>
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

export default GroupPage;
