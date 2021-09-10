import embaralhar from "../../../functions/embaralhar"
import questoes from "../bancoDeQuestoes"

export default function handler(_, res) {

    const ids = questoes.map(q => q.id)

    res.status(200).json(embaralhar(ids))
}