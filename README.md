# kommo-n8n-response-handler

Conector para integrar **Kommo Salesbot** con un flujo en **n8n** que procesa mensajes con IA y devuelve respuestas en secuencia.

## Panorama general

Este proyecto contiene un widget personalizado de Kommo que agrega un bloque en el diseñador de Salesbot (`Enviar a IA`).

Cuando el contacto responde:
1. El bloque del widget envia el mensaje y contexto del lead/contacto a tu webhook de n8n.
2. Kommo incluye un `return_url` para reanudar el Salesbot.
3. n8n procesa el mensaje y luego hace `POST` a ese `return_url` con `data` y/o `execute_handlers`.
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

## Confirmacion de n8n hacia Kommo

Kommo envia al webhook un body con `token`, `data` y `return_url`. El webhook debe responder `200` rapido y luego hacer `POST` a `return_url` con una estructura como esta:

```json
{
  "data": {
    "msg1": "Primer mensaje",
    "msg2": "Segundo mensaje",
    "msg3": "Tercer mensaje"
  }
}
```

Si `msg2` o `msg3` no existen, conviene enviar `__EMPTY__` para que las condiciones del bot no intenten mostrar placeholders literales.

## Configuracion recomendada en Salesbot

1. Agrega el bloque del widget **Enviar a IA** y define la URL del webhook de n8n.
2. Recuerda que `data.msg1`, `data.msg2` y `data.msg3` se leen como `{{json.msg1}}`, `{{json.msg2}}` y `{{json.msg3}}`.
3. Agrega un bloque de texto con `{{json.msg1}}`.
4. Para `msg2`, usa un paso personalizado `condition` que compare `{{json.msg2}}` contra `__EMPTY__` y, si aplica, ejecute `send_message` con `{{json.msg2}}`.
5. Para `msg3`, usa el mismo patron con `{{json.msg3}}`.

Importante:

- En los pasos personalizados pega solo JSON valido (sin backticks ni texto adicional).
- `execute_handlers` no rellena esos pasos; solo ejecuta handlers o mueve el flujo con `goto`.
- Si n8n no hace el `POST` a `return_url`, el Salesbot no continuara aunque el webhook inicial responda `200`.
- En este bot resulto mas estable dejar que Salesbot siga sus pasos internos y mandar solo `data` al `return_url`.
- Si usas `goto`, Kommo espera el numero real del `step` actual; esos IDs pueden cambiar cuando editas el bot.
