import React from 'react';

const MessageModal = ({ message, isSuccess }) => {
    return (
        <div className="absolute w-full h-12 flex justify-center items-center z-20">
            <div className={(isSuccess ? "bg-green-500" : "bg-red-500") + " text-white border rounded px-2 py-1"}>
                {message}
            </div>
        </div>
    );
};

export default MessageModal;