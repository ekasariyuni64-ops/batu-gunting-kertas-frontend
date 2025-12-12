import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (url) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Inisialisasi socket hanya jika belum ada
    if (!socketRef.current) {
      socketRef.current = io(url);
    }

    // Fungsi pembersihan saat komponen dilepas
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [url]);

  return socketRef.current;
};
