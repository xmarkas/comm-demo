<template>
  <v-row style="min-height: inherit">
    <v-col cols="4">
      <div id="chats">
        <v-list style="background-color: transparent">
          <v-list-item  v-for="(item, i) in items" :key="i" :class="item.active ? 'chat-item chat-active':'chat-item'">
            <!-- avatar -->
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <!-- date -->
            <v-list-item-content>
              <v-list-item-title
                v-text="item.name"
                :style="item.active ? 'color: white':'color: black'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-col>
    <v-col cols="8">
      <div id="messaging" style="background-color: white">
        <div id="messaging-header">You are messaging with Jano</div>
        <v-list id="message-list">
          <v-list-item
            v-for="(chat, i) in chats"
            :key="i"
            :class="chat.direction === 'out' ? 'flex-row-reverse' : ''"
          >
            <!-- avatar -->

            <v-list-item-avatar
              :class="chat.direction === 'out' ? 'out-avatar' : ''"
            >
              <v-img :src="chat.avatar"></v-img>
            </v-list-item-avatar>
            <!-- msg -->
            <v-list-item-content
              style="max-width:60%"
              :class="
                chat.direction === 'out' ? 'justify-end' : 'justify-start'
              "
            >
              <v-list-item-title
                :class="chat.direction === 'in' ? 'msg msg-in' : 'msg msg-out'"
                v-text="chat.msg"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- input -->
        <div id="msg-input">
          <v-text-field
            label="Type a message..."
            light
            @keypress="ev => sendMessage(ev)"
          ></v-text-field>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style>
#chats,
#messaging {
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 3px;
  position: relative;
}

#messaging-header {
  background: #00b75e;
  border-radius: 0 0 10px 10px;
  text-align: center;
  width: 325px;
  position: sticky;
  margin: 0 auto;
}

.chat-active {
    background-color: #00b75e!important;
}

#message-list {
  background-color: white !important;
  max-height: 475px;
  overflow-y: auto;
}

.chat-item {
  background-color: white;
  border-style: none none solid none;
  border-width: 1px;
  border-color: #eeeeee;
  cursor: pointer;
}

.chat-item-selected {
  box-shadow: inset 0px 0px 3px 2px #1976d2;
}

.msg {
  max-width: fit-content;
  padding: 10px;
  border-radius: 5px;
  font-size: small;
  white-space: inherit;
}

.msg-in {
  background-color: #f5f5f5;
  color: black;
}

.msg-out {
  background-color: dodgerblue;
  color: white;
}

.out-avatar {
  margin-right: 0;
  margin-left: 16px;
}

#msg-input {
  position: absolute;
  padding: 0 5px;
  width: 100%;
  bottom: 0px;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.08);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0px 0px 0px 20px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #e2e2e2;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5090cc;
}
</style>

<script>
export default {
  data: () => ({
    sendMessage: function(ev) {
      if (ev.keyCode === 13 && ev.target.value !== "") {
        this.chats.push({
          msg: ev.target.value,
          direction: "out",
          avatar: "/mark_profile_img.png"
        });
        ev.target.value = ""; // Clear input

        // Scroll down
        setTimeout(() => {
          let list = this.$el.querySelector("#message-list");
          list.scrollTop = list.scrollHeight;
        }, 100);

        // Send Phantom message
        this.phantomResponse();
      }
    },
    phantomMsg: ["Sounds good", "ok!", "hmmm...", "bye!"],
    phantomResponse: function() {
      if (this.phantomMsg.length > 0) {
        setTimeout(() => {
          this.chats.push({
            msg: this.phantomMsg[0],
            direction: "in",
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
          });
          this.phantomMsg.shift();

          // Scroll down
          setTimeout(() => {
            let list = this.$el.querySelector("#message-list");
            list.scrollTop = list.scrollHeight;
          }, 100);
        }, 2000);
      }
    },
    items: [
      {
        active: true,
        name: "Jano Smith",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      {
        name: "Wes Vega",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
      },
      {
        name: "Naomi Blackstone",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
      },
      {
        name: "Luz Palmer",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
      }
    ],
    chats: [
      {
        msg: "hi",
        direction: "in",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      { msg: "hey there!", direction: "out", avatar: "/mark_profile_img.png" },
      { msg: "What's up?", direction: "out", avatar: "/mark_profile_img.png" },
      {
        msg:
          "Can you help me figure out this template, we have about 7 hours left till we are heading out and I'd really like to get this done!",
        direction: "in",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      }
    ]
  })
};
</script>
