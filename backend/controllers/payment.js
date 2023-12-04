const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "zqcjw9qr8bds7hm5",
  publicKey: "m5rm2n4g4rqbtkd3",
  privateKey: "206b5b26121d9fb87dfb72d4fa2589cd",
});


exports.getToken = (req,res) => {
    gateway.clientToken.generate(
    { },
    (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    }
    );

}

exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;

    gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true,
        },
      },
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
          }
            else {
                return res.send(result);
          }
      }
    );
}