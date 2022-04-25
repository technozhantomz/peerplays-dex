import React, {Component} from 'react';
import RoundButton from "../buttons/roundButton";
import Translate from "react-translate-component";

class FileUpload extends Component{

    state = {
        fileName: ''
    };

    handleFile = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = loaded => {
            const content = new Buffer(loaded.target.result, "binary");
            const fileName = file.name;
            const lastModified = new Date(file.lastModified).toString();
            this.setState({fileName}, () => {
                this.props.onChange({ content, fileName, lastModified }, this.props.id)
            })
        };
        reader.readAsBinaryString(file);
    };

    render(){

        const {id, fileSizes} = this.props;
        const fileName = this.state.fileName;

        return(
            <label htmlFor={id} className="upload">
                <div className="upload__info">
                    <Translate content={`field.labels.${id}`} fileSize={fileSizes} className="upload__text" />
                    <span className="upload__file-name">{fileName}</span>
                </div>
                <Translate content={`buttons.${fileName ? 'useAnother' : 'upload'}`} className="upload__btn btn-round" />
                <input id={id} className="upload__input" type="file" onChange={this.handleFile} accept={fileSizes}/>
            </label>
        )
    }
}

export default FileUpload;