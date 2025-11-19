from math import ceil

def calcular_geracao_solar(consumo_mensal_kwh, latitude, usa_ar_condicionado, usa_aquecimento_eletrico, area_util_m2):
    # 1. Irradiância média conforme latitude
    if latitude >= -10:
        irradiancia = 6.0
    elif latitude >= -15:
        irradiancia = 5.7
    elif latitude >= -20:
        irradiancia = 5.3
    elif latitude >= -25:
        irradiancia = 4.9
    else:
        irradiancia = 4.5

    # 2. Ajustes no consumo
    consumo_ajustado = consumo_mensal_kwh
    if usa_ar_condicionado:
        consumo_ajustado *= 1.15
    if usa_aquecimento_eletrico:
        consumo_ajustado *= 1.1

    # 3. Cálculo do sistema
    eficiencia = 0.75
    potencia_sistema_kwp = consumo_ajustado / (irradiancia * 30 * eficiencia)

    potencia_painel_kwp = 0.34
    quantidade_paineis = ceil(potencia_sistema_kwp / potencia_painel_kwp)
    area_necessaria_m2 = quantidade_paineis * 2

    # 4. Geração e economia
    energia_gerada_mensal = irradiancia * 30 * potencia_sistema_kwp * eficiencia
    economia_mensal = consumo_ajustado * 0.7
    economia_anual = economia_mensal * 12

    # 5. Mensagem
    area_suficiente = area_util_m2 >= area_necessaria_m2

    if area_suficiente:
        mensagem = (
            f"Com um sistema de energia solar, você pode economizar até R$ {economia_anual:.2f} por ano, "
            "reduzindo sua conta de luz em até 70% mensalmente."
        )
    else:
        mensagem = (
            f"Sua área disponível de telhado ({area_util_m2}m²) é insuficiente para os "
            f"{area_necessaria_m2} m² necessários. Considere ajustes para viabilidade."
        )

    # 6. Retorno do resultado
    return {
        "irradiancia_media": irradiancia,
        "consumo_ajustado": round(consumo_ajustado, 2),
        "potencia_sistema_kwp": round(potencia_sistema_kwp, 2),
        "quantidade_paineis": quantidade_paineis,
        "area_necessaria_m2": area_necessaria_m2,
        "energia_gerada_mensal": round(energia_gerada_mensal, 2),
        "economia_mensal": round(economia_mensal, 2),
        "economia_anual": round(economia_anual, 2),
        "area_suficiente": area_suficiente,
        "mensagem": mensagem
    }
