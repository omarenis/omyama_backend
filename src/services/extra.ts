import {hash} from 'bcrypt';

function init_payment() {
    const url_payment = `https://api.preprod.konnect.network/api/v2/`;

}


export async function hash_password(row, secret) {
    return await hash(row, secret);
}
