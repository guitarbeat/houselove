// Custom Google Sheets API utility
import { mockResources, mockMediators } from '../data/mockData';

const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID;

class GoogleSheetsAPI {
  constructor() {
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  async fetchSheetData(sheetName) {
    if (!API_KEY || !SPREADSHEET_ID) {
      console.warn('Missing Google Sheets API configuration, using mock data');
      return this.getMockData(sheetName);
    }

    const url = `${this.baseUrl}/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.warn(`Google Sheets API error: ${errorData.error?.message || response.statusText}, falling back to mock data`);
        return this.getMockData(sheetName);
      }
      
      const data = await response.json();
      return this.parseSheetData(data.values);
    } catch (error) {
      console.warn(`Error fetching ${sheetName} data:`, error.message, 'falling back to mock data');
      return this.getMockData(sheetName);
    }
  }

  getMockData(sheetName) {
    switch (sheetName.toLowerCase()) {
      case 'resources':
        return mockResources;
      case 'mediators':
        return mockMediators;
      default:
        return [];
    }
  }

  parseSheetData(values) {
    if (!values || values.length === 0) {
      return [];
    }

    const headers = values[0];
    const rows = values.slice(1);

    return rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  }

  async fetchResources() {
    return this.fetchSheetData('resources');
  }

  async fetchMediators() {
    return this.fetchSheetData('mediators');
  }
}

export default new GoogleSheetsAPI();

