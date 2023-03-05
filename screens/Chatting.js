// import { View, Text } from 'react-native'
// import React, { useLayoutEffect,useCallback, useState, useEffect } from 'react'
// import { Bubble, GiftedChat, Avatar } from 'react-native-gifted-chat'
// import { useRoute } from '@react-navigation/native';
// import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore"
// import { database, auth } from '../FireB';
// export default function Chatting() {
//     const [messages, setMessages] = useState([]);
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     const [randomLetter, setRandomLetter] = useState('');

//     const handleGenerateRandomLetter = () => {
//         const randomIndex = Math.floor(Math.random() * alphabet.length);
//         setRandomLetter(alphabet[randomIndex]);
//     };
//     // useEffect(() => {
//     //     setMessages([
//     //         {
//     //             _id: 1,
//     //             name: "Bhumika",
//     //             text: 'Hello developer',
//     //             createdAt: new Date(),
//     //             user: {
//     //                 _id: 2,
//     //                 name: 'React Native',
//     //                 avatar: <Fontisto name="persons" size={24} color="black" />,
//     //             },
//     //         },
//     //     ])
//     // }, [])

//     // const onSend = messagesArray => {
//     //     const msg = messagesArray[0];
//     //     const myMsg = { ...msg, senderId: route.params.data.myId, receiverId: route.params.data.userId }
//     //     setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg),);
//     //     firestore().collection("chats").doc("123456").collection("messages").add({
//     //         ...myMsg, createdAt: new Date(),
//     //     })
//     // }
//     const random = [
//         "Printer_YouTube",
//         "Laptop_Drugs",
//         "Dislike_Whale",
//         "Website_Water",
//         "Bird_Laptop",
//         "Rollers_YouTube",
//         "Soda_Dog",
//         "Soda_Settings",
//         "Mail_Body",
//         "Towel_Shoes"
//     ]
//     const name = random[Math.floor(Math.random() * 6) + 1]
//     const onSend = useCallback((messages = []) => {
//         setMessages(previousMessages =>
//             GiftedChat.append(previousMessages, messages)
//         );
//         // setMessages([...messages, ...messages]);
//         const { _id, createdAt, text, user } = messages[0];
//         addDoc(collection(database, 'chats'), {
//             _id,
//             createdAt,
//             text,
//             user
//         });
//     }, []);

//     function generateRandomId() {
//         const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//         let id = '';
//         for (let i = 0; i < 5; i++) {
//             const index = Math.floor(Math.random() * alphabet.length);
//             id += alphabet[index];
//         }
//         return id;
//     }
//     useLayoutEffect(() => {
//         const coll = collection(database, "chats");
//         const queryr = query(coll, ref => ref.orderBy('createdAt'));

//         const unsubscribe = onSnapshot(queryr, snapshot => {
//             console.log("snapshot");
//             setMessages(snapshot.docs.map(doc => ({
//                 _id: doc.id,
//                 createdAt: doc.data().createdAt.toDate(),
//                 text: doc.data().text,
//                 user: doc.data().user
//             })))
//         })
//     }, []);



//     const route = useRoute();
//     return (
//         <View style={{ flex: 1, backgroundColor: "#fff" }}>
//         <GiftedChat  messages={messages}
//           showAvatarForEveryMessage={false}
//           showUserAvatar={false}
//           onSend={messages => onSend(messages)}
//           messagesContainerStyle={{
//             backgroundColor: '#fff'
//           }}
//           textInputStyle={{
//             backgroundColor: '#fff',
//             borderRadius: 20,
//           }}
//           user={{
//             _id: generateRandomId(),
//             avatar: 'https://i.pinimg.com/474x/de/99/93/de9993e752fc52646579448542c411d3.jpg'
//           }}
//         />
//             {/* <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: generateRandomId(),
//                     name: name,
//                     // avatar: 'https://your.avatar.url',
//                 }}
//                 renderUsername={props => {
//                     return <Text style={{ fontSize: 10, paddingLeft: 4 }}>{props.name}</Text>
//                 }}
//                 renderBubble={props => {
//                     return (
//                         <View>
//                             <Text >{props.currentMessage.user.name}</Text>
//                             <Bubble {...props} wrapperStyle={{
//                                 right: {
//                                     backgroundColor: "#fb7185",
//                                     padding: 7,
//                                     // marginRight: 5
//                                 }
//                                 ,
//                                 left: {
//                                     padding: 7
//                                 }
//                             }}>

//                             </Bubble>
//                         </View>
//                     )
//                 }}
//                 renderAvatar={props => {
//                     return <Fontisto name="persons" size={24} color="black" />;
//                 }}
//                 // renderUsernameOnMessage={true}

//                 bottomOffset={10}
//             /> */}
//         </View>
//     )
// }