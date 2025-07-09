-- CreateTable
CREATE TABLE "Vehicles" (
    "vehicle_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_vehicle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ages" (
    "age_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "age" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subtypes" (
    "subtype_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Soats" (
    "soat_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicle_id" INTEGER NOT NULL,
    "subtype_id" INTEGER,
    "age_id" INTEGER,
    "cost" INTEGER NOT NULL,
    CONSTRAINT "Soats_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicles" ("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Soats_subtype_id_fkey" FOREIGN KEY ("subtype_id") REFERENCES "Subtypes" ("subtype_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Soats_age_id_fkey" FOREIGN KEY ("age_id") REFERENCES "Ages" ("age_id") ON DELETE SET NULL ON UPDATE CASCADE
);
