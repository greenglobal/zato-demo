# stdlib
from datetime import datetime
from json import dumps
# lxml
from lxml.builder import E as e
from lxml.etree import tostring


# Zato
from zato.server.service import Service

class LTVBTransformer(Service):

  def handle(self):

    ltvbService = self.outgoing.plain_http.get('LTVB_Deliver')

    root = self.request.payload

    self.logger.info(root)

    self.logger.info(type(root))

    request = tostring(root)

    #msgHeader = root.Envelope.Header.MessageHeader
    #self.logger.info(type(msgHeader))
    #self.logger.info(root.From.OrganName.text)
    #self.logger.info(root.From.OrganizationInCharge.text)

    params = {}
    params['data'] = tostring(root);
    headers = {'Content-Type': 'application/json'}
    response = ltvbService.conn.post(self.cid, dumps(payload), params, headers)

    self.response.payload = response.text
