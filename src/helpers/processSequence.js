/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';

const api = new Api();
const MAX_RETRIES = 2;
const API_TIMEOUT = 3000;

const validateNumber = (value) => {
  if (!/^[0-9]+(\.[0-9]+)?$/.test(value)) return false;
  const num = parseFloat(value);
  const numStr = value.replace('.', '');
  return num > 0 && numStr.length > 2 && numStr.length < 10;
};

const withRetries = (fn, retries = MAX_RETRIES) => async (...args) => {
  let lastError;
  for (let i = 0; i <= retries; i++) {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API Timeout')), API_TIMEOUT)
      );
      const result = await Promise.race([fn(...args), timeoutPromise]);
      return result;
    } catch (error) {
      lastError = error;
      if (i < retries) await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw lastError;
};

const apiGetWithRetries = withRetries(async (url, params = {}) => {
  const response = await api.get(url)(params);
  if (!response || !response.result) throw new Error('Invalid API Response');
  return response;
});

const processSequence = async ({ value, writeLog, handleSuccess, handleError }) => {
  try {
    writeLog(value);

    if (!validateNumber(value)) {
      throw new Error('ValidationError');
    }

    const rounded = Math.round(Number(value));
    writeLog(rounded);

    const binaryResponse = await apiGetWithRetries(
      'https://api.tech/numbers/base', 
      { number: rounded, from: 10, to: 2 }
    ).catch(error => {
      writeLog(`Base conversion failed: ${error.message}`);
      throw new Error('BaseConversionError');
    });
    writeLog(binaryResponse.result);

    const length = binaryResponse.result.length;
    writeLog(length);

    const squared = length ** 2;
    writeLog(squared);

    const remainder = squared % 3;
    writeLog(remainder);

    const animalResponse = await apiGetWithRetries(
      `https://animals.tech/${remainder}/name`
    ).catch(error => {
      writeLog(`Animal fetch failed: ${error.message}`);
      throw new Error('AnimalFetchError');
    });

    handleSuccess(animalResponse.result);

  } catch (error) {
    writeLog(`Process failed: ${error.message}`);
    switch (error.message) {
      case 'ValidationError':
        handleError('ValidationError');
        break;
      case 'BaseConversionError':
        handleError('BaseConversionError');
        break;
      case 'AnimalFetchError':
        handleError('AnimalFetchError');
        break;
      default:
        handleError('NetworkError');
    }
  }
};

export default processSequence;