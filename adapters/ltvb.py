# stdlib
from datetime import datetime
from json import dumps

# Zato
from zato.server.service import Service

class LTVBTransformer(Service):

  def handle(self):

    ltvbService = self.outgoing.plain_http.get('LTVB_Deliver')

    root = self.request.payload

    self.logger.info(root)

    self.logger.info(type(root))

    #msgHeader = root.Envelope.Header.MessageHeader
    #self.logger.info(type(msgHeader))
    #self.logger.info(root.From.OrganName.text)
    #self.logger.info(root.From.OrganizationInCharge.text)

    payload = {}
    #payload['id'] = 1

    params = {}
    headers = {'Content-Type': 'application/json'}
    response = ltvbService.conn.post(self.cid, dumps(payload), params, headers=headers)

    self.response.payload = payload
