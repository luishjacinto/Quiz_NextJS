import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import Questionario from "../components/Questionario";
import QuestaoModel from "../model/questao";

export default function Home(){
    const router = useRouter()

    const [idsQuestoes, setIdsQuestoes] = useState([])
    const [questao, setQuestao] = useState<QuestaoModel>(null)
    const [respostasCertas, setRespostasCertas] = useState<number>(0)

    async function obterIdsQuestoes() {
        const resp = await fetch(`/api/questionario`)
        const ids = await resp.json()
        setIdsQuestoes(ids)
    }

    async function carregarQuestao(idQuestao: number) {
        const resp = await fetch(`api/questoes/${idQuestao}`)
        const json = await resp.json()
        const novaQuestao = QuestaoModel.paraClasse(json)
        setQuestao(novaQuestao)
    }

    useEffect(() => {
      obterIdsQuestoes()
    }, [])

    useEffect(() => {
        idsQuestoes.length > 0 &&
            carregarQuestao(idsQuestoes[0])
    }, [idsQuestoes])

    function questaoRespondida(questaoRespondida: QuestaoModel){
        setQuestao(questaoRespondida)
        const certa = questaoRespondida.acertou
        setRespostasCertas(respostasCertas + (certa ? 1 : 0))
    }

    function idProximaPergunta(){
        const proximoIndice = idsQuestoes.indexOf(questao.id) + 1
        return idsQuestoes[proximoIndice]
    }

    function irParaProximaQuestao(proximoId: number){
        carregarQuestao(proximoId)
    }

    function finalizar(){
        router.push({
            pathname: '/resultado',
            query: {
                total: idsQuestoes.length,
                certas: respostasCertas
            }
        })
    }

    function irParaProximoPasso(){
        const proximoId = idProximaPergunta()
        proximoId ? irParaProximaQuestao(proximoId) : finalizar()
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {questao && <Questionario
                questao={questao}
                ultima={idProximaPergunta() === undefined}
                questaoRespondida={questaoRespondida}
                irParaProximoPasso={irParaProximoPasso}
                />}
        </div>
    )
}