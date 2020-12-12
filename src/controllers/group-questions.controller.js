export default (serviceManager) => {
  const service = serviceManager.groupQuestions;

  return {
    async index(req, res) {
      const response = await service.distinct({}, 'vestibular');
      res.status(response.status).json(response.data);
    },
  };
};
