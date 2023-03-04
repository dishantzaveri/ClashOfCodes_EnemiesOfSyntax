import React from 'react'
import {
  CometChatUI,
  CometChatConversationList,
  CometChatConversationListWithMessages,
  CometChatUserList,
  CometChatUserListWithMessages,
  CometChatGroupList,
  CometChatGroupListWithMessages,
  CometChatMessages,
} from "../lib/cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";

const Chat = () => {
  return (
    <div className="h-screen">
      <CometChatUserListWithMessages />
    </div>
  );
}

export default Chat