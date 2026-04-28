define(['jquery'], function($) {
  return function CustomWidget() {
    var _this = this;

    function normalizeUrl(value) {
      return value ? String(value).trim() : '';
    }

    _this.callbacks = {
      render: function() { return true; },
      init: function() { return true; },
      bind_actions: function() { return true; },
      settings: function() { return true; },
      onSave: function() { return true; },
      destroy: function() { return true; },

      onSalesbotDesignerSave: function(handler_code, params) {
        var settings = _this.get_settings ? _this.get_settings() : {};
        var url = normalizeUrl(params && params.url) || normalizeUrl(settings.webhook_url);

        if (!url || url === 'https://') {
          return JSON.stringify([]);
        }

        var step = {
          question: [
            {
              handler: 'widget_request',
              params: {
                url: url,
                data: {
                  message: '{{message_text}}',
                  contact_id: '{{contact.id}}',
                  contact_name: '{{contact.name}}',
                  lead_id: '{{lead.id}}',
                  lead_status_id: '{{lead.status_id}}',
                  lead_price: '{{lead.price}}',
                  lead_responsible: '{{lead.responsible.name}}',
                  origin: '{{origin}}',
                  current_date: '{{current_date}}'
                }
              }
            }
          ],
          require: []
        };

        return JSON.stringify([step]);
      }
    };

    return this;
  };
});
