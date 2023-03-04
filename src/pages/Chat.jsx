import React from 'react'
import { Navbar } from '../components/Navbar';
import {
  CometChatUI,
  CometChatConversationList,
  CometChatConversationListWithMessages,
  CometChatUserList,
  CometChatUserListWithMessages,
  CometChatGroupList,
  CometChatGroupListWithMessages,
  CometChatMessages,
} from "../lib/cometchat/CometChatWorkspace/src/components";

const Chat = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <CometChatUserListWithMessages />
    </div>
  );
}

export default Chat