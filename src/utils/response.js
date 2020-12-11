const successResponse = (data, status = 200) => ({ data: data || {}, status });

const errorResponse = (
  message = {
    error: {
      default: 'Ocorreu um erro interno, contate o administrador',
    },
  },
  status = 400
) => ({
  data: message,
  status,
});

export { successResponse, errorResponse };
