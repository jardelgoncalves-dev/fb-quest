export default (serviceManager) => {
  const service = serviceManager.exams;

  return {
    async index(req, res) {
      const usuario = req.userId;
      const response = await service.findAll({ query: { usuario } });
      res.status(response.status).json(response.data);
    },

    async store(req, res) {
      const response = await service.create({
        data: { grupoQuestoes: req.body, usuario: req.userId },
      });
      res.status(response.status).json(response.data);
    },

    async show(req, res) {
      const usuario = req.userId;
      const { id } = req.params;
      const response = await service.findOne({ query: { usuario, _id: id } });
      res.status(response.status).json(response.data);
    },

    async verify(req, res) {
      const usuario = req.userId;
      const { questionId, examId, alternativaId } = req.params;
      const response = await service.verifyQuestion({
        questionId,
        examId,
        alternativaId,
        usuario,
      });
      res.status(response.status).json(response.data);
    },
  };
};
