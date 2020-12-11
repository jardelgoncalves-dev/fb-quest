export default (serviceManager) => {
  const service = serviceManager.auth;

  return {
    async store(req, res) {
      const response = await service.create({ data: req.body });
      res.status(response.status).json(response.data);
    },
  };
};
