const axios = require('axios');

describe('Get Patients', () => {
  it('should fetch patients from the API', async () => {
    const mockPatients = [{ id: 1, name: 'Alan Scott' }, { id: 2, name: 'Emily Johnson' }];
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPatients });
    const baseURL = process.env.REACT_APP_API_URL;
	  const patients = await axios.get(`${baseURL}/api/patients/all_patient_names`);
    expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + '/api/patients/all_patient_names');
    expect(patients.data).toEqual(mockPatients);
    axiosGetMock.mockRestore();
  });
});