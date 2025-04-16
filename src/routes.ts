import { Router, Request, Response } from 'express';

import multer from 'multer';

const multerConfig = multer();

const router = Router();

router.post(
  "/boletos",
  multerConfig.single("file"), 
  (request: Request, response: Response): void => {
    if (request.file) {
      console.log(request.file.buffer.toString("utf-8"));
    } else {
      console.error("Nenhum arquivo enviado.");
      response.status(400).send("Nenhum arquivo enviado.");
    }
    // Aqui você pode processar o arquivo CSV

    response.send();
  });

export { router };