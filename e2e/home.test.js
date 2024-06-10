import { test, expect } from '@playwright/test';

test.describe('Home Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/'); // Cambia el puerto según tu configuración
  });

  test('should display the welcome message', async ({ page }) => {
    const welcomeMessage = await page.textContent('h1');
    expect(welcomeMessage).toBe('¡Bienvenido a la evaluación sensorial!');
  });

  test('should display the description text', async ({ page }) => {
    const description = await page.textContent('p');
    expect(description).toContain('La evaluación sensorial nos permite analizar cómo percibes los alimentos usando tus sentidos.');
  });

  test('should display the image', async ({ page }) => {
    const image = await page.getByRole('img', { name: 'Galletita' });
    expect(image).toBeTruthy();
  });

  test('should navigate to the form when the button is clicked', async ({ page }) => {
    await page.click('text=Comenzar Evaluación');
    expect(page.url()).toBe('http://localhost:5173/formulario'); // Ajusta la URL según tu configuración de rutas
  });
});
