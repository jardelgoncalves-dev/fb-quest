export default (serviceManager) => {
  const service = serviceManager.users;

  return {
    async store(req, res) {
      const response = await service.create({ data: req.body });
      res.status(response.status).json(response.data);
    },
  };
};
