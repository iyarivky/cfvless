async function fetchConfig(url) {
    const response = await fetch(url);
    return await response.json();
}
async function handleRequest(req: Request) {
      const url = new URL(req.url);
      const pathname = url.pathname;
      const bugParams = url.searchParams.get('bug');
      const portParams = url.searchParams.get('port');
      const tlsPorts = [443, 2053, 2083, 2087, 2096, 8443];
      const nonTlsPorts = [80, 8080, 8880, 2052, 2082, 2086, 2095];

      if (pathname === '/' || pathname === '') {
          let homeland = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{background:#fcc;color:#000}.title{height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column}</style></head><body><div class="title"><h1>Free CFVLESS</h1><h3>follow us <a href="https://t.me/free_cfvless" target="_blank">@free_cfvless</a></h3></div></body></html>'
          return new Response(homeland,{headers: {"content-type": "text/html;charset=utf-8"}, status:200})
      } else if (pathname === "/sub") {
          let cfvlessConfig = await fetchConfig("https://raw.githubusercontent.com/iyarivky/cfvless/main/cfvless-account.json")
          let result = ''
          if (bugParams && portParams) {
            if (tlsPorts.includes(Number(portParams))) {
                for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                    let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                    let vless = `vless://${uuid}@${bugParams}:${portParams}?encryption=${encryption}&security=${security}&fp=${fp}&type=${type}&host=${host}&sni=${sni}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${portParams}\n`
                    result += vless
                  }
            } else if (nonTlsPorts.includes(Number(portParams))) {
                for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                    let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                    let vless = `vless://${uuid}@${bugParams}:${portParams}?encryption=${encryption}&security=none&type=${type}&host=${host}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${portParams}\n`
                    result += vless
                  }
            } else {
                return new Response("port tidak didukung oleh Cloudflare Workers", {headers: {"content-type": "text/plain;charset=utf-8"}, status:400});
            }
        } else if (bugParams && !portParams) {
            for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                let vless = `vless://${uuid}@${bugParams}:${port}?encryption=${encryption}&security=${security}&fp=${fp}&type=${type}&host=${host}&sni=${sni}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${port}\n`
                result += vless
              }
        } else if (!bugParams && portParams) {
            if (tlsPorts.includes(Number(portParams))) {
                for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                    let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                    let vless = `vless://${uuid}@${address}:${portParams}?encryption=${encryption}&security=${security}&fp=${fp}&type=${type}&host=${host}&sni=${sni}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${portParams}\n`
                    result += vless
                  }
            } else if (nonTlsPorts.includes(Number(portParams))) {
                for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                    let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                    let vless = `vless://${uuid}@${address}:${portParams}?encryption=${encryption}&security=none&type=${type}&host=${host}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${portParams}\n`
                    result += vless
                  }
            } else {
                return new Response("port tidak didukung oleh Cloudflare Workers", {headers: {"content-type": "text/plain;charset=utf-8"}, status:400});
            }
        } else {
            for (let i = 0 ; i < cfvlessConfig.cfvless.length; i++){
                let {uuid, address, port, encryption, security, fp, type, host, sni, path, flag, country, kode_domain, remarks} = cfvlessConfig.cfvless[i]
                let vless = `vless://${uuid}@${address}:${port}?encryption=${encryption}&security=${security}&fp=${fp}&type=${type}&host=${host}&sni=${sni}&path=${encodeURIComponent(path)}#${flag}${country}-${kode_domain}-${remarks}-P${port}\n`
                result += vless
              }
        }
        return new Response(result, {headers: {"content-type": "text/plain;charset=utf-8"}, status:200});
      } else {
            return new Response("why are you here?", {headers: {"content-type": "text/plain;charset=utf-8"}, status:404});
        }
    }
  
Deno.serve(handleRequest);
