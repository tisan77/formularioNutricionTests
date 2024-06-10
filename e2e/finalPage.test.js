import { test, expect } from '@playwright/test';

test('FinalPage renders correctly', async ({ page }) => {
  // Navegar a la página final
  await page.goto('http://localhost:5173/final'); // Asegúrate de que la URL sea correcta para tu entorno de desarrollo

  // Verificar que el título se renderiza correctamente
  await expect(page.locator('h1')).toHaveText('¡Evaluación completada!');

  // Verificar que el párrafo de agradecimiento se renderiza correctamente
  await expect(page.locator('p')).toHaveText(/Gracias por participar en nuestra evaluación sensorial/);

  // Verificar que el botón "Volver a Inicio" se renderiza correctamente
  const button = page.locator('text=Volver a Inicio');
  await expect(button).toBeVisible();

  // Hacer clic en el botón "Volver a Inicio" y verificar que redirige correctamente
  await button.click();
  await expect(page).toHaveURL('http://localhost:5173/');
});
