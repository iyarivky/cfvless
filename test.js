function vlessToJSON(vless) {
    const parts = vless.slice(8).split('@'); // remove 'vless://' and split by '@'
    const id = parts[0];
    const url = new URL('http://' + parts[1].split('#')[0]); // add 'http://' and remove '#...'
    const params = new URLSearchParams(url.search);
    const path = url.pathname;
    const hash = parts[1].split('#')[1]; // get the part after '#'

    return JSON.stringify({
        remarks: hash,
        country: "SG",
        address: url.hostname,
        port: ~~url.port,
        id: id,
        encryption: params.get('encryption'),
        security: params.get('security'),
        fp: params.get('fp'),
        type: params.get('type'),
        host: params.get('host'),
      	sni: params.get('sni'),
        path: params.get('path')
    }, null, 4);
}

const vless = 'vless://4dba2b4a-d76f-429c-8547-0fcec7430356@104.18.41.89:443?encryption=none&security=tls&fp=randomized&type=ws&host=ext21.zxv.biz.id&sni=ext21.zxv.biz.id&path=%2F%3Fed%3D2048#Google-CF';
console.log(vlessToJSON(vless));
