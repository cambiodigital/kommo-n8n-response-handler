# kommo-n8n-response-handler

Conector para integrar **Kommo Salesbot** con un flujo en **n8n** que procesa mensajes con IA y devuelve respuestas en secuencia.

## Panorama general

Este proyecto contiene un widget personalizado de Kommo que agrega un bloque en el diseñador de Salesbot (`Enviar a IA`).

Cuando el contacto responde:
1. El bloque del widget envía el mensaje y contexto del lead/contacto a tu webhook de n8n.
2. n8n genera la respuesta (IA o lógica propia).
3. n8n responde a Kommo con `msg1`, `msg2`, `msg3` y un `goto` para volver al paso de pregunta.
4. Salesbot muestra los mensajes y queda listo para el siguiente turno.

## Estructura del repositorio

| Ruta | Propósito |
|---|---|
| `custom-widget/` | Código fuente del widget de Kommo |
| `custom-widget/manifest.json` | Configuración del widget y bloque en Salesbot |
| `custom-widget/script.js` | Lógica `onSalesbotDesignerSave` y payload enviado a n8n |
| `custom-widget/i18n/` | Textos ES/EN del widget |
| `custom-widget.zip` | Paquete listo para instalación |
| `docs/kommo-respuestas-bot.md` | Guía puntual de `msg1/msg2/msg3` en Salesbot |

## Qué envía el widget a n8n

El widget crea un `widget_request` con estos campos en `data`:

```json
{
  "message": "{{message_text}}",
  "contact_id": "{{contact.id}}",
  "contact_name": "{{contact.name}}",
  "lead_id": "{{lead.id}}",
  "lead_status_id": "{{lead.status_id}}",
  "lead_price": "{{lead.price}}",
  "lead_responsible": "{{lead.responsible.name}}",
  "origin": "{{origin}}",
  "current_date": "{{current_date}}"
}
```

## Contrato de respuesta de n8n hacia Kommo

Kommo espera esta estructura:

```json
{
  "data": {
    "msg1": "Primer mensaje",
    "msg2": "Segundo mensaje",
    "msg3": "Tercer mensaje"
  },
  "execute_handlers": [
    { "handler": "goto", "params": { "type": "question", "step": 2 } }
  ]
}
```

## Configuración recomendada en Salesbot

1. Agrega el bloque del widget **Enviar a IA** y define la URL del webhook de n8n.
2. Agrega un bloque de texto con `{{json.msg1}}`.
3. Agrega paso personalizado para `msg2`:
   `{"handler":"show","params":{"type":"text","value":"{{json.msg2}}"}}`
4. Agrega paso personalizado para `msg3`:
   `{"handler":"show","params":{"type":"text","value":"{{json.msg3}}"}}`

Importante: en los pasos personalizados pega solo JSON válido (sin backticks ni texto adicional).
