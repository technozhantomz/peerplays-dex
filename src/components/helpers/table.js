import React from "react";
import Translate from "react-translate-component";
import Link from "react-router-dom/es/Link";

const Table = ({tableHead, rows, link}) => (
    <div className={`table ${link ? 'table--with-link' : ''}`}>
        <div className="table__header">
            {tableHead.map((el, id) => (
                el.translateTag
                    ? <Translate
                        key={`th-${id}`}
                        content={`tableHead.${el.translateTag}`}
                        component="div"
                        className={`table__cell ${el.params ? el.params : ''}`}
                        with={el.translateParams}
                    />
                    : <div
                        key={`th-${id}`}
                        className={`table__cell ${el.params ? el.params : ''}`}
                    />
            ))}
        </div>
        {rows.map((trItem, trId) => (
            <div key={`tr-${trId}`} className="table__row">
                {tableHead.map((tdItem, tdId) => (
                    <div key={`td-${tdId}`} className={`table__cell ${tdItem.params ? tdItem.params : ''}`}>
                        {trItem[tdItem.key]}
                    </div>
                ))}
                {link && <Link to={`${link.path}${trItem[link.key]}`} className="table__link" />}
            </div>
        ))}
    </div>
);

export default Table;