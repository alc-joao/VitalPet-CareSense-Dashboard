import json
import unittest
import urllib.request
import urllib.error

URL = "http://localhost:3000/api/ia"

PET = {
    "nome": "Thor",
    "especie": "Cachorro",
    "raca": "Bulldog Francês",
    "idade": 8,
    "peso": 13
}


def consultar(dados):
    req = urllib.request.Request(
        URL,
        data=json.dumps(dados).encode(),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resposta:
            return resposta.status, json.load(resposta)
    except urllib.error.HTTPError as erro:
        return erro.code, json.load(erro)


class TestCareSenseAI(unittest.TestCase):

    def test_classificacao_de_risco(self):
        cenarios = [
            (25, 60, False, "BAIXO"),
            (29, 45, True, "ALTO"),
            (32, 38, True, "CRITICO"),
            (35, 28, True, "CRITICO")
        ]

        for temperatura, umidade, presenca, esperado in cenarios:
            with self.subTest(temperatura=temperatura):
                status, resultado = consultar({
                    "temperatura": temperatura,
                    "umidade": umidade,
                    "presenca": presenca,
                    "pet": PET
                })

                self.assertEqual(status, 200)
                self.assertEqual(resultado["nivel"], esperado)
                self.assertIn("recomendacao", resultado)
                self.assertIn("justificativa", resultado)

    def test_validacao_de_entrada(self):
        valido = {
            "temperatura": 25,
            "umidade": 60,
            "presenca": False,
            "pet": PET
        }

        invalidos = [
            {**valido, "temperatura": "quente"},
            {**valido, "umidade": 120},
            {**valido, "presenca": "false"},
            {**valido, "pet": None},
            {**valido, "pet": {**PET, "idade": -1}},
            {**valido, "pet": {**PET, "peso": 0}}
        ]

        for dados in invalidos:
            with self.subTest(dados=dados):
                status, resultado = consultar(dados)

                self.assertEqual(status, 400)
                self.assertIn("erro", resultado)


    def test_integracao_iot_ia(self):
        def iot(dados=None):
            argumentos = {}

            if dados is not None:
                argumentos["data"] = json.dumps(dados).encode()
                argumentos["headers"] = {
                    "Content-Type": "application/json"
                }
                argumentos["method"] = "POST"

            req = urllib.request.Request(
                "http://localhost:3000/api/iot",
                **argumentos
            )

            with urllib.request.urlopen(req, timeout=10) as resposta:
                return json.load(resposta)

        original = iot()

        try:
            leitura = {
                "temperatura": 35,
                "umidade": 28,
                "presenca": True
            }

            iot(leitura)
            consultado = iot()

            for chave, valor in leitura.items():
                self.assertEqual(consultado[chave], valor)

            status, resultado = consultar({
                **consultado,
                "pet": PET
            })

            self.assertEqual(status, 200)
            self.assertEqual(resultado["nivel"], "CRITICO")
            self.assertEqual(resultado["pontuacao"], 10)

        finally:
            iot({
                "temperatura": original["temperatura"],
                "umidade": original["umidade"],
                "presenca": original["presenca"]
            })


if __name__ == "__main__":
    unittest.main(verbosity=2)
