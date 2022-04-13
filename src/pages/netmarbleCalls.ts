import SendBirdCall, {
  AuthOption,
  connectWebSocket,
  authenticate,
  init,
  useMedia,
  Room,
  RoomType,
  fetchRoomById,
} from 'sendbird-calls';

interface AuthOptions extends AuthOption {
  appId: string;
}

interface DeviceOptions {
  audio: boolean;
  video: boolean;
}

type HTMLVideoElement = any;

/**
 * SendBird API 권한 설정
 */
export const initCallAuth = async (authOptions: AuthOptions, deviceOptions: DeviceOptions): Promise<Boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { appId, userId, accessToken } = authOptions;
      const { audio, video } = deviceOptions;

      init(appId); // SendBird AppId 초기화
      useMedia({ audio, video }); // 디바이스 설정

      // webSocket 연결
      await authenticate({ userId, accessToken });
      await connectWebSocket();

      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
};

export const enterRoom = async () => {};

/**
 * 방 만들기
 */
export const createRoom = async (roomType: RoomType, fetch: boolean = false): Promise<Room | null> => {
  return new Promise(async (resolve, reject) => {
    let room = await SendBirdCall.createRoom({ roomType });
    const roomId = room?.roomId;

    if (!room) {
      reject(null);
    }

    if (fetch) {
      room = await fetchRoomById(roomId);
    }

    resolve(room);
  });
};

/**
 * Record 시작
 */
export const startRecord = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  recordedChunks: Blob[],
  fps: number = 60
) => {
  const videoStream = canvas.captureStream(fps);
  const audioTrack = (video as HTMLVideoElement).captureStream(fps).getAudioTracks()[0];
  videoStream.addTrack(audioTrack);

  const mediaRecorder = new MediaRecorder(videoStream, {
    mimeType: 'video/webm; codecs=vp9',
  });

  mediaRecorder.start(100);

  mediaRecorder.ondataavailable = function (event) {
    recordedChunks.push(event.data);
  };
};
