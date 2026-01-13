import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, videoActions } from '../../store';
import Agent from '../../assets/images/Agent.png';
import Avatar from '../../assets/images/Avatar.png';
import './VideoSection.scss';

interface VideoSectionProps {
  agentVideoUrl?: string;
  customerVideoUrl?: string;
  avatarVideoUrl?: string;
  onCameraReady?: (stream: MediaStream) => void;
  showCamera?: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  agentVideoUrl,
  customerVideoUrl,
  avatarVideoUrl,
  onCameraReady,
}) => {
  const customerVideoRef = useRef<HTMLVideoElement>(null);
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

        if (isMounted && customerVideoRef.current) {
          customerVideoRef.current.srcObject = stream;
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
          <img
            src={Agent}
            alt="Agent video feed"
            className="video-element"
          />
        )}
      </div>

      <div className="video-thumbnails">
        <div className="video-thumbnail">
          {showCamera ? (
            <video
              src={customerVideoUrl}
              className={`video-element ${cameraAvailable ? 'video-visible' : 'video-hidden'
                }`}
              ref={customerVideoRef}
              autoPlay
              muted
            />
          ) : (
            <img
              src={""}
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
              src={Avatar}
              alt="Avatar video feed"
              className="video-element"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;