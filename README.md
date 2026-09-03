# 🐾 VitalPet CareSense — Dashboard Inteligente

## 👨‍💻 Integrantes

* João Victor Alcântara — RM562707
* Phillipo Barbosa — RM565399
* Leonardo Aragaki — RM562944
* Eduardo Martins — RM562259

---

# 📌 Descrição do Projeto

O **VitalPet CareSense** é uma solução inteligente para monitoramento preventivo de ambientes destinados a pets, integrando **Internet das Coisas (IoT), Dashboard Web e um motor de regras inteligentes**.

A solução utiliza um protótipo IoT baseado em **ESP32**, sensor **DHT22** e sensor **PIR** para coletar informações ambientais e enviá-las para uma API integrada ao dashboard.

O sistema monitora:

* Temperatura do ambiente
* Umidade
* Presença do pet
* Nível de risco ambiental

Além do monitoramento, o projeto conta com o **CareSense AI**, componente inteligente responsável por combinar os dados ambientais com características do animal monitorado, identificar fatores de risco e gerar uma recomendação preventiva contextualizada.

---

# 🚨 Problema de Negócio

Pets podem permanecer em ambientes inadequados sem que seus tutores percebam imediatamente.

Temperaturas elevadas, níveis inadequados de umidade e a permanência do animal no ambiente podem representar riscos, principalmente quando o tutor está fora de casa e não consegue acompanhar essas condições.

Além disso, apenas apresentar valores brutos como temperatura e umidade nem sempre é suficiente. O mesmo ambiente pode representar níveis diferentes de atenção dependendo das características do animal exposto.

O VitalPet CareSense busca transformar esses dados em uma informação mais compreensível e contextualizada para apoiar ações preventivas.

---

# ✅ Solução Proposta

O **VitalPet CareSense** combina sensores IoT, desenvolvimento web e análise inteligente para transformar dados ambientais em informações úteis.

A solução:

* Monitora temperatura
* Monitora umidade
* Detecta presença
* Recebe dados enviados pelo ESP32
* Exibe as informações em um dashboard
* Mantém um histórico temporário das leituras na interface
* Classifica o estado do ambiente
* Combina dados ambientais com características do pet
* Identifica fatores adicionais de vulnerabilidade
* Calcula uma pontuação de risco
* Classifica o risco inteligente
* Explica os fatores identificados
* Gera recomendações preventivas

---

# 🧠 CareSense AI

O **CareSense AI v1** é o componente de análise inteligente do VitalPet CareSense.

Na versão atual do protótipo, foi implementado como um **motor de regras inteligentes com análise contextual**.

O componente recebe informações ambientais coletadas pelo sistema IoT e características do perfil do pet para calcular uma pontuação de risco.

A análise retorna:

* Pet analisado
* Nível de risco
* Pontuação
* Justificativa
* Fatores identificados
* Recomendação preventiva
* Data e horário da análise

Os níveis possíveis são:

```txt
BAIXO
MODERADO
ALTO
CRITICO
```

---

# 🎯 Justificativa da Abordagem de IA

A abordagem escolhida para o **CareSense AI v1** foi um **motor de regras inteligentes**.

Essa abordagem foi adotada porque os dados utilizados nesta etapa são predominantemente estruturados e os fatores de risco analisados possuem regras que podem ser avaliadas de maneira objetiva.

Além disso, para uma aplicação relacionada ao bem-estar animal, é importante que o resultado seja:

* Previsível
* Rastreável
* Explicável
* Reproduzível

Em vez de retornar apenas uma classificação, o CareSense AI também informa quais fatores contribuíram para o resultado.

Por exemplo, uma análise pode identificar simultaneamente:

* Temperatura elevada
* Umidade inadequada
* Presença do pet no ambiente
* Raça com maior sensibilidade ao calor
* Faixa etária que exige maior atenção

Cada condição pode contribuir para a pontuação utilizada na classificação final.

