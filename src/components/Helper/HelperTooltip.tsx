'use client';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface HelperTooltipProps {
  id: string;
  text: string;
}

export default function HelperTooltip({ id, text }: HelperTooltipProps) {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={text}
        style={{
          marginLeft: '4px',
          cursor: 'pointer',
          borderRadius: '50%',
          padding: '0 6px',
          backgroundColor: '#ccc',
          fontWeight: 'bold',
        }}
      >
        ?
      </span>
      <Tooltip id={id} place="top"/>
    </>
  );
}
