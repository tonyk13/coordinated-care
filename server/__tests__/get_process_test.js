const axios = require("axios");

describe("Get Processes", () => {
	it("should fetch processes from the API", async () => {
		const mockProcesses = [
			{ id: 1, name: "Process 1" },
			{ id: 2, name: "Process 2" },
		];
		const axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue({ data: mockProcesses });
		const baseURL = process.env.REACT_APP_API_URL;
		const processes = await axios.get(`${baseURL}/api/processes`);
		expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + "/api/processes");
		expect(processes.data).toEqual(mockProcesses);
		axiosGetMock.mockRestore();
	});
});
