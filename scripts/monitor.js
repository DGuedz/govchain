const http = require('http');
const url = require('url');

const PORT = 8080;
const GOVCHAIN_URL = 'http://localhost:3011/api/health';

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // CORS Headers - Restrict to localhost
  const origin = req.headers.origin;
  if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  }

  // Handle Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Endpoint: /health (Monitor Status)
  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'active',
      service: 'govchain-monitor',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Endpoint: / (Dashboard)
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    // Simple HTML Dashboard
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>GovChain Monitor</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #334155; padding: 2rem; }
        .card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
        .header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
        .logo { width: 48px; height: 48px; object-fit: contain; }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
        .status-ok { background: #dcfce7; color: #166534; }
        .status-error { background: #fee2e2; color: #991b1b; }
        .metric { margin-bottom: 1rem; }
        .label { font-size: 0.875rem; color: #64748b; margin-bottom: 0.25rem; }
        .value { font-size: 1.25rem; font-weight: 600; color: #0f172a; }
        button { background: #50C878; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; transition: background 0.2s; }
        button:hover { background: #40b068; }
        .footer { margin-top: 2rem; text-align: center; font-size: 0.75rem; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <img src="http://localhost:3011/govchain-logo.png" class="logo" alt="Logo" onerror="this.style.display='none'">
          <div>
            <h1 style="margin:0; font-size: 1.5rem;">GovChain Monitor</h1>
            <span style="font-size: 0.875rem; color: #64748b;">Ambiente de Desenvolvimento Local</span>
          </div>
        </div>

        <div id="content">
          <p>Verificando status do sistema...</p>
        </div>

        <div class="footer">
          Monitor rodando em porta ${PORT} • Acesso Restrito Localhost
        </div>
      </div>

      <script>
        async function checkStatus() {
          const content = document.getElementById('content');
          try {
            const res = await fetch('${GOVCHAIN_URL}');
            if (!res.ok) throw new Error('Serviço indisponível');
            const data = await res.json();
            
            content.innerHTML = \`
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                <span class="status-badge status-ok">● Sistema Operacional</span>
                <span style="font-family:monospace; font-size:0.875rem;">v\${data.version}</span>
              </div>
              
              <div class="metric">
                <div class="label">Serviço Principal</div>
                <div class="value">\${data.service}</div>
              </div>
              
              <div class="metric">
                <div class="label">Ambiente</div>
                <div class="value" style="text-transform:capitalize;">\${data.environment}</div>
              </div>

              <div class="metric">
                <div class="label">Tempo de Atividade (Uptime)</div>
                <div class="value">\${Math.floor(data.uptime)}s</div>
              </div>

              <button onclick="checkStatus()">Atualizar Status</button>
            \`;
          } catch (err) {
            content.innerHTML = \`
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                <span class="status-badge status-error">● Sistema Indisponível</span>
              </div>
              <p style="color:#64748b; margin-bottom:2rem;">Não foi possível conectar ao núcleo GovChain em ${GOVCHAIN_URL}.</p>
              <button onclick="checkStatus()">Tentar Novamente</button>
            \`;
          }
        }
        
        // Initial Check
        checkStatus();
        
        // Auto refresh every 30s
        setInterval(checkStatus, 30000);
      </script>
    </body>
    </html>
    `;
    
    res.end(html);
    return;
  }

  // 404
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[GovChain Monitor] Servidor de visualização rodando em http://localhost:${PORT}`);
  console.log(`[GovChain Monitor] Monitorando núcleo em ${GOVCHAIN_URL}`);
});
