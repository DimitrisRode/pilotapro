import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { AGORA_CONFIG } from '../config/agora';

export default function VideoPlayer({ playerId }: { playerId: string }) {
  const player = useGameStore(state => state.players.find(p => p.id === playerId));
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!AGORA_CONFIG.appId || !player?.videoEnabled || !videoElement) return;

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    let mounted = true;

    const initializeAgora = async () => {
      try {
        await client.join(AGORA_CONFIG.appId, AGORA_CONFIG.channel, null, playerId);
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        
        if (!mounted) {
          await audioTrack.close();
          await videoTrack.close();
          return;
        }

        await client.publish([audioTrack, videoTrack]);
        videoTrack.play(videoElement);
        setLocalTracks([audioTrack, videoTrack]);
      } catch (error) {
        console.error('Error initializing Agora:', error);
      }
    };

    initializeAgora();

    return () => {
      mounted = false;
      if (localTracks) {
        localTracks[0].close();
        localTracks[1].close();
      }
      client.leave();
    };
  }, [player?.videoEnabled, playerId, videoElement]);

  if (!player?.videoEnabled) return null;

  return (
    <div 
      ref={setVideoElement}
      className="w-32 h-24 rounded-lg overflow-hidden bg-gray-900"
    />
  );
}