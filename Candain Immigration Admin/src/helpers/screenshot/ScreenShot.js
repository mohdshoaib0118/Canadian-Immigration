import { useState } from 'react';
import html2canvas from 'html2canvas';
import styled, { keyframes } from 'styled-components';
import shutterSound from './camera-shutter-6305.mp3'; // Import the sound file
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Define keyframe for shutter animation
const shutterAnimation = keyframes`
0% {
    transform: scaleX(1);
}
50% {
    transform: scaleX(0);
}
100% {
    transform: scaleX(1);
}
`;

// Styled component for the screenshot icon with animation
const ScreenshotIcon = styled.div`
    position: relative;
    &.shutter-animation {
        animation: ${shutterAnimation} 0.2s ease-out forwards;
    }
`;

const ScreenshotButton = ({ color, height }) => {
    const [capturing, setCapturing] = useState(false);

    const shutterAudio = new Audio(shutterSound); // Create an audio object

    const takeScreenshot = () => {
        setCapturing(true); // Set capturing state to true

        // Play the shutter sound
        shutterAudio.currentTime = 0; // Reset audio to the beginning
        shutterAudio.play();

        const body = document.body;
        const html = document.documentElement;

        const width = Math.max(
            body.scrollWidth,
            body.offsetWidth,
            html.clientWidth,
            html.scrollWidth,
            html.offsetWidth
        );
        const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        const currentPageURL = window.location.href;
        const currentPageName = currentPageURL
            .substring(currentPageURL.lastIndexOf('/') + 1)
            .replace(/\b\w/g, (c) => c.toUpperCase());

        html2canvas(document.body, { width, height }).then((canvas) => {
            const screenshot = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = screenshot;
            link.download = `${currentPageName}_screenshot.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setCapturing(false);
        });
    };

    return (
        <ScreenshotIcon className={capturing ? 'shutter-animation' : ''}>
            <OverlayTrigger placement="left" overlay={<Tooltip id="overlay-example">Full Screen</Tooltip>}>
                <i className={`mdi mdi-fullscreen ${color} ${height}`} onClick={takeScreenshot}></i>
            </OverlayTrigger>
            <audio>
                <source src={shutterSound} type="audio/mpeg" />
            </audio>
        </ScreenshotIcon>
    );
};

export default ScreenshotButton;

