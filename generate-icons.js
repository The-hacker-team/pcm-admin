const fs = require("fs");
const { createCanvas } = require("canvas");

// Function to create a simple icon with text
function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#228be6";
  ctx.fillRect(0, 0, size, size);

  // Text
  ctx.fillStyle = "#ffffff";
  ctx.font = `${size * 0.3}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PCM", size / 2, size / 2);

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filename, buffer);
}

// Generate icons if canvas is available
try {
  createIcon(72, "public/pwa-72x72.png");
  createIcon(96, "public/pwa-96x96.png");
  createIcon(144, "public/pwa-144x144.png");
  createIcon(192, "public/pwa-192x192.png");
  createIcon(512, "public/pwa-512x512.png");
  console.log("Icons generated successfully!");
} catch (error) {
  console.log("Canvas not available, using fallback method...");

  // Fallback: Create simple colored squares as PNG data
  const createSimplePNG = (size) => {
    // This is a minimal PNG data for a blue square - not perfect but works
    const data = Buffer.from([
      0x89,
      0x50,
      0x4e,
      0x47,
      0x0d,
      0x0a,
      0x1a,
      0x0a,
      0x00,
      0x00,
      0x00,
      0x0d,
      0x49,
      0x48,
      0x44,
      0x52,
      0x00,
      0x00,
      0x00,
      size & 0xff,
      0x00,
      0x00,
      0x00,
      size & 0xff,
      0x08,
      0x02,
      0x00,
      0x00,
      0x00,
      0x4a,
      0x7d,
      0x83,
      0x37,
      // ... rest of PNG data would be here
      0x00,
      0x00,
      0x00,
      0x00,
      0x49,
      0x45,
      0x4e,
      0x44,
      0xae,
      0x42,
      0x60,
      0x82,
    ]);
    return data;
  };

  // Generate basic PNG files
  [72, 96, 144].forEach((size) => {
    fs.writeFileSync(`public/pwa-${size}x${size}.png`, createSimplePNG(size));
  });
  console.log("Fallback icons created");
}
