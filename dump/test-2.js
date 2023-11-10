function countryCodeToEmoji(countryCode) {
    const offset = 127397;
    return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt() + offset));
}

function convertLink(link) {
    const parts = link.slice(8).split('@');
    const uuid = parts[0];
    const url = new URL('http://' + parts[1].split('#')[0]);
    const params = new URLSearchParams(url.search);
    const hash = parts[1].split('#')[1];
    const pagar = hash.split("-")
    const remarks = pagar[1]
    const country = pagar[0]
    const flag_emoji = countryCodeToEmoji(country)
    let host = url.hostname;
    let port = url.port;
    let encryption = params.get('encryption');
    let security = params.get('security');
    let sni = params.get('sni');
    let fp = params.get('fp');
    let type = params.get('type');
    let hostParam = params.get('host');
    let path = params.get('path');
    return `${remarks},${country},${flag_emoji},${host},${port},${uuid},${encryption},${security},${fp},${type},${hostParam},${host},${path}`;
}

let vless = `vless://8f4531f9-411c-4795-88aa-9ce9bfd619a0@vl13.rnd.biz.id:443?encryption=none&security=tls&sni=vl13.rnd.biz.id&fp=randomized&type=ws&host=vl13.rnd.biz.id&path=%2F%3Fed%3D2048#US-QuadraNet
vless://39ec674f-7de0-43b1-ab2c-8df614a0db88@vl14.rnd.biz.id:443?encryption=none&security=tls&sni=vl14.rnd.biz.id&fp=randomized&type=ws&host=vl14.rnd.biz.id&path=%2F%3Fed%3D2048#US-KurunCloud
vless://824f03b8-9ee8-402e-8b9c-3e55f8eb2c88@vl15.rnd.biz.id:443?encryption=none&security=tls&sni=vl15.rnd.biz.id&fp=randomized&type=ws&host=vl15.rnd.biz.id&path=%2F%3Fed%3D2048#US-VirtualMachineSolutions
vless://0fee2a22-cb03-4aea-a83a-9ba57b840199@vl16.rnd.biz.id:443?encryption=none&security=tls&sni=vl16.rnd.biz.id&fp=randomized&type=ws&host=vl16.rnd.biz.id&path=%2F%3Fed%3D2048#SG-Alibaba
vless://b3a8d600-b0a1-4227-9f2c-317739a50636@vl17.rnd.biz.id:443?encryption=none&security=tls&sni=vl17.rnd.biz.id&fp=randomized&type=ws&host=vl17.rnd.biz.id&path=%2F%3Fed%3D2048#SG-Alibaba
vless://087ff222-7b54-49b7-a523-c70c4bd33666@vl18.rnd.biz.id:443?encryption=none&security=tls&sni=vl18.rnd.biz.id&fp=randomized&type=ws&host=vl18.rnd.biz.id&path=%2F%3Fed%3D2048#US-Zenlayer
vless://9690a2c2-136d-4da3-98d5-cc59445a31e0@vl19.rnd.biz.id:443?encryption=none&security=tls&sni=vl19.rnd.biz.id&fp=randomized&type=ws&host=vl19.rnd.biz.id&path=%2F%3Fed%3D2048#US-Hetzner
vless://6140db5e-4180-4db4-a720-2847c7640f02@vl20.rnd.biz.id:443?encryption=none&security=tls&sni=vl20.rnd.biz.id&fp=randomized&type=ws&host=vl20.rnd.biz.id&path=%2F%3Fed%3D2048#US-UCLOUD-1
vless://d342d11e-d424-4583-b36e-524ab1f0afa4@vl21.rnd.biz.id:443?encryption=none&security=tls&sni=vl21.rnd.biz.id&fp=randomized&type=ws&host=vl21.rnd.biz.id&path=%2F%3Fed%3D2048#SG-OracleAlibaba
vless://5083e386-b091-414a-94d6-386a5f4430fb@vl22.rnd.biz.id:443?encryption=none&security=tls&sni=vl22.rnd.biz.id&fp=randomized&type=ws&host=vl22.rnd.biz.id&path=%2F%3Fed%3D2048#SG-Amazon
vless://45d56bf1-fa2a-4ed1-84de-1d53b3ef251d@vl23.rnd.biz.id:443?encryption=none&security=tls&sni=vl23.rnd.biz.id&fp=randomized&type=ws&host=vl23.rnd.biz.id&path=%2F%3Fed%3D2048#HK-GoogleCloud
vless://f42be874-eef9-47a0-8575-ba354be0d76c@vl24.rnd.biz.id:443?encryption=none&security=tls&sni=vl24.rnd.biz.id&fp=randomized&type=ws&host=vl24.rnd.biz.id&path=%2F%3Fed%3D2048#JP-GoogleCloud
vless://d8a98383-26db-4cd7-8d88-c14c180b5c75@vl25.rnd.biz.id:443?encryption=none&security=tls&sni=vl25.rnd.biz.id&fp=randomized&type=ws&host=vl25.rnd.biz.id&path=%2F%3Fed%3D2048#US-GoogleCloud-1
vless://aa81e188-a979-411e-a10b-08287646cc43@vl26.rnd.biz.id:443?encryption=none&security=tls&sni=vl26.rnd.biz.id&fp=randomized&type=ws&host=vl26.rnd.biz.id&path=%2F%3Fed%3D2048#SG-GoogleCloud
vless://8d74b407-abf8-4721-a125-d0a2cce9b4a1@vl27.rnd.biz.id:443?encryption=none&security=tls&sni=vl27.rnd.biz.id&fp=randomized&type=ws&host=vl27.rnd.biz.id&path=%2F%3Fed%3D2048#US-UCLOUD-2
vless://14ddd817-a070-4f7e-b31d-535523702b25@vl28.rnd.biz.id:443?encryption=none&security=tls&sni=vl28.rnd.biz.id&fp=randomized&type=ws&host=vl28.rnd.biz.id&path=%2F%3Fed%3D2048#US-AryakaNetwork
vless://5c6d5301-e889-4278-a9cd-1b55f939e6d6@vl29.rnd.biz.id:443?encryption=none&security=tls&sni=vl29.rnd.biz.id&fp=randomized&type=ws&host=vl29.rnd.biz.id&path=%2F%3Fed%3D2048#US-GoogleCloud-2
vless://adbb9c54-a35b-494b-9a4d-dec54b0e1f7a@vl30.rnd.biz.id:443?security=tls&encryption=none&headerType=none&type=ws&path=%252F%253Fed%253D2048&sni=vl30.rnd.biz.id&flow=none&host=vl30.rnd.biz.id#SG-DigitalOcean
vless://9bc90ddf-b865-47cc-9f97-9d5ea3bca89f@vl31.rnd.biz.id:443?encryption=none&security=tls&sni=vl31.rnd.biz.id&fp=randomized&type=ws&host=vl31.rnd.biz.id&path=%2F%3Fed%3D2048#SG-HotRoute`

const vlessToArray = vless.split("\n")

let result = ``

for (let i = 0; i < vlessToArray.length; i++){
    let convertCihuy = convertLink(vlessToArray[i]);
    result += convertCihuy + "\n";
}

console.log(result)
