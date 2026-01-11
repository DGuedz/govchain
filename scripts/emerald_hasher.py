import hashlib
import json
import numpy as np
from datetime import datetime

class EmeraldSpectralHasher:
    """
    Componente central do GEMLAB para gerar Identidade Molecular de Esmeraldas.
    Converte dados brutos de Espectroscopia Raman em um SpectralHash único.
    """

    def __init__(self, device_id="GEMLAB-RAMAN-01"):
        self.device_id = device_id
        # Picos característicos da Esmeralda (Berilo) em cm^-1 (Raman Shift)
        # 324, 396 (vibrações Si-O), 685, 1067 (vibrações Be-O)
        self.reference_peaks = [324.0, 396.0, 685.0, 1067.0]

    def simulate_reading(self):
        """
        Simula a leitura de uma esmeralda real injetando pequenos ruídos
        para testar a robustez do algoritmo de normalização.
        """
        print(f"🔦 [Hardware] Iniciando leitura laser no dispositivo {self.device_id}...")
        
        # Simula dados brutos com leve variação (ruído do mundo real)
        noise = np.random.normal(0, 0.5, len(self.reference_peaks))
        raw_peaks = np.array(self.reference_peaks) + noise
        
        # Intensidade relativa simulada (Arbitrary Units)
        intensities = [850, 920, 1200, 450]
        
        reading_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "scan_id": hashlib.md5(str(datetime.now()).encode()).hexdigest()[:8],
            "raw_peaks": raw_peaks.tolist(),
            "intensities": intensities
        }
        return reading_data

    def normalize_data(self, raw_data):
        """
        Normaliza os dados para garantir que a mesma pedra gere sempre o mesmo hash,
        mesmo com micro-variações de calibração do equipamento.
        """
        # Arredonda os picos para o inteiro mais próximo (filtro de ruído)
        clean_peaks = [int(round(p)) for p in raw_data['raw_peaks']]
        
        # Estrutura canônica (ordem importa para o hash)
        canonical_data = {
            "mineral": "BERYL_EMERALD",
            "peaks_cm1": sorted(clean_peaks), # Ordenar é crucial para determinismo
            "intensities_norm": raw_data['intensities'] # Em produção, normalizaríamos isso também
        }
        return canonical_data

    def generate_spectral_hash(self, canonical_data):
        """
        Gera o hash SHA-256 final (SpectralHash) que irá para o EAS.
        """
        # Serializa para JSON string de forma determinística (sem espaços, chaves ordenadas)
        payload_string = json.dumps(canonical_data, sort_keys=True, separators=(',', ':'))
        
        # Cria o hash SHA-256
        spectral_hash = hashlib.sha256(payload_string.encode('utf-8')).hexdigest()
        
        return f"0x{spectral_hash}"

# --- Execução do Agente ---

if __name__ == "__main__":
    # 1. Inicializa o Oráculo Científico
    oracle = EmeraldSpectralHasher()

    # 2. Simula a ingestão de dados físicos (Mundo Real)
    raw_reading = oracle.simulate_reading()
    print(f"📊 Dados Brutos Recebidos: {raw_reading['raw_peaks']}")

    # 3. Processamento e Normalização (O segredo do GEMLAB)
    clean_data = oracle.normalize_data(raw_reading)
    print(f"🧪 Dados Normalizados (Canônicos): {clean_data}")

    # 4. Geração do SpectralHash (Imutabilidade)
    final_hash = oracle.generate_spectral_hash(clean_data)
    
    print("-" * 60)
    print(f"💎 SPECTRAL HASH GERADO: {final_hash}")
    print("-" * 60)
    print("Pronto para registro no Ethereum Attestation Service (EAS #2)")
