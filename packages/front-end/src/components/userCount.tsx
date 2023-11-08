import React from 'react';

const UserCount = ({ userCount }) => {
    return (
        <p className="p-2 ml-0.5 h-8 w-40 flex items-center leading-4">{`${userCount} result${userCount > 1 && "s"}`}</p>
    );
};

export default UserCount;