interface VlessObject {
  remarks: string;
  country: string;
  flag: string;
  address: string;
  port: number;
  uuid: string;
  encryption: string;
  security: string;
  fp: string;
  type: string;
  host: string;
  sni: string;
  path: string;
  kode_domain: string;
}

interface DataObject {
  cfvless: Array<VlessObject>;
}

async function fetchConfig(url) {
  const response = await fetch(url);
  return await response.json();
}
async function handleRequest(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const bugs = url.searchParams.get("bug")?.split(",") || ["zoom.us"];
  const ports = url.searchParams.get("port")?.split(",") || ["443"];
  const ccs = url.searchParams.get("cc")?.split(",");
  const servers = url.searchParams.get("server")?.split(",");
  const exclude = parseInt(url.searchParams.get("exclude") || "0");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const tlsPorts = [443, 2053, 2083, 2087, 2096, 8443];
  const nonTlsPorts = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const allowedPorts = new Set([...tlsPorts, ...nonTlsPorts]);

  if (pathname === "/" || pathname === "") {
    let homeland =
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>@import url(https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600&display=swap);body{background:#f0f0f0;color:#000;font-family:'Plus Jakarta Sans',sans-serif}.title{height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column}h1{text-shadow:5px 5px 10px rgba(0,0,0,.5);font-size:48px;font-weight:300}h3{color:#000;font-size:24px;font-weight:400}a{text-decoration:none;color:inherit;transition:color .3s}a:hover{color:#00f}</style></head><body><div class="title"><h1>Free CFVLESS</h1><h3>follow us</h3><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 240 240"><path d="M66.964 134.874s-32.08-10.062-51.344-16.002c-17.542-6.693-1.57-14.928 6.015-17.59 7.585-2.66 186.38-71.948 194.94-75.233 8.94-4.147 19.884-.35 14.767 18.656-4.416 20.407-30.166 142.874-33.827 158.812-3.66 15.937-18.447 6.844-18.447 6.844l-83.21-61.442z" fill="none" stroke="#000" stroke-width="10"/><path d="M92.412 201.62s4.295.56 8.83-3.702c4.536-4.26 26.303-25.603 26.303-25.603" fill="none" stroke="#000" stroke-width="10"/><path d="M66.985 134.887l28.922 14.082-3.488 52.65s-4.928.843-6.25-3.613c-1.323-4.455-19.185-63.12-19.185-63.12z" fill-rule="evenodd" stroke="#000" stroke-width="10" stroke-linejoin="bevel"/><path d="M66.985 134.887s127.637-77.45 120.09-71.138c-7.55 6.312-91.168 85.22-91.168 85.22z" fill-rule="evenodd" stroke="#000" stroke-width="9.67" stroke-linejoin="bevel"/></svg><a href="https://t.me/free_cfvless" target="_blank">@free_cfvless</a></div></body></html>`;
    return new Response(homeland, { headers: { "content-type": "text/html;charset=utf-8" }, status: 200 });
  } else if (pathname === "/sub") {
    let cfvlessConfig: DataObject = await fetchConfig(
      "https://raw.githubusercontent.com/iyarivky/cfvless/main/cfvless-account.json"
    );
    let cfvless: Array<VlessObject> = [];


    // Shuffle vless
    cfvlessConfig.cfvless.sort(() => Math.random() - 0.5);

    // Filters
    // Country filter
    if (ccs) {
      for (const cc of ccs) {
        cfvlessConfig.cfvless.forEach((vless) => {
          if (vless.country == cc.toUpperCase()) cfvless.push(vless);
        });
      }
      cfvlessConfig.cfvless = cfvless;
    }

    // Server filter
    if (servers) {
      for (const server of servers) {
        cfvlessConfig.cfvless.forEach((vless) => {
          if (exclude == 1) {
            if (vless.remarks != server) cfvless.push(vless);
          } else {
            if (vless.remarks == server) cfvless.push(vless);
          }
        });
      }
      cfvlessConfig.cfvless = cfvless;
    }

    // Port filter
    if (ports) {
      const selectedPorts: Set<number> = new Set([]);
      for (const port of ports) {
        selectedPorts.add(parseInt(port));
      }
      if (new Set([...allowedPorts, ...selectedPorts]).size == allowedPorts.size) {
        for (const i in cfvlessConfig.cfvless) {
          cfvlessConfig.cfvless[i].port = parseInt(ports[Math.floor(Math.random() * ports.length)]);
        }
      } else {
        return new Response("port tidak didukung oleh Cloudflare Workers", {
          headers: { "content-type": "text/plain;charset=utf-8" },
          status: 400,
        });
      }
    }

    // Assign bugs
    if (bugs) {
      for (const i in cfvlessConfig.cfvless) {
        let bug = bugs[Math.floor(Math.random() * bugs?.length)];
        cfvlessConfig.cfvless[i].address = bug;
      }
    }

    // Generate results
    let result = "";
    for (let i = 0; i < cfvlessConfig.cfvless.length; i++) {
      if (result.split("\n").length > limit) break;
      let {
        uuid,
        address,
        port,
        encryption,
        security,
        fp,
        type,
        host,
        sni,
        path,
        flag,
        country,
        kode_domain,
        remarks,
      } = cfvlessConfig.cfvless[i];
      let vless = `vless://${uuid}@${address}:${port}?encryption=${encryption}&security=${
        tlsPorts.includes(port) ? security : "none"
      }${tlsPorts.includes(port) ? "&fp=" + fp : ""}&type=${type}&host=${host}${tlsPorts.includes(port) ? "&sni=" + sni : ""}&path=${encodeURIComponent(
        path
      )}#${flag}${country}-${kode_domain}-${remarks}-P${port}\n`;
      result += vless;
    }

    return new Response(result, { headers: { "content-type": "text/plain;charset=utf-8" }, status: 200 });
  }
}

Deno.serve(handleRequest);
