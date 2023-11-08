import React from 'react';
import Link from 'next/link'

const ActionMenu = ({ menuOpenId, setMenuOpenId, user, deleteUser }) => {
    return (
        <div className="absolute h-full top-2 right-0">
            <div onClick={() => setMenuOpenId(menuOpenId === user.id ? null : user.id)}>
                {menuOpenId === user.id &&
                    <div className="float-left flex items-center">
                        <Link href={{ pathname: '/newUser', query: { id: user.id } }} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 cursor-pointer">
                            Edit
                        </Link>
                        <a className="bg-red-500 text-white px-2 py-1 rounded mr-3 cursor-pointer" onClick={() => deleteUser()}>
                            Delete
                        </a>
                    </div>
                }
                <ul className="icons cursor-pointer float-right mr-4">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
};

export default ActionMenu;
