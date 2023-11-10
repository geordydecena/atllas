import React from 'react';
import HeaderField from './userHeaderField';

const UserHeaderRow = ({ headerFields, searchQuery, setSearchQuery, setHeaderFields, setShowSpinner, setUserEditData }) => {
    const handleSetUserEditDetails = () => {
        setUserEditData({
            firstName: null,
            middleName: null,
            lastName: null,
            registered: new Date(),
            email: null,
            phoneNumber: null,
            address: null,
            adminNotes: null
        })
    };

    return (
        <table className="w-full">
            <thead>
                <tr className="flex-1">
                    <th colSpan={headerFields.length}>
                        <div className="relative border flex mb-1 h-12">
                            {headerFields.map((field, index) =>
                                <div key={field} className="px-1 w-full h-full inline-block flex items-center">
                                    <HeaderField
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        initialField={field}
                                        headerFields={headerFields}
                                        column={index}
                                        setHeaderFields={setHeaderFields}
                                        setShowSpinner={setShowSpinner}
                                    />
                                </div>
                            )}
                            <div className="absolute h-50 w-50 top-2 right-3">
                                <div className="float-left flex items-center">
                                    <div className="plusButton bg-green-500 rounded" onClick={() => handleSetUserEditDetails()}></div>
                                </div>
                            </div>
                        </div>
                    </th >
                </tr>
            </thead>
        </table>
    );
};

export default UserHeaderRow;