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
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const tlsPorts = [443, 2053, 2083, 2087, 2096, 8443];
  const nonTlsPorts = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const allowedPorts = new Set([...tlsPorts, ...nonTlsPorts]);

  if (pathname === "/" || pathname === "") {
    let homeland =
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{background:#fcc;color:#000}.title{height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column}</style></head><body><div class="title"><h1>Free CFVLESS</h1><h3>follow us <a href="https://t.me/free_cfvless" target="_blank">@free_cfvless</a></h3></div></body></html>';
    return new Response(homeland, { headers: { "content-type": "text/html;charset=utf-8" }, status: 200 });
  } else if (pathname === "/sub") {
    let cfvlessConfig: DataObject = await fetchConfig(
      "https://raw.githubusercontent.com/iyarivky/cfvless/main/cfvless-account.json"
    );
    let cfvless: Array<VlessObject> = [];

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
      }&fp=${fp}&type=${type}&host=${host}&sni=${sni}&path=${encodeURIComponent(
        path
      )}#${flag}${country}-${kode_domain}-${remarks}-P${port}\n`;
      result += vless;
    }

    return new Response(result, { headers: { "content-type": "text/plain;charset=utf-8" }, status: 200 });
  }
}

Deno.serve(handleRequest);
