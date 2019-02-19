export const en = {
    "global": {
        "tbd": "TBD"
    },
    "tableHead": {
        "asset": "Asset",
        "available" : "Available",
        "priceUSD" : "Price (%(token)s)",
        "change" : "Change (24h)",
        "valueUSD" : "Value (%(token)s)",
        "actions" : "Actions",
        "trade" : "Trade",
        "orderID" : "Order ID",
        "description" : "Description",
        "price" : "Price",
        "marketPrice" : "Market Price",
        "value" : "Value",
        "hash": "#",
        "name": "Name",
        "url": "URL",
        "lastBlock": "Last Block",
        "missingBlock": "Missing Block",
        "votes": "Votes",
        "key": "Key",
        "time": "Time",
        "type": "Type",
        "info": "Info",
        "id": "ID",
        "fee": "Fee",
        "weight": "Weight",
        "webpage": "Webpage",
        "operation": "Operation",
        "standardFee": "Standard Fee (bitUSD)",
        "memberFee": "Member Fee (bitUSD)",
        "blockID": "Block ID",
        "date": "Date",
        "witness": "Witness",
        "transaction": "Transaction",
        "user": "User",
        "details": "Details",
        "issuer": "Issuer",
        "supply": "Supply",
        "balance": "Balance",
        "debt": "Debt",
        "collateral": "Collateral (%(token)s)",
        "ratio": "Ratio",
        "callPrice": "Call Price",
        "total": "Total (%(token)s)"
    },
    "dashboard": {
        "title": "Dashboard",
        "sendForm": {
            "from": "From",
            "quantity": "Quantity",
            "currency": "Currency",
            "to": "To",
            "BTS": "BTS"
        }
    },
    "login": {
        "accName": "Account Name",
        "password": "Password",
        "remember": "Remember me"
    },
    "send":{
        "from": "From",
        "to": "To",
        "quantity": "Quantity",
        "memo": "Memo",
        "memoComment": "Only users with a memo key can read your memos",
        "fee": "Fee"
    },
    "errors": {
        "sendYourself": "You can\'t transfer tokens for yourself",
        "noAcc": "Failed to find this account",
        "noKey": "Failed to find this key",
        "wrongPass": "Password is wrong",
        "required": "This field is required. Please, fill it!",
        "isNan": "Amount is not a number. Please, enter the number.",
        "isNull": "You can't send a null. Please, enter summ above null.",
        "nullWeight": "Can\'t be null",
        "isNotEnough": "The total summ exceeds the amount on the account.",
        "accUsed": "Account is already in use.",
        "keyUsed": "Key is already in use."
    },
    "exchange": {
        "title": "Exchange"
    },
    "assets": {
        "title": "My Assets"
    },
    "blockchain": {
        "title": "Blockchain",
        "blockchain": {
            "title": "Blockchain"
        },
        "assets": {
            "title": "Assets"
        },
        "witnesses": {
            "title": "Witnesses"
        },
        "committee": {
            "title": "Committee"
        },
        "markets": {
            "title": "Markets"
        },
        "fees": {
            "title": "Fees"
        }
    },
    "voting": {
        "title": "Voting"
    },
    "business": {
        "title": "Business"
    },
    "settings": {
        "title": "Settings"
    },
    "contacts": {
        "title": "Contacts",
        "blacklistedSwitcher": "Blacklisted"
    },
    "help": {
        "title": "Help"
    },
    "general": {
        "title": "General",
        "interface": "User Interface",
        "language": "Language",
        "theme": "Enable Dark Theme",
        "notifications": "Notifications",
        "transferNotifications": "Transfers to my account",
        "faucet": "Faucet",
        "faucetURL": "Faucet URL",
        "faucetComment": " The faucet address is used to pay the registration fee for new users."
    },
    "wallet": {
        "title": "Wallet"
    },
    "security": {
        "title": "Security",
        "lock": "Lock Wallet",
        "lockLabel": "Lock Wallet (min)",
        "password": "Password"
    },
    "nodes": {
        "title": "Nodes",
        "autoSelect": "Select nodes automaticaly"
    },
    "reBackup": {
        "title": "Backup & restore",
        "backup": {
            "title": "Backup",
            "comment": "Last backup %(lastBackup)s",
            "type": "Backup type",
            "needed": "This local wallet needs a backup",
            "desc": "Clicking on the button below will generate a backup file with a .bin extension. This file is encrypted with your wallet password, and contains all the private keys for your accounts. It can be used to restore your wallet, or move it to a different computer/browser."
        },
        "restore": {
            "title": "Restore",
            "type": "Restore type",
            "needed": "This local wallet needs a backup",
            "fileUpload": "Choose file",
            "desc": "Please select your backup file in the dialog below. This is completely safe as the file is not uploaded anywhere and never leaves your browser."
        },
        "backupWallet": "Create local wallet backup",
        "backupBrain": "Create brainkey backup",
        "fromBin": "Restore from a backup file (.bin)",
        "fromPrivate": "Import a private key",
        "fromBrain": "Restore using a local wallet brainkey"
    },
    "userAssets": {
        "title": "Assets"
    },
    "orders": {
        "title": "Open orders",
    },
    "activity": {
        "title": "Activity",
    },
    "positions": {
        "title": "Margin positions",
    },
    "blacklist": {
        "title": "Black List",
    },
    "permissions": {
        "title": "Permissions",
        "threshold": "Threshold",
        "add": "Add Permission",
        "owner": {
            "title": "Account Ownership",
            "subtitle": "Owner permissions define who has control over the account. Owners may overwrite all keys and change any account settings."
        },
        "active": {
            "title": "Assets Management",
            "subtitle": "Active permissions define the accounts that have permission to spend funds for this account."
        },
        "memo": {
            "title": "Memos View",
            "subtitle": "The memo key is where you receive memos, in order to decode the memos you need to control the private key for the public key. By using a public/private key pair without spending authority, you may give read-only access to your memos to third parties."
        },
        "activity": {
            "title": "Permissions Related Activity",
            "subtitle": "Active permissions define the accounts that have permission to spend funds for this account."
        }
    },
    "empty": {
        "default": "No data",
        "userOrders": "User haven't open any order",
        "login": "Please, log in to see this page"
    }
};
