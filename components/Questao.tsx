import styles from '../styles/Questao.module.css'
import QuestaoModel from "../model/questao";
import Enunciado from './Enunciado';
import Resposta from './Resposta';
import Temporizador from './Temporizador'

interface QuestaoProps {
    valor: QuestaoModel
    tempoPraResposta?: number
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps){
    const questao = props.valor

    function renderizarRespostas(){
        const letras = [
            { valor: 'A', cor: '#F2C866' },
            { valor: 'B', cor: '#F166BA' },
            { valor: 'C', cor: '#85D4F2' },
            { valor: 'D', cor: '#BCE596' },
        ]

        return questao.respostas.map((resposta, i) => {
            const letra = letras[i]

            return (
                <Resposta
                    key={`${questao.id}_${i}`}
                    valor={resposta}
                    indice={i}
                    letra={letra.valor}
                    corFundoLetra={letra.cor}
                    respostaFornecida={props.respostaFornecida}
                />
            )
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado}/>
            <Temporizador key={questao.id} duracao={props.tempoPraResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
            {renderizarRespostas()}
        </div>
    )
}