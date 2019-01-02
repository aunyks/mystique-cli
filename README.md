# Mystique CLI
Create new identities from the terminal! An interface for [mystique](https://github.com/aunyks/mystique).  

To install the Mystique CLI, execute the following. *Note: You may need sudo.*
```
npm i -g mystique-cli
```  

## Examples  
Create a new anonymous identity. This will create an unnamed identity located at `$HOME/.mystique`.
```
mystique -p pgpPassphrase
```  

Create a named identity. The following will create a new identity located at `$HOME/.mystique/prometheus`.
```
mystique -p pgpPassphrase -n prometheus
```  

Create an identity located at a provided directory. The following will create a new identity located at `*CurrentWorkingDir*/tmp`.
```
mystique -p pgpPassphrase -o ./tmp
```  

Create an identity for a specific protocol. The following will only create a new Bitcoin identity. *Note: `pgp` for PGP, `btc` for Bitcoin, `eth` for Ethereum.*
```
mystique -i eth
```  

## License
Copyright (c) 2019 Gerald Nash.  
Licensed under the Lesser GNU General Public License Version 3 (LGPLv3).