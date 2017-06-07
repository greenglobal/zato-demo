# stdlib
from datetime import datetime
from json import dumps

# Zato
from zato.server.service import Service

class DocumentTransformer(Service):

  class SimpleIO:
    input_required = ('id', 'subject', 'body', 'by', 'time')
    output_required = ('id', 'title', 'content', 'author', 'sentAt')

  def handle(self):

    xmlService = self.outgoing.plain_http.get('XML_Docs')
    jsonService = self.outgoing.plain_http.get('JSON_Docs')

    request = self.request.input

    self.logger.info('Request: {}'.format(request))

    data = {}
    data['id'] = request.id
    data['title'] = request.subject
    data['content'] = request.body
    data['author'] = request.by
    data['sentAt'] = request.time

    self.logger.info(111111111111)
    self.logger.info('Data{} '.format(data))
    self.logger.info(2222222222222)

    response = jsonService.conn.post(self.cid, dumps(data))

    self.logger.info('Response {}'.format(response))
    self.response.payload = request
