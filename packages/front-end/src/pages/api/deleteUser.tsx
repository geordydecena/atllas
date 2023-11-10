import axios from 'axios';
import { getErrorMessage } from '../../utils/utils';
import { LOCAL_SERVER_URL } from '../../constants/constants';

export default async function handler(req, res) {
    try {
        const { data } = await axios.post(`${LOCAL_SERVER_URL}/users/delete`, req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(400).json({ message: getErrorMessage(e) });
    }
}