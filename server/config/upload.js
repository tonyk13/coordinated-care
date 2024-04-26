const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFsStorage({
	url: process.env.MONGODB_URI || "mongodb://localhost:27017/coordinated-care",
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
					metadata: {
						fileId: req.body.fileId,
						patientId: req.params._id,
						documentName: req.body.documentName,
						uploadedBy: req.body.uploadedBy,
						accessLevel: req.body.accessLevel,
						documentType: req.body.documentType,
						description: req.body.description,
						lastUpdated: new Date(),
						size: file.size,
						mimeType: file.mimetype,
					},
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

module.exports = upload;
