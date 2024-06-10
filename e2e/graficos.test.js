import { test, expect } from '@playwright/test';

test.describe('Graficos Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://integrador-nutricion-front.vercel.app/grafico'); // Ajusta la URL según tu configuración
  });

  test('verificar que el gráfico se muestre correctamente', async ({ page }) => {
    try {
      // Espera a que el título "Diagrama de barras" esté presente en el DOM
      await page.waitForSelector('text=Diagrama de barras', { timeout: 10000 });

      // Verificar que la barra de navegación esté presente
      await expect(page.locator('text=Diagrama de barras')).toBeVisible();

      // Esperar a que los datos del gráfico se carguen
      await page.waitForSelector('canvas', { timeout: 10000 });

      // Verificar que el gráfico esté presente
      const chart = page.locator('canvas');
      await expect(chart).toBeVisible();

      // Verificar que el botón para ver datos detallados esté presente y clicable
      const boton = page.locator('text=Ver Datos Detallados');
      await expect(boton).toBeVisible();
      await expect(boton).toBeEnabled();
    } catch (error) {
      // Tomar una captura de pantalla si algo falla
      await page.screenshot({ path: 'screenshot.png' });
      throw error;
    }
  });
});
