#!/usr/bin/env node
const { writeFileSync, mkdirSync, existsSync } = require('fs')
const { join } = require('path')
const argv = require('yargs').argv
const { createIdentity } = require('mystique-lib')

const outputDir = argv.o || join(process.env.HOME, '.mystique')
const pgpPass = argv.p

if (!!outputDir) {
  if (!!pgpPass || !!argv.i && argv.i !== 'pgp') {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir)
    }
    createIdentity(pgpPass)
      .then(({ pgp, btc, eth }) => {
        let publicDir
        let privateDir
        if (!!argv.n) {
          publicDir = join(outputDir, argv.n, 'public')
          privateDir = join(outputDir, argv.n, 'private')
        } else {
          publicDir = join(outputDir, 'public')
          privateDir = join(outputDir, 'private')
        }
        if (!!argv.n && !existsSync(publicDir)) {
          mkdirSync(join(publicDir, '..'))
        }
        if (!existsSync(publicDir)) {
          mkdirSync(publicDir)
        }
        if (!existsSync(privateDir)) {
          mkdirSync(privateDir)
        }
        if (!!argv.i) {
          switch (argv.i) {
            case 'pgp':
              writeFileSync(join(publicDir, 'pgp.txt'), pgp.public)
              writeFileSync(join(privateDir, 'pgp.txt'), pgp.private)
              break
            case 'btc':
              writeFileSync(join(publicDir, 'btc.txt'), btc.public)
              writeFileSync(join(privateDir, 'btc.txt'), btc.private)
              break
            case 'eth':
              writeFileSync(join(publicDir, 'eth.txt'), eth.public)
              writeFileSync(join(privateDir, 'eth.txt'), eth.private)
              break
            default:
              console.error('Unknown protocol requested!')
              process.exit(1)
              break
          }
        } else {
          writeFileSync(join(publicDir, 'pgp.txt'), pgp.public)
          writeFileSync(join(publicDir, 'btc.txt'), btc.public)
          writeFileSync(join(publicDir, 'eth.txt'), eth.public)
          writeFileSync(join(privateDir, 'pgp.txt'), pgp.private)
          writeFileSync(join(privateDir, 'btc.txt'), btc.private)
          writeFileSync(join(privateDir, 'eth.txt'), eth.private)
        }
      })
      .catch(e => {
        console.error('An unknown error occurred.')
        console.error(e)
        process.exit(1)
      })
  } else {
    console.error('PGP passphrase must be provided!')
    process.exit(1)
  }
} else {
  console.error('Output directory not specified!')
  process.exit(1)
}
