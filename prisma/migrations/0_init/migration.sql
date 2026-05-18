-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL UNIQUE,
    "ip" TEXT,
    "country" TEXT,
    "city" TEXT,
    "isp" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "deviceType" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "totalTime" INTEGER
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "timeSpent" INTEGER,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PageView_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Visitor" ("sessionId") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "elementText" TEXT,
    "elementType" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Click_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Visitor" ("sessionId") ON DELETE CASCADE
);

-- CreateIndex
CREATE INDEX "PageView_sessionId_idx" ON "PageView"("sessionId");

-- CreateIndex
CREATE INDEX "Click_sessionId_idx" ON "Click"("sessionId");
