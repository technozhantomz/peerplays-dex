import React from "react";
import Translate from "react-translate-component";
import Link from "react-router-dom/es/Link";
import TableHeading from "./tableHeading";
import TableCard from '../helpers/cards';

const Table = ({className, tableHead, rows, link, onClick, partialFill}) => (
    <div className={`table${link || onClick ? ' table--with-link' : ''}${className ? ` ${className}` : ''}`}>
        <TableHeading tableHead={tableHead} />
        {rows.map((trItem, trId) => (
            <div key={`tr-${trId}`} className="table__row">
                {tableHead.map((tdItem, tdId) => (
                    <div key={`td-${tdId}`} className={`table__cell ${tdItem.params ? tdItem.params : ''}`}>
                        {tdItem.key == 'url'?trItem[tdItem.key] == ''?'No Url Available':trItem[tdItem.key]:trItem[tdItem.key]}
                    </div>
                ))}
                {partialFill
                && <div
                    className="table__partialFill"
                    style={{
                        backgroundColor: partialFill.color,
                        width: `${trItem[partialFill.percentKey]}%`
                    }}
                />
                }
                {link
                    && <Link to={`${link.path}${trItem[link.key]}`} className="table__link" />
                }
                {onClick
                    && <button onClick={() => onClick(trItem)} className="table__link" />}
            </div>
        ))}
    </div>
);

export default Table;