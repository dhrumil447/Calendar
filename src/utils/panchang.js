// getPanchang.js

// ઉપર બનાવેલી ડેટા ફાઈલને અહીં ઈમ્પોર્ટ કરો
import { panchangData } from './panchangData';

/**
 * આ ફંક્શન static ડેટામાંથી પંચાંગની વિગતો મેળવે છે.
 */
export const getPanchang = (date) => {
  // તારીખને "YYYY-MM-DD" ફોર્મેટમાં ફેરવો
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const key = `${year}-${month}-${day}`;

  // ડેટા ઓબ્જેક્ટમાંથી માહિતી શોધો
  const data = panchangData[key];

  if (data) {
    // જો ડેટા મળે, તો તેને બતાવો
    return `${data.maas} ${data.paksha} ${data.tithi}`;
  } else {
    // જો તે તારીખનો ડેટા ન મળે, તો ભૂલ બતાવો
    return "આ તારીખ માટે ડેટા ઉપલબ્ધ નથી.";
  }
};

// --- ઉદાહરણ ---
// const myDate = new Date("2025-08-16");
// console.log(getPanchang(myDate)); 
// આઉટપુટ આવશે: "શ્રાવણ વદ આઠમ"