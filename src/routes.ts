import { Router, Request, Response } from 'express';
import { Readable } from 'stream';
import * as readline from 'readline';

import multer from 'multer';

const multerConfig = multer();

interface Boleto {
  nome_sacado: string;
  id_lote: number;
  valor: number;
  linha_digitavel: string;
}

const router = Router();

router.post(
  "/boletos",
  multerConfig.single("file"), 
  async (request: Request, response: Response): Promise<void> => {
    if (request.file) {
      const { file } = request;
      const { buffer } = file;

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);

      const boletosLine = readline.createInterface({
        input: readableFile,
      });

      const boletos: Boleto[] = [];
      let isFirstLine = true; // Ignora a primeira linha

      for await (let line of boletosLine) {

        if (isFirstLine) {
          isFirstLine = false;
          continue; // Ignora a primeira linha
        }

        const boletosLineSplit = line.split(";");

        boletos.push({
          nome_sacado: boletosLineSplit[0],
          id_lote: Number(boletosLineSplit[1]),
          valor: Number(boletosLineSplit[2].replace(",", ".")), // Substitui vírgula por ponto
          linha_digitavel: boletosLineSplit[3],
        });
      }

      // Envia a resposta com os boletos processados
      response.json(boletos);
    } else {
      console.error("Nenhum arquivo enviado.");
      response.status(400).send("Nenhum arquivo enviado.");
    }
  }
);

export { router };