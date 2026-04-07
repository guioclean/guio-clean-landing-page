ALTER TABLE public.quote_settings ADD COLUMN text_value text DEFAULT '';

INSERT INTO public.quote_settings (key, value, text_value) 
VALUES ('calculator_disclaimer', 0, 'Importante: Este valor é uma estimativa baseada em produtividade padrão. O orçamento final pode sofrer variações de acordo com o nível de sujidade, acúmulo de objetos ou necessidades específicas (ex: pós-obra, limpeza técnica).')
ON CONFLICT DO NOTHING;