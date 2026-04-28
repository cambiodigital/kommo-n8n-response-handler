# Kommo: recepcion de respuestas con `msg1`, `msg2`, `msg3`

Con `widget_request`, Kommo no continua el Salesbot con el body HTTP de respuesta del webhook.

Primero Kommo envia un POST a tu endpoint con esta forma:

```json
{
  "token": "JWT_TOKEN",
  "data": {
    "message": "Hola"
  },
  "return_url": "https://subdominio.kommo.com/api/v4/salesbot/321/continue/123"
}
```

Tu endpoint debe:

1. Responder `200` rapido para confirmar recepcion.
2. Procesar el mensaje.
3. Hacer un `POST` a `return_url` con `data` y/o `execute_handlers`.

## Payload recomendado a `return_url`

Para el bot actual de este repositorio, lo recomendable es enviar solo `data` y dejar que el propio Salesbot navegue sus pasos internos.

```json
{
  "data": {
    "msg1": "...",
    "msg2": "...",
    "msg3": "..."
  }
}
```

Si `msg2` o `msg3` no existen, envia un centinela como `__EMPTY__` en vez de cadena vacia para que las condiciones del bot funcionen de forma estable.

Ejemplo:

```json
{
  "data": {
    "msg1": "Soy Oblein, tu asesor comercial de Rey Oblea.",
    "msg2": "¿En que te ayudo?",
    "msg3": "__EMPTY__"
  }
}
```

Kommo expone cada clave de `data` como `{{json.<clave>}}` en los pasos siguientes del bot.

Ejemplos:

- `data.msg1` -> `{{json.msg1}}`
- `data.msg2` -> `{{json.msg2}}`
- `data.msg3` -> `{{json.msg3}}`

Importante: no se usa `{{json.data.msg1}}`.

Si no se hace ese `POST` a `return_url`, el Salesbot queda en espera y no responde nada.

## Configuracion que si funciono en este bot

La secuencia estable del Salesbot quedo asi:

1. Paso `0`: bloque del widget.
2. Paso `1`: `send_message` con `{{json.msg1}}`.
3. Paso `2`: `waits` de 2 segundos.
4. Paso `3`: `condition` para `msg2` y, si aplica, `send_message`.
5. Paso `4`: `waits` de 2 segundos.
6. Paso `5`: `condition` para `msg3` y, si aplica, `send_message`.

Importante: para `msg2` y `msg3` fue mas confiable usar `send_message` dentro del `result` de `condition` que usar `show`, porque `show` llego a imprimir `{{json.msg2}}` y `{{json.msg3}}` como texto literal.

1. **Bloque de texto** (primer mensaje):

```text
{{json.msg1}}
```

2. **Bloque de paso personalizado** (segundo mensaje):

```json
{
  "handler": "condition",
  "params": {
    "term1": "{{json.msg2}}",
    "term2": "__EMPTY__",
    "result": [
      {
        "handler": "send_message",
        "params": {
          "type": "external",
          "text": "{{json.msg2}}",
          "tag": "",
          "send_to_all_chat_sources": true,
          "recipient": {
            "type": "all_contacts",
            "way_of_communication": "over_all"
          },
          "is_in_starting_block": true,
          "on_error": null
        }
      }
    ],
    "operation": "!="
  }
}
```

3. **Bloque de paso personalizado** (tercer mensaje):

```json
{
  "handler": "condition",
  "params": {
    "term1": "{{json.msg3}}",
    "term2": "__EMPTY__",
    "result": [
      {
        "handler": "send_message",
        "params": {
          "type": "external",
          "text": "{{json.msg3}}",
          "tag": "",
          "send_to_all_chat_sources": true,
          "recipient": {
            "type": "all_contacts",
            "way_of_communication": "over_all"
          },
          "is_in_starting_block": true,
          "on_error": null
        }
      }
    ],
    "operation": "!="
  }
}
```

Con esta configuracion, los 3 mensajes se muestran solo si el flujo del bot llega a esos pasos.

## Sobre `execute_handlers`

`execute_handlers` sigue siendo valido para casos donde el webhook quiera mostrar mensajes directamente o forzar un `goto`, pero en este bot en particular no hizo falta usarlo para reanudar la secuencia.

Ejemplo:

```json
{
  "data": {
    "msg1": "¡Un gusto saludarte! Soy Oblein, tu asesor experto en Rey Oblea.",
    "msg2": "¿Como puedo asistirte?",
    "msg3": ""
  },
  "execute_handlers": [
    {
      "handler": "show",
      "params": {
        "type": "text",
        "value": "{{json.msg1}}"
      }
    },
    {
      "handler": "show",
      "params": {
        "type": "text",
        "value": "{{json.msg2}}"
      }
    },
    {
      "handler": "goto",
      "params": {
        "type": "question",
        "step": 2
      }
    }
  ]
}
```

Si usas `goto`, recuerda que Kommo espera el numero real del `step` actual del bot. Si cambias bloques en el diseñador, esos pasos pueden cambiar.
