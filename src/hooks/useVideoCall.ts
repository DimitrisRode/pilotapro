import { useEffect, useState } from 'react';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { useGameStore } from '../store/gameStore';

export function useVideoCall(playerId: string) {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const toggleVideo = useGameStore(state => state.toggleVideo);

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(agoraClient);

    return () => {
      agoraClient.leave();
    };
  }, []);

  const handleToggleVideo = async () => {
    toggleVideo(playerId);
  };

  return {
    client,
    handleToggleVideo
  };
}