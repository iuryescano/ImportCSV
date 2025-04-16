-- CreateTable
CREATE TABLE "Lotes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Boletos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_sacado" TEXT NOT NULL,
    "id_lote" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "linha_digitavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Boletos_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lotes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lotes_nome_key" ON "Lotes"("nome");

-- CreateIndex
CREATE INDEX "Boletos_id_lote_idx" ON "Boletos"("id_lote");
