import { ReactNode } from 'react';
import ChalkBoard from './ChalkBoard';

const DeviceFrame: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="stage">
    <ChalkBoard />
    <div className="device">
      <span className="device__island" aria-hidden="true" />
      <div className="device__screen">{children}</div>
    </div>
  </div>
);

export default DeviceFrame;
