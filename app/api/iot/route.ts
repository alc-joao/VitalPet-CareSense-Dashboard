type IotData = {
  temperatura: number;
  umidade: number;
  presenca: boolean;
  atualizadoEm: string;
};

let iotData: IotData = {
  temperatura: 25,
  umidade: 60,
  presenca: false,
  atualizadoEm: new Date().toISOString(),
};

export async function GET() {
  return Response.json(iotData);
}

export async function POST(request: Request) {
  const body = await request.json();

  iotData = {
    temperatura: Number(body.temperatura),
    umidade: Number(body.umidade),
    presenca: Boolean(body.presenca),
    atualizadoEm: new Date().toISOString(),
  };

  return Response.json({
    mensagem: 'Dados IoT recebidos com sucesso',
    dados: iotData,
  });
}