# Zato
from zato.server.service import Service

class GetClientDetails(Service):
    def handle(self):

        self.logger.info('Request: {}'.format(self.request.payload))
        self.logger.info('Request type: {}'.format(type(self.request.payload)))

        # Fetch connection to CRM
        crm = self.outgoing.plain_http.get('CRM')

        # Fetch connection to Payments
        payments = self.outgoing.plain_http.get('Payments')

        # Grab the customer info ..
        response = crm.conn.send(self.cid, self.request.payload)
        cust = response.data

        # .. and last payment's details
        response = payments.conn.send(self.cid, self.request.payload)
        last_payment = response.data

        self.logger.info('Customer details: {}'.format(cust))
        self.logger.info('Last payment: {}'.format(last_payment))

        response = {}
        response['first_name'] = cust['firstName']
        response['last_name'] = cust['lastName']
        response['last_payment_date'] = last_payment['DATE']
        response['last_payment_amount'] = last_payment['AMOUNT']

        self.logger.info('Response: {}'.format(response))

        # And return response to the caller
        self.response.payload = response
