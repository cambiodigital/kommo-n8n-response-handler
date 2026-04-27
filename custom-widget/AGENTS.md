# AGENTS.md

Este repositorio contiene un widget personalizado para **Kommo CRM**, desarrollado para automatizaciones de clientes mediante IA y webhooks (n8n).

## Contexto del proyecto

- El widget se integra en el **Salesbot Designer** de Kommo.
- Permite enviar mensajes generados por IA a un webhook externo (n8n), pasando datos del contacto, lead y conversación.
- Está diseñado para ser reutilizado en múltiples clientes, por lo que debe mantenerse genérico.

## Estructura

```
custom-widget/
├── manifest.json       # Configuración del widget (nombre, versión, ubicaciones, settings)
├── script.js           # Lógica del widget (AMD module con jQuery)
├── i18n/
│   ├── es.json         # Traducciones en español
│   └── en.json         # Traducciones en inglés
└── images/             # Logos del widget en distintos tamaños
```

## Documentación de referencia — Kommo for Developers

> Documentación oficial para desarrolladores de Kommo. Cubre integraciones, autorización, widgets, VoIP, WEB SDK, pipeline digital y tutoriales.

- [Kommo for developers](https://developers.kommo.com/docs/kommo-for-developers)
- [Subject area](https://developers.kommo.com/docs/subject-area)
- [Limitations](https://developers.kommo.com/docs/limitations)
- [HTTP status codes](https://developers.kommo.com/docs/http-codes)
- [Technology Partnership](https://developers.kommo.com/docs/technology-partnership)

### Get Started

- [Private integration](https://developers.kommo.com/docs/private-integration)
- [Webhooks](https://developers.kommo.com/docs/webhooks-general)

### Start Building

- [Authorization](https://developers.kommo.com/docs/oauth-20)
  - [OAuth 2.0](https://developers.kommo.com/docs/oauth-20)
  - [Button on Site](https://developers.kommo.com/docs/button-on-site)
  - [Permissions](https://developers.kommo.com/docs/permissions)
  - [Long-lived Token](https://developers.kommo.com/docs/long-lived-token)
  - [One-time tokens](https://developers.kommo.com/docs/one-time-tokens)
- [Widget](https://developers.kommo.com/docs/widget)
  - [Structure of widget](https://developers.kommo.com/docs/structure-widget)
  - [Settings field types](https://developers.kommo.com/docs/field-types)
  - [Widget locations](https://developers.kommo.com/docs/widget-locations)
- [VoIP](https://developers.kommo.com/docs/voip)
  - [Use cases](https://developers.kommo.com/docs/use-cases)
  - [Authorization and configuring](https://developers.kommo.com/docs/installing-and-configuring)
  - [Call logging](https://developers.kommo.com/docs/call-logging)
  - [Call data from VoIP](https://developers.kommo.com/docs/call-from-webhook)
  - [Call result](https://developers.kommo.com/docs/call-result)
  - [Caller ID](https://developers.kommo.com/docs/caller-id)
  - [Call event](https://developers.kommo.com/docs/call-event)
  - [Call list](https://developers.kommo.com/docs/call-list)
  - [Assign phone extensions to managers](https://developers.kommo.com/docs/assign-extensions-to-managers)
  - [Smart forwarding](https://developers.kommo.com/docs/smart-forwarding)
  - [Making calls inside Kommo](https://developers.kommo.com/docs/making-calls-inside-kommo)
  - [Click-to-call](https://developers.kommo.com/docs/click-to-call)

### Go to Marketplace

- [Technical account](https://developers.kommo.com/docs/technical-account)
- [Create a Public integration](https://developers.kommo.com/docs/get-started-public)
- [Public integration checklist](https://developers.kommo.com/docs/getting-listed)
- [Authorization for Public Integrations](https://developers.kommo.com/docs/authorization-public)
- [Get approved](https://developers.kommo.com/docs/moderation-process)
- [Dictionary for developers](https://developers.kommo.com/docs/dictionary-for-developers)

### WEB SDK

- [Modules and packages](https://developers.kommo.com/docs/modules)
- [Environment variables](https://developers.kommo.com/docs/environment-variables)
- [JS SDK](https://developers.kommo.com/docs/js-sdk)
- [Card SDK](https://developers.kommo.com/docs/card-sdk)
- [Lists SDK](https://developers.kommo.com/docs/lists-sdk)
- [Left menu bar](https://developers.kommo.com/docs/left-menu)
- [Notification center](https://developers.kommo.com/docs/notification-center)
  - [Adding notifications](https://developers.kommo.com/docs/add-notifications)
  - [Notifications subscription](https://developers.kommo.com/docs/notifications-subscription)
- [Salesbot SDK](https://developers.kommo.com/docs/salesbot-sdk)
- [Website Chat Button API](https://developers.kommo.com/docs/api-crm-plugin)
- [Webforms API](https://developers.kommo.com/docs/webforms-api)
- [Dark Theme](https://developers.kommo.com/docs/dark-theme)

### Digital Pipeline

- [Webhooks in Digital Pipeline](https://developers.kommo.com/docs/webhooks-dp)
- [Salesbot](https://developers.kommo.com/docs/salesbot-dp)
- [Widgets in Digital Pipeline](https://developers.kommo.com/docs/widgets-dp)

### Tutorials

- [Lead Capture](https://developers.kommo.com/docs/lead-capture)
- [Simple Widget Development](https://developers.kommo.com/docs/widgets-tutorial)
- [Guidelines for recipes in Python](https://developers.kommo.com/docs/guidelines-recipes)
- [Private Chatbot integration](https://developers.kommo.com/docs/private-chatbot-integration)

---

### Tools

- [React hooks](https://developers.kommo.com/docs/react-hooks)
- [Skeleton](https://developers.kommo.com/docs/skeleton)
- [Kommo Storybook](https://storybook.kommo.com/?path=/docs/getting-started-getting-started--docs)

### Get Certified

- [Certificates](https://developers.kommo.com/docs/certificates)

### Communicate

- [Discord Dev Community](https://discord.gg/CjstJTrBHu)
- [GitHub](https://github.com/kommo-crm)
- [Developer Wishlist](https://forms.gle/3AWRebqsmyv4mpSR7)