Essa abordagem permite demonstrar de forma transparente como o sistema chegou ao nível de risco apresentado.

---

# ⚙️ Funcionamento do CareSense AI

O motor inteligente recebe uma estrutura semelhante a:

```json
{
  "temperatura": 35,
  "umidade": 28,
  "presenca": true,
  "pet": {
    "nome": "Thor",
    "especie": "Cachorro",
    "raca": "Bulldog Francês",
    "idade": 8,
    "peso": 13
  }
}
```

A API analisa as informações e atribui pontuações aos fatores identificados.

## Regras ambientais

### Temperatura

* A partir de 29°C: aumenta a atenção
* A partir de 32°C: risco ambiental maior
* A partir de 35°C: condição de temperatura extremamente elevada

### Umidade

* Abaixo de 40%: aumenta a pontuação de risco
* Abaixo de 30%: condição de umidade muito baixa

### Presença

Quando há presença detectada, o sistema considera que o pet pode estar exposto às condições ambientais identificadas.

## Contexto do pet

Na versão atual, duas características são utilizadas diretamente para personalizar a pontuação:

### Raça

O protótipo considera algumas raças braquicefálicas como fator adicional de atenção ao calor, como:

* Bulldog Francês
* Bulldog Inglês
* Pug
* Shih Tzu
* Boxer

### Idade

Animais com **8 anos ou mais** recebem um fator adicional de atenção na análise.

---

# 🚦 Classificação Inteligente

Após a soma dos fatores, o CareSense AI classifica o resultado.

```txt
Pontuação 0–2  → BAIXO
Pontuação 3–4  → MODERADO
Pontuação 5–7  → ALTO
Pontuação 8+   → CRITICO
```

Além da classificação, o sistema retorna uma justificativa e uma recomendação correspondente ao cenário identificado.

---

# 🐶 Personalização da Análise

Um dos objetivos do CareSense AI é demonstrar que apenas os dados ambientais não precisam ser considerados isoladamente.

Na demonstração atual, o sistema utiliza o seguinte perfil:

```txt
Nome: Thor
Espécie: Cachorro
Raça: Bulldog Francês
Idade: 8 anos
Peso: 13 kg
```

Os campos de espécie e peso fazem parte da estrutura do perfil enviada ao componente inteligente e podem ser utilizados em futuras evoluções.

Na versão atual do motor, **raça e idade são os atributos do perfil que efetivamente influenciam a pontuação de risco**.

---

# 📊 Dados Utilizados

| Dado         | Origem               | Estrutura | Utilização                                 |
| ------------ | -------------------- | --------- | ------------------------------------------ |
| Temperatura  | DHT22 / ESP32        | Número    | Avaliação das condições térmicas           |
| Umidade      | DHT22 / ESP32        | Número    | Avaliação das condições ambientais         |
| Presença     | PIR / ESP32          | Booleano  | Identificação de possível exposição do pet |
| Nome         | Perfil demonstrativo | Texto     | Identificação do animal analisado          |
| Espécie      | Perfil demonstrativo | Texto     | Informação contextual disponível           |
| Raça         | Perfil demonstrativo | Texto     | Personalização da análise de risco         |
| Idade        | Perfil demonstrativo | Número    | Personalização da análise de risco         |
| Peso         | Perfil demonstrativo | Número    | Informação contextual disponível           |
| Pontuação    | CareSense AI         | Número    | Determinação do nível de risco             |
| Fatores      | CareSense AI         | Lista     | Explicação do resultado                    |
| Recomendação | CareSense AI         | Texto     | Orientação preventiva                      |

---

# 💙 Valor Gerado

## Para o tutor

O tutor não precisa interpretar apenas números provenientes dos sensores.

O CareSense AI transforma as informações em:

* Classificação de risco
* Explicação dos fatores encontrados
* Recomendação preventiva

Isso facilita a compreensão da situação e pode ajudar o tutor a agir mais rapidamente.

## Para o pet

