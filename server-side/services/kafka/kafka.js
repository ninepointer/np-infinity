// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: ['b-1.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//               'b-2.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092', 
//               'b-3.democluster1.bagf1q.c3.kafka.ap-south-1.amazonaws.com:9092'],  // replace with your brokers
//   })

// console.log(typeof(kafka.producer))

// async function test(){
//     const producer = kafka.producer()
//     await producer.connect()
//     await producer.send({
//     topic: 'my-topic',
//     messages: [
//         { value: 'Hello KafkaJS user!' },
//     ],
//     })

//     await producer.disconnect()

//     const consumer = kafka.consumer({ groupId: 'my-group' })

//     await consumer.connect()
//     await consumer.subscribe({ topic: 'my-topic', fromBeginning: true })

//     await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//         value: message.value.toString(),
//         })
//     },
//     })
// }

// test().then(()=>{})
// 17-05-2023 15:21:06

const date = '17-05-2023 15:21:06';
const date1 = date.split(" ");
const date2 = date1[0].split("-");
const date3 = `${date2[2]}-${date2[1]}-${date2[0]} ${date1[1]}`

const utcDate = new Date(date3).toUTCString();

console.log(new Date(utcDate));

