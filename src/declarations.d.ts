declare module 'react-qrcode-logo' {
  import * as React from 'react';

  export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    logoImage?: string;
    logoWidth?: number;
    logoHeight?: number;
    logoOpacity?: number;
    removeQrCodeBehindLogo?: boolean;
    qrStyle?: 'squares' | 'dots';
    eyeRadius?: number | number[];
  }

  const QRCode: React.FC<QRCodeProps>;

  export default QRCode;
}