A solução busca contribuir para a prevenção de exposição prolongada a condições ambientais potencialmente inadequadas.

A análise contextual permite considerar não somente o ambiente, mas também características do animal.

## Para clínicas veterinárias

Como evolução da solução, o histórico ambiental e as análises realizadas podem servir como informação complementar para o acompanhamento do animal.

A integração futura com dados clínicos pode permitir que profissionais tenham contexto adicional sobre situações ambientais às quais o pet esteve exposto.

> A versão atual do protótipo não realiza diagnóstico veterinário e não substitui avaliação profissional.

---

# 🏗️ Arquitetura Atual do Protótipo

```txt
┌───────────────────────────────┐
│         ESP32 / Wokwi         │
│                               │
│   DHT22             PIR       │
│ Temperatura       Presença    │
│ Umidade                       │
└───────────────┬───────────────┘
                │
                │ HTTP / JSON
                ▼
┌───────────────────────────────┐
│          API /api/iot         │
│                               │
│ Última leitura armazenada     │
│ temporariamente em memória    │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Dashboard VitalPet        │
│                               │
│ • Temperatura                 │
│ • Umidade                     │
│ • Presença                    │
│ • Status                      │
│ • Gráfico temporário          │
└───────────────┬───────────────┘
                │
                │ Dados IoT +
                │ perfil demonstrativo
                ▼
┌───────────────────────────────┐
│          API /api/ia          │
│                               │
│       CareSense AI v1         │
│ Motor de regras inteligentes  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Resultado da análise    │
│                               │
│ • Nível                       │
│ • Pontuação                   │
│ • Fatores                     │
│ • Justificativa               │
│ • Recomendação                │
└───────────────────────────────┘
```

---

# 🔄 Fluxo de Dados

```txt
Sensores
   ↓
ESP32
   ↓
HTTP / JSON
   ↓
/api/iot
   ↓
Dashboard
   ↓
Dados ambientais
   +
Perfil demonstrativo do pet
   ↓
/api/ia
   ↓
CareSense AI
   ↓
Pontuação de risco
   ↓
Classificação
   ↓
Justificativa + recomendação
   ↓
Dashboard
   ↓
Usuário
```

O Dashboard consulta os dados IoT periodicamente e atualiza as informações apresentadas na interface.

O componente CareSense AI também utiliza as leituras mais recentes para recalcular a análise do ambiente.

---

# 💾 Persistência de Dados

Na versão atual do protótipo, **não existe banco de dados persistente integrado ao Dashboard**.

A API `/api/iot` mantém a última leitura temporariamente em memória durante a execução da aplicação.

O histórico apresentado no gráfico também é mantido temporariamente no estado da interface.

Os pets exibidos na seção de animais e o perfil utilizado pelo CareSense AI são dados demonstrativos utilizados para validar o conceito da solução.

Essa decisão permite concentrar a Sprint na validação do fluxo:

```txt
IoT → Aplicação → Análise Inteligente → Recomendação
```

---

# 🚀 Evolução da Arquitetura

Em uma evolução do VitalPet CareSense, uma camada persistente poderá armazenar:

* Perfis dos pets
* Histórico das leituras ambientais
* Alertas
* Histórico das análises do CareSense AI
* Consultas
* Vacinas
* Medicamentos
* Dados clínicos autorizados
* Informações relevantes para acompanhamento veterinário

A arquitetura poderá evoluir para:

```txt
ESP32 / Sensores
       ↓
    API IoT
       ↓
┌──────────────────────┐
│   Banco de Dados     │
│                      │
│ • Pets               │
│ • Leituras           │
│ • Alertas            │
│ • Histórico          │
│ • Dados clínicos     │
└──────────┬───────────┘
           │
           ▼
      Aplicação
           │
           ▼
     CareSense AI
           │
           ▼
 Análise contextual
           │
           ▼
 Tutor / Clínica
```

Essa evolução permitiria análises utilizando não apenas a leitura atual, mas também informações históricas e clínicas do animal.

