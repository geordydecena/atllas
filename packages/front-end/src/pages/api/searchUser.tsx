import axios from 'axios';
import { getErrorMessage } from '../../utils/utils';
import { localServerURL } from '../../constants/constants';

export default async function handler(req, res) {
    try {
        const { data } = await axios.post(`${localServerURL}/users/search`, req.body);

        res.status(200).json(data);
    } catch (e) {
        res.status(400).json({ message: getErrorMessage(e) });
    };
};