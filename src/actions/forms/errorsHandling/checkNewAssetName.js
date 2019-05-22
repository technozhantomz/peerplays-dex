import {ChainValidation, ChainStore} from "bitsharesjs";
import {dbApi} from "../../nodes";

const defaultErrorsTranslate = {
    "Asset name should not be empty.": "empty",
    "Asset name should have only one dot.": "oneDot",
    "Asset name should be longer.": "longer",
    "Asset name should be shorter.": "shorter",
    "Asset name should start with a letter": "start",
    "Asset name should end with a letter or number": "end",
    "Asset name should contain only letters numbers and perhaps a dot.": "symbols"
};

export const checkNewAssetName = async ({newAssetName}) => {
    newAssetName = newAssetName.toUpperCase();
    const defaultError = ChainValidation.is_valid_symbol_error(newAssetName);

    if(defaultError){
        const tag = defaultErrorsTranslate[defaultError];
        return tag ? `newAsset.${tag}` : defaultError;
    }

    const assetFromDB = await dbApi('lookup_asset_symbols', [[newAssetName], 1]);

    if(assetFromDB[0] && assetFromDB[0].symbol === newAssetName) return 'assetUsed'
};