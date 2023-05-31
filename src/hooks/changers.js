import { useEffect, useState } from 'react';
import useGoogleSheets from 'use-google-sheets';

export default function useChangers() {
  const [changers, setChangers] = useState({});

  const { data } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID
  });

  useEffect(() => {
    const changersData = data ? data[0]?.data : null;
    if (changersData) {
      const filtered = changersData.filter(d => d.ready === 'TRUE' && d.name.length > 0);

      setChangers(filtered);
    }
  }, [data]);

  return changers;
}
