# stdlib
from datetime import datetime
from json import dumps

# Zato
from zato.server.service import Service

class D(object):
  def __init__(self, id, title, content, author, sentAt):
    self.id = id
    self.title = title
    self.content = content
    self.author = author
    self.sentAt = sentAt

class DocumentTransformer(Service):

  class SimpleIO:
    input_required = ('id', 'subject', 'body', 'by', 'time')
    output_required = ('id', 'title', 'content', 'author', 'sentAt')

  def handle(self):

    xmlService = self.outgoing.plain_http.get('XML_Docs')
    jsonService = self.outgoing.plain_http.get('JSON_Docs')

    request = self.request.input

    self.logger.info('Request: {}'.format(request))

    payload = {}
    payload['id'] = request.id
    payload['title'] = request.subject
    payload['content'] = request.body
    payload['author'] = request.by
    payload['sentAt'] = request.time

    params = {}
    headers = {'Content-Type': 'application/json'}
    response = jsonService.conn.post(self.cid, dumps(payload), params, headers=headers)

    self.response.payload = payload
