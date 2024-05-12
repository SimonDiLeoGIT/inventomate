import React from "react";

interface props {
  text: string
}

export const Message: React.FC<props> = ({ text }) => {
  return (
    <div
      className="absolute top-24"
      style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', textAlign: 'center' }}
    >
      {text}
    </div>
  );
}