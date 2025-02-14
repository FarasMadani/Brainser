import React, { useEffect, useRef } from "react";

const MicrophoneVisualizer = () => {
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");

        const handleSuccess = (stream) => {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            source.connect(analyserRef.current);

            const draw = () => {
                animationFrameIdRef.current = requestAnimationFrame(draw);

                analyserRef.current.getByteFrequencyData(dataArrayRef.current);

                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArrayRef.current[i];

                    canvasCtx.fillStyle = "rgb(0, 0, 0)";
                    canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                    x += barWidth + 1;
                }
            };

            draw();
        };

        navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);

        return () => {
            cancelAnimationFrame(animationFrameIdRef.current);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return <canvas ref={canvasRef} width="300" height="100" />;
};

export default MicrophoneVisualizer;
