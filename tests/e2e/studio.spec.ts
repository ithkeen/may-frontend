import { expect, test } from "@playwright/test";

test("desktop studio workflow stays local and updates visible state", async ({ page }) => {
  const externalRequests: string[] = [];
  const prompt =
    "Adjustable olive green breathable pet carrier backpack for a small dog, with black mesh and safety strap.";

  page.on("request", (request) => {
    const url = new URL(request.url());
    const isLocal =
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      url.protocol === "data:" ||
      url.protocol === "blob:";

    if (!isLocal) {
      externalRequests.push(request.url());
    }
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Pet Product Listing Image Studio" }),
  ).toBeVisible();
  await expect(page.getByText("MayCreator")).toBeVisible();
  await expect(page.getByTestId("generate-button")).toBeDisabled();
  await expect(page.getByTestId("character-count")).toHaveText("0 / 1000");

  await page.getByLabel("Product Prompt").fill(prompt);
  await expect(page.getByTestId("character-count")).toHaveText(`${prompt.length} / 1000`);
  await expect(page.getByTestId("generate-button")).toBeEnabled();

  await page.getByTestId("mode-spec").click();
  await expect(page.getByTestId("local-state-summary")).toContainText("Product Spec Sheet");

  await page.getByLabel("Upload source image").setInputFiles({
    name: "carrier-source.png",
    mimeType: "image/png",
    buffer: Buffer.from("local-only-image"),
  });
  await expect(page.getByTestId("uploaded-file-name")).toHaveText("carrier-source.png");

  await page.getByTestId("generate-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible();
  await expect(page.getByTestId("result-panel")).toContainText("Generated");
  await expect(page.getByAltText(/Generated listing image preview/)).toBeVisible();
  await expect(page.getByAltText(/Generated product specification preview/)).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test("mobile viewport renders without horizontal overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("New Project")).toBeVisible();
  await expect(page.getByLabel("Generation type")).toBeVisible();
  await expect(page.getByTestId("result-panel")).toBeVisible();

  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth - root.clientWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
});
