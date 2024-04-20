const axios = require('axios');

describe('Get Employees', () => {
  it('should fetch employee from the API', async () => {
    const mockEmployees = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Mary Q' }];
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockEmployees });
    const baseURL = process.env.REACT_APP_API_URL;
	const employees = await axios.get(`${baseURL}/api/employees/all_physician_names/`);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + '/api/employees/all_physician_names/');
    expect(employees.data).toEqual(mockEmployees);
    axiosGetMock.mockRestore();
  });
});

     