import { test, expect } from '@playwright/test';

test.describe('Formulario de Encuesta', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/formulario/'); // Cambia esto a la ruta de tu formulario
  });

  test('debería renderizar las preguntas de encuesta', async ({ page }) => {
    const preguntas = [
      "¿Como calificarías la apariencia de la galletita?",
      "¿Como calificarías el aroma de la galletita?",
      "¿Como calificarías el sabor de la galletita?",
      "¿Cómo calificarías la textura al morder la galletita?",
      "¿Como calificarías la textura en boca de la galletita?",
      "¿Qué tanto te gustó el producto en general?",
      "¿Qué tanto volverías a consumir este producto?",
      "¿Qué sensaciones experimentas en la boca al comer la galletita? (por ejemplo, sensación de sequedad, cremosidad, etc.)",
      "¿Observas alguna irregularidad en su aspecto? (por ejemplo, quemaduras, desprendimientos, etc)",
      "¿Qué aroma percibes al oler la galletita? (por ejemplo, vainilla, chocolate, rancio, etc)",
      "¿Hay alguna sensación de granulado o arenoso?",
      "¿La galletita tiene un sabor predominante?",
      "¿La textura de la galletita es crujiente?"
    ];

    for (const pregunta of preguntas) {
      const preguntaElemento = page.locator(`text=${pregunta}`);
      await expect(preguntaElemento).toBeVisible();
    }
  });

  test('debería permitir seleccionar una calificación', async ({ page }) => {
    const primeraPregunta = "¿Como calificarías la apariencia de la galletita?";
    
    // Selecciona la calificación 4 para la primera pregunta
    const radio = page.locator('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > label:nth-child(5) > span:nth-child(2)');
    await radio.check();

    // Verifica que la calificación se haya seleccionado correctamente
    await expect(radio).toBeChecked();
  });

  test('debería permitir ingresar texto en Encuesta2', async ({ page }) => {
    const preguntaEncuesta2 = "¿Qué sensaciones experimentas en la boca al comer la galletita? (por ejemplo, sensación de sequedad, cremosidad, etc.)";
    const respuesta = "Sensación de cremosidad";

    // Encuentra el input de texto y escribe una respuesta
    const input = page.locator('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(3) > div:nth-child(6) > div:nth-child(1) > input:nth-child(3)');
    await input.fill(respuesta);

    // Verifica que el texto se haya ingresado correctamente
    await expect(input).toHaveValue(respuesta);
  });

  test('debería permitir seleccionar una opción en EncuestaTextura', async ({ page }) => {
    const preguntaEncuestaTextura = "¿Hay alguna sensación de granulado o arenoso?";

    // Selecciona la opción 'Arenoso'
    const radio = page.locator('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(3) > div:nth-child(8) > div:nth-child(1) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)');
    await radio.check();

    // Verifica que la opción 'Arenoso' se haya seleccionado correctamente
    await expect(radio).toBeChecked();
  });

  test('debería permitir seleccionar una opción en EncuestaSiNo', async ({ page }) => {
    const preguntaEncuestaSiNo = "¿La galletita tiene un sabor predominante?";

    // Selecciona la opción 'Sí'
    const radioSi = page.locator('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(3) > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)');
    await radioSi.check();

    // Verifica que la opción 'Sí' se haya seleccionado correctamente
    await expect(radioSi).toBeChecked();

    // Selecciona la opción 'No'
    const radioNo = page.locator('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(3) > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > label:nth-child(2) > span:nth-child(2)');
    await radioNo.check();

    // Verifica que la opción 'No' se haya seleccionado correctamente
    await expect(radioNo).toBeChecked();
  });

  test('debería enviar el formulario correctamente', async ({ page }) => {
    // Presiona el botón de envío
    await page.locator('button[class="select-none bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"]').click();

    // Espera a que ocurra la navegación
    await page.waitForNavigation({ timeout: 60000 });

    // Verifica que la navegación haya ocurrido correctamente
    await expect(page).toHaveURL('http://localhost:5173/final');
  });
});
