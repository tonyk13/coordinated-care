const axios = require('axios');

describe('Get Physicians', () => {
  it('should fetch physicians from the API', async () => {
    const mockPhysicians = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Q' }];
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPhysicians });
    const baseURL = process.env.REACT_APP_API_URL;
		const physicians = await axios.get(`${baseURL}/api/employees/all_physician_names`);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + '/api/employees/all_physician_names');
    expect(physicians.data).toEqual(mockPhysicians);
    axiosGetMock.mockRestore();
  });
});