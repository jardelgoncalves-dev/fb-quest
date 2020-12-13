export default (serviceManager) => {
  const service = serviceManager.exams;

  return {
    async store(req, res) {
      const response = await service.create({
        data: { grupoQuestoes: req.body, usuario: req.userId },
      });
      res.status(response.status).json(response.data);
    },
  };
};
