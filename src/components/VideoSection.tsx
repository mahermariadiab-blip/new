import { useEffect, useRef, useState } from 'react';

interface VideoSectionProps {
  agentVideoUrl?: string;
  customerVideoUrl?: string;
  avatarVideoUrl?: string;
  onCameraReady?: (stream: MediaStream) => void;
  showCamera?: boolean;
}

export function VideoSection({
  agentVideoUrl,
  customerVideoUrl,
  avatarVideoUrl,
  onCameraReady,
  showCamera = true,
}: VideoSectionProps) {
  const agentVideoRef = useRef<HTMLVideoElement>(null);
  const customerVideoRef = useRef<HTMLVideoElement>(null);
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [cameraInitialized, setCameraInitialized] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isMounted = true;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (isMounted && agentVideoRef.current) {
          agentVideoRef.current.srcObject = stream;
          setCameraAvailable(true);
          setCameraInitialized(true);

          if (onCameraReady) {
            onCameraReady(stream);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error accessing camera:', error);
          setCameraAvailable(false);
          setCameraInitialized(true);
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onCameraReady]);

  return (
    <div className="video-section">
      <div className="video-overlay">
        {agentVideoUrl ? (
          <video
            src={agentVideoUrl}
            className="video-element"
            autoPlay
            muted
          />
        ) : (
          <>
            <video
              ref={agentVideoRef}
              className={`video-element ${cameraAvailable ? 'video-visible' : 'video-hidden'}`}
              autoPlay
              muted
              playsInline
            />
            {!cameraAvailable && (
              <img
                src="https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Agent video feed"
                className="video-element"
              />
            )}
          </>
        )}
      </div>

      <div className="video-thumbnails">
        <div className="video-thumbnail">
          {customerVideoUrl ? (
            <video
              src={customerVideoUrl}
              className="video-element"
              autoPlay
              muted
            />
          ) : (
            <img
              src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Customer video feed"
              className="video-element"
            />
          )}
        </div>

        <div className="video-thumbnail avatar">
          {avatarVideoUrl ? (
            <video
              src={avatarVideoUrl}
              className="video-element"
              autoPlay
              muted
            />
          ) : (
            <img
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Avatar video feed"
              className="video-element"
            />
          )}
        </div>
      </div>
    </div>
  );
}
