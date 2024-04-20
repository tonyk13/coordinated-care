const axios = require("axios");

describe("Get Discussion Posts", () => {
	it("should fetch discussion posts from the API", async () => {
		const mockDiscussionPost = [
			{
				id: 1,
				title: "Discussion Post Title 1",
				summary: "Discussion Post Summary 1",
				text: "Discussion Post Text 1",
				askedBy: "Username1",
				askDateTime: "2021-04-01T14:00:00.000Z",
			},
			{
				id: 2,
				title: "Discussion Post Title 2",
				summary: "Discussion Post Summary 2",
				text: "Discussion Post Text 2",
				askedBy: "Username2",
				askDateTime: "2021-04-11T17:00:00.000Z",
			},
		];
		const axiosGetMock = jest.spyOn(axios, "get").mockResolvedValue({ data: mockDiscussionPost });
		const baseURL = process.env.REACT_APP_API_URL;
		const discussionPosts = await axios.get(`${baseURL}/api/discussions/allDiscussionPosts`);
		expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + "/api/discussions/allDiscussionPosts");
		expect(discussionPosts.data).toEqual(mockDiscussionPost);
		axiosGetMock.mockRestore();
	});
});
