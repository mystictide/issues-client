"use client";

export default function Confirm({ text, func }) {
  return (
    <div className="w-full flex-column flex-center modal-container confirmation">
      <div
        className="w-full modal-overlay"
        onClick={() => {
          func(false);
        }}
      />
      <div className="w-400 modal-content flex-column flex-center radius padding">
        <h4>{text}</h4>
        <div className="w-full flex-row flex-center">
          <button
            className="bg w-half"
            aria-label="yes"
            onClick={() => func(true)}
          >
            Yes
          </button>
          <button
            className="bg w-half"
            aria-label="no"
            onClick={() => func(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
