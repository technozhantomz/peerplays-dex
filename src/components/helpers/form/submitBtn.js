import React from "react";
import Translate from "react-translate-component";

const SubmitBtn = ({tag, className, loading}) => loading ?
    <Translate content={tag} className={className} component={button} type="submit"/>
    : <button className={className} type="submit" disabled><Loader /></button>;

export default SubmitBtn;