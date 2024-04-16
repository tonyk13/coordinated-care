const axios = require('axios');

describe('Get Users', () => {
  it('should fetch user from the API', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Mary Q' }];
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockUsers });
    const baseURL = process.env.REACT_APP_API_URL;
	const users = await axios.get(`${baseURL}/api/getAllUsers/`);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + '/api/getAllUsers/');
    expect(users.data).toEqual(mockUsers);
    axiosGetMock.mockRestore();
  });
});

