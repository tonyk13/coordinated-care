const axios = require('axios');

describe('Get Rooms', () => {
  it('should fetch rooms from the API', async () => {
    const mockRooms = [{ id: 1, name: '101A' }, { id: 2, name: '102B' }];
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockRooms });
    const baseURL = process.env.REACT_APP_API_URL;
	const rooms = await axios.get(`${baseURL}/api/rooms/all_room_numbers`);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + '/api/rooms/all_room_numbers');
    expect(rooms.data).toEqual(mockRooms);
    axiosGetMock.mockRestore();
  });
});