import React from 'react';
import HeaderField from './headerField';
import Link from 'next/link'

const HeaderRow = ({ fields, searchQuery, setSearchQuery, setFields, setShowSpinner }) => {
    return (
        <th colSpan={fields.header.length}>
            <div className="relative border flex mb-1 h-12">
                {fields.header.map((field, index) =>
                    <div key={field} className="px-1 w-full h-full inline-block flex items-center">
                        <HeaderField
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            initialField={field}
                            fields={fields}
                            column={index}
                            setFields={setFields}
                            setShowSpinner={setShowSpinner}
                        />
                    </div>
                )}
                <div className="absolute h-50 w-50 top-2 right-3">
                    <div className="float-left flex items-center">
                        <Link href={{ pathname: '/newUser' }} className="plusButton bg-green-500 rounded"></Link>
                    </div>
                </div>
            </div>
        </th >
    );
};

export default HeaderRow;