import multer from "multer";
import handler from "../../../api/handler";
import { parseExcelFile } from "../../../lib/excelHandler";

const upload = multer({
  dest: "./temp",
});

handler.post(upload.single("file"), (req, res, next) => {
  if (!req.file) {
    res.status(400).send("File not uploaded. Please upload an excel file");
    return;
  }

  const worksheet = parseExcelFile(req.file.path)[0];
  const headers = worksheet.data[0];
  res.send({
    headers,
  });
});

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
