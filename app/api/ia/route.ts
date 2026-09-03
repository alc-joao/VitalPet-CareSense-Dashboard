type AnaliseRequest = {
  temperatura: number;
  umidade: number;
  presenca: boolean;
  pet: {
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    peso: number;
  };
};

type NivelRisco = 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRITICO';

export async function POST(request: Request) {
  const body: AnaliseRequest = await request.json();

  const temperatura = Number(body.temperatura);
  const umidade = Number(body.umidade);
  const presenca = Boolean(body.presenca);
  const pet = body.pet;

  let pontuacao = 0;
  const fatores: string[] = [];

  // Análise ambiental
  if (temperatura >= 35) {
    pontuacao += 4;
    fatores.push('temperatura extremamente elevada');
  } else if (temperatura >= 32) {
    pontuacao += 3;
    fatores.push('temperatura elevada');
  } else if (temperatura >= 29) {
    pontuacao += 1;
    fatores.push('temperatura acima da faixa ideal');
  }

  if (umidade < 30) {
    pontuacao += 2;
    fatores.push('umidade muito baixa');
  } else if (umidade < 40) {
    pontuacao += 1;
    fatores.push('umidade abaixo do recomendado');
  }

  if (presenca) {
    pontuacao += 1;
    fatores.push('pet presente no ambiente');
  }

  // Análise contextual do perfil do animal
  const raca = pet.raca.toLowerCase();

  const racasBraquicefalicas = [
    'bulldog francês',
    'bulldog frances',
    'bulldog inglês',
    'bulldog ingles',
    'pug',
    'shih tzu',
    'boxer',
  ];

  if (racasBraquicefalicas.some((item) => raca.includes(item))) {
    pontuacao += 2;
    fatores.push('raça com maior sensibilidade ao calor');
  }

  if (pet.idade >= 8) {
    pontuacao += 1;
    fatores.push('animal em faixa etária de maior atenção');
  }

  let nivel: NivelRisco = 'BAIXO';

  if (pontuacao >= 8) {
    nivel = 'CRITICO';
  } else if (pontuacao >= 5) {
    nivel = 'ALTO';
  } else if (pontuacao >= 3) {
    nivel = 'MODERADO';
  }

  let recomendacao =
    'As condições monitoradas estão adequadas. Continue acompanhando o ambiente.';

  if (nivel === 'MODERADO') {
    recomendacao =
      'Monitore o ambiente com atenção, aumente a ventilação e mantenha água fresca disponível para o pet.';
  }

  if (nivel === 'ALTO') {
    recomendacao =
      'Leve o pet para um ambiente mais fresco e ventilado, disponibilize água e acompanhe possíveis sinais de desconforto.';
  }

  if (nivel === 'CRITICO') {
    recomendacao =
      'Retire o pet imediatamente do ambiente de risco, leve-o para um local fresco e ventilado e disponibilize água. Caso apresente dificuldade respiratória, fraqueza ou comportamento anormal, procure atendimento veterinário.';
  }

  const justificativa =
    fatores.length > 0
      ? `A análise identificou ${fatores.join(', ')}.`
      : 'Nenhum fator relevante de risco foi identificado nas condições atuais.';

  return Response.json({
    pet: pet.nome,
    nivel,
    pontuacao,
    justificativa,
    recomendacao,
    fatores,
    analisadoEm: new Date().toISOString(),
    modelo: 'VitalPet CareSense AI v1',
  });
}