---

# 🛠️ Tecnologias Utilizadas

## Dashboard

* Next.js
* React
* TypeScript
* Recharts
* Lucide React
* CSS

## IoT

* ESP32
* Sensor DHT22
* Sensor PIR
* PlatformIO
* Arduino Framework
* Wokwi Simulator

## Inteligência

* CareSense AI v1
* Motor de regras inteligentes
* Sistema de pontuação
* Análise contextual
* Classificação de risco
* Recomendações preventivas

## Comunicação

* HTTP
* API REST
* JSON

## Deploy

* Vercel

---

# 🌡️ Sensores

## DHT22

Responsável pela coleta de:

* Temperatura
* Umidade

## PIR

Responsável pela detecção de presença no ambiente.

A combinação dessas informações permite avaliar se existem condições ambientais que exigem atenção.

---

# 📊 Funcionalidades

* Dashboard de monitoramento
* Integração com ESP32
* Monitoramento de temperatura
* Monitoramento de umidade
* Detecção de presença
* API REST para comunicação IoT
* Atualização periódica das leituras
* Simulação de cenários
* Histórico gráfico temporário
* Status ambiental
* CareSense AI
* Motor de regras inteligentes
* Pontuação de risco
* Personalização por características do pet
* Classificação BAIXO / MODERADO / ALTO / CRITICO
* Explicação dos fatores identificados
* Recomendações preventivas
* Deploy web

---

# 🔌 API IoT

A rota:

```txt
/api/iot
```

é responsável pelo recebimento e disponibilização das informações ambientais.

## Exemplo

```json
{
  "temperatura": 32,
  "umidade": 40,
  "presenca": true
}
```

## GET

Retorna a última leitura disponível.

## POST

Recebe uma nova leitura e atualiza os dados temporários utilizados pelo Dashboard.

---

# 🧠 API CareSense AI

A rota:

```txt
/api/ia
```

recebe os dados ambientais e o perfil do pet através de uma requisição `POST`.

Exemplo:

```json
{
  "temperatura": 35,
  "umidade": 28,
  "presenca": true,
  "pet": {
    "nome": "Thor",
    "especie": "Cachorro",
    "raca": "Bulldog Francês",
    "idade": 8,
    "peso": 13
  }
}
```

Exemplo conceitual de resposta:

```json
{
  "pet": "Thor",
  "nivel": "CRITICO",
  "pontuacao": 10,
  "justificativa": "A análise identificou fatores de risco no ambiente e no perfil do animal.",
  "recomendacao": "Retire o pet do ambiente de risco e acompanhe possíveis sinais de desconforto.",
  "fatores": [
    "temperatura extremamente elevada",
    "umidade muito baixa",
    "pet presente no ambiente",
    "raça com maior sensibilidade ao calor",
    "animal em faixa etária de maior atenção"
  ],
  "modelo": "VitalPet CareSense AI v1"
}
```

---

# 🧪 Cenários de Demonstração

O Dashboard possui cenários que permitem demonstrar diferentes condições durante a apresentação.

## Cenário Seguro

```txt
Temperatura: 25°C
Umidade: 60%
Presença: Sim
```

## Cenário de Atenção

```txt
Temperatura: 31°C
Umidade: 38%
Presença: Sim
```

## Cenário Crítico

```txt
Temperatura: 35°C
Umidade: 28%
Presença: Sim
```

Ao alterar o cenário, o Dashboard atualiza as informações e o CareSense AI realiza uma nova análise utilizando os dados mais recentes.

---

# ▶️ Como Rodar o Dashboard

## 1. Clonar o repositório

```bash
git clone https://github.com/alc-joao/VitalPet-CareSense-Dashboard.git
```

## 2. Entrar na pasta

