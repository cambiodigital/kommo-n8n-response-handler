# Kommo: recepción de respuestas con `msg1`, `msg2`, `msg3`

Este flujo asume que n8n responde al webhook de Kommo con:

```json
{
  "data": {
    "msg1": "...",
    "msg2": "...",
    "msg3": "..."
  },
  "execute_handlers": [
    { "handler": "goto", "params": { "type": "question", "step": 2 } }
  ]
}
```

## Configuración en Salesbot (Kommo)

1. **Bloque de texto** (primer mensaje):

```text
{{json.msg1}}
```

2. **Bloque de paso personalizado** (segundo mensaje):

```json
{
  "handler": "show",
  "params": {
    "type": "text",
    "value": "{{json.msg2}}"
  }
}
```

3. **Bloque de paso personalizado** (tercer mensaje):

```json
{
  "handler": "show",
  "params": {
    "type": "text",
    "value": "{{json.msg3}}"
  }
}
```

Con esto, Kommo muestra los 3 mensajes en orden y luego el `goto` del webhook regresa al paso de pregunta para esperar la siguiente respuesta del contacto.
