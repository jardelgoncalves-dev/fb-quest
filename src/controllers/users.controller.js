export default (serviceManager) => {
  const service = serviceManager.users;

  return {
    async store(req, res) {
      const response = await service.create({ data: req.body });
      res.status(response.status).json(response.data);
    },

    async find(req, res) {
      const _id = req.userId;
      const response = await service.findOne({ query: { _id } });
      res.status(response.status).json(response.data);
    },
  };
};