```bash
cd VitalPet-CareSense-Dashboard
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Executar em desenvolvimento

```bash
npm run dev
```

## 5. Abrir

```txt
http://localhost:3000
```

---

# 🧪 Como Testar a API IoT

## GET

```txt
http://localhost:3000/api/iot
```

## POST

```bash
curl -X POST http://localhost:3000/api/iot \
-H "Content-Type: application/json" \
-d '{"temperatura":35,"umidade":28,"presenca":true}'
```

O Dashboard utiliza a nova leitura e atualiza o monitoramento.

---

# ✅ Validação Técnica

O Dashboard foi validado através do build de produção:

```bash
npm run build
```

A compilação inclui as rotas:

```txt
/
/alertas
/ambientes
/api/ia
/api/iot
/pets
/sensores
```

O protótipo IoT também foi validado utilizando PlatformIO:

```bash
pio run
```

---

# 📈 Resultado da Sprint 3

Nesta etapa, o VitalPet CareSense consegue:

✅ Monitorar dados ambientais

✅ Receber informações do protótipo IoT

✅ Monitorar temperatura e umidade

✅ Detectar presença

✅ Atualizar o Dashboard

✅ Simular diferentes cenários ambientais

✅ Exibir histórico temporário

✅ Classificar o estado do ambiente

✅ Combinar dados ambientais com características do pet

✅ Executar um motor de regras inteligentes

✅ Personalizar o risco utilizando raça e idade

✅ Calcular uma pontuação

✅ Classificar o risco inteligente

✅ Explicar os fatores encontrados

✅ Gerar recomendações preventivas

✅ Demonstrar o fluxo IoT → Dashboard → CareSense AI

---

# ⚠️ Limitações do Protótipo

A versão atual foi desenvolvida para validação do conceito da Sprint.

Entre as limitações atuais estão:

* Ausência de banco de dados persistente no Dashboard
* Perfil utilizado pela IA definido de forma demonstrativa
* Pets exibidos na interface utilizando dados demonstrativos
* Histórico gráfico mantido temporariamente no navegador
* Conjunto de regras limitado aos fatores implementados nesta versão
* Ausência de integração com prontuário clínico nesta etapa

Esses pontos fazem parte das possibilidades de evolução da solução.

---

# 🔒 Responsabilidade

O **VitalPet CareSense** é um protótipo acadêmico com finalidade preventiva e demonstrativa.

As recomendações fornecidas pelo CareSense AI não representam diagnóstico veterinário e **não substituem avaliação ou orientação de um médico-veterinário**.

---

# 📷 Evidências

## Dashboard

![Dashboard VitalPet CareSense](image.png)

## API IoT

![API IoT](image-1.png)

## Protótipo IoT / Wokwi

![Simulação Wokwi](image-2.png)

![Simulação Wokwi](image-3.png)

---

# 🔗 Repositórios e Deploy

## Dashboard Web

### Deploy

https://vital-pet-care-sense-dashboard.vercel.app/

### GitHub

https://github.com/alc-joao/VitalPet-CareSense-Dashboard

---

## IoT / ESP32 / Wokwi

### GitHub

https://github.com/alc-joao/VitalPet-CareSense-IoT

---

# 🎥 Vídeo Demonstrativo

O vídeo demonstrativo da Sprint 3 será disponibilizado após a finalização da validação do projeto.

**Link:** será adicionado antes da entrega final.

---

# 📦 Entrega Final

A solução é composta por:

* Código-fonte do Dashboard
* Código-fonte do protótipo IoT
* ESP32
* Sensores DHT22 e PIR
* API REST
* Dashboard web
* CareSense AI v1
* Motor de regras inteligentes
* Sistema de classificação de risco
* Documentação técnica
* Evidências
* Deploy online
* Repositórios GitHub
* Vídeo demonstrativo

---

# 🐾 VitalPet CareSense

Projeto acadêmico desenvolvido para o **Challenge Clyvo — FIAP**.

O VitalPet CareSense demonstra como **IoT, desenvolvimento web e análise inteligente baseada em regras** podem trabalhar em conjunto para criar uma solução de monitoramento preventivo voltada ao bem-estar animal.
