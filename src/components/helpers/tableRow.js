import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const TableRow = ({data}) => (
    <tr className="border-bottom">
        <td>
            06 Sep 2018
        </td>
        <td>
            <span className="operation">
                Cancel order
            </span>
        </td>
        <td>
            bitshares.foundation
        </td>
        <td>
            999,999,98.888888
        </td>
        <td>
            Receiver
        </td>
        <td>
            1.11.163493312
        </td>
        <td>
            Fee
        </td>
        <td>
            <button className="card__button button">
                <MoreVertIcon/>
            </button>
        </td>
    </tr>
);
