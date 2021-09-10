import questoes from "../bancoDeQuestoes"

export default function handler(req, res) {
  const { id } = req.query

  const [questao] = questoes.filter(q => q.id === +id)

  if(questao){
    res.status(200).json(questao.embaralharRespostas().paraObjeto())
  }else{
    res.status(204).send()
  }
}
