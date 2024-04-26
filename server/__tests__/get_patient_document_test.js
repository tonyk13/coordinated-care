const axios = require("axios");

describe("Get Patient Documents", () => {
	it("should fetch patient documents from the API", async () => {
		const mockPatientId = "12345";

		const mockPatientDocuments = [
			{ id: 1, name: "Patient Document 1" },
			{ id: 2, name: "Patient Document 2" },
		];

		const axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue({ data: mockPatientDocuments });

		const baseURL = process.env.REACT_APP_API_URL;
		const patientDocuments = await axios.get(`${baseURL}/api/patients/${mockPatientId}/documents`);

		expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/patients/${mockPatientId}/documents`);
		expect(patientDocuments.data).toEqual(mockPatientDocuments);
		axiosGetMock.mockRestore();
	});
});
