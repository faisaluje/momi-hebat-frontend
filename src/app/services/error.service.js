class ErrorService {
  static getErrorMessage(e) {
    const errors = e.response?.data?.errors || [];
    let msg = '';

    errors.forEach(error => {
      msg += `${error.message},`;
    });

    return msg?.slice(0, -1) || e.message || 'Gagal memproses';
  }
}

export default ErrorService;
