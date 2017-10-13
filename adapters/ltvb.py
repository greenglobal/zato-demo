# stdlib
from datetime import datetime
from json import dumps

# Zato
from zato.server.service import Service

class LTBBTransformer(Service):

  def handle(self):

    xmlService = self.outgoing.plain_http.get('XML_Docs')
    jsonService = self.outgoing.plain_http.get('JSON_Docs')

    root = self.request.payload

    self.logger.info(root)
    #self.logger.info(type(root))
    #self.logger.info(root.From.OrganId.text)
    #self.logger.info(root.From.OrganName.text)
    #self.logger.info(root.From.OrganizationInCharge.text)

    #params = {}
    #headers = {'Content-Type': 'application/json'}
    #response = jsonService.conn.post(self.cid, dumps(payload), params, headers=headers)

    self.response.payload = root
