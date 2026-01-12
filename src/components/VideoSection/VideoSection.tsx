import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, videoActions } from '../../store';
import './VideoSection.scss'

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
}: VideoSectionProps) {
  const agentVideoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const cameraAvailable = useAppSelector((state) => state.video.cameraAvailable);
  const showCamera = useAppSelector((state) => state.ui.showCamera);

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
          dispatch(videoActions.setCameraAvailable(true));

          if (onCameraReady) {
            onCameraReady(stream);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error accessing camera:', error);
          dispatch(videoActions.setCameraAvailable(false));
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
  }, [onCameraReady, dispatch]);

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
            {showCamera && (
              <video
                ref={agentVideoRef}
                className={`video-element ${cameraAvailable ? 'video-visible' : 'video-hidden'}`}
                autoPlay
                muted
                playsInline
              />
            )}
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
