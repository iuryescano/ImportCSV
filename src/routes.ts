import { Router, Request, Response } from 'express';
import { Readable } from 'stream';

import multer from 'multer';

const multerConfig = multer();

const router = Router();

router.post(
  "/boletos",
  multerConfig.single("file"), 
  (request: Request, response: Response): void => {
    if (request.file) {
      const { file } = request;
      const { buffer } = file; //onde fica o arquivo

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null); //vai criar um readable para fazer a leitura do arquivo

    } else {
      console.error("Nenhum arquivo enviado.");
      response.status(400).send("Nenhum arquivo enviado.");
    }
    // Aqui você pode processar o arquivo CSV

    response.send();
  });

export { router };