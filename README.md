# ms-tcp-location

Esse microserviço é para atender o protocolo **SFT9001** de recebimento dos pacotes enviado pelos dispositivos. O processo de comunicação é pelo protocolo TCP que recebe os pacotes e retorna ACK em caso específico.

Os dados de Localização serão entregue à API [ms-api-location](https://github.com/Paulofsr/ms-api-location) para que seja convertido e armazenado.

Nessa versão é aguarda dois tipos de pacotes:

* Pacote de localização: onde o Tipo de Mensagem contem os dados da situação do dispositivo
* Pacote de PING: para o dipositivo confirmar se a aplicação está ativa

## Recursos Necessários

Para rodar a aplicação em Docker ou Kubernetes basta somente ou gerar uma imagem da versão escolhida ou usar a imagem disponível repositório [ms-tcp-location](https://hub.docker.com/r/paulofsr/ms-tcp-location). Nos Sistemas Operacionais (Windows, Mac ou Linux) será necessário instalar o seguinte recurso:

* [Nodejs](https://nodejs.org/en/download/)

## Instalação

### Sistema Operacionais

Após instalado o Nodejs, caso serja necesário mudar, basta configurar as seguintes variáveis de ambiente: 

* `PORT` Default: '9000'
* `LOCATION_API` Default: 'http://localhost:5300'

Execute a atualização das dependências `npm i` e, posteriormente, execute o seguinte comando no prompt:

```shell
node server.js
```

### Docker

Caso queira utilizar um ambiente com [Docker](https://www.docker.com/) basta executar o comando abaixo.

```shell
docker container run -d --name [NOME_DO_CONTAINER] --link [CONTAINER_DO_MS-API-LOCATION]:[ALIAS_OPCIONAL] -p [PORTA_DISPONÍVEL]:9000 -e LOCATION_API='[ALIAS_OPCIONAL]:[PORTA_DO_MS-API-LOCATION]' -d paulofsr/location-tcp
```

Exemplo:

```shell
docker container run -d --name location-tcp --link location:location -p 9000:9000 -e LOCATION_API='http://location:5300' paulofsr/ms-tcp-location 
```

Altera a informação: 
* **NOME_DO_CONTAINER**: para um nome a sua escolha, pois isso será importante para montar o link nos container em comunicação com essa aplicação. 
* **CONTAINER_DO_MS-API-LOCATION**: Nome definido para o container do [ms-api-location](https://github.com/Paulofsr/ms-api-location).
* **ALIAS_OPCIONAL**: Qual a nomeção interna que terá o link com o container [ms-api-location](https://github.com/Paulofsr/ms-api-location).
* **PORTA_DISPONÍVEL**: informe a porta que queira disponibilizar para acessar à aplicação.
* **PORTA_DO_MS-API-LOCATION**: Porta definida para o container do [ms-api-location](https://github.com/Paulofsr/ms-api-location).

<!-- 
## Utilizando

### Pacote de Localização

O pacote de cone

```json
{
    "deviceId": "99999999",
    "subPackage": "5EFCF950156F017D784000008CA0F8003C013026A1029E72BD",
    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
}
```

> **deviceId**: Número do dispositívo que enviou o pacote
> **subPackage**: Parte dos dados do pacote (sem o cabeçalho, número do dispositivo, tipo de pacote e rodapé)
> **package**: O pacote completo

Com o IP ou ALIAS da aplicação em mãos após sua instalação deve informar a rota da seguinte forma, lembrando que é um método **POST**:

```url
[IP_OU_ALIAS]:[PORTA]/api/v1/info
```

O *Status Code* de retorno é o **204**.


### [GET] **/api/v1/location/:device_id**

Para buscar a última localização de um dispositivo será necessário do número do dispositivo para compor a seguinte rota.

```url
[IP_OU_ALIAS]:[PORTA]/api/v1/location/[NÚMERO_DO_DISPOSITIVO]
```

O *Status Code* de retorno é o **200** com o seguinte *Body*:

```json
{
    "info": {
        "composition": {
            "complet": "1111100000000000",
            "GPSFixed": 1,
            "GPSHistoric": 1,
            "ignitionOn": 1,
            "latitudeNegative": 1,
            "longitudeNegative": 1
        },
        "date": "1970-01-19T10:40:37.200Z",
        "direction": 54.87,
        "distance": 25000000,
        "delayReport": 36000,
        "velocity": 60,
        "latitude": 19.932833,
        "longitude": 43.938493
    },
    "_id": "5f40badc3018fa002de6d9ae",
    "deviceId": "671603",
    "package": "50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4",
    "date": "2020-08-22T06:27:40.249Z",
    "__v": 0
}
``` -->