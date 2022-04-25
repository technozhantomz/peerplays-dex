import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const TableRowOders = ({data}) => (
    <tr className="border-bottom">
        <td>
            Asset Name
        </td>
        <td>
            12312313123
        </td>
        <td>
            0.00000000
        </td>
        <td>
            ХХХ,ХХХ.ХХХХХХХ
        </td>
        <td>
            ХХХ,ХХХ.ХХХХХХХ
        </td>
        <td>
            ХХХ,ХХХ.ХХХХХХХ
        </td>
        <td>
            <button className="card__button button">
                <MoreVertIcon/>
            </button>
        </td>
    </tr>
);
