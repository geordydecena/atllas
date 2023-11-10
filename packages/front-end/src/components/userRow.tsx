import { displayFieldValue } from '../utils/utils';

const UserRow = ({ user, headerFields, setUserDetails }) => {
    return (
        <td colSpan={headerFields.length}>
            <table className='table-fixed w-full border mb-1'>
                <tbody>
                    <tr>
                        {headerFields.map((field, index) =>
                            <td key={index} className={`pl-5 align-center w-1/${headerFields.length}`} onClick={() => setUserDetails(user)}>
                                <div key={field} className="p-2 w-full h-full inline-block">
                                    <p className="text-gray-800 whitespace-normal break-words whitespace-wrap">{displayFieldValue(field, user[field], false, false)}</p>
                                </div>
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
        </td >
    );
};

export default UserRow;
