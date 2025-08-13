import React, { useRef, useEffect, useState } from "react";
import BasicEditingTools from "./BasicEditingTools";

export default function ManualEditorCanvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [imageData, setImageData] = useState(null);

  // Load contoh gambar ke canvas saat mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    const img = new Image();
    img.crossOrigin = "anonymous"; // jika pakai gambar dari luar
    img.src = "https://picsum.photos/600/400"; // contoh gambar random
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      setImageData(imgData);
    };
  }, []);

  // Fungsi apply efek brightness sebagai contoh
  const applyBrightness = (value) => {
    if (!ctx || !imageData) return;
    const imgCopy = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    BasicEditingTools.adjust.brightness(ctx, imgCopy, value);
  };

  // Contoh fungsi rotate 90 derajat
  const rotate90 = () => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    BasicEditingTools.rotateFlip.rotate90(ctx, canvas);
    // Update imageData setelah rotate
    const newImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setImageData(newImgData);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black", maxWidth: "100%" }} />
      <div style={{ marginTop: 10 }}>
        <label>
          Brightness: 
          <input
            type="range"
            min={-100}
            max={100}
            defaultValue={0}
            onChange={(e) => applyBrightness(parseInt(e.target.value))}
          />
        </label>
        <button onClick={rotate90} style={{ marginLeft: 10 }}>
          Rotate 90°
        </button>
      </div>
    </div>
  );
    }
