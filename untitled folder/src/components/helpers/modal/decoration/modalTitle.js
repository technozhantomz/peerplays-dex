import React from 'react';
import Translate from 'react-translate-component';
import TitleWrapper from "../../titleWrapper";

const ModalTitle = ({tag, additionalData, subtitle}) => (
    <TitleWrapper
        className="modal__header"
        title={`modal.${tag}.title`}
        titleData={additionalData}
        subtitle={subtitle && `modal.${tag}.subtitle`}
    />
);

export default ModalTitle;