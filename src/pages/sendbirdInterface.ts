import SendBirdCall from 'sendbird-calls'; // [test]
import { util } from 'webpack';

export const getSendBirdAuth = (authOption, callBack) => {
  SendBirdCall.authenticate(authOption, (result, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      // connent websocket
      SendBirdCall.connectWebSocket()
        .then(callBack)
        .catch((error) => console.log(error));
    }
  });
};

const makeCircle = (context) => {
  context.beginPath();
  context.fillStyle = 'yellow';
  context.strokeStyle = 'black';
  context.font = '15px Georgia';
  context.lineWidth = 5;
  context.arc(50, 300, 30, 0, 2 * Math.PI, false);
  context.fill();
  context.beginPath();
  context.fillStyle = 'red';
  context.fillText('나가기', 30, 305);
  context.fill();
};

export const drawMediaToCanvas = (
  mediaView: HTMLMediaElement,
  target: HTMLCanvasElement,
  x: number,
  y: number,
  w: number,
  h: number,
  text?: string
) => {
  const ctx = target.getContext('2d');

  if (!ctx) {
    return;
  }

  const step = () => {
    ctx.drawImage(mediaView as CanvasImageSource, x, y, w, h);
    if (text) {
      ctx.font = '28px serif';
      ctx.fillText(text, 140, 50);
    }
    makeCircle(ctx);

    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return mediaView;
};

export const donwload = (recordedChunks) => {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm',
  });
  const url = URL.createObjectURL(blob);
  alert(url);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'test.webm';
  a.click();
  window.URL.revokeObjectURL(url);
};

export const record = (video: HTMLMediaElement, canvas: HTMLCanvasElement, recordedChunks: any[]) => {
  const vStream = canvas.captureStream(1);
  const aStream = (video as any).captureStream(1).getAudioTracks()[0];
  vStream.addTrack(aStream);
  const mediaRecorder = new MediaRecorder(vStream, {
    mimeType: 'video/webm; codecs=vp9',
  });
  mediaRecorder.start(100);

  mediaRecorder.ondataavailable = function (event) {
    recordedChunks.push(event.data);
  };
};
