import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
});

export default handler;
