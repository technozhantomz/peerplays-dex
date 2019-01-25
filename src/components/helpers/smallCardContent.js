import React from 'react';
import {CardHeader} from "./cardHeader";

export const SmallCardContent = ({data}) => (
    <div>
        <CardHeader title={'BTS : ETH'}/>
        <div className="card__content small__content">
            <div className="number">
                0.00001519
            </div>
            <div className="blocks">
                <div className="block">
                    <div className="block__title">
                        Volume
                    </div>
                    <div className="block__number">
                        38.06945307
                    </div>
                </div>
                <div className="block">
                    <div className="block__title">
                        24h
                    </div>
                    <div className="block__number block__percent">
                        -0.71%
                    </div>
                </div>
            </div>
        </div>
    </div>
);
