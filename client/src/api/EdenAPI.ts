import axios from 'axios';
import { ReceiptData } from '../interfaces/interfaces';

/**
 * Convert date from DD/MM/YYYY to YYYY/MM/DD
 *
 * This is needed because the API returns the date in DD/MM/YYYY format,
 * but our React code expects the date in YYYY/MM/DD format.
 *
 * @param dateString Date in DD/MM/YYYY format
 * @returns Date in YYYY/MM/DD format
 */
function convertDDMMYYYYToYYYYMMDD(dateString: string) {
  const parts = dateString.split('/');

  // Extracting the day, month, and year from the original date
  let day = parts[0];
  let month = parts[1];
  let year = parts[2];

  // Assuming the year is in YY format and needs to be converted to YYYY
  if (year.length === 2) {
    year = parseInt(year, 10) < 50 ? '20' + year : '19' + year;
  }

  // Ensuring single-digit months and days are padded with a leading zero
  if (day.length === 1) {
    day = '0' + day;
  }
  if (month.length === 1) {
    month = '0' + month;
  }

  return `${year}/${month}/${day}`;
}

/**
 * API get receipt data
 *
 * @param file The image file of the receipt to be parsed
 * @returns title The title of the receipt
 * @returns amount The amount of the receipt
 * @returns date The date of the receipt
 * @throws {AxiosError} Error from the API request
 * @throws {Error} Not all of the data was found in the image
 */
export const getReceiptData = async (file: File): Promise<ReceiptData> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('show_original_response', 'false');
  formData.append('fallback_providers', '');
  formData.append('providers', 'amazon');
  formData.append('language', 'en');

  const response = await axios.request({
    method: 'POST',
    url: 'https://api.edenai.run/v2/ocr/receipt_parser',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_EDENAI_API_KEY}`,
    },
    data: formData,
  });

  console.log(response.data);

  const data = response.data['eden-ai']?.extracted_data[0];
  if (data) {
    const title = data.merchant_information?.merchant_name;
    const amount = data.invoice_total;
    const date = convertDDMMYYYYToYYYYMMDD(data.date);

    if (!title || !amount || !date) {
      throw new Error('Incomplete data received from the API');
    }

    return { title, amount, date };
  } else {
    throw new Error('No data available from the API response');
  }
};
