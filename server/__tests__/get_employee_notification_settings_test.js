const axios = require('axios');

describe('Get Employee notification setting', () => {
    it('should fetch employee notification setting from the API', async () => {
      const mockEmployees = [{ id: 1, name: 'John Doe' }];
      const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockEmployees });
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const employee_id = 123;
      const employees = await axios.get(`${baseURL}/api/employees/${employee_id}/get_notification_settings`);
      expect(axios.get).toHaveBeenCalledWith(`${baseURL}/api/employees/${employee_id}/get_notification_settings`);
      expect(employees.data).toEqual(mockEmployees);
      axiosGetMock.mockRestore();
    });
});
     