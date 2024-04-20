const axios = require("axios");

describe("Get Equipment", () => {
	it("should fetch equipment from the API", async () => {
		const mockEquipment = [
			{ id: 1, name: "Ventilator" },
			{ id: 2, name: "ECG Machine" },
		];
		const axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue({ data: mockEquipment });
		const baseURL = process.env.REACT_APP_API_URL;
		const equipment = await axios.get(`${baseURL}/api/equipment/all_equipment_names`);
		expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + "/api/equipment/all_equipment_names");
		expect(equipment.data).toEqual(mockEquipment);
		axiosGetMock.mockRestore();
	});
});
