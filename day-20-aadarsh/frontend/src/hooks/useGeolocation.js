import { useEffect, useState } from 'react';

export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported');
      return;
    }
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      (err) => setError(err.message || 'Permission denied')
    );
    return () => clearTimeout(id);
  }, []);

  return { coords, error };
}
