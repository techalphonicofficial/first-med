import { io } from "socket.io-client";

export function createMockTrackingSocket(onUpdate) {
  let progress = 32;
  const timer = setInterval(() => {
    progress = Math.min(100, progress + 8);
    onUpdate({ lat: 28.6139 + progress / 10000, lng: 77.209 + progress / 12000, progress, eta: `${Math.max(4, 24 - Math.floor(progress / 5))} min` });
    if (progress >= 100) clearInterval(timer);
  }, 1600);
  return { close: () => clearInterval(timer), client: io };
}
