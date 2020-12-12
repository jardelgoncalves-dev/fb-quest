export default (serviceManager) => {
  const service = serviceManager.questions;

  return {
    async index(req, res) {
      const response = await service.findAll({});
      res.status(response.status).json(response.data);
    },

    async store(req, res) {
      const response = await service.create({ data: req.body });
      res.status(response.status).json(response.data);
    },

    async show(req, res) {
      const { id } = req.params;
      const response = await service.findOne({ query: { _id: id } });

      res.status(response.status).json(response.data);
    },

    async destroy(req, res) {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'id não fornecido' });

      const question = await service.findOne({ query: { _id: id } });
      if (!!question.status !== 200)
        return res.status(question.status).json(question.data);

      const response = await service.delete({ query: { _id: id } });

      res.status(response.status).json(response.data);
    },
  };
};
